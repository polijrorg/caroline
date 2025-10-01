import { NextResponse } from 'next/server'
import { prisma } from '@/app/(backend)/services/db'

export async function GET() {
    const modulos = await prisma.modulo.findMany()
    return NextResponse.json(modulos)
}


export async function POST(request: Request) {
    const data = await request.json()
    const novoModulo = await prisma.modulo.create({ data })
    return NextResponse.json(novoModulo, { status: 201 })
}
