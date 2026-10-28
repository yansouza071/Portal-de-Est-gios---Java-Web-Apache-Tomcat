export interface Vaga {
  id: string;
  cargo: string;
  empresa: string;
  bolsa: string;
  bolsaNumero: number;
  area: 'desenvolvimento' | 'suporte' | 'dados' | 'outros';
  descricao?: string;
  localidade?: string;
  cargaHoraria?: string;
  requisitos?: string[];
  beneficios?: string[];
}

export interface ServletExecutionResult {
  html: string;
  statusCode: number;
  statusText: string;
  contentType: string;
  endpoint: string;
  vagasParsed: Vaga[];
  error?: string;
}

export interface TomcatLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'SEVERE' | 'DEBUG';
  message: string;
}

export interface ProjectFile {
  name: string;
  path: string;
  language: string;
  content: string;
  icon: string;
}
