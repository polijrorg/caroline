import { NextResponse } from "next/server";
import { prisma } from "@/generated/prisma"

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
    try {
        const aula = await prisma.aula.findUnique({
            where: { id: params.id },
            include: { modulo: true },
        });

        if (!aula) {
            return NextResponse.json({ error: "Aula não encontrada" }, { status: 404 });
        }

        return NextResponse.json(aula);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar aula" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const body = await req.json();
        const { titulo, conteudo, moduloId } = body;

        const aula = await prisma.aula.update({
            where: { id: params.id },
            data: { titulo, conteudo, moduloId },
        });

        return NextResponse.json(aula);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar aula" }, { status: 500 });
    }
}


export async function DELETE(_req: Request, { params }: Params) {
    try {
        await prisma.aula.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "Aula excluida com sucesso" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao excluir aula" }, { status: 500 });
    }
}
