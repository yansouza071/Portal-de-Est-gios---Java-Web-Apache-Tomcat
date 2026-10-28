import React, { useState } from 'react';
import { 
  FolderTree, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code, 
  Package, 
  Folder, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { DEFAULT_POM_XML, DEFAULT_WEB_XML, DEFAULT_INDEX_HTML, DEFAULT_README } from '../data/defaultCode';

interface ProjectFilesViewerProps {
  currentJavaCode: string;
  onDownloadZip: () => void;
}

export const ProjectFilesViewer: React.FC<ProjectFilesViewerProps> = ({
  currentJavaCode,
  onDownloadZip
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('VagasServlet.java');
  const [copied, setCopied] = useState(false);

  const filesMap: Record<string, { path: string; language: string; content: string; desc: string }> = {
    'VagasServlet.java': {
      path: 'src/main/java/br/com/portal/VagasServlet.java',
      language: 'java',
      content: currentJavaCode,
      desc: 'Servlet Java principal com anotação @WebServlet("/vagas") e método doGet().',
    },
    'pom.xml': {
      path: 'pom.xml',
      language: 'xml',
      content: DEFAULT_POM_XML,
      desc: 'Arquivo de configuração Maven com dependência jakarta.servlet-api e plugin war.',
    },
    'web.xml': {
      path: 'src/main/webapp/WEB-INF/web.xml',
      language: 'xml',
      content: DEFAULT_WEB_XML,
      desc: 'Descritor de implantação Jakarta EE 6.0 e lista de boas-vindas.',
    },
    'index.html': {
      path: 'src/main/webapp/index.html',
      language: 'html',
      content: DEFAULT_INDEX_HTML,
      desc: 'Página inicial da raiz que redireciona automaticamente para a rota /vagas.',
    },
    'README.md': {
      path: 'README.md',
      language: 'markdown',
      content: DEFAULT_README,
      desc: 'Documentação do projeto, instruções de execução no Eclipse, IntelliJ, VS Code e Terminal.',
    },
  };

  const currentFileObj = filesMap[selectedFile];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentFileObj.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FolderTree className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Estrutura do Projeto Maven (Java Web)</h2>
            <p className="text-xs text-slate-400">
              Padrão oficial para empacotar em arquivo <code>.war</code> e implantar no Tomcat 10+
            </p>
          </div>
        </div>

        <button
          onClick={onDownloadZip}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition"
        >
          <Download className="w-4 h-4" />
          <span>Baixar Projeto Completo (.zip)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        {/* Project Tree Sidebar */}
        <div className="md:col-span-4 bg-slate-950/70 border-r border-slate-800 p-4 space-y-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Arquivos do Projeto</span>
            <span className="text-[10px] text-amber-400 font-mono">Maven WAR</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {/* Root Folder */}
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold py-1">
              <Folder className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>PortalEstagios/</span>
            </div>

            {/* pom.xml */}
            <button
              onClick={() => setSelectedFile('pom.xml')}
              className={`w-full text-left pl-6 pr-2 py-1.5 rounded flex items-center gap-2 transition ${
                selectedFile === 'pom.xml'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-orange-400" />
              <span>pom.xml</span>
            </button>

            {/* README.md */}
            <button
              onClick={() => setSelectedFile('README.md')}
              className={`w-full text-left pl-6 pr-2 py-1.5 rounded flex items-center gap-2 transition ${
                selectedFile === 'README.md'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>README.md</span>
            </button>

            {/* src/main/java folder */}
            <div className="pl-6 py-1 flex items-center gap-1.5 text-slate-400">
              <Folder className="w-3.5 h-3.5 text-slate-500" />
              <span>src/main/java/.../</span>
            </div>

            {/* VagasServlet.java */}
            <button
              onClick={() => setSelectedFile('VagasServlet.java')}
              className={`w-full text-left pl-10 pr-2 py-1.5 rounded flex items-center gap-2 transition ${
                selectedFile === 'VagasServlet.java'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>VagasServlet.java</span>
            </button>

            {/* src/main/webapp */}
            <div className="pl-6 py-1 flex items-center gap-1.5 text-slate-400">
              <Folder className="w-3.5 h-3.5 text-slate-500" />
              <span>src/main/webapp/</span>
            </div>

            {/* index.html */}
            <button
              onClick={() => setSelectedFile('index.html')}
              className={`w-full text-left pl-10 pr-2 py-1.5 rounded flex items-center gap-2 transition ${
                selectedFile === 'index.html'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span>index.html</span>
            </button>

            {/* web.xml */}
            <button
              onClick={() => setSelectedFile('web.xml')}
              className={`w-full text-left pl-10 pr-2 py-1.5 rounded flex items-center gap-2 transition ${
                selectedFile === 'web.xml'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>WEB-INF/web.xml</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-400" />
                Como o Tomcat carrega:
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ao gerar o arquivo <code className="text-amber-300">PortalEstagios.war</code>, o Apache Tomcat extrai as classes compiladas em <code className="text-slate-300">WEB-INF/classes</code> e escaneia anotações como <code className="text-amber-300">@WebServlet</code> automaticamente.
              </p>
            </div>
          </div>
        </div>

        {/* File Content Preview */}
        <div className="md:col-span-8 flex flex-col bg-slate-950">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-white">{currentFileObj.path}</span>
              <p className="text-[11px] text-slate-400">{currentFileObj.desc}</p>
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <pre className="flex-1 p-4 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre bg-slate-950 leading-relaxed">
            {currentFileObj.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
