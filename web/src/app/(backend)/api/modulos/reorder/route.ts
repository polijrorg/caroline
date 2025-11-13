import { NextRequest, NextResponse } from "next/server";
import { reorderModulosSchema } from "@/backend/schemas/modulos.schema";
import { reorderModulos } from "@/backend/services/modulos/modulos";
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
        const validationResult = reorderModulosSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult.error);
        }

        const modulos = await reorderModulos(validationResult.data);
        return NextResponse.json(modulos);
    } catch (error) {
        console.error("Error reordering modulos:", error);
        return NextResponse.json(
            { error: "Erro ao reordenar módulos" },
            { status: 500 }
        );
    }
}
