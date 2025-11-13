"use client";

import { TipoAula } from "@/types/modulos-aulas";
import { VideoAulaForm } from "./VideoAulaForm";
import { TextoAulaForm } from "./TextoAulaForm";
import { ExercicioAulaForm } from "./ExercicioAulaForm";

interface AulaContentEditorProps {
  tipo: TipoAula;
  conteudo: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AulaContentEditor({
  tipo,
  conteudo,
  onChange,
  disabled = false,
}: AulaContentEditorProps) {
  return (
    <div className="border-t pt-6">
      {tipo === TipoAula.VIDEO && (
        <VideoAulaForm conteudo={conteudo} onChange={onChange} disabled={disabled} />
      )}

      {tipo === TipoAula.MARKDOWN && (
        <TextoAulaForm conteudo={conteudo} onChange={onChange} disabled={disabled} />
      )}

      {tipo === TipoAula.EXERCICIO && (
        <ExercicioAulaForm conteudo={conteudo} onChange={onChange} disabled={disabled} />
      )}
    </div>
  );
}
