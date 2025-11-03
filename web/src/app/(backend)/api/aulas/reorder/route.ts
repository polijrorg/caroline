import { NextRequest, NextResponse } from "next/server";
import { reorderAulasSchema } from "@/backend/schemas/aulas.schema";
import { reorderAulas } from "@/backend/services/aulas/aulas";
import { blockForbiddenRequests, returnInvalidDataErrors } from "@/utils/api";
import { AllowedRoutes } from "@/types";

const allowedRoles: AllowedRoutes = {
    PUT: ["SUPER_ADMIN", "ADMIN"]
};

export async function PUT(request: NextRequest) {
    try {
        const forbidden = await blockForbiddenRequests(request, allowedRoles.PUT);
        if (forbidden) {
            return forbidden;
        }

        const body = await request.json();
        const validationResult = reorderAulasSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult.error);
        }

        const aulas = await reorderAulas(validationResult.data);
        return NextResponse.json(aulas);
    } catch (error) {
        console.error("Error reordering aulas:", error);
        return NextResponse.json(
            { error: "Erro ao reordenar aulas" },
            { status: 500 }
        );
    }
}
