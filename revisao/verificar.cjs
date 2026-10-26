// Auditoria estática reproduzível, executada a partir da raiz do projeto.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const before = JSON.parse(fs.readFileSync('revisao/inventario-antes.json','utf8'));
const after = {}, issues = [], content = [];
const normalize = s => s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
for (const page of pages) {
 const html = fs.readFileSync(page,'utf8');
 const original = fs.readFileSync(path.join('revisao/originais',page),'utf8');
 const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 const links = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 after[page] = {sha256:crypto.createHash('sha256').update(html).digest('hex'),ids,links,
   missingIds:before[page].ids.filter(id=>!ids.includes(id)),removedDestinations:before[page].links.filter(l=>!links.includes(l))};
 if(new Set(ids).size!==ids.length) issues.push(page+': IDs duplicados');
 if(after[page].missingIds.length) issues.push(page+': IDs ausentes');
 if(after[page].removedDestinations.length) issues.push(page+': destinos originais ausentes');
 if((html.match(/<h1\b/g)||[]).length!==1) issues.push(page+': H1');
 for(const link of links) {
   if(/^(https?:|tel:|mailto:|googlegmail:)/.test(link)) continue;
   const [file,anchor] = link.split('#');
   const target=file||page;
   if(!fs.existsSync(target)) {issues.push(page+': recurso ausente '+link);continue;}
   if(anchor && !fs.readFileSync(target,'utf8').includes('id="'+anchor+'"')) issues.push(page+': âncora ausente '+link);
 }
 const main = original.match(/<main\b[\s\S]*?<\/main>/)[0];
 const values = [...main.matchAll(/<(p|li|dd|summary)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(m=>normalize(m[2]));
 // Três ajustes editoriais de interface; nenhuma orientação de serviço foi alterada.
 const allowed = ['A experiência','Envie sua dúvida ou solicitação. Retornaremos pelos canais informados no formulário.'];
 const missing=values.filter(t=>t&&!normalize(html).includes(t)&&!allowed.includes(t));
 if(missing.length) issues.push(page+': conteúdo informativo ausente');
 content.push({page,originalBlocks:values.length,missing});
 // Título, descrição, fontes e favicon mantidos literalmente.
 for(const tag of original.match(/<title>[\s\S]*?<\/title>|<meta\s+name="description"[\s\S]*?>|<link[^>]+(?:fonts|icon)[^>]*>/g)||[]) {
   if(!html.includes(tag)) issues.push(page+': metadado/recurso alterado '+tag);
 }
}
for(const asset of fs.readdirSync('img')) {
 if(!fs.readFileSync('img/'+asset).equals(fs.readFileSync('revisao/originais/img/'+asset))) issues.push('Imagem original alterada: '+asset);
}
fs.writeFileSync('revisao/inventario-depois.json',JSON.stringify(after,null,2));
fs.writeFileSync('revisao/testes-estaticos.json',JSON.stringify({pages:pages.length,issues,content},null,2));
console.log(JSON.stringify({pages:pages.length,issues,contentBlocks:content.reduce((n,x)=>n+x.originalBlocks,0)},null,2));
if(issues.length)process.exitCode=1;
