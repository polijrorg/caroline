import { NextResponse } from "next/server";
import { prisma } from "@/generated/prisma";

export async function GET() {
    try {
        const aulas = await prisma.aula.findMany({
            include: {
                modulo: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(aulas);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar aulas" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { titulo, conteudo, moduloId } = body;

        if (!titulo || !moduloId) {
            return NextResponse.json({ error: "Titulo e modulo sao obrigatórios" }, { status: 400 });
        }

        const aula = await prisma.aula.create({
            data: { titulo, conteudo, moduloId },
        });

        return NextResponse.json(aula, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar aula" }, { status: 500 });
    }
}
