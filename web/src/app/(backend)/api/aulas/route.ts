import { NextRequest, NextResponse } from "next/server";
import { createAulaSchema } from "../../schemas/aulas.schema";
import * as aulaService from "../../services/aulas/aulas";
import { blockForbiddenRequests, returnInvalidDataErrors } from "@/utils/api";
import { AllowedRoutes } from "@/types";

const allowedRoles: AllowedRoutes = {
    GET: ["SUPER_ADMIN", "ADMIN"],
    POST: ["SUPER_ADMIN", "ADMIN"]
};

export async function GET(request: NextRequest) {
    try {
        const forbidden = await blockForbiddenRequests(request, allowedRoles.GET);
        if (forbidden) {
            return forbidden;
        }

        const aulas = await aulaService.getAllAulas();
        return NextResponse.json(aulas);
    } catch (error) {
        console.error("Error getting aulas:", error);
        return NextResponse.json(
            { error: "Erro ao buscar aulas" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const forbidden = await blockForbiddenRequests(req, allowedRoles.POST);
        if (forbidden) {
            return forbidden;
        }

        const body = await req.json();

        // Se não fornecer ordem, pega a próxima automaticamente dentro do módulo
        if (!body.ordem && body.moduloId) {
            body.ordem = await aulaService.getNextOrdemInModulo(body.moduloId);
        }

        const parsed = createAulaSchema.safeParse(body);

        if (!parsed.success) {
            return returnInvalidDataErrors(parsed.error);
        }

        const aula = await aulaService.createAula(parsed.data);
        return NextResponse.json(aula, { status: 201 });
    } catch (error) {
        console.error("Error creating aula:", error);
        return NextResponse.json(
            { error: "Erro ao criar aula" },
            { status: 500 }
        );
    }
}
