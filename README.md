# 📝 Lista de Compras Interativa

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0-green.svg)
![Mobile](https://img.shields.io/badge/responsive-yes-brightgreen.svg)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 🎵 Uma Lista de Compras com Estilo de Caderno e Trilha Sonora!

Transforme suas compras em uma experiência divertida! Este projeto é uma lista de compras interativa com design de caderno, animações suaves e música ambiente para tornar suas compras mais agradáveis.

<div align="center">
  <img src="https://via.placeholder.com/800x400/fff8dc/2c3e50?text=Lista+de+Compras+Interativa" alt="Preview do Projeto" width="80%">
</div>

## ✨ Funcionalidades Encantadoras

### 📋 **Interface de Caderno**
- Design realista de folha de caderno com espiral e margem vermelha
- Efeito flutuante no fundo com bolinhas animadas
- Fonte cartoon divertida e amigável

### 🎮 **Controles Intuitivos**
- **Checkbox interativos** - Marque seus itens e veja o texto ser riscado automaticamente
- **Edição inline** - Clique no lápis para editar qualquer item
- **Remoção rápida** - Lixeira para excluir itens indesejados
- **Paginação** - Navegue entre as páginas com setas coloridas

### 🎵 **Música Ambiente**
- Trilha sonora jazzística feliz para acompanhar suas compras
- Controle de música no canto superior direito
- Ative/desative quando quiser
- Volume suave para não atrapalhar

### 📱 **Totalmente Responsivo**
- Funciona perfeitamente em celulares, tablets e desktops
- Botões adaptados para toque
- Layout que se ajusta a qualquer tela

### ✏️ **Animações Delicadas**
- Itens riscados com animação suave
- Botões com feedback visual ao toque
- Transições fluidas entre páginas

## 🚀 Como Usar

1. **Adicionar item**: Digite o nome do produto e quantidade, clique em "Adicionar"
2. **Marcar item**: Clique no quadrado ao lado do produto
3. **Editar item**: Clique no ícone do lápis ✏️
4. **Remover item**: Clique no ícone da lixeira 🗑️
5. **Navegar**: Use as setas ◀ ▶ para mudar de página
6. **Música**: Clique no ícone de música 🎵 no canto superior direito

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com animações e design responsivo
- **JavaScript (ES6+)** - Toda a lógica interativa
- **Font Awesome** - Ícones bonitos e modernos
- **Google Fonts** - Fontes cartoon personalizadas

## 📦 Estrutura do Projeto

```
lista-compras/
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Lógica e interatividade
├── musica-tema.mp3     # Sua música ambiente
└── README.md           # Documentação
```

## 🎯 Destaques Técnicos

### Design de Caderno
```css
.container::before {
    /* Espiral do caderno */
    background: radial-gradient(circle at center, #999 4px, transparent 5px);
}

.container::after {
    /* Margem vermelha clássica */
    background: #ff4d4d;
}
```

### Animações Suaves
```css
@keyframes flutuar {
    from { transform: translateY(0px); }
    to { transform: translateY(30px); }
}
```

### Controle de Música
```javascript
// Sistema completo de áudio com fallback
controleMusica.addEventListener('click', function() {
    // Alterna entre play/pause
});
```

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/lista-compras.git
```

2. **Adicione sua música**
   - Coloque seu arquivo MP3 na pasta raiz
   - Nomeie como `musica-tema.mp3` ou altere no HTML

3. **Abra no navegador**
```bash
cd lista-compras
# Clique duas vezes no index.html ou use um servidor local
```

## 📱 Preview Mobile

<div align="center">
  <table>
    <tr>
      <td><img src="https://via.placeholder.com/300x600/fff8dc/2c3e50?text=Mobile+View" width="200"></td>
      <td><img src="https://via.placeholder.com/300x600/fff8dc/2c3e50?text=Checklist" width="200"></td>
      <td><img src="https://via.placeholder.com/300x600/fff8dc/2c3e50?text=Edição" width="200"></td>
    </tr>
  </table>
</div>

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 🔧 Enviar pull requests

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎨 Créditos

- Ícones por [Font Awesome](https://fontawesome.com)
- Fontes por [Google Fonts](https://fonts.google.com)
- Inspiração em cadernos clássicos e listas de compras tradicionais

## 📬 Contato

**Seu Nome** - [@seu-twitter](https://twitter.com/seu-usuario) - email@exemplo.com

Link do projeto: [https://github.com/seu-usuario/lista-compras](https://github.com/seu-usuario/lista-compras)

---

<div align="center">
  <h3>⭐ Se você gostou, deixe uma estrelinha! ⭐</h3>
  <p>Feito com ❤️ e ☕ para tornar suas compras mais divertidas</p>
</div>
```

## 📸 Sugestões de Imagens para o README (opcional)

Se quiser adicionar imagens reais, você pode criar prints do seu projeto e substituir os placeholders. Sugestões de nomes:

- `preview-desktop.png` - Visão geral no computador
- `preview-mobile.png` - Visão no celular  
- `preview-checkbox.png` - Demonstração do checkbox marcado
- `preview-edicao.png` - Modo de edição
- `preview-musica.png` - Controle de música

Basta substituir as URLs do placeholder pelos caminhos das suas imagens:

```markdown
<img src="images/preview-desktop.png" alt="Preview do Projeto">
```
