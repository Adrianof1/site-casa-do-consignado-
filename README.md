# Casa do Consignado — Site institucional

Site institucional em HTML/CSS/JS puro (sem build, sem dependências), pronto para publicar.

## Estrutura

```
index.html          página única com todas as seções
css/style.css        estilos e responsividade
js/script.js         menu mobile, accordion do FAQ, formulário, animações
assets/favicon.svg   ícone da aba do navegador
assets/paulo-*.jpg   fotos do consultor
robots.txt           libera o rastreamento por buscadores e aponta o sitemap
sitemap.xml          lista de páginas para o Google indexar
```

## Já preenchido com dados reais

- **WhatsApp**: `5586988422265` — (86) 98842-2265, consultor Paulo Henrique — usado em
  todos os botões de WhatsApp e no formulário de contato (que monta a mensagem e abre
  o WhatsApp direto).
- **Endereço**: Rua Sete de Setembro, 355 - Sala 108 (Térreo), Teresina/PI.
- **Logo**: ícone casa + cifrão (inline SVG no header/footer e em `assets/favicon.svg`).
- **Serviços**: Consignado Servidor Público, Consignado INSS, Antecipação FGTS e
  Consignado CLT.

## SEO — o que já está pronto no código

- Título, descrição e palavras-chave focados em "crédito consignado" + "Teresina".
- Open Graph e Twitter Card (título/descrição/imagem para quando o link é
  compartilhado no WhatsApp, Instagram, etc.).
- Dados estruturados (JSON-LD, tipo `FinancialService`) com nome, endereço, telefone,
  horário de atendimento e área de atuação — ajuda o Google a entender que é um
  negócio local em Teresina.
- `robots.txt` e `sitemap.xml` na raiz do projeto.
- Imagens com `alt` descritivo, dimensões definidas (evita layout pulando) e
  carregamento tardio (`loading="lazy"`) nas que ficam fora da primeira tela.

## SEO — o que só dá pra fazer fora do código

Nenhum código garante aparecer "sempre" no Google — isso depende de fatores fora do
site. Ordem de prioridade para esse tipo de negócio (consultor local):

1. **Perfil da Empresa no Google (Google Business Profile)** — para buscas tipo
   "crédito consignado Teresina" o Google normalmente mostra primeiro o mapa/pacote
   local, antes dos resultados orgânicos do site. É o item de maior impacto e é
   gratuito: https://www.google.com/business/
2. **Registrar e publicar no domínio real** — o código já assume
   `https://paulocasadoconsignado.com.br/` (`canonical`, Open Graph, JSON-LD). Sem
   comprar esse domínio e publicar o site nele, essas tags ficam "no vácuo".
3. **Google Search Console** — depois do site no ar, cadastrar em
   https://search.google.com/search-console, enviar o `sitemap.xml` e pedir indexação
   da página. Sem isso o Google pode demorar semanas para achar o site sozinho.
4. **Preencher o CEP real** no JSON-LD (`index.html`, bloco `address`) — removido por
   enquanto porque o número 355 da Rua Sete de Setembro tem mais de um CEP possível
   em Teresina; conferir o correto nos Correios.
5. **Link no Instagram** (`@paulo_credito_consignado`) apontando para o site — todo
   link externo real ajuda o Google a confiar mais na página.

## Como testar localmente

```
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como publicar (opções simples)

- **GitHub Pages**: em Settings → Pages, selecione a branch e a pasta raiz.
- **Netlify/Vercel**: conecte o repositório — não precisa de build command, é um site
  estático. Depois aponte o domínio `paulocasadoconsignado.com.br` para lá.

## Formulário de contato

O formulário em "Fale conosco" monta uma mensagem com os dados preenchidos e abre o
WhatsApp do Paulo automaticamente (não depende de e-mail nem backend).
