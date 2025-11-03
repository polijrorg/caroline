import { NextRequest, NextResponse } from 'next/server'
import { createModuloSchema } from '../../schemas/modulos.schema'
import * as moduloService from "../../services/modulos/modulos"
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

        const modulos = await moduloService.getAllModulos();
        return NextResponse.json(modulos);
    } catch (error) {
        console.error("Error getting modulos:", error);
        return NextResponse.json(
            { error: "Erro ao buscar módulos" },
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
        
        // Se não fornecer ordem, pega a próxima automaticamente
        if (!body.ordem) {
            body.ordem = await moduloService.getNextOrdem();
        }

        const parsed = createModuloSchema.safeParse(body);

        if (!parsed.success) {
            return returnInvalidDataErrors(parsed.error);
        }

        const modulo = await moduloService.createModulo(parsed.data);
        return NextResponse.json(modulo, { status: 201 });
    } catch (error) {
        console.error("Error creating modulo:", error);
        return NextResponse.json(
            { error: "Erro ao criar módulo" },
            { status: 500 }
        );
    }
}
