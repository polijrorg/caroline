import { NextRequest, NextResponse } from "next/server";
import * as moduloService from "../../services/aulasFavoritas/aulasFavoritas";
import { createAulaFavoritaSchema } from "../../schemas/aulasFavoritas.schema";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId)
        return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 });

    const favoritas = await moduloService.getAllFavoritasByUser(userId);
    return NextResponse.json(favoritas);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const parsed = createAulaFavoritaSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(parsed.error.issues, { status: 400 });
    }
    try {
        const favorita = await moduloService.addAulaFavorita(parsed.data);
        return NextResponse.json(favorita, { status: 201 });
    }
    catch {
        return NextResponse.json({ error: "Erro ao adicionar aos favoritos" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const aulaId = searchParams.get("aulaId");

    if (!userId || !aulaId)
        return NextResponse.json({ error: "userId e aulaId são obrigatórios" }, { status: 400 });

    try {
        await moduloService.removeAulaFavorita(userId, aulaId);
        return NextResponse.json({ message: "Removido com sucesso" });
    }
    catch {
        return NextResponse.json({ error: "Erro ao remover favorito" }, { status: 500 });
    }

}
