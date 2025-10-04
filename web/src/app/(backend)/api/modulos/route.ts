import { NextRequest, NextResponse } from 'next/server'
import { createModuloSchema } from '../../schemas/modulos.schema'
import * as moduloService from "../../services/modulos/modulos"

export async function GET() {
    const modulos = await moduloService.getAllModulos();
    return NextResponse.json(modulos);
}


export async function POST(req: Request) {
    const body = await req.json();
    const parsed = createModuloSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const modulo = await moduloService.createModulo(parsed.data);
    return NextResponse.json(modulo, { status: 201 });
}
