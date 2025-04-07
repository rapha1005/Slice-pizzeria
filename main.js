const $wrapper = document.querySelector('.pizzas-wrapper')
const $basketAside = document.querySelector('.basket-aside')


let products

let basket = []

async function getProducts(){
    const res = await fetch('http://10.59.122.41:3000/products')
    const data = await res.json()

    products = data

    displayProducts()

}

function displayProducts(){
    products.forEach(element => {
        const $item = document.createElement('div')
        $item.classList.add('pizza-item')

    
        const $img = document.createElement('img')
        $img.classList.add('pizza-picture')
        $img.src = element.image
        $img.alt = element.name
        $img.title = element.description


        const $button = document.createElement('span')
        $button.classList.add('add-to-cart-btn')
        $button.setAttribute('data-id', element.id)
        
        const $cardImage = document.createElement('img')
        $cardImage.src = 'images/carbon_shopping-cart-plus.svg'
        

        const $list = document.createElement('ul')
        $list.classList.add('pizza-infos')
        

        const $pizzaName = document.createElement('li')
        $pizzaName.classList.add('pizza-name')
        $pizzaName.textContent = element.name

        const $price = document.createElement('li')
        $price.classList.add('pizza-price')
        $price.textContent = "$" + element.price

        $button.addEventListener('click', function(e){
            let id = e.target.getAttribute('data-id')
            addBasket(id)
        })


        $wrapper.appendChild($item)
        $item.appendChild($img)
        $item.appendChild($button)
        $button.appendChild($cardImage)
        $button.append(" Ajouter au panier")

        $item.appendChild($list)
        $list.appendChild($pizzaName)
        $list.appendChild($price)

        
        

    });
   

}



function addBasket(id){
    const product = products.find(product => product.id === id)

    const çaExisteOuPas = basket.find(item => item.id == id)

    if (çaExisteOuPas) {
        çaExisteOuPas.quantity += 1
    } else {
        const item = {
            name: product.name,
            price: product.price,
            id: product.id,
            quantity: 1
        }
        
        basket.push(item)
    }

    displayBasket()
    
}

function basketRemove(id){
    const index = basket.indexOf(id)

    basket.splice(index, 1)

    console.log(basket)
    displayBasket()

}


function displayBasket(){

    
    if(basket.length === 0){
        $basketAside.innerHTML = `
        <h2>Votre panier (0)</h2>
        <div class="empty-basket">
          <img src="../images/pizza.png" alt="" />
          <p>Votre panier est vide...</p>
        </div>
      `
      return
      
    }else{
        console.log("azrae  ")
        $basketAside.innerHTML = '<h2> Votre panier (<span class="basket-item-quantity"></span>) </h2>'

        const $basket = document.createElement('ul')
        $basket.classList.add('basket-products')
    
        $basketAside.appendChild($basket)
        
        document.querySelector('.basket-item-quantity').textContent += basket.length



    basket.forEach(element => {


        const $productItem = document.createElement('li')
        $productItem.classList.add('basket-product-item')
        $productItem.setAttribute("data-id", element.id)

        const $itemName = document.createElement('span')
        $itemName.classList.add('basket-product-item-name')
        $itemName.textContent = element.name

        const $itemDetails = document.createElement('span')
        $itemDetails.classList.add('basket-product-details')
        
        const $itemQuantity = document.createElement('span')
        $itemQuantity.classList.add('basket-product-details-quantity')
        $itemQuantity.textContent = element.quantity

        const $itemPrice = document.createElement('span')
        $itemPrice.classList.add('basket-product-details-unit-price')
        $itemPrice.textContent = "@ $" + element.price

        const $itemTotalPrice = document.createElement('span')
        $itemTotalPrice.classList.add('basket-product-details-total-price')
        $itemTotalPrice.textContent = "$" + element.price * element.quantity
        
        const $removeItem = document.createElement('img')
        $removeItem.classList.add('basket-product-remove-icon')
        $removeItem.src = "./images/remove-icon.svg"


        $removeItem.addEventListener("click", function(e){
            const id = e.target.parentElement.getAttribute('data-id')
            basketRemove(id)
        })

        

        $basket.appendChild($productItem)
        $productItem.appendChild($itemName)
        $productItem.appendChild($itemDetails)
        $itemDetails.appendChild($itemQuantity)
        $itemDetails.appendChild($itemPrice)
        $itemDetails.appendChild($itemTotalPrice)
        $productItem.appendChild($removeItem)

        

    });



    const $totalOrder = document.createElement('p')
        $totalOrder.classList.add('total-order')

        const $title = document.createElement('span')
        $title.classList.add('total-order-title')
        $title.textContent = "Order total"

        const $totalPrice = document.createElement('span')
        $totalPrice.classList.add('total-order-price')
        $totalPrice.textContent = 

        $basket.appendChild($totalOrder)
        $totalOrder.appendChild($totalOrder)
        $totalOrder.appendChild($totalPrice)
    }
}





getProducts()