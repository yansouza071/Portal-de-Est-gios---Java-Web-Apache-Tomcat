import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  CircleDollarSign, 
  Briefcase, 
  Code2, 
  Sparkles,
  Info
} from 'lucide-react';

interface AddVagaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVagaToCode: (cargo: string, empresa: string, bolsa: string) => void;
}

export const AddVagaModal: React.FC<AddVagaModalProps> = ({
  isOpen,
  onClose,
  onAddVagaToCode,
}) => {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [bolsa, setBolsa] = useState('R$ 1.400,00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cargo.trim() || !empresa.trim() || !bolsa.trim()) return;

    onAddVagaToCode(cargo, empresa, bolsa);
    setCargo('');
    setEmpresa('');
    setBolsa('R$ 1.400,00');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Adicionar Vaga ao Servlet</h3>
              <p className="text-xs text-slate-400">Inserção dinâmica no VagasServlet.java</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Ao confirmar, os comandos <code className="text-amber-300 font-mono">out.println(...)</code> correspondentes serão adicionados automaticamente ao método <code className="text-amber-300 font-mono">doGet()</code> e o Tomcat será atualizado!
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Cargo / Título da Vaga *
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Ex: Estágio em Inteligência Artificial & Java"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Nome da Empresa Contratante *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Ex: InovaTech Soluções"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Valor da Bolsa-Auxílio *
              </label>
              <div className="relative">
                <CircleDollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={bolsa}
                  onChange={(e) => setBolsa(e.target.value)}
                  placeholder="Ex: R$ 1.500,00"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Code generation preview */}
            <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1 mb-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Preview do Código Gerado no Java
              </span>
              <pre className="font-mono text-[11px] text-amber-300/90 overflow-x-auto">
{`out.println("<hr><h2>${cargo || 'Estágio em ...'}</h2>");
out.println("<p>Empresa: ${empresa || 'Empresa ...'}</p>");
out.println("<p>Bolsa: ${bolsa || 'R$ 0,00'}</p>");`}
              </pre>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Inserir no Servlet & Compilar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
