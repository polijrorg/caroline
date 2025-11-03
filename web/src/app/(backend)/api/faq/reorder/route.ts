import { NextRequest, NextResponse } from "next/server";
import { reorderFaqsSchema } from "../../../schemas/faq.schema";
import { reorderFaqs } from "../../../services/faq/faq";
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
        const validationResult = reorderFaqsSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult.error);
        }

        const faqs = await reorderFaqs(validationResult.data);
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Error reordering FAQs:", error);
        return NextResponse.json(
            { error: "Erro ao reordenar FAQs" },
            { status: 500 }
        );
    }
}
