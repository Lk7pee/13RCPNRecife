// Exercita o script real em ambiente isolado. Não abre navegador nem envia mensagens.
const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const script = fs.readFileSync('script.js','utf8');
function run({mobile=false,valid=true,spam=false}={}) {
  let submit,reported=false;
  const opened=[],timers=[],button={disabled:true},status={textContent:''};
  const values={nome:'Teste local',email:'teste@example.invalid',assunto:'Revisão & teste',mensagem:'Linha 1\nLinha 2',site:spam?'bot':''};
  const form={checkValidity:()=>valid,reportValidity:()=>{reported=true},querySelector:()=>button,addEventListener:(name,handler)=>{if(name==='submit')submit=handler}};
  const document={querySelector:s=>s==='#form-contato'?form:s==='#form-status'?status:null,querySelectorAll:()=>[],documentElement:{classList:{add(){}}}};
  const window={open:(url)=>opened.push(url),location:{href:''},setTimeout:fn=>timers.push(fn)};
  const context={document,window,navigator:{userAgent:mobile?'Android':'Desktop'},URL,FormData:class{get(k){return values[k]}},Date};
  vm.runInNewContext(script,context);
  assert.equal(button.disabled,false);
  let prevented=false;
  submit({preventDefault(){prevented=true}});
  assert(prevented);
  return {opened,timers,window,status,reported};
}
const desktop=run();
const url=new URL(desktop.opened[0]);
assert.equal(url.origin,'https://mail.google.com');
assert.equal(url.searchParams.get('to'),'rcpn13arrudarecife@gmail.com');
assert.equal(url.searchParams.get('su'),'Revisão & teste');
assert(url.searchParams.get('body').includes('Linha 1\nLinha 2'));
assert(desktop.status.textContent.includes('Conclua o envio por lá'));
const mobile=run({mobile:true});
assert(mobile.window.location.href.startsWith('googlegmail://'));
assert.equal(mobile.timers.length,1);
mobile.timers[0]();
assert(mobile.window.location.href.startsWith('https://mail.google.com/'));
assert.equal(run({spam:true}).opened.length,0);
const invalid=run({valid:false});
assert(invalid.reported);
assert.equal(invalid.opened.length,0);
const result={desktopCompose:true,mobileComposeAndFallback:true,honeypotBlocked:true,invalidFormBlocked:true,realMessagesSent:0};
fs.writeFileSync('revisao/testes-formulario.json',JSON.stringify(result,null,2));
console.log(result);
