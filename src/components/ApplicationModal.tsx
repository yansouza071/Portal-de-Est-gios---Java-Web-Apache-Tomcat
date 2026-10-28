import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Vaga } from '../types';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  CircleDollarSign, 
  GraduationCap, 
  User, 
  Mail, 
  FileText,
  Sparkles
} from 'lucide-react';

interface ApplicationModalProps {
  vaga: Vaga | null;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ vaga, onClose }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [periodo, setPeriodo] = useState('4º Semestre');
  const [mensagem, setMensagem] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!vaga) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Candidatura de Estágio</h3>
              <p className="text-xs text-slate-400">Portal de Estágios • Tomcat 10</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Candidatura Enviada!</h4>
              <p className="text-sm text-slate-300 mt-1">
                Sua inscrição para <strong className="text-amber-300">{vaga.cargo}</strong> na empresa <strong className="text-white">{vaga.empresa}</strong> foi registrada no banco de dados com sucesso.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2 text-slate-300 font-mono">
              <div><span className="text-slate-500">Candidato:</span> {nome}</div>
              <div><span className="text-slate-500">E-mail:</span> {email}</div>
              <div><span className="text-slate-500">Curso:</span> {curso} ({periodo})</div>
              <div><span className="text-slate-500">Bolsa Prevista:</span> {vaga.bolsa}</div>
              <div><span className="text-slate-500">Protocolo:</span> #{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20"
            >
              Concluir e Voltar ao Portal
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Job Summary Banner */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Vaga Selecionada
                </span>
                <p className="text-sm font-bold text-white">{vaga.cargo}</p>
                <div className="flex items-center gap-2 text-slate-400 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{vaga.empresa}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Bolsa</span>
                <span className="text-sm font-bold text-emerald-400">{vaga.bolsa}</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Carlos Silva de Oliveira"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  E-mail do Estudante *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos.silva@universidade.edu.br"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Curso Universitário / Técnico
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                      placeholder="Ex: Análise e Desenv. de Sistemas"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Semestre / Período
                  </label>
                  <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="1º Semestre">1º Semestre</option>
                    <option value="2º Semestre">2º Semestre</option>
                    <option value="3º Semestre">3º Semestre</option>
                    <option value="4º Semestre">4º Semestre</option>
                    <option value="5º Semestre">5º Semestre</option>
                    <option value="6º Semestre">6º Semestre</option>
                    <option value="7º Semestre ou mais">7º Semestre ou mais</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Por que você se interessa por esta vaga? (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Gostaria de aplicar meus conhecimentos práticos em Java e desenvolvimento web nesta oportunidade..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
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
                <Send className="w-3.5 h-3.5" />
                <span>Confirmar Inscrição</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
