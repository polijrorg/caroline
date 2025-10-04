import { NextRequest, NextResponse } from "next/server";
import { createAulaSchema } from "../../schemas/aulas.schema";
import * as aulaServivice from "../../services/aulas/aulas";

export async function GET() {
    const aulas = await aulaServivice.getAllAulas();
    return NextResponse.json(aulas);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = createAulaSchema.parse(body);

        const aula = await aulaServivice.createAula(parsed);

        return NextResponse.json(aula, { status: 201 });
    }

    catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
