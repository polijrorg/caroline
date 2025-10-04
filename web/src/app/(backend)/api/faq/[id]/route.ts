import { NextRequest, NextResponse } from "next/server";
import * as moduloService from "../../services/faq/faq"
import { updateFaqSchema } from "../../schemas/faq.schema"

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const faq = await moduloService.getFaqById(id);
    if (!faq) return NextResponse.json({ error: "FAQ não encontrada" }, { status: 404 })
    return NextResponse.json(faq);
}

export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateFaqSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }
    try {
        const updated = await moduloService.updateFaq(id, parsed.data);
        return NextResponse.json(updated);
    }
    catch {
        return NextResponse.json({ error: "Erro ao atualizar módulo" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    await moduloService.deleteFaq(id);
    return NextResponse.json({ message: "FAQ deletada com sucesso" });
}
