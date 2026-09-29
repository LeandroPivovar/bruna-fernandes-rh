# Bruna Fernandes | Suporte Empresarial

Landing page estática (HTML + CSS + JS puro, sem build) para os serviços de Suporte Administrativo,
Recrutamento e Seleção, Tráfego Pago, Criação de Artes/Criativos e SDR (pré-vendas). Preparada para receber campanhas de Google Ads.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Conteúdo, SEO (meta tags + schema.org) e estrutura |
| `styles.css` | Design system (paleta do logo, tipografia, seções, responsivo) |
| `script.js` | WhatsApp por serviço, formulário de orçamento, menu mobile, reveal, FAQ |
| `assets/` | Fotos otimizadas, logo (og:image) e favicon |
| `robots.txt` | Liberação para indexação |

## Rodar localmente

Qualquer servidor estático na pasta, por exemplo:

```bash
python -m http.server 4173
```

Abrir http://localhost:4173

## Seções

Hero · Propósito · Sobre mim (formação e experiência) · Serviços (5) · "Você não precisa dar conta de tudo sozinho" ·
Para quem · Diferenciais · Como funciona · Modelo de contratação + disponibilidade · Dúvidas · Orçamento/Contato.

Portfólio ainda **não** foi incluído.

## WhatsApp e formulário

- O número fica em uma constante no topo do `script.js` (`WHATSAPP`) e também como fallback nos `href="https://wa.me/554899088463"` do `index.html`. Para trocar, buscar e substituir `554899088463` nos dois arquivos.
- Qualquer link com `data-wa="Nome do Serviço"` recebe automaticamente a mensagem
  "Olá, Bruna! Encontrei seu site e gostaria de saber mais sobre o serviço de …". `data-wa=""` usa uma mensagem genérica.
- O botão flutuante abre um painel para o visitante escolher o serviço.
- O formulário de orçamento valida os campos e abre o WhatsApp com todas as respostas preenchidas (não precisa de backend).
  Para enviar também por e-mail, integrar com Formspree/EmailJS no `submit` do `script.js`.

## Google Tag Manager / Google Ads

- Colar os snippets do GTM nos dois comentários marcados no `index.html` (`<head>` e início do `<body>`).
- O site já envia eventos para o `dataLayer`:
  - `whatsapp_click` (parâmetro `service`)
  - `generate_lead` (parâmetros `form`, `services`) no envio do formulário
- Usar esses eventos como conversões no Google Ads.

## Pendências

- E-mail de contato (ainda não exibido no site).
- Domínio: quando definido, preencher o `<link rel="canonical">` (comentado no `<head>`), tornar absoluta a URL do `og:image`
  e adicionar `sitemap.xml` + linha `Sitemap:` no `robots.txt`.
- Portfólio.

## Paleta

| Token | Cor | Uso |
| --- | --- | --- |
| `--plum-deep` | `#1B1119` | Fundo do hero, rodapé |
| `--plum` | `#2A1A26` | Seções escuras, card destaque |
| `--rose-deep` | `#B8506F` | Acentos, links, itálicos |
| `--rose` | `#E29AAE` | Acentos em fundo escuro |
| `--gold` | `#C9A45C` | Monograma BF, botões, ícones |
| `--rose-pale` | `#F7E8EC` | Fundo de Sobre e Como funciona |
| `--nude` | `#F0E5E0` | Faixa, Para quem, Dúvidas |
| `--cream` | `#FBF7F5` | Fundo padrão |
