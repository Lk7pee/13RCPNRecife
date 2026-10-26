const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const files = fs.readdirSync('.').filter(f => /\.(html|css|js)$/.test(f));
const backup = 'revisao/originais';
fs.mkdirSync(backup, {recursive:true});
for (const f of files) {
  if (fs.existsSync(path.join(backup,f))) throw Error('Backup já existe: '+f);
  fs.copyFileSync(f,path.join(backup,f));
}
fs.cpSync('img',path.join(backup,'img'),{recursive:true});
const inventory = {};
for (const f of files) {
 const s=fs.readFileSync(f,'utf8');
 inventory[f]={bytes:fs.statSync(f).size,sha256:crypto.createHash('sha256').update(s).digest('hex'),
 ids:[...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]),
 links:[...s.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1]),
 headings:[...s.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(m=>m[1].trim())};
}
fs.writeFileSync('revisao/inventario-antes.json',JSON.stringify(inventory,null,2));
let home=fs.readFileSync('index.html','utf8');
const sections=home.match(/^      <section\b[\s\S]*?^      <\/section>/gm);
if(sections.length!==7) throw Error('Estrutura inesperada '+sections.length);
let [hero,about,services,guidance,crc,contact,faq]=sections;
const info=hero.match(/            <dl[\s\S]*?<\/dl>/)[0];
hero=`      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero-copy">
          <p class="eyebrow"><span aria-hidden="true"></span> Atendimento público com fé pública</p>
          <h1 id="hero-title">Registro Civil de <span>Pessoas Naturais</span></h1>
          <p class="hero-text">Garantindo cidadania desde o nascimento, com segurança, transparência e fé pública.</p>
          <div class="hero-actions" aria-label="Ações principais">
            <a class="btn btn-primary" href="#servicos">Ver serviços <span aria-hidden="true">↗</span></a>
            <a class="btn btn-secondary" href="#contato">Fale conosco <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      <section class="quick-section" aria-label="Acessos rápidos e identificação">
        <div class="container quick-grid">
          <article class="quick-card quick-services">
            <p class="section-label">Serviços</p><h2>Registros que acompanham a vida.</h2>
            <div class="quick-links"><a href="registro-nascimento.html">Nascimento <span aria-hidden="true">↗</span></a><a href="casamento-civil.html">Casamento <span aria-hidden="true">↗</span></a><a href="certidoes-averbacoes.html">Certidões <span aria-hidden="true">↗</span></a></div>
          </article>
          <article class="quick-card"><p class="section-label">Atendimento</p><h2>Segunda a sexta</h2><p class="quick-time">8h às 17h</p><a class="text-link" href="#contato">Canais de atendimento <span aria-hidden="true">→</span></a></article>
          <article class="quick-card"><p class="section-label">Localização</p><h2>Arruda, Recife</h2><p>Rua Sete Pecados, nº 78<br>Lojas 07/08</p><a class="text-link" href="#contato">Endereço completo <span aria-hidden="true">→</span></a></article>
          <article class="quick-card quick-identity"><p class="section-label">Nossa serventia</p>${info}</article>
        </div>
      </section>`;
// A fotografia fornecida não tem comprovação de autenticidade/autorização; preservar arquivo sem usá-la.
about=about.replace('<p class="about-kicker">A experiência</p>','<p class="about-kicker">Cidadania, segurança e fé pública.</p>');
crc=crc.replace('Acessar Portal da CRC</a>','Acessar Portal da CRC <span aria-hidden="true">↗</span></a><p class="external-note">Serviço externo · abre em uma nova aba.</p>');
contact=contact.replace('Envie sua dúvida ou solicitação. Retornaremos pelos canais informados no formulário.','Entre em contato pelos canais abaixo ou prepare uma mensagem para enviar pelo seu Gmail.');
contact=contact.replace('<form class="contact-form" id="form-contato" aria-describedby="form-status">','<form class="contact-form" id="form-contato" aria-describedby="form-help form-status">\n            <h3>Escreva sua mensagem</h3>\n            <p id="form-help">Este formulário abre o Gmail com os dados preenchidos. Revise e conclua o envio por lá. Nenhuma mensagem é enviada automaticamente.</p>\n            <noscript><p>Para preparar a mensagem, ative o JavaScript ou use o e-mail e os telefones ao lado.</p></noscript>');
contact=contact.replace('Enviar Mensagem</button>','Preparar mensagem no Gmail <span aria-hidden="true">↗</span></button>');
const wa=home.match(/    <a class="whatsapp-float"[\s\S]*?    <\/a>/)[0];
const waHref=wa.match(/href="([^"]+)"/)[1];
contact=contact.replace('</div>\n          </div>\n\n          <form',`</div>\n            <a class="btn btn-secondary" href="${waHref}" target="_blank" rel="noopener">Atendimento pelo WhatsApp <span aria-hidden="true">↗</span></a>\n          </div>\n\n          <form`);
home=home.replace(/    <main id="conteudo">[\s\S]*?    <\/main>/,`    <main id="conteudo" tabindex="-1">\n${[hero,services,guidance,crc,about,faq,contact].join('\n\n')}\n    </main>`);
fs.writeFileSync('index.html',home);
for(const f of files.filter(f=>f.endsWith('.html'))) {
 let s=fs.readFileSync(f,'utf8');
 const prefix=f==='index.html'?'':'index.html';
 s=s.replace('    <script src="script.js"></script>','    <script src="script.js" defer></script>');
 s=s.replace('<main id="conteudo">','<main id="conteudo" tabindex="-1">');
 s=s.replace('        </nav>\n      </div>\n    </header>',`        </nav>\n        <a class="btn btn-primary header-contact" href="${prefix}#contato">Fale conosco <span aria-hidden="true">↗</span></a>\n      </div>\n    </header>`);
 if(f!=='index.html' && f!=='politica-privacidade.html') {
   s=s.replace('</aside>','<a class="text-link" href="index.html#contato">Confirme os documentos com o cartório <span aria-hidden="true">→</span></a></aside>');
   s=s.replace('    <script src="script.js" defer>',wa+'\n\n    <script src="script.js" defer>');
 }
 if(f==='politica-privacidade.html') s=s.replace('    <script src="script.js" defer>',wa+'\n\n    <script src="script.js" defer>');
 if(!s.includes('footer-contact')) s=s.replace('      </div>\n    </footer>',`        <div class="footer-contact"><strong>Atendimento</strong><a href="tel:+558137881240">(81) 3788-1240</a><a href="tel:+5581996211741">(81) 9.9621-1741</a><a href="mailto:rcpn13arrudarecife@gmail.com">rcpn13arrudarecife@gmail.com</a><p>Segunda a sexta, das 8h às 17h</p>${f==='index.html'?'':'<a href="https://www.instagram.com/cartoriodoarruda/" target="_blank" rel="noopener">Instagram ↗</a>'}</div>\n      </div>\n    </footer>`);
 fs.writeFileSync(f,s);
}
console.log('Backup, inventário e dez páginas preparados.');
