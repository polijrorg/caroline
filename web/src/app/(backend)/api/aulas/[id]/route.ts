import { NextRequest, NextResponse } from "next/server";
import * as aulaService from "../../../services/aulas/aulas";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const aula = await aulaService.getAulaById(id);
    if (!aula) return NextResponse.json({ error: "Aula não encontrada" }, { status: 404 });

}

export async function PUT(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    await aulaService.createAula(id);
    return NextResponse.json({ message: "Aula criada " });
}


export async function DELETE(_req: Request, { params }: Params) {
    const { id } = await params;
    await aulaService.deleteAula(id);
    return NextResponse.json({ message: "Aula deletada " });

}

