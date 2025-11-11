"use client";

interface VideoAulaFormProps {
  conteudo: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function VideoAulaForm({ conteudo, onChange, disabled }: VideoAulaFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
          URL do Vídeo <span className="text-red-500">*</span>
        </label>
        <input
          id="videoUrl"
          type="url"
          value={conteudo}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          required
          disabled={disabled}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Suporta YouTube, Vimeo e outros serviços de vídeo
        </p>
      </div>

      {conteudo && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-2">📹</div>
              <div className="text-sm">{conteudo}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
