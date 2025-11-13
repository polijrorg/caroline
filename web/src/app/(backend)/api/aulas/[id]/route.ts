import { NextRequest, NextResponse } from "next/server";
import * as aulaService from "../../../services/aulas/aulas";
import { updateAulaSchema } from "../../../schemas/aulas.schema";
import { blockForbiddenRequests, returnInvalidDataErrors } from "@/utils/api";
import { AllowedRoutes } from "@/types";

const allowedRoles: AllowedRoutes = {
    GET: [], // Público
    PUT: ["SUPER_ADMIN", "ADMIN"],
    DELETE: ["SUPER_ADMIN", "ADMIN"]
};

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const aula = await aulaService.getAulaById(id);
        
        if (!aula) {
            return NextResponse.json({ error: "Aula não encontrada" }, { status: 404 });
        }
        
        return NextResponse.json(aula);
    } catch (error) {
        console.error("Error getting aula:", error);
        return NextResponse.json(
            { error: "Erro ao buscar aula" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const forbidden = await blockForbiddenRequests(request, allowedRoles.PUT);
        if (forbidden) {
            return forbidden;
        }

        const { id } = await params;
        const body = await request.json();
        const validationResult = updateAulaSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult.error);
        }

        const aula = await aulaService.updateAula(id, validationResult.data);
        return NextResponse.json(aula);
    } catch (error) {
        console.error("Error updating aula:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar aula" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const forbidden = await blockForbiddenRequests(request, allowedRoles.DELETE);
        if (forbidden) {
            return forbidden;
        }

        const { id } = await params;
        await aulaService.deleteAula(id);
        return NextResponse.json({ message: "Aula deletada com sucesso" });
    } catch (error) {
        console.error("Error deleting aula:", error);
        return NextResponse.json(
            { error: "Erro ao deletar aula" },
            { status: 500 }
        );
    }
}
