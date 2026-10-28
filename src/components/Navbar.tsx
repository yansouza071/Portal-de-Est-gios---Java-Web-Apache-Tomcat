import React from 'react';
import { 
  Server, 
  Download, 
  Play, 
  FileCode, 
  FolderTree, 
  BookOpen, 
  Globe, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'browser' | 'editor' | 'files' | 'guide';
  setActiveTab: (tab: 'browser' | 'editor' | 'files' | 'guide') => void;
  onRestartTomcat: () => void;
  onDownloadZip: () => void;
  isRestarting: boolean;
  totalVagas: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onRestartTomcat,
  onDownloadZip,
  isRestarting,
  totalVagas
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-xl">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">Portal de Estágios</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Java Servlet • Tomcat
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Exercício Servlet: Consulta de Vaga de Estágio (Jakarta EE)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('browser')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'browser'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Navegador Tomcat</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'browser' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'
              }`}>
                {totalVagas} vagas
              </span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'editor'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">VagasServlet.java</span>
              <span className="sm:hidden">Código</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'files'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span className="hidden md:inline">Projeto Maven</span>
              <span className="md:hidden">Arquivos</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guia Didático</span>
            </button>
          </nav>

          {/* Quick actions & Status */}
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono font-medium">Tomcat :8080 ATIVO</span>
            </div>

            <button
              onClick={onRestartTomcat}
              disabled={isRestarting}
              title="Reiniciar Tomcat e Recompilar Servlet"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRestarting ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>

            <button
              onClick={onDownloadZip}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 transition"
              title="Baixar projeto Maven completo pronto para Eclipse / IntelliJ / Tomcat"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar Projeto (.zip)</span>
              <span className="sm:hidden">.ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
