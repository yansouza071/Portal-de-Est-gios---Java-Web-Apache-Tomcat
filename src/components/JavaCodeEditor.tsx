import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  FileCode, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Zap,
  Info
} from 'lucide-react';
import { ORIGINAL_JAVA_CODE } from '../data/defaultCode';

interface JavaCodeEditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  onCompileAndRun: () => void;
  onResetCode: () => void;
  isCompiling: boolean;
  error?: string;
}

export const JavaCodeEditor: React.FC<JavaCodeEditorProps> = ({
  code,
  onChangeCode,
  onCompileAndRun,
  onResetCode,
  isCompiling,
  error
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertSnippet = (snippet: 'cyber' | 'design' | 'ia') => {
    let snippetHtml = '';
    if (snippet === 'cyber') {
      snippetHtml = `        out.println("<hr><h2>Estágio em Segurança da Informação</h2>");
        out.println("<p>Empresa: CyberShield Tech</p>");
        out.println("<p>Bolsa: R$ 1.500,00</p>");`;
    } else if (snippet === 'design') {
      snippetHtml = `        out.println("<hr><h2>Estágio em UI/UX Design</h2>");
        out.println("<p>Empresa: Creative Labs</p>");
        out.println("<p>Bolsa: R$ 1.150,00</p>");`;
    } else if (snippet === 'ia') {
      snippetHtml = `        out.println("<hr><h2>Estágio em Inteligência Artificial & LLMs</h2>");
        out.println("<p>Empresa: NextGen AI</p>");
        out.println("<p>Bolsa: R$ 1.800,00</p>");`;
    }

    // Insert right before out.println("</body></html>");
    if (code.includes('out.println("</body></html>");')) {
      const updated = code.replace(
        'out.println("</body></html>");',
        `${snippetHtml}\n        out.println("</body></html>");`
      );
      onChangeCode(updated);
    } else {
      onChangeCode(code + '\n' + snippetHtml);
    }
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Editor Top Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-white">VagasServlet.java</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Jakarta Servlet 6.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              src/main/java/br/com/portal/VagasServlet.java
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition border border-slate-700"
            title="Restaurar código do exercício original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Original</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={onCompileAndRun}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isCompiling ? 'animate-spin' : ''}`} />
            <span>{isCompiling ? 'Compilando...' : 'Compilar no Tomcat'}</span>
          </button>
        </div>
      </div>

      {/* Quick Snippet Bar */}
      <div className="bg-slate-950/70 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium">Inserir vaga rapidamente:</span>
          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={() => insertSnippet('cyber')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px]"
            >
              + Seg. Informação (R$ 1.500)
            </button>
            <button
              onClick={() => insertSnippet('design')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px]"
            >
              + UI/UX (R$ 1.150)
            </button>
            <button
              onClick={() => insertSnippet('ia')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px]"
            >
              + IA & LLMs (R$ 1.800)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {error ? (
            <span className="flex items-center gap-1 text-red-400 font-mono text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> Erro de compilação
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Compilação OK (javac 17)
            </span>
          )}
        </div>
      </div>

      {/* Code Textarea with Line Numbers */}
      <div className="relative flex flex-1 min-h-[500px] font-mono text-xs bg-slate-950 overflow-hidden">
        {/* Line Numbers Column */}
        <div className="select-none py-4 px-3 bg-slate-950/80 text-slate-600 border-r border-slate-800 text-right font-mono min-w-[3rem]">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Editor Input Area */}
        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full bg-slate-950 text-slate-200 p-4 font-mono leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-amber-500/30 selection:text-white overflow-x-auto whitespace-pre"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Explanation Banner */}
      <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Como funciona o Servlet:</strong> O Tomcat recebe a requisição HTTP GET para a rota configurada em <code className="text-amber-300">@WebServlet("/vagas")</code>, instancia a classe <code className="text-amber-300">VagasServlet</code> e chama o método <code className="text-amber-300">doGet()</code>. A resposta HTML é enviada linha por linha via stream do <code className="text-amber-300">PrintWriter</code>.
        </p>
      </div>
    </div>
  );
};
