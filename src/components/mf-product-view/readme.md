# mf-product-view
```
ProductView
```

## State

| Name          | Description                 |
| -------------- | --------------------------- |
| `productList` | This will hold all the product list |

## Events

| Name          | Description                 | Type               |
| -------------- | --------------------------- | ------------------ |
| `productAdded` | Define a productAdded Event, it gets fired when user add any [product](#product-interface) to the cart | `CustomEvent<any>` |


## Listeners

| Listeners         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `pQutUpdated` | Listen to [product](#product-class) quantity update event and check for available quality in stock and update the product quantity, state | `CustomEvent<any>` |

## Methods

| Name         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `addToCart` | Add a product to the cart and fire [productAdded](#events)|Internal
| `getProduct` | Get the product index by product_id | Private |

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*



## Listeners

| Listeners         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `pQutUpdated` | Listen to [product](#product-class) quantity update event and check for available quality in stock and update the product state | `CustomEvent<any>` |


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

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*