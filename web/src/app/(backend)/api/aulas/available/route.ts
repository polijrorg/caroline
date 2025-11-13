import { NextRequest, NextResponse } from "next/server";
import { getAvailableAulasForUser } from "@/backend/services/aulas/aulas";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Buscar a data de criação do usuário
        const user = session.user;
        
        if (!user.createdAt) {
            return NextResponse.json(
                { error: "Data de criação do usuário não encontrada" },
                { status: 400 }
            );
        }

        const aulas = await getAvailableAulasForUser(new Date(user.createdAt));
        return NextResponse.json(aulas);
    } catch (error) {
        console.error("Error getting available aulas:", error);
        return NextResponse.json(
            { error: "Erro ao buscar aulas disponíveis" },
            { status: 500 }
        );
    }
}
