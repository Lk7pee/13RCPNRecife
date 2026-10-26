# Cartório do Arruda — entrega para revisão

Data: 26 de outubro de 2026. Implementação local, sem publicação ou alteração da produção.

## O que mudou

Sistema visual compartilhado em marfim, creme, marrom e âmbar, com Inter e Libre Baskerville já existentes. Cabeçalho compacto, navegação arredondada, títulos fluidos, botões arredondados, cartões leves e rodapé com identidade, navegação e atendimento.

A página inicial passou a apresentar abertura centralizada, acessos rápidos, serviços, orientação, CRC, Sobre, dúvidas e contato. A identificação institucional foi reunida no cartão “Nossa serventia”, sem retirar CNS, serventia ou titular. A mensagem institucional principal foi mantida.

As oito páginas de serviços e a política de privacidade usam os mesmos estilos. Todas as orientações de serviços, perguntas e respostas e o texto da política foram preservados. As páginas de serviço receberam acesso contextual ao atendimento.

O menu funciona por botão e teclado, fecha por Escape e ao escolher um destino, atualiza seu nome acessível e devolve o foco apropriadamente. Sem JavaScript, seus links continuam visíveis. Os acordeões usam `details` e `summary` nativos.

O WhatsApp flutuante mantém o destino original e se oculta temporariamente quando sua área poderia cobrir texto ou controles. Os canais diretos continuam disponíveis no conteúdo e no rodapé.

## Arquivos modificados

- `index.html`
- `registro-nascimento.html`
- `casamento-civil.html`
- `registro-obito.html`
- `certidoes-averbacoes.html`
- `abertura-firma.html`
- `autenticacao-documentos.html`
- `reconhecimento-firma.html`
- `comunicacao-venda-veiculos.html`
- `politica-privacidade.html`
- `styles.css`
- `script.js`

Não há dependência nova de servidor, framework, compilação, biblioteca ou fonte. A pasta `img` mantém os três arquivos originais, byte a byte. Os arquivos novos de documentação, auditoria e captura estão somente em `revisao` e não são necessários na hospedagem.

## Inventário comparativo

Os inventários completos, com destinos, IDs, títulos e hashes SHA-256, estão em `inventario-antes.json` e `inventario-depois.json`. A cópia integral original está em `originais`.

| Item anterior | Onde permanece / situação final |
| --- | --- |
| Inicial e nove páginas internas | Mesmos dez nomes de arquivo, sem mudança de URL |
| Oito serviços | Mesmas páginas, descrições e orientações; grupos Registro Civil e Serviços de Notas mantidos |
| IDs de seções e campos | Todos preservados, inclusive `topo`, `conteudo`, `sobre`, `servicos`, `crc`, `contato`, `duvidas`, `form-contato` e `form-status` |
| `styles.css` e `script.js` | Mesmos caminhos compartilhados; estilos substituídos, comportamentos refinados; script com `defer` |
| Marca `img/01df1eda-3638-4521-ac92-b5136dc42839.png` | Original preservado e usado no cabeçalho de todas as páginas, sem corte ou distorção |
| Grande repetição da marca na abertura | Removida da composição; informações repetidas permanecem no cabeçalho e na identificação |
| `img/favicon.png` | Mantido em todas as páginas |
| `img/sobre.png` | Original preservado; não utilizado na nova composição por não haver comprovação de autenticidade/autorização da fotografia |
| Inter e Libre Baskerville | Mesmas URLs Google Fonts, sem nova família ou requisição de biblioteca |
| Nome, CNS, titular, serventia, endereço, telefones, e-mail, horário e plantão | Conferidos com o pedido e preservados; nenhuma divergência encontrada |
| Conteúdo informativo | Comparação de 138 blocos de parágrafos, listas, definições e perguntas; nenhum bloco informativo ausente |
| Ajustes editoriais de interface | “A experiência” virou “Cidadania, segurança e fé pública.”; introdução do contato e botão do formulário passaram a explicar a composição no Gmail |
| CRC Digital | Mesmo destino `https://home.registrocivil.org.br/`, com aviso de serviço externo/nova aba |
| Justiça Aberta | Mesmo destino `https://justicaaberta.cnj.jus.br/` |
| Instagram | Mesmo perfil `https://www.instagram.com/cartoriodoarruda/` |
| WhatsApp | Mesma URL `wa.me`, número e mensagem inicial; acesso direto adicionado ao contato e flutuante estendido às páginas internas |
| Telefones e e-mail | Destinos `tel:` e `mailto:` preservados; adicionados ao rodapé das páginas internas |
| FAQ | Cinco perguntas e respostas originais em `details` / `summary` |
| Formulário | Mesmos IDs e nomes `nome`, `email`, `assunto`, `mensagem`, `site`; mecanismo Gmail preservado e explicitado |
| Antispam | Campo-isca `site` preservado; o script original não o verificava, e agora interrompe a composição quando preenchido |
| Títulos, descrições, favicon e indexação | Títulos, descrições e recursos conferidos literalmente; nenhuma diretiva de indexação adicionada ou removida |
| Créditos | “Desenvolvido por: Filipe Gualberto” na inicial e “Criado por: Filipe Gualberto” nas internas preservados |
| Rastreadores e cookies | Nenhum rastreador, banner, armazenamento local ou cookie novo introduzido |

