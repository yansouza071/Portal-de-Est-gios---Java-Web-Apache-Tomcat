import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Terminal, 
  AlertTriangle, 
  Globe, 
  Lightbulb, 
  Laptop,
  ArrowRight
} from 'lucide-react';

export const EducationalGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Programação Web • Atividade Prática Página 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Guia de Estudo: Exercício Servlet de Vagas de Estágio
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
          Entenda todos os conceitos teóricos e práticos exigidos no exercício de Java Web com Apache Tomcat,
          desde o funcionamento do protocolo HTTP até a anotação <code className="text-amber-300">@WebServlet</code>.
        </p>
      </div>

      {/* Anatomy of the URL */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Globe className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">1. Anatomia da URL do Exercício</h2>
        </div>

        <p className="text-sm text-slate-300">
          O enunciado especifica: <span className="font-semibold text-white">"Ao acessar http://localhost:8080/PortalEstagios/vagas, o navegador deverá mostrar..."</span>. Veja o que cada pedaço significa:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto">
          <div className="flex items-center gap-1 text-slate-400 mb-3 pb-3 border-b border-slate-800">
            <span className="text-blue-400">http://</span>
            <span className="text-emerald-400">localhost</span>
            <span className="text-amber-400">:8080</span>
            <span className="text-purple-400">/PortalEstagios</span>
            <span className="text-rose-400">/vagas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">http://</span>
              <p className="text-slate-400 text-[11px]">Protocolo de transferência de hipertexto sem criptografia.</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">localhost</span>
              <p className="text-slate-400 text-[11px]">Endereço IP de loopback (127.0.0.1) apontando para o seu próprio computador.</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">:8080</span>
              <p className="text-slate-400 text-[11px]">Porta padrão de escuta HTTP do servidor web Apache Tomcat.</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">/PortalEstagios</span>
              <p className="text-slate-400 text-[11px]">Context Path (contexto da aplicação implantada no Tomcat, nome do .war).</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">/vagas</span>
              <p className="text-slate-400 text-[11px]">Servlet Path configurado na anotação @WebServlet("/vagas").</p>
            </div>
          </div>
        </div>
      </div>

      {/* Line-by-line Code Explanation */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Layers className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">2. Explicação Linha a Linha do VagasServlet.java</h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
            <code className="text-amber-300 font-mono shrink-0 font-bold">@WebServlet("/vagas")</code>
            <p className="text-slate-300">
              Anotação do Jakarta EE que registra a classe como um Servlet e define o padrão de URL atendido. Dispensa a necessidade de configurar manualmente as tags <code className="text-slate-400">&lt;servlet&gt;</code> e <code className="text-slate-400">&lt;servlet-mapping&gt;</code> no arquivo <code className="text-slate-300">web.xml</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
            <code className="text-amber-300 font-mono shrink-0 font-bold">extends HttpServlet</code>
            <p className="text-slate-300">
              Ao herdar de <code className="text-amber-300">HttpServlet</code>, a classe ganha os métodos especializados do protocolo HTTP, como <code className="text-slate-300">doGet</code>, <code className="text-slate-300">doPost</code>, <code className="text-slate-300">doPut</code> e <code className="text-slate-300">doDelete</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
            <code className="text-amber-300 font-mono shrink-0 font-bold">doGet(req, resp)</code>
            <p className="text-slate-300">
              Método chamado pelo Tomcat sempre que uma requisição HTTP <strong className="text-white">GET</strong> chega à URL <code className="text-slate-300">/vagas</code> (por exemplo, quando o usuário digita a URL na barra de endereços do navegador e aperta Enter).
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
            <code className="text-amber-300 font-mono shrink-0 font-bold">response.setContentType(...)</code>
            <p className="text-slate-300">
              <strong className="text-white">Crucial para o idioma Português:</strong> define o MIME type como <code className="text-slate-300">text/html</code> e a codificação como <code className="text-slate-300">UTF-8</code>. Sem essa linha, palavras como <em>"Estágio"</em>, <em>"Técnico"</em> e <em>"disponíveis"</em> apareceriam com caracteres corrompidos (<code className="text-red-400">Estgio</code>).
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
            <code className="text-amber-300 font-mono shrink-0 font-bold">PrintWriter out</code>
            <p className="text-slate-300">
              Obtido através de <code className="text-amber-300">response.getWriter()</code>. É o fluxo de saída de caracteres de texto que envia a resposta diretamente para o navegador do cliente através da conexão TCP/IP aberta.
            </p>
          </div>
        </div>
      </div>

      {/* Difference: javax vs jakarta */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Lightbulb className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">3. Importante: Pacote jakarta.* vs javax.*</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          No código do seu exercício está sendo utilizado o pacote <code className="text-amber-300 font-mono">jakarta.servlet.*</code>. Essa é a especificação moderna gerenciada pela Fundação Eclipse (Jakarta EE 9, 10 e 11).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-400 mb-1">jakarta.servlet.* (Usado aqui)</h4>
            <p className="text-slate-400">
              Compatível com <strong className="text-white">Apache Tomcat 10.x e 11.x</strong>. É o padrão oficial atual do Java corporativo.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-400 mb-1">javax.servlet.* (Legado)</h4>
            <p className="text-slate-400">
              Compatível apenas com <strong className="text-white">Apache Tomcat 9.x e anteriores</strong>. Se o laboratório da sua faculdade usar Tomcat 9, você apenas troca <code className="text-slate-300">jakarta</code> por <code className="text-slate-300">javax</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Step by step to run in Eclipse / IntelliJ / VS Code */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Laptop className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">4. Passo a Passo para Rodar na sua Máquina</h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
            <div>
              <p className="font-semibold text-white">Baixar o projeto pré-configurado:</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Clique no botão superior <strong className="text-amber-300">"Baixar Projeto (.zip)"</strong> para obter a pasta com o <code className="text-slate-300">pom.xml</code>, o <code className="text-slate-300">VagasServlet.java</code> e a estrutura completa de pastas Maven.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
            <div>
              <p className="font-semibold text-white">Importar na sua IDE (Eclipse ou IntelliJ):</p>
              <p className="text-slate-400 text-xs mt-0.5">
                No Eclipse: vá em <strong className="text-slate-200">File &gt; Import... &gt; Existing Maven Projects</strong> e selecione a pasta extraída.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
            <div>
              <p className="font-semibold text-white">Executar no Apache Tomcat 10:</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Clique com o botão direito no projeto ou na classe <code className="text-slate-300">VagasServlet.java</code> &gt; <strong className="text-slate-200">Run As &gt; Run on Server</strong> &gt; Selecione o Tomcat 10.1 &gt; Finish.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
            <div>
              <p className="font-semibold text-white">Acessar no navegador:</p>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 mt-1">
                http://localhost:8080/PortalEstagios/vagas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
