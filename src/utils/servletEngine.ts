import { ServletExecutionResult, Vaga } from '../types';

export function executeJavaServlet(javaCode: string, currentPath: string): ServletExecutionResult {
  // 1. Basic syntax check simulation
  if (!javaCode.includes('public class VagasServlet')) {
    return {
      html: `<html><body><h1>500 Internal Server Error</h1><p>org.apache.jasper.JasperException: Class VagasServlet not found or invalid class declaration.</p></body></html>`,
      statusCode: 500,
      statusText: 'Internal Server Error',
      contentType: 'text/html;charset=UTF-8',
      endpoint: currentPath,
      vagasParsed: [],
      error: 'Erro de compilação: A classe pública VagasServlet deve ser declarada.',
    };
  }

  // 2. Extract WebServlet mapping
  const webServletMatch = javaCode.match(/@WebServlet\s*\(\s*["']([^"']+)["']\s*\)/);
  const mappedRoute = webServletMatch ? webServletMatch[1] : '/vagas';

  // Normalize requested path
  const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  
  // If requesting root or a different path that doesn't match mapped route
  if (normalizedPath !== mappedRoute && normalizedPath !== `${mappedRoute}/` && normalizedPath !== '') {
    return {
      html: `<!doctype html><html lang="en"><head><title>HTTP Status 404 – Not Found</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 404 – Not Found</h1><hr class="line" /><p><b>Type</b> Status Report</p><p><b>Message</b> The requested resource [${normalizedPath}] is not available</p><p><b>Description</b> The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.</p><hr class="line" /><h3>Apache Tomcat/10.1.20</h3></body></html>`,
      statusCode: 404,
      statusText: 'Not Found',
      contentType: 'text/html;charset=UTF-8',
      endpoint: normalizedPath,
      vagasParsed: [],
      error: `Rota não encontrada: o Servlet está mapeado em @WebServlet("${mappedRoute}"), mas foi acessado "${normalizedPath}".`,
    };
  }

  // 3. Extract println calls
  // Find lines with out.println(...) or out.print(...)
  const printRegex = /out\.print(?:ln)?\s*\((.*?)\)\s*;/g;
  let htmlAcc = '';
  let match: RegExpExecArray | null;

  while ((match = printRegex.exec(javaCode)) !== null) {
    const rawParam = match[1].trim();
    // evaluate string literal or concatenate string literals
    // Replace Java string quotes
    const evaluated = evaluateJavaString(rawParam);
    htmlAcc += evaluated + '\n';
  }

  // If no out.println was matched, try fallback extraction
  if (!htmlAcc.trim()) {
    htmlAcc = `<html><head><title>Portal de Estágios</title></head>
<body>
<h1>Portal de Estágios</h1>
<p>Nenhuma saída gerada pelo PrintWriter.</p>
</body></html>`;
  }

  // 4. Parse jobs from the HTML
  const parsedJobs = extractJobsFromHtml(htmlAcc);

  return {
    html: htmlAcc,
    statusCode: 200,
    statusText: 'OK',
    contentType: 'text/html;charset=UTF-8',
    endpoint: mappedRoute,
    vagasParsed: parsedJobs,
  };
}

function evaluateJavaString(param: string): string {
  // Handles expressions like "<html><head><title>Portal</title></head>"
  // or "Hello " + "world"
  try {
    // If it's a series of quoted strings separated by +, clean them
    const parts = param.split(/\s*\+\s*/);
    const resolved = parts.map(part => {
      part = part.trim();
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
        return part.slice(1, -1)
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t');
      }
      return part;
    }).join('');
    return resolved;
  } catch {
    return param;
  }
}

