# Bruna Fernandes — Suporte Administrativo & Recrutamento

Landing page de vendas, estática (HTML + CSS + JS puro, sem build).

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Conteúdo e estrutura |
| `styles.css` | Design system (paleta, tipografia, seções, responsivo) |
| `script.js` | Menu mobile, reveal no scroll, acordeão do FAQ |

## Rodar localmente

```bash
python -m http.server 4173
```

Abrir http://localhost:4173

## Trocar as fotos

Hoje o site não usa imagens — o hero é um gradiente com textura e o retrato é um bloco CSS. Para usar fotos reais:

1. Criar `assets/` e colocar `hero.jpg` (paisagem, 2400px de largura) e `bruna.jpg` (retrato vertical).
2. Em `styles.css`, no bloco `.hero__media::before`, adicionar a imagem antes dos gradientes:

```css
background:
  linear-gradient(160deg, rgba(58,37,49,.82), rgba(26,16,22,.92)),
  url("assets/hero.jpg") center/cover no-repeat;
```

3. Em `.portrait`, substituir o gradiente por `url("assets/bruna.jpg") center/cover no-repeat` e remover o `<span class="portrait__label">` do HTML.

## Onde editar os dados de contato

WhatsApp e telefone aparecem em 4 lugares no `index.html` (`wa.me/554899088463` e `tel:+554899088463`). Buscar e substituir.

## Paleta

| Token | Cor | Uso |
| --- | --- | --- |
| `--plum-deep` | `#1E1219` | Fundo do hero |
| `--plum` | `#2B1B24` | Seções escuras, card destaque |
| `--rose-deep` | `#C1707F` | Acentos, links, itálicos |
| `--rose` | `#D99AA8` | Acentos em fundo escuro |
| `--rose-pale` | `#F6E6E8` | Fundo das seções Sobre e FAQ |
| `--nude` | `#EFE3DC` | Faixa, Processo, rodapé |
| `--cream` | `#FBF7F5` | Fundo padrão |
