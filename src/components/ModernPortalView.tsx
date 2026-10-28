import React, { useState } from 'react';
import { Vaga } from '../types';
import { 
  Briefcase, 
  Building2, 
  CircleDollarSign, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle, 
  Sparkles, 
  Send,
  PlusCircle,
  TrendingUp,
  Award
} from 'lucide-react';

interface ModernPortalViewProps {
  vagas: Vaga[];
  onApply: (vaga: Vaga) => void;
  onOpenAddModal: () => void;
}

export const ModernPortalView: React.FC<ModernPortalViewProps> = ({
  vagas,
  onApply,
  onOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'default' | 'bolsa-desc' | 'bolsa-asc'>('default');

  // Filtered list
  const filteredVagas = vagas.filter((vaga) => {
    const matchesSearch =
      vaga.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaga.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaga.bolsa.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArea =
      selectedArea === 'todos' || vaga.area === selectedArea;

    return matchesSearch && matchesArea;
  }).sort((a, b) => {
    if (sortBy === 'bolsa-desc') return b.bolsaNumero - a.bolsaNumero;
    if (sortBy === 'bolsa-asc') return a.bolsaNumero - b.bolsaNumero;
    return 0;
  });

  // Calculate statistics
  const totalBolsa = vagas.reduce((acc, v) => acc + v.bolsaNumero, 0);
  const mediaBolsa = vagas.length > 0 ? totalBolsa / vagas.length : 0;
  const empresasUnicas = new Set(vagas.map((v) => v.empresa)).size;

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 p-6 sm:p-8 border border-slate-700/80 shadow-xl">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Oportunidades Universitárias em Aberto
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Portal de Estágios 2026
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Confira as oportunidades disponíveis para acelerar a sua carreira em Tecnologia, 
              Desenvolvimento de Software, Suporte Técnico e Engenharia de Dados.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Divulgar Nova Vaga</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-700/60">
          <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Vagas no Servlet</p>
              <p className="text-lg font-bold text-white">{vagas.length} ativas</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <CircleDollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Média das Bolsas</p>
              <p className="text-lg font-bold text-white">
                R$ {mediaBolsa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Empresas Contratando</p>
              <p className="text-lg font-bold text-white">{empresasUnicas} empresas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por cargo, empresa ou bolsa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setSelectedArea('todos')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                selectedArea === 'todos'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedArea('desenvolvimento')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                selectedArea === 'desenvolvimento'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Desenvolvimento Web
            </button>
            <button
              onClick={() => setSelectedArea('suporte')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                selectedArea === 'suporte'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Suporte Técnico
            </button>
            <button
              onClick={() => setSelectedArea('dados')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                selectedArea === 'dados'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Banco de Dados
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="default">Padrão</option>
            <option value="bolsa-desc">Maior Bolsa</option>
            <option value="bolsa-asc">Menor Bolsa</option>
          </select>
        </div>
      </div>

      {/* Vagas List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVagas.map((vaga) => {
          const areaBadgeColor =
            vaga.area === 'desenvolvimento'
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              : vaga.area === 'suporte'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : vaga.area === 'dados'
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              : 'bg-slate-700/30 text-slate-300 border-slate-600/30';

          return (
            <div
              key={vaga.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200"
            >
              <div>
                {/* Header with area and badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${areaBadgeColor}`}>
                    {vaga.area === 'desenvolvimento'
                      ? 'Desenvolvimento Web'
                      : vaga.area === 'suporte'
                      ? 'Suporte & Redes'
                      : vaga.area === 'dados'
                      ? 'Banco de Dados'
                      : 'Estágio TI'}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {vaga.cargaHoraria || '30h semanais'}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {vaga.cargo}
                </h3>

                {/* Company Name */}
                <div className="flex items-center gap-2 mt-1.5 text-sm font-medium text-slate-300">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>{vaga.empresa}</span>
                </div>

                {/* Compensation */}
                <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold text-base">
                  <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{vaga.bolsa}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {vaga.descricao}
                </p>

                {/* Requirements Pills */}
                {vaga.requisitos && (
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Requisitos:
                    </p>
                    <ul className="space-y-1">
                      {vaga.requisitos.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{vaga.localidade || 'São Paulo / SP'}</span>
                </div>

                <button
                  onClick={() => onApply(vaga)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Candidatar-se</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVagas.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">Nenhuma vaga encontrada</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Não foram encontradas oportunidades com os filtros atuais. Limpe a busca ou adicione uma nova vaga ao Servlet.
          </p>
        </div>
      )}
    </div>
  );
};
