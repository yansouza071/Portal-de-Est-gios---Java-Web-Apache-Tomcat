export const ORIGINAL_JAVA_CODE = `package br.com.portal;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Exercício Servlet: Consulta de Vaga de Estágio
 * Programação Web • Atividade prática Página 2
 * Mapeamento: /vagas
 */
@WebServlet("/vagas")
public class VagasServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        
        // Define o tipo de conteúdo e codificação para garantir acentuação correta
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<html><head><title>Portal de Estágios</title></head>");
        out.println("<body>");
        out.println("<h1>Portal de Estágios</h1>");
        out.println("<p>Confira as oportunidades disponíveis:</p>");
        out.println("<h2>Estágio em Desenvolvimento Web</h2>");
        out.println("<p>Empresa: Tech Solutions</p>");
        out.println("<p>Bolsa: R$ 1.200,00</p><hr>");
        out.println("<h2>Estágio em Suporte Técnico</h2>");
        out.println("<p>Empresa: InfoTech</p>");
        out.println("<p>Bolsa: R$ 1.000,00</p><hr>");
        out.println("<h2>Estágio em Banco de Dados</h2>");
        out.println("<p>Empresa: Data Solutions</p>");
        out.println("<p>Bolsa: R$ 1.300,00</p>");
        out.println("</body></html>");
    }
}
`;

export const DEFAULT_POM_XML = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>br.com.portal</groupId>
    <artifactId>PortalEstagios</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>Portal de Estagios</name>
    <description>Projeto Java Web com Servlet e Apache Tomcat 10+</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Jakarta Servlet API 6.0 para Tomcat 10+ -->
        <dependency>
            <groupId>jakarta.servlet</groupId>
            <artifactId>jakarta.servlet-api</artifactId>
            <version>6.0.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>PortalEstagios</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
`;

export const DEFAULT_WEB_XML = `<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
         https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">

    <display-name>PortalEstagios</display-name>

    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <!-- 
      Nota: O Servlet VagasServlet utiliza a anotação @WebServlet("/vagas"),
      portanto não é estritamente obrigatório registrá-lo aqui.
      Caso queira registrar via XML clássico, descomente abaixo:
    -->
    <!--
    <servlet>
        <servlet-name>VagasServlet</servlet-name>
        <servlet-class>br.com.portal.VagasServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>VagasServlet</servlet-name>
        <url-pattern>/vagas</url-pattern>
    </servlet-mapping>
    -->
</web-app>
`;

export const DEFAULT_INDEX_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=vagas">
    <title>Portal de Estágios - Redirecionando...</title>
</head>
<body>
    <p>Redirecionando para o Servlet de vagas: <a href="vagas">/PortalEstagios/vagas</a></p>
</body>
</html>
`;

export const DEFAULT_README = `# Portal de Estágios (Java Web + Apache Tomcat)

Exercício prático de Servlet em Java Web para listagem de vagas de estágio.

## 📋 Pré-requisitos
- JDK 17 ou superior instalado
- Apache Tomcat 10.1+ (devido ao pacote \`jakarta.servlet\`)
- Eclipse IDE for Enterprise Java / IntelliJ IDEA Ultimate ou Community com Smart Tomcat / VS Code

## 🚀 Como executar no Eclipse
1. Abra o Eclipse e selecione **File > Import > Existing Maven Projects**.
2. Selecione a pasta descompactada deste projeto.
3. Clique com o botão direito no projeto > **Run As > Run on Server**.
4. Selecione o **Apache Tomcat v10.1** configurado.
5. Acesse no navegador: \`http://localhost:8080/PortalEstagios/vagas\`

## 💻 Como compilar e executar via Terminal
\`\`\`bash
# 1. Gerar o arquivo .war
mvn clean package

# 2. Copiar o PortalEstagios.war para o Tomcat
cp target/PortalEstagios.war /caminho/do/tomcat/webapps/

# 3. Iniciar o Tomcat
/caminho/do/tomcat/bin/startup.sh   # Linux / Mac
/caminho/do/tomcat/bin/startup.bat  # Windows

# 4. Acessar no navegador
http://localhost:8080/PortalEstagios/vagas
\`\`\`

## 📌 Rota configurada
- **URL**: \`http://localhost:8080/PortalEstagios/vagas\`
- **Classe**: \`VagasServlet.java\`
- **Anotação**: \`@WebServlet("/vagas")\`
`;
