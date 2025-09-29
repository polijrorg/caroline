import { NextResponse } from 'next/server'
import { prisma } from '@/app/(backend)/services/db'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const modulo = await prisma.modulo.findUnique({ where: { id: Number(params.id) } })
    if (!modulo) return NextResponse.json({ error: 'Módulo não encontrado' }, { status: 404 })
    return NextResponse.json(modulo)
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    const modulo = await prisma.modulo.update({
        where: { id: Number(params.id) },
        data
    })
    return NextResponse.json(modulo)
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    await prisma.modulo.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Módulo Deletado' })
}
