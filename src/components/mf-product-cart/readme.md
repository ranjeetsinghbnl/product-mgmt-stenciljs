# mf-product-cart

```
ProductCart
```

## State

| Name         | Description                |
| ------------- | -------------------------- |
| `productList` | Hold all the product list added to cart |
| `totalPrice` | Hold total cart price |


## Events

| Name         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `pQutUpdated` | Fire a [product](#product-class) quantity update event, when user perform an increment and decrement opeation to cart added products.| `CustomEvent<any>` |

## Listeners

| Name         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `productAdded` | Listen to event and check if product is already added to cart, then update the quantity and total price, else add a new product to the cart. We will receive a [product](#product-interface) type data. | `CustomEvent<any>` |


### Product Interface
```
interface Product {
    id: number,
    productName: string;
    code: string;
    price: number;
    cartPrice: number;
    available: number;
    qty: number;
}
```

## Methods

| Name         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `increment` | Check for availability and Increase the quantity of the product added to cart then fire [pQutUpdated](#events) events | Internal |
| `decrement` | Check for availability and Decrease the quantity of the product added to cart then fire [pQutUpdated](#events) events | Internal |
| `getProduct` | Get the product index by product_id | Private |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*