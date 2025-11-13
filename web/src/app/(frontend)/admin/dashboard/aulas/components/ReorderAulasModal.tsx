"use client";

import { useState, useMemo, useEffect } from "react";
import { X, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Aula, TipoAulaIcons } from "@/types/modulos-aulas";

interface ReorderAulasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (aulas: { id: string; ordem: number }[]) => Promise<void>;
  aulas: Aula[];
  diaDisponivel: number;
}

interface SortableAulaItemProps {
  aula: Aula;
  index: number;
}

function SortableAulaItem({ aula, index }: SortableAulaItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: aula.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:bg-gray-50"
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      <span className="text-sm font-semibold text-gray-500 w-8">{index + 1}</span>
      <span className="text-xl">{TipoAulaIcons[aula.tipo]}</span>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{aula.titulo}</h4>
      </div>
    </div>
  );
}

export function ReorderAulasModal({
  isOpen,
  onClose,
  onSubmit,
  aulas,
  diaDisponivel,
}: ReorderAulasModalProps) {
  const [sortedAulas, setSortedAulas] = useState<Aula[]>(aulas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Atualiza sortedAulas quando aulas prop mudar
  useEffect(() => {
    setSortedAulas(aulas);
  }, [aulas]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const aulaIds = useMemo(() => sortedAulas.map((aula) => aula.id), [sortedAulas]);

  if (!isOpen) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortedAulas((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const reorderedAulas = sortedAulas.map((aula, index) => ({
        id: aula.id,
        ordem: index + 1,
      }));

      await onSubmit(reorderedAulas);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao reordenar aulas");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSortedAulas(aulas);
      setError(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold">Reordenar Aulas</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dia {diaDisponivel} • {sortedAulas.length} aula{sortedAulas.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm mb-4">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-600 mb-4">
            Arraste as aulas para reordená-las. A ordem aqui define a sequência em que aparecem
            para os usuários.
          </p>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={aulaIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {sortedAulas.map((aula, index) => (
                  <SortableAulaItem key={aula.id} aula={aula} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="flex gap-3 justify-end p-6 pt-4 border-t bg-white rounded-b-lg flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : "Salvar Ordem"}
          </button>
        </div>
      </div>
    </div>
  );
}
