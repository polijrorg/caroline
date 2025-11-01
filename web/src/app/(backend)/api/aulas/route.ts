import { NextRequest, NextResponse } from "next/server";
import { createAulaSchema } from "../../schemas/aulas.schema";
import * as aulaService from "../../services/aulas/aulas";

export async function GET() {
    const aulas = await aulaService.getAllAulas();
    return NextResponse.json(aulas);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const parsed = createAulaSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }
    try {
        const aula = await aulaService.createAula(parsed.data);
        return NextResponse.json(aula, { status: 201 });

    }

    catch {
        return NextResponse.json({ error: "Erro ao criar aua" }, { status: 400 });
    }
}
