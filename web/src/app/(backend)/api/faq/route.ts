import { NextRequest, NextResponse } from "next/server";
import * as moduloService from "../../services/faq/faq"
import { createFaqSchema } from "../../schemas/faq.schema"

export async function GET() {
    const faqs = await moduloService.getAllFaqs();
    return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = createFaqSchema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }
    try {
        const updated = await moduloService.createFaq(parsed.data);
        return NextResponse.json(updated, { status: 201 });
    }
    catch {
        return NextResponse.json({ error: "Erro ao criar um faq" }, { status: 500 })
    }
}
