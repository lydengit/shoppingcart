import { ShoppingCart } from './ShoppingCart.js'
const itemList = document.querySelector('.item-list')
const item = new ShoppingCart()
item.displayCart()

document.addEventListener('DOMContentLoaded', ready)
function ready() {
    displayItemsInCart()
    dispalyTotalCost()
    countItems()
}

itemList.addEventListener('click', (e) => {
    if (e.target.className === 'item') {
        let itemName = e.target.dataset.name
        let itemPrice = Number(e.target.dataset.price)
        item.addItemToCart(itemName, itemPrice, 1)
    }
    ready()
})

let displayCart = document.querySelector('.display-cart')
function displayItemsInCart() {
    displayCart.innerHTML = ''
    let frag = document.createDocumentFragment()
    let ul = document.createElement('ul')
    for (let i of item.listCart()) {
        let item = document.createElement('span')
        let price = document.createElement('span')
        let typeItemTotal = document.createElement('span')
        let changeCount = document.createElement('input')
        let li = document.createElement('li')
        let add = document.createElement('button')
        let minus = document.createElement('button')
        let remove = document.createElement('button')

        item.textContent = i.item
        price.textContent = ` - $${i.price} - `
        typeItemTotal.textContent = ` $${(i.price * i.count).toFixed(2)} - `

        changeCount.className = 'change-count'
        changeCount.type = 'number'
        changeCount.dataset.item = i.item
        changeCount.value = i.count

        add.className = 'add'
        add.dataset.item = i.item
        add.textContent = '+'

        minus.className = 'minus'
        minus.dataset.item = i.item
        minus.textContent = '–'

        remove.className = 'remove'
        remove.dataset.item = i.item
        remove.textContent = '×'

        li.append(item, price, typeItemTotal, changeCount, add, minus, remove)
        ul.append(li)
        frag.append(ul)
    }
    displayCart.append(frag)
}

displayCart.addEventListener('click', async (e) => {
    if (e.target.className === 'add') {
        let itemName = e.target.dataset.item
        await item.addItemToCart(itemName, 0, 1)
        await ready()
    }

    if (e.target.className === 'minus') {
        let itemName = e.target.dataset.item
        await item.removeItemFromCart(itemName)
        await ready()
    }
    if (e.target.className === 'remove') {
        let itemName = e.target.dataset.item
        await item.removeAllItemFromCart(itemName)
        await ready()
    }

})
displayCart.addEventListener('change', async (e) => {
    if (e.target.className === 'change-count') {
        await item.setCountForItem(e.target.dataset.item, Number(e.target.value))
        await ready()
    }
})

function countItems() {
    let countItemsInCart = document.querySelector('.count-items span')
    countItemsInCart.innerHTML = item.countItemsInCart()
}
function dispalyTotalCost() {
    let totalCost = document.querySelector('.total-cost span')
    totalCost.innerHTML = item.totalCostCart()
}