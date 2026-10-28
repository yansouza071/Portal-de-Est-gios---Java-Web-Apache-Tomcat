/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ORIGINAL_JAVA_CODE } from './data/defaultCode';
import { executeJavaServlet } from './utils/servletEngine';
import { downloadJavaProjectZip } from './utils/zipExporter';
import { TomcatLog, Vaga } from './types';
import { Navbar } from './components/Navbar';
import { TomcatBrowser } from './components/TomcatBrowser';
import { JavaCodeEditor } from './components/JavaCodeEditor';
import { ProjectFilesViewer } from './components/ProjectFilesViewer';
import { EducationalGuide } from './components/EducationalGuide';
import { ApplicationModal } from './components/ApplicationModal';
import { AddVagaModal } from './components/AddVagaModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'browser' | 'editor' | 'files' | 'guide'>('browser');
  const [javaCode, setJavaCode] = useState<string>(ORIGINAL_JAVA_CODE);
  const [currentUrl, setCurrentUrl] = useState<string>('http://localhost:8080/PortalEstagios/vagas');
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [selectedVagaToApply, setSelectedVagaToApply] = useState<Vaga | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Initial realistic Tomcat logs
  const [logs, setLogs] = useState<TomcatLog[]>([
    {
      id: 'log-1',
      timestamp: '16:04:12.102',
      level: 'INFO',
      message: 'org.apache.catalina.startup.VersionLoggerListener.log Server version name: Apache Tomcat/10.1.20',
    },
    {
      id: 'log-2',
      timestamp: '16:04:12.185',
      level: 'INFO',
      message: 'org.apache.catalina.core.StandardService.startInternal Starting service [Catalina]',
    },
    {
      id: 'log-3',
      timestamp: '16:04:12.340',
      level: 'INFO',
      message: 'org.apache.catalina.startup.HostConfig.deployWAR Deploying web application archive [/opt/tomcat/webapps/PortalEstagios.war]',
    },
    {
      id: 'log-4',
      timestamp: '16:04:12.510',
      level: 'INFO',
      message: 'org.apache.catalina.core.ApplicationContext.log Initializing Jakarta Servlet [br.com.portal.VagasServlet] mapped to [/vagas]',
    },
    {
      id: 'log-5',
      timestamp: '16:04:12.720',
      level: 'INFO',
      message: 'org.apache.coyote.http11.Http11NioProtocol.start Starting ProtocolHandler ["http-nio-8080"]',
    },
    {
      id: 'log-6',
      timestamp: '16:04:12.801',
      level: 'INFO',
      message: 'org.apache.catalina.startup.Catalina.start Server startup in [699] milliseconds',
    },
    {
      id: 'log-7',
      timestamp: '16:04:13.010',
      level: 'INFO',
      message: 'GET /PortalEstagios/vagas HTTP/1.1 -> 200 OK (Content-Type: text/html;charset=UTF-8) [14ms]',
    },
  ]);

  // Extract path from currentUrl
  const extractedPath = useMemo(() => {
    try {
      if (currentUrl.startsWith('http://') || currentUrl.startsWith('https://')) {
        const parsed = new URL(currentUrl);
        // Remove /PortalEstagios prefix if present
        let pathname = parsed.pathname;
        if (pathname.startsWith('/PortalEstagios')) {
          pathname = pathname.replace('/PortalEstagios', '');
        }
        return pathname || '/';
      }
      return currentUrl;
    } catch {
      return '/vagas';
    }
  }, [currentUrl]);

  // Execute servlet
  const executionResult = useMemo(() => {
    return executeJavaServlet(javaCode, extractedPath);
  }, [javaCode, extractedPath]);

  // Handle URL change with log
  const handleUrlChange = (newUrl: string) => {
    setCurrentUrl(newUrl);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + now.getMilliseconds();
    
    // Calculate what status it will produce
    let path = newUrl;
    try {
      if (newUrl.startsWith('http')) {
        path = new URL(newUrl).pathname;
        if (path.startsWith('/PortalEstagios')) path = path.replace('/PortalEstagios', '');
      }
    } catch {}

    const res = executeJavaServlet(javaCode, path);
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        level: res.statusCode === 200 ? 'INFO' : 'WARN',
        message: `GET /PortalEstagios${path} HTTP/1.1 -> ${res.statusCode} ${res.statusText} [${Math.floor(8 + Math.random() * 15)}ms]`,
      },
    ]);
  };

  // Restart Tomcat & Recompile
  const handleRestartTomcat = () => {
    setIsRestarting(true);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + now.getMilliseconds();

    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-stop`,
        timestamp: timeStr,
        level: 'INFO',
        message: 'Stopping ProtocolHandler ["http-nio-8080"]... Context /PortalEstagios reloaded.',
      },
      {
        id: `log-${Date.now()}-javac`,
        timestamp: timeStr,
        level: 'INFO',
        message: 'javac -cp jakarta.servlet-api-6.0.0.jar br/com/portal/VagasServlet.java -> Compilation Successful.',
      },
      {
        id: `log-${Date.now()}-start`,
        timestamp: timeStr,
        level: 'INFO',
        message: 'Tomcat 10.1 context [/PortalEstagios] initialized. Servlet mapped to [/vagas] ready.',
      },
    ]);

    setTimeout(() => {
      setIsRestarting(false);
    }, 700);
  };

  // Download project ZIP
  const handleDownloadZip = async () => {
    await downloadJavaProjectZip(javaCode);
  };

  // Add new internship code dynamically
  const handleAddVagaToCode = (cargo: string, empresa: string, bolsa: string) => {
    const snippetHtml = `        out.println("<hr><h2>${cargo}</h2>");
        out.println("<p>Empresa: ${empresa}</p>");
        out.println("<p>Bolsa: ${bolsa}</p>");`;

    let updatedCode = javaCode;
    if (updatedCode.includes('out.println("</body></html>");')) {
      updatedCode = updatedCode.replace(
        'out.println("</body></html>");',
        `${snippetHtml}\n        out.println("</body></html>");`
      );
    } else {
      updatedCode += '\n' + snippetHtml;
    }

    setJavaCode(updatedCode);
    handleRestartTomcat();
  };

  const handleResetCode = () => {
    setJavaCode(ORIGINAL_JAVA_CODE);
    handleRestartTomcat();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRestartTomcat={handleRestartTomcat}
        onDownloadZip={handleDownloadZip}
        isRestarting={isRestarting}
        totalVagas={executionResult.vagasParsed.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'browser' && (
          <TomcatBrowser
            currentUrl={currentUrl}
            setUrl={handleUrlChange}
            result={executionResult}
            onRefresh={handleRestartTomcat}
            logs={logs}
            onApply={(vaga) => setSelectedVagaToApply(vaga)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'editor' && (
          <JavaCodeEditor
            code={javaCode}
            onChangeCode={setJavaCode}
            onCompileAndRun={handleRestartTomcat}
            onResetCode={handleResetCode}
            isCompiling={isRestarting}
            error={executionResult.error}
          />
        )}

        {activeTab === 'files' && (
          <ProjectFilesViewer
            currentJavaCode={javaCode}
            onDownloadZip={handleDownloadZip}
          />
        )}

        {activeTab === 'guide' && (
          <EducationalGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Portal de Estágios • Simulação Java Web (Jakarta Servlet 6.0 & Apache Tomcat 10.1)
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Desenvolvimento Web: Tech Solutions (R$ 1.200,00)</span>
            <span>•</span>
            <span>Suporte: InfoTech (R$ 1.000,00)</span>
            <span>•</span>
            <span>Dados: Data Solutions (R$ 1.300,00)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApplicationModal
        vaga={selectedVagaToApply}
        onClose={() => setSelectedVagaToApply(null)}
      />

      <AddVagaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVagaToCode={handleAddVagaToCode}
      />
    </div>
  );
}