export function extractJobsFromHtml(html: string): Vaga[] {
  const vagas: Vaga[] = [];

  // Match:
  // <h2>...</h2>
  // <p>Empresa: ...</p>
  // <p>Bolsa: R$ ...</p>
  const vagaRegex = /<h2>\s*(?:Estágio em\s*)?([^<]+)<\/h2>\s*<p>\s*Empresa:\s*([^<]+)<\/p>\s*<p>\s*Bolsa:\s*([^<]+)<\/p>/gi;
  let match: RegExpExecArray | null;
  let index = 1;

  while ((match = vagaRegex.exec(html)) !== null) {
    const cargoRaw = match[1].trim();
    const cargo = cargoRaw.toLowerCase().startsWith('estágio em') ? cargoRaw : `Estágio em ${cargoRaw}`;
    const empresa = match[2].trim();
    const bolsa = match[3].trim();
    
    // Extract numerical value for sorting
    const numClean = bolsa.replace(/[^\d,]/g, '').replace(',', '.');
    const bolsaNumero = parseFloat(numClean) || 1000;

    // Detect area
    let area: Vaga['area'] = 'outros';
    const lowerCargo = cargo.toLowerCase();
    if (lowerCargo.includes('web') || lowerCargo.includes('desenvolvimento') || lowerCargo.includes('software') || lowerCargo.includes('frontend') || lowerCargo.includes('backend') || lowerCargo.includes('java')) {
      area = 'desenvolvimento';
    } else if (lowerCargo.includes('suporte') || lowerCargo.includes('help desk') || lowerCargo.includes('infra') || lowerCargo.includes('redes')) {
      area = 'suporte';
    } else if (lowerCargo.includes('dados') || lowerCargo.includes('banco') || lowerCargo.includes('sql') || lowerCargo.includes('bi')) {
      area = 'dados';
    }

    // Enrichment for realistic portal view
    let descricao = 'Oportunidade para estudantes aplicarem conhecimentos em ambiente prático com tutoria técnica.';
    let localidade = 'Híbrido - São Paulo / SP';
    let cargaHoraria = '30h semanais (6h/dia)';
    let requisitos = ['Cursando Ensino Superior ou Técnico', 'Boa comunicação', 'Vontade de aprender'];
    let beneficios = ['Bolsa-auxílio', 'Vale Refeição', 'Seguro de Vida', 'Possibilidade de Efetivação'];

    if (area === 'desenvolvimento') {
      descricao = 'Desenvolvimento de aplicações web, criação de servlets, interfaces dinâmicas e integração com APIs modernas.';
      requisitos = ['Cursando Ciência da Computação, Sistemas ou ADS', 'Conhecimentos em HTML/CSS/JS e Java', 'Lógica de programação orientada a objetos'];
      beneficios = ['Bolsa R$ 1.200,00', 'Vale Transporte', 'Recesso Remunerado', 'Trilhas de capacitação'];
    } else if (area === 'suporte') {
      descricao = 'Atendimento a usuários internos e externos, diagnóstico de hardware e sistemas operacionais, chamados de TI.';
      requisitos = ['Cursando Redes, TI ou áreas correlatas', 'Conhecimentos básicos de Windows, Linux e Redes TCP/IP', 'Paciência e foco no cliente'];
      beneficios = ['Bolsa R$ 1.000,00', 'Vale Refeição', 'Seguro contra Acidentes', 'Day-off no aniversário'];
    } else if (area === 'dados') {
      descricao = 'Modelagem relacional de dados, consultas SQL complexas, criação de relatórios e rotinas de ETL analítico.';
      requisitos = ['Cursando Estatística, Engenharia, ADS ou TI', 'Familiaridade com SQL (PostgreSQL/MySQL)', 'Pensamento analítico e detalhista'];
      beneficios = ['Bolsa R$ 1.300,00', 'Vale Alimentação', 'Flexibilidade de horário', 'Mentoria com DBAs sêniores'];
    }

    vagas.push({
      id: `vaga-${index++}`,
      cargo,
      empresa,
      bolsa,
      bolsaNumero,
      area,
      descricao,
      localidade,
      cargaHoraria,
      requisitos,
      beneficios
    });
  }

  // If regex failed to capture but there are 3 default ones
  if (vagas.length === 0) {
    return [
      {
        id: 'vaga-1',
        cargo: 'Estágio em Desenvolvimento Web',
        empresa: 'Tech Solutions',
        bolsa: 'R$ 1.200,00',
        bolsaNumero: 1200,
        area: 'desenvolvimento',
        descricao: 'Desenvolvimento de aplicações web, criação de servlets, interfaces dinâmicas e integração com APIs modernas.',
        localidade: 'Híbrido - São Paulo / SP',
        cargaHoraria: '30h semanais (6h/dia)',
        requisitos: ['Cursando Ciência da Computação, Sistemas ou ADS', 'Conhecimentos em HTML/CSS e Java', 'Lógica de programação'],
        beneficios: ['Bolsa R$ 1.200,00', 'Vale Transporte', 'Recesso Remunerado', 'Trilhas de capacitação']
      },
      {
        id: 'vaga-2',
        cargo: 'Estágio em Suporte Técnico',
        empresa: 'InfoTech',
        bolsa: 'R$ 1.000,00',
        bolsaNumero: 1000,
        area: 'suporte',
        descricao: 'Atendimento a usuários internos e externos, diagnóstico de hardware e sistemas operacionais, chamados de TI.',
        localidade: 'Presencial - Centro',
        cargaHoraria: '30h semanais (6h/dia)',
        requisitos: ['Cursando Redes, TI ou áreas correlatas', 'Conhecimentos básicos de Windows e Linux', 'Foco no cliente'],
        beneficios: ['Bolsa R$ 1.000,00', 'Vale Refeição', 'Seguro contra Acidentes', 'Day-off no aniversário']
      },
      {
        id: 'vaga-3',
        cargo: 'Estágio em Banco de Dados',
        empresa: 'Data Solutions',
        bolsa: 'R$ 1.300,00',
        bolsaNumero: 1300,
        area: 'dados',
        descricao: 'Modelagem relacional de dados, consultas SQL complexas, criação de relatórios e rotinas de ETL analítico.',
        localidade: 'Remoto',
        cargaHoraria: '30h semanais (6h/dia)',
        requisitos: ['Cursando Estatística, Engenharia ou TI', 'Familiaridade com SQL (PostgreSQL/MySQL)', 'Pensamento analítico'],
        beneficios: ['Bolsa R$ 1.300,00', 'Vale Alimentação', 'Flexibilidade de horário', 'Mentoria com DBAs sêniores']
      }
    ];
  }

  return vagas;
}
