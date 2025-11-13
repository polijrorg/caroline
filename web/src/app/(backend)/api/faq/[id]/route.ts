import { NextRequest, NextResponse } from "next/server";
import * as faqService from "../../../services/faq/faq";
import { updateFaqSchema } from "../../../schemas/faq.schema";
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
        const faq = await faqService.getFaqById(id);
        if (!faq) {
            return NextResponse.json(
                { error: "FAQ não encontrada" },
                { status: 404 }
            );
        }
        return NextResponse.json(faq);
    } catch (error) {
        console.error("Error getting FAQ:", error);
        return NextResponse.json(
            { error: "Erro ao buscar FAQ" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const forbidden = await blockForbiddenRequests(req, allowedRoles.PUT);
        if (forbidden) {
            return forbidden;
        }

        const { id } = await params;
        const body = await req.json();
        const parsed = updateFaqSchema.safeParse(body);

        if (!parsed.success) {
            return returnInvalidDataErrors(parsed.error);
        }

        const updated = await faqService.updateFaq(id, parsed.data);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar FAQ" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const forbidden = await blockForbiddenRequests(req, allowedRoles.DELETE);
        if (forbidden) {
            return forbidden;
        }

        const { id } = await params;
        await faqService.deleteFaq(id);
        return NextResponse.json({ message: "FAQ deletada com sucesso" });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return NextResponse.json(
            { error: "Erro ao deletar FAQ" },
            { status: 500 }
        );
    }
}
