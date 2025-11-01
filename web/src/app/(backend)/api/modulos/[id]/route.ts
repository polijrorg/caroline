import { NextRequest, NextResponse } from 'next/server'
import { updateModuloSchema } from '@/app/(backend)/schemas/modulos.schema'
import * as moduloService from '../../../services/modulos/modulos'


type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const modulo = await moduloService.getModuloById(id);
    if (!modulo) {
        return NextResponse.json({ error: "Módulo não encontrado" }, { status: 404 })
    }
    return NextResponse.json(modulo);
}


export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateModuloSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }
    try {
        const updated = await moduloService.updateModulo(id, parsed.data);
        return NextResponse.json(updated);
    }
    catch {
        return NextResponse.json({ error: "Erro ao atualizar módulo" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;

    try {
        await moduloService.deleteModulo(id);
        return NextResponse.json({ message: "Módulo deletado com sucesso" });
    }
    catch {
        return NextResponse.json({ error: "Erro ao deletar módulo" }, { status: 500 });
    }
}
