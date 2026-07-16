# Casa do Consignado — Site institucional

Site institucional em HTML/CSS/JS puro (sem build, sem dependências), pronto para publicar.

## Estrutura

```
index.html        página única com todas as seções
css/style.css      estilos e responsividade
js/script.js       menu mobile, accordion do FAQ, simulador, formulário
assets/favicon.svg ícone da aba do navegador
```

## Já preenchido com dados reais

- **WhatsApp**: `5586988422265` — (86) 98842-2265, agente Paulo Henrique — usado em todos
  os botões de WhatsApp (`index.html`) e no simulador (`js/script.js`).
- **Logo**: ícone casa + cifrão (inline SVG no header/footer e em `assets/favicon.svg`),
  baseado na arte oficial da marca.
- **Serviços**: consignado INSS, servidor público, empréstimo CLT, liberação de FGTS,
  portabilidade e compra de dívida/refinanciamento — igual ao material de divulgação.

## Antes de publicar — dados que ainda faltam

Procure por estes marcadores e substitua pelos dados reais da empresa:

- **E-mail**: `contato@casadoconsignado.com.br` em `index.html` (placeholder).
- **Endereço e horário de atendimento**: seção "Contato" em `index.html`
  (marcados com `[ATUALIZAR ...]`).
- **Depoimentos**: seção "Depoimentos" tem 3 cartões de exemplo — troque pelo texto e
  nome de clientes reais (com autorização deles).
- **Domínio**: tag `<link rel="canonical">` e `og:site_name` no `<head>`, se for
  publicar em domínio próprio.
- **Novo agente/número**: se a empresa tiver mais de um consultor, ajuste o texto
  "Falar com o agente Paulo Henrique" na seção de Contato.

## Como testar localmente

```
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como publicar (opções simples)

- **GitHub Pages**: em Settings → Pages, selecione a branch e a pasta raiz.
- **Netlify/Vercel**: arraste a pasta do projeto ou conecte o repositório — não precisa
  de build command, é um site estático.

## Formulário de contato

O formulário em "Fale conosco" hoje só mostra uma mensagem de confirmação (não envia
e-mail de verdade). Para receber as mensagens, integre com um serviço como Formspree,
EmailJS ou um backend próprio, e ajuste o `js/script.js` (evento `submit` do
`contactForm`).
