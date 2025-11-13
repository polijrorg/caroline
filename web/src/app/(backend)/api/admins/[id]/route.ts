import { NextRequest, NextResponse } from "next/server";
import { blockForbiddenRequests, validBody, returnInvalidDataErrors, zodErrorHandler } from "@/utils/api";
import { AllowedRoutes } from "@/types";
import { updateUserRoleSchema, idSchema } from "@/backend/schemas";
import * as adminService from "../../../services/admins";
import { toErrorMessage } from "@/utils/api/toErrorMessage";

const allowedRoles: AllowedRoutes = {
  PATCH: ["SUPER_ADMIN"],
};

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.PATCH);
    if (forbidden) {
      return forbidden;
    }

    const { id } = await params;

    const idValidationResult = idSchema.safeParse(id);
    if (!idValidationResult.success) {
      return NextResponse.json(
        toErrorMessage("ID Inválido"),
        { status: 400 }
      );
    }

    const body = await validBody(request);
    if (body instanceof NextResponse) {
      return body;
    }

    const parsed = updateUserRoleSchema.safeParse(body);
    if (!parsed.success) {
      return returnInvalidDataErrors(parsed.error);
    }

    const updated = await adminService.updateUserRole(id, parsed.data.role);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("não encontrado") ? 404 : 403 }
      );
    }
    return zodErrorHandler(error);
  }
}
