// Seleciona os elementos necessários
const menuToggle = document.getElementById('menu-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
const categoryButtons = document.querySelectorAll('.category');
const searchBar = document.querySelector('.search-bar');
const productCards = document.querySelectorAll('.product-card');
const cartButton = document.getElementById('cart-button');

// Adiciona contador ao carrinho
const cartCount = document.createElement('span');
cartCount.classList.add('cart-count');
cartButton.appendChild(cartCount);

let cart = []; // Carrinho (array de itens)

// Função para abrir a barra lateral
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
});

// Função para fechar a barra lateral
closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

// Função para redirecionar para a categoria correspondente
categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    const targetSection = document.getElementById(category);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sidebar.classList.remove('open');
    }
  });
});

// Função para buscar e redirecionar para o item correspondente
function searchItem(event) {
  const searchText = event.target.value.toLowerCase().trim();

  if (!searchText) {
    productCards.forEach((card) => (card.style.border = '1px solid #ddd'));
    return;
  }

  let found = false;

  productCards.forEach((card) => {
    const itemName = card.querySelector('h3').textContent.toLowerCase();
    if (itemName.includes(searchText)) {
      if (!found) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        found = true;
      }
      card.style.border = '2px solid red';
      setTimeout(() => (card.style.border = '1px solid #ddd'), 2000);
    }
  });

  if (!found) console.log('Item não encontrado');
}

searchBar.addEventListener('input', searchItem);

// Adiciona produtos ao carrinho
productCards.forEach((card) => {
  const addToCartButton = card.querySelector('.add-to-cart');
  addToCartButton.addEventListener('click', () => {
    const productName = card.querySelector('h3').textContent;
    const productPrice = parseFloat(card.querySelector('p').textContent.replace('R$', '').trim());

    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartCount();
  });
});

// Atualiza o contador do carrinho
function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
}

// Exibe mensagem de desenvolvimento ao clicar no carrinho
cartButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Previne que o clique afete outros elementos
  event.preventDefault(); // Previne comportamentos indesejados como navegação
  alert('Funcionalidade em desenvolvimento. Em breve disponível!');
});