## Formulário: funcionamento real e limites

O projeto fornecido contém somente arquivos estáticos. Não existe endpoint de envio, PHP, API ou serviço de recebimento nos arquivos. O script abre uma composição no Gmail web; no celular, tenta o aplicativo Gmail e usa o portal web como alternativa após 900 ms. Esse comportamento foi mantido, incluindo destinatário e preenchimento dos quatro campos.

O botão agora se chama “Preparar mensagem no Gmail”. O texto explica que o visitante deve revisar e concluir o envio no Gmail. Não há mensagem de sucesso nem confirmação de entrega. Os campos não são apagados ao abrir o aplicativo.

Sem JavaScript, o botão permanece desabilitado e o aviso direciona aos canais diretos. Isso impede o envio involuntário de dados pessoais por GET à própria página, que ocorreria com um formulário sem `action` e sem interceptação pelo script.

Nenhum dado de formulário é registrado em console, arquivo ou armazenamento local pelo código do site. A abertura do Gmail compartilha os campos com esse serviço externo, como no mecanismo original. A disponibilidade do aplicativo, autenticação no Gmail, bloqueadores de pop-up, resposta do cartório e entrega do e-mail dependem de fatores externos. Nenhuma mensagem real foi enviada.

A política de privacidade foi preservada integralmente. Recomenda-se revisão institucional de sua descrição do formulário para explicitar a composição externa no Gmail; esta entrega não declara conformidade jurídica automática.

## Testes executados

- Auditoria estática das dez páginas: todos os links e recursos locais existem; todas as âncoras apontam para IDs existentes; nenhum ID duplicado; um H1 por página. Todos os IDs e destinos originais continuam presentes.
- Comparação dos 138 blocos originais de conteúdo e dos metadados. Nenhuma perda informativa detectada. Três imagens originais comparadas byte a byte.
- Navegador Chromium integrado: dez páginas nas larguras de 360, 390, 768, 1024, 1366 e 1440 pixels, em 60 combinações. Sem transbordamento horizontal, elementos fora das bordas detectados ou imagem carregada quebrada. Evidência: `testes-responsivos.json`.
- Inspeção visual da inicial e da página Registro de Nascimento em computador e celular, além da seção Sobre. Capturas da abertura dessas quatro combinações em `capturas`. Há também uma captura integral da inicial em computador. A captura integral da página interna apresentou falha da ferramenta; a captura de sua abertura foi salva e conferida.
- Menu: abertura por Enter/click, `aria-expanded`, fechamento por Escape com retorno do foco e fechamento após destino com foco na seção.
- Cinco acordeões abertos por Enter; perguntas e respostas preservadas. Formulário vazio bloqueado no navegador com foco no campo Nome.
- Script real executado em ambiente isolado para validar destinatário, assunto e conteúdo codificados, composição desktop, aplicativo móvel e alternativa web, bloqueio do campo-isca e bloqueio de dados inválidos. Nenhum navegador externo aberto ou mensagem enviada nesse teste. Evidência: `testes-formulario.json`.
- `node --check script.js`: passou. Sem erros ou avisos registrados no console capturado durante a matriz de páginas.
- Contrastes calculados pela luminância relativa sRGB: texto principal 10,14:1; texto secundário em branco 6,48:1; em creme 5,39:1; ação em branco 6,36:1; ação em creme 5,29:1; borda dos campos 3,96:1; legenda clara sobre marrom 8,35:1. São medições das combinações indicadas, não uma certificação completa. Evidência: `contrastes.json`.
- Justiça Aberta e Instagram responderam HTTP 200 à consulta HEAD. A conexão direta ao portal CRC falhou neste ambiente; o destino original foi preservado e sua disponibilidade deve ser confirmada antes da implantação. Evidência: `testes-externos.json`.

