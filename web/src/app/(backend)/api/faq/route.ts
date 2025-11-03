import { NextRequest, NextResponse } from "next/server";
import * as faqService from "../../services/faq/faq";
import { createFaqSchema } from "../../schemas/faq.schema";
import { blockForbiddenRequests, returnInvalidDataErrors } from "@/utils/api";
import { AllowedRoutes } from "@/types";

const allowedRoles: AllowedRoutes = {
    GET: [], // Público - todos podem ver
    POST: ["SUPER_ADMIN", "ADMIN"]
};

export async function GET(request: NextRequest) {
    try {
        const faqs = await faqService.getAllFaqs();
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Error getting FAQs:", error);
        return NextResponse.json(
            { error: "Erro ao buscar FAQs" },
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
            body.ordem = await faqService.getNextOrdem();
        }

        const parsed = createFaqSchema.safeParse(body);

        if (!parsed.success) {
            return returnInvalidDataErrors(parsed.error);
        }

        const faq = await faqService.createFaq(parsed.data);
        return NextResponse.json(faq, { status: 201 });
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return NextResponse.json(
            { error: "Erro ao criar FAQ" },
            { status: 500 }
        );
    }
}
