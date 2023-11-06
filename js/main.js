let btn_game = document.getElementsByClassName('btn__add-game');
let game_description = document.getElementsByClassName('product__paragraph-game');
let game_price = document.getElementsByClassName('product__price-game');

let btn_console = document.getElementsByClassName('btn__add-console');
let console_description = document.getElementsByClassName('product__paragraph-console');
let console_price = document.getElementsByClassName('product__price-console');

let btn_accessorie = document.getElementsByClassName('btn__add-accessorie');
let accessorie_description = document.getElementsByClassName('product__paragraph-accessorie');
let accessorie_price = document.getElementsByClassName('product__price-accessorie');

let cart__number = document.getElementById('cart__number') || '';
let btn_modal = document.querySelector('#btn_modal');
let btn_buy = document.querySelector('#btn_buy');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

let products = [];
if(cart !== null){
    products = [...cart];
} 

const total_products = 9;
cart__number.innerHTML = cart.length;

function addProduct(description, price){
    product = {
        name: description.innerHTML,
        price: parseInt(price.innerHTML)
    }
    products.push(product)

    cart__number.innerHTML = products.length;

    localStorage.setItem('cart', JSON.stringify(products));
}

for(let i = 0; i < total_products; i++){
    btn_game[i]?.addEventListener('click', () => {
        addProduct(game_description[i], game_price[i]);
    });

    btn_console[i]?.addEventListener('click', () => {
        addProduct(console_description[i], console_price[i]);
    });

    btn_accessorie[i]?.addEventListener('click', () => {
        addProduct(accessorie_description[i], accessorie_price[i]);
    });
}

function cartProducts(){
    let cartProductsContainer = document.querySelector('.cart__products');
    let products_price = 0;

    if(cart.length === 0){
        let noProducts = document.createElement('h2');
        noProducts.innerHTML = 'Not products yet';
        noProducts.style.color = '#ffff';
        if(cartProductsContainer !== null)
            cartProductsContainer.appendChild(noProducts);
    } else {
        for(let i = 0; i < cart.length; i++){
            let cart_products__product = document.createElement('div');
            cart_products__product.classList.add('cart-products__product');
    
            let product_description = document.createElement('p');
            product_description.innerHTML = cart[i].name;
            let product_price = document.createElement('p');
            product_price.innerHTML = cart[i].price;
            product_price.classList.add('cart__price');
    
            cart_products__product.appendChild(product_description);
            cart_products__product.appendChild(product_price);
            if(cartProductsContainer !== null)
                cartProductsContainer.appendChild(cart_products__product);
    
            products_price += parseInt(cart[i].price);
        }
    
        let buy = document.createElement('div');
        buy.classList.add('buy');
    
        let total = document.createElement('p');
        total.innerHTML = 'Total';
        let cart_price = document.createElement('p');
    
        cart_price.innerHTML = products_price;
        cart_price.classList.add('cart__price');
    
        buy.appendChild(total);
        buy.appendChild(cart_price);
    
        if(cartProductsContainer !== null){
            cartProductsContainer.appendChild(buy);
        }
    }
}

if(btn_buy !== null){
    if(cart.length !== 0){
        btn_buy.addEventListener('click', () => {
            let modalScreen = document.querySelector('.black_screen');
            let modal = document.querySelector('.modal');
            modalScreen.style.display = 'block';
            modal.style.opacity = '1';
        })
    } 
}

if(btn_modal !== null) {
    btn_modal.addEventListener('click', () => {
        localStorage.clear();
        let modalScreen = document.querySelector('.black_screen');
        let modal = document.querySelector('.modal');
        modalScreen.style.display = 'none';
        modal.style.opacity = '0';
        location.href = '../index.html';
    })
}


cartProducts();