import JSZip from 'jszip';
import { DEFAULT_POM_XML, DEFAULT_WEB_XML, DEFAULT_INDEX_HTML, DEFAULT_README } from '../data/defaultCode';

export async function downloadJavaProjectZip(currentJavaCode: string): Promise<void> {
  const zip = new JSZip();

  // Project root structure:
  // PortalEstagios/
  // ├── pom.xml
  // ├── README.md
  // └── src/
  //     └── main/
  //         ├── java/
  //         │   └── br/
  //         │       └── com/
  //         │           └── portal/
  //         │               └── VagasServlet.java
  //         └── webapp/
  //             ├── index.html
  //             └── WEB-INF/
  //                 └── web.xml

  const root = zip.folder('PortalEstagios');
  if (!root) return;

  root.file('pom.xml', DEFAULT_POM_XML);
  root.file('README.md', DEFAULT_README);

  const javaFolder = root.folder('src/main/java/br/com/portal');
  if (javaFolder) {
    javaFolder.file('VagasServlet.java', currentJavaCode);
  }

  const webappFolder = root.folder('src/main/webapp');
  if (webappFolder) {
    webappFolder.file('index.html', DEFAULT_INDEX_HTML);
    const webInfFolder = webappFolder.folder('WEB-INF');
    if (webInfFolder) {
      webInfFolder.file('web.xml', DEFAULT_WEB_XML);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'PortalEstagios-JavaWeb-Tomcat.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