Os dois sites publicados foram consultados, e a referência foi visualizada no navegador: [Arruda](https://www.cartoriodoarruda.com.br/) e [referência de Jaboatão](https://cartoriocentrojaboatao.com.br/). Nenhum texto, fotografia, dado institucional, estatística, agendamento ou escala de plantão da referência foi transferido.

## Verificações não executadas e limitações

Não houve teste em aparelhos físicos, Safari, Firefox, versões antigas de navegadores, leitores de tela ou zoom real de 200%/400%. A verificação por teclado cobriu os comportamentos citados, sem auditoria exaustiva de todas as sequências de tabulação. O layout prevê foco visível, reflow, redução de movimento e navegação sem JavaScript; não foi feita sessão de navegador com JavaScript desativado.

Não foram medidos Lighthouse, Core Web Vitals, tempos em rede móvel, compatibilidade de hospedagem de ponta a ponta ou nota global WCAG. As fontes continuam dependentes do Google Fonts, com fontes de sistema alternativas. O PNG original da marca tem aproximadamente 2,45 MB e foi preservado; sua otimização pode ser avaliada separadamente.

O teste HEAD dos portais não valida serviços autenticados ou fluxos externos. Gmail, WhatsApp, telefone e e-mail não foram acionados para comunicação real. Não foi verificado processamento oculto ou configuração do servidor da produção: o mecanismo descrito é o dos arquivos fornecidos.

## Revisar localmente

1. Abra `index.html` diretamente no navegador. A versão é estática e não precisa de compilação.
2. Se preferir HTTP local e tiver Node.js instalado, execute `node revisao/servidor.cjs` na pasta do projeto e abra `http://127.0.0.1:4173`. Encerre com Ctrl+C ao terminar. O servidor vincula somente `127.0.0.1` e é ferramenta de revisão, não requisito da hospedagem.
3. Confira as oito páginas de serviço, política, dados institucionais e canais externos. Revise os pontos não executados acima antes de publicar.
4. Para repetir a auditoria estática: `node revisao/verificar.cjs`. Para o teste isolado do formulário: `node revisao/verificar-formulario.cjs`.

## Implantar e restaurar

O arquivo `cartorio-arruda-reformulado.zip` contém somente os dez HTML, `styles.css`, `script.js` e `img`, com caminhos relativos preservados. Não existe etapa de build.

1. Faça um backup adicional da hospedagem atual, incluindo configurações ou arquivos que não estejam nesta cópia de trabalho.
2. Extraia o ZIP em uma pasta de homologação e revise por HTTP/HTTPS. Confirme o portal CRC e teste os aplicativos Gmail/WhatsApp manualmente, sem enviar mensagem de teste sem autorização.
3. Quando houver decisão de implantar, substitua somente os arquivos do pacote nos mesmos caminhos da hospedagem. Não envie a pasta `revisao`, os backups, relatórios ou scripts auxiliares ao servidor público.
4. Preserve configurações existentes do servidor, DNS, certificados, redirecionamentos e quaisquer arquivos alheios ao pacote. Invalide o cache se houver e confira a versão servida de HTML/CSS/JS.
5. Para restaurar a versão fornecida, extraia `cartorio-arruda-original.zip` ou copie o conteúdo de `revisao/originais` aos mesmos caminhos. Restaure também o backup da hospedagem se ela tiver outros arquivos/configurações.

Nada foi publicado automaticamente. Os dois ZIPs contêm versões completas do site estático.
