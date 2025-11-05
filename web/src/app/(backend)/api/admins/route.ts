import { NextRequest, NextResponse } from "next/server";
import { blockForbiddenRequests, zodErrorHandler } from "@/utils/api";
import { AllowedRoutes } from "@/types";
import * as adminService from "../../services/admins";

const allowedRoles: AllowedRoutes = {
  GET: ["SUPER_ADMIN"],
};

export async function GET(request: NextRequest) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.GET);
    if (forbidden) {
      return forbidden;
    }

    const users = await adminService.getAllUsersWithRoles();
    return NextResponse.json(users);
  } catch (error) {
    return zodErrorHandler(error);
  }
}
