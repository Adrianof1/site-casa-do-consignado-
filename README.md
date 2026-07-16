# Casa do Consignado — Site institucional

Site institucional em HTML/CSS/JS puro (sem build, sem dependências), pronto para publicar.

## Estrutura

```
index.html        página única com todas as seções
css/style.css      estilos e responsividade
js/script.js       menu mobile, accordion do FAQ, simulador, formulário
assets/favicon.svg ícone da aba do navegador
```

## Antes de publicar — dados a atualizar

Procure por estes marcadores e substitua pelos dados reais da empresa:

- **WhatsApp**: todos os links `https://wa.me/5500000000000` (em `index.html`) e a URL
  usada em `js/script.js` (função `updateSimulator`). Troque `5500000000000` pelo número
  real no formato `55DDDNÚMERO` (só dígitos).
- **E-mail**: `contato@casadoconsignado.com.br` em `index.html`.
- **Endereço e horário**: seção "Contato" em `index.html` (marcados com `[ATUALIZAR ...]`).
- **Depoimentos**: seção "Depoimentos" tem 3 cartões de exemplo — troque pelo texto e
  nome de clientes reais (com autorização deles).
- **Domínio**: tag `<link rel="canonical">` e `og:url`/`og:site_name` no `<head>`, se for
  publicar em domínio próprio.

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
