export class ShoppingCart {
    constructor(item, price, count) {
        this.item = item
        this.price = price
        this.count = count
    }

    //: cart array stors items 
    static cart = ShoppingCart.loadCart()

    //: Save cart to Browser's local storage
    static saveCart() {
        localStorage.setItem('cart', JSON.stringify(ShoppingCart.cart))
    }

    //: get cart from local storage
    static loadCart() {
        ShoppingCart.cart = JSON.parse(localStorage.getItem('cart')) || []
    }

    //:add items to cart
    addItemToCart(item, price, count) {
        for (let i in ShoppingCart.cart) {
            if (item === ShoppingCart.cart[i].item) {
                ShoppingCart.cart[i].count += count
                ShoppingCart.saveCart()
                return
            }
        }
        const newItem = new ShoppingCart(item, price, count)
        ShoppingCart.cart.push(newItem)
        ShoppingCart.saveCart()
    }
    //:add item via input:change
    setCountForItem(item, count) {
        for (let i in ShoppingCart.cart) {
            if (item === ShoppingCart.cart[i].item) {
                ShoppingCart.cart[i].count = count
                if(ShoppingCart.cart[i].count === 0){
                    this.removeAllItemFromCart(item)
                }
                break
            }
        }
        ShoppingCart.saveCart()
    }
    //: remove items one by one from cart
    removeItemFromCart(item) {
        for (let i in ShoppingCart.cart) {
            if (item === ShoppingCart.cart[i].item) {
                ShoppingCart.cart[i].count--
                if (ShoppingCart.cart[i].count === 0) {

                    this.removeAllItemFromCart(item)
                }
                break
            }
        }
        ShoppingCart.saveCart()
    }
    //: Remove all specific type of item from cart
    removeAllItemFromCart(item) {
        for (let i in ShoppingCart.cart) {
            if (item === ShoppingCart.cart[i].item) {
                ShoppingCart.cart.splice(i, 1)
            }
        }
        ShoppingCart.saveCart()
    }

    //: Clare cart
    clearCart() {
        ShoppingCart.cart = []
        ShoppingCart.saveCart()
    }
    //: Count all items in cart
    countItemsInCart() {
        let totalCount = 0
        for (let i in ShoppingCart.cart) {
            totalCount += ShoppingCart.cart[i].count
        }
        return totalCount
    }

    //: calcualte cost of all items
    totalCostCart() {
        let totalCost = 0
        for (let i in ShoppingCart.cart) {

            totalCost += ShoppingCart.cart[i].price * ShoppingCart.cart[i].count

        }
        return totalCost.toFixed(2)
    }
    //: clone original cart
    listCart() {
        let cloneCart = [...ShoppingCart.cart]
        return cloneCart
    }
    //: display items in cart. load/bring all items in cart from localstorage
    displayCart() {
        ShoppingCart.loadCart()
    }
}


