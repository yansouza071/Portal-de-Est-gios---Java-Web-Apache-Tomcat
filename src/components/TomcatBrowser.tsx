import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Lock, 
  Copy, 
  Check, 
  Code2, 
  Terminal, 
  Network, 
  Eye, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Info,
  Server
} from 'lucide-react';
import { ServletExecutionResult, TomcatLog, Vaga } from '../types';
import { ModernPortalView } from './ModernPortalView';

interface TomcatBrowserProps {
  currentUrl: string;
  setUrl: (url: string) => void;
  result: ServletExecutionResult;
  onRefresh: () => void;
  logs: TomcatLog[];
  onApply: (vaga: Vaga) => void;
  onOpenAddModal: () => void;
}

export const TomcatBrowser: React.FC<TomcatBrowserProps> = ({
  currentUrl,
  setUrl,
  result,
  onRefresh,
  logs,
  onApply,
  onOpenAddModal
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [viewMode, setViewMode] = useState<'classic' | 'modern'>('classic');
  const [copied, setCopied] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [devToolsTab, setDevToolsTab] = useState<'headers' | 'html' | 'console'>('headers');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(inputUrl);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Browser Window Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Window controls & navigation arrows */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="flex items-center gap-1 ml-2 text-slate-400">
            <button
              onClick={() => {
                setInputUrl('http://localhost:8080/PortalEstagios/vagas');
                setUrl('http://localhost:8080/PortalEstagios/vagas');
              }}
              className="p-1 hover:bg-slate-800 rounded transition"
              title="Voltar para rota do exercício"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-600 cursor-not-allowed">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onRefresh}
              className="p-1 hover:bg-slate-800 rounded transition text-slate-300 hover:text-white"
              title="Atualizar página (F5)"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* URL Address Bar */}
        <form onSubmit={handleNavigate} className="flex-1 max-w-2xl w-full">
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:border-amber-500">
            <div className="flex items-center gap-1.5 text-emerald-400 mr-2 shrink-0 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline font-mono">http://</span>
            </div>

            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-transparent font-mono text-slate-200 focus:outline-none text-xs"
              placeholder="http://localhost:8080/PortalEstagios/vagas"
            />

            <div className="flex items-center gap-2 ml-2 shrink-0">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  result.statusCode === 200
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {result.statusCode} {result.statusText}
              </span>

              <button
                type="button"
                onClick={copyUrlToClipboard}
                className="p-1 text-slate-400 hover:text-white rounded"
                title="Copiar URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </form>

        {/* DevTools Toggle Button */}
        <button
          onClick={() => setShowDevTools(!showDevTools)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
            showDevTools
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Tomcat DevTools</span>
          {showDevTools ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Sub-bar: View Mode Selector & Instructions */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Modo de Exibição:</span>
          <div className="inline-flex p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('classic')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                viewMode === 'classic'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visualização Clássica do Servlet (Exercício)</span>
            </button>
            <button
              onClick={() => setViewMode('modern')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                viewMode === 'modern'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Moderno Interativo</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Server className="w-3.5 h-3.5 text-amber-400" />
          <span>Tomcat 10.1 (Jakarta EE 10)</span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-300">Context: /PortalEstagios</span>
        </div>
      </div>

      {/* Main Browser Viewport */}
      <div className="p-4 sm:p-6 bg-slate-950/30 flex-1 min-h-[500px]">
        {result.statusCode === 404 ? (
          <div className="max-w-xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg font-sans">
            <div dangerouslySetInnerHTML={{ __html: result.html }} />
            <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center text-xs text-gray-600">
              <span>Dica: acesse a rota correta:</span>
              <button
                onClick={() => {
                  setInputUrl('http://localhost:8080/PortalEstagios/vagas');
                  setUrl('http://localhost:8080/PortalEstagios/vagas');
                }}
                className="px-3 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700"
              >
                Ir para /vagas
              </button>
            </div>
          </div>
        ) : viewMode === 'classic' ? (
          /* CLASSIC RENDER: EXACT OUTPUT EXPECTED BY PROFESSOR / EXERCISE */
          <div className="max-w-3xl mx-auto">
            {/* Academic Exercise Validation Banner */}
            <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  Validação do Exercício Acadêmico:
                </p>
                <p className="mt-0.5 text-slate-300">
                  O navegador abaixo está renderizando exatamente as linhas emitidas pelo seu 
                  <code className="text-amber-300 mx-1">PrintWriter out = response.getWriter()</code> 
                  no método <code className="text-amber-300 mx-1">doGet(...)</code>. Título "Portal de Estágios", apresentação e as 3 vagas solicitadas com Tech Solutions, InfoTech e Data Solutions.
                </p>
              </div>
            </div>

            {/* Simulated Clean White Browser Page with Classic HTML */}
            <div className="bg-white text-gray-900 p-8 sm:p-12 rounded-xl shadow-xl font-serif min-h-[400px] border border-gray-200">
              {/* We render the exact HTML generated by the servlet */}
              <div 
                className="classic-servlet-output"
                dangerouslySetInnerHTML={{ __html: result.html }}
              />
            </div>
          </div>
        ) : (
          /* MODERN INTERACTIVE PORTAL VIEW */
          <div className="max-w-6xl mx-auto">
            <ModernPortalView
              vagas={result.vagasParsed}
              onApply={onApply}
              onOpenAddModal={onOpenAddModal}
            />
          </div>
        )}
      </div>

      {/* DevTools Drawer (Headers, HTML Source, Catalina Logs) */}
      {showDevTools && (
        <div className="bg-slate-950 border-t border-slate-800 text-xs">
          {/* DevTools tabs */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDevToolsTab('headers')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded font-mono ${
                  devToolsTab === 'headers'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>HTTP Headers (Response)</span>
              </button>

              <button
                onClick={() => setDevToolsTab('html')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded font-mono ${
                  devToolsTab === 'html'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>HTML Gerado (Raw)</span>
              </button>

              <button
                onClick={() => setDevToolsTab('console')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded font-mono ${
                  devToolsTab === 'console'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>catalina.out (Logs Tomcat)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </button>
            </div>

            <button
              onClick={() => setShowDevTools(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕ Fechar
            </button>
          </div>

          {/* DevTools Content */}
          <div className="p-4 max-h-64 overflow-y-auto font-mono">
            {devToolsTab === 'headers' && (
              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                    Status da Linha de Resposta
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      HTTP/1.1 {result.statusCode} {result.statusText}
                    </span>
                    <span className="text-slate-400">Tempo de resposta: ~12ms</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                    Response Headers
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div><span className="text-amber-400">Content-Type:</span> text/html;charset=UTF-8</div>
                    <div><span className="text-amber-400">Server:</span> Apache-Coyote/1.1 (Tomcat 10.1)</div>
                    <div><span className="text-amber-400">Content-Length:</span> {new Blob([result.html]).size} bytes</div>
                    <div><span className="text-amber-400">Date:</span> {new Date().toUTCString()}</div>
                    <div><span className="text-amber-400">Connection:</span> keep-alive</div>
                    <div><span className="text-amber-400">X-Servlet-Engine:</span> Jakarta Servlet 6.0</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                    Request Headers
                  </span>
                  <div className="text-slate-400 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div>GET /PortalEstagios{result.endpoint} HTTP/1.1</div>
                    <div>Host: localhost:8080</div>
                    <div>User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)</div>
                    <div>Accept: text/html,application/xhtml+xml,application/xml;q=0.9</div>
                    <div>Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8</div>
                  </div>
                </div>
              </div>
            )}

            {devToolsTab === 'html' && (
              <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 text-xs overflow-x-auto whitespace-pre">
                {result.html}
              </pre>
            )}

            {devToolsTab === 'console' && (
              <div className="space-y-1 text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2">
                    <span className="text-slate-500">{log.timestamp}</span>
                    <span
                      className={`font-bold px-1 rounded text-[10px] ${
                        log.level === 'SEVERE'
                          ? 'bg-red-500/20 text-red-400'
                          : log.level === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
