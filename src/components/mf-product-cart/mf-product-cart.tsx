/**
 * This file demonstrate the Product Cart component and corresponding properties
 */

// Importing the dependencies
import { Component, h, State, Listen, EventEmitter, Event } from '@stencil/core';
// Importing the helper functions
import { formatMoney } from "../../utils/utils";

/**
 * Interface for classes that represent a single product.
 *
 * @interface
 */
interface ProductIn {
    id: number,
    productName: string;
    code: string;
    price: number;
    cartPrice: number;
    available: number;
    qty: number;
}

/**
 * Creates a new Product.
 * @class
 */
class Product {
    id: number;
    public productName: string;
    public code: string;
    public cartPrice: number;
    public price: number;
    public available: number;
    public qty: number;
    constructor() {

    }
}

/**
 * Defining the ProductCart component.
 * @class
 * @name ProductCart
 * It will demonstrate:
 * 1. How we can listed to events
 * 2. How we can maintain the state of the component
 * 3. How we can Fire the events
 */
@Component({
    tag: 'mf-product-cart',
    styleUrl: 'mf-product-cart.scss'
})
export class ProductCart {

    /**Define the state to hold Product added to cart */
    @State() productList: ProductIn[] = []

    /** Define the state to hold Cart total price */
    @State() totalPrice: number = 0

    /**
     * Define a pQutUpdated Event
     * @description This event is fired, when user update a quantity of the added product.
     */
    @Event() pQutUpdated: EventEmitter;

    /**
     * @function
     * @name componentWillLoad
     * @description Handle life cycle function
     */
    componentWillLoad() {
        this.productList = []
        this.totalPrice = 0
    }

    /**
     * @function
     * @name componentWillLoad
     * @description Handle life cycle function
     */
    componentDidUnload() {
        this.productList = []
        this.totalPrice = 0
    }

    /**
     * Keeps an eye out for a product is added to cart.
     *
     * @event productAdded
     * @property {event} CustomEvent - Contain the event details
     * @description Update quantity of product if already added otherwise add the product and update the state of cart
     */
    @Listen('productAdded', { target: 'document' })
    productAddedHandler(event: CustomEvent) {
        //console.log('Received the custom productAdded event: ', event.detail);
        let eventDetail: ProductIn = event.detail
        if (eventDetail && 'id' in eventDetail) {
            let pIndex = this.getProduct(eventDetail.id)
            //console.log(pIndex, 'pIndex')
            if (pIndex != null) {
                this.productList[pIndex].qty = this.productList[pIndex].qty + 1;
                this.productList[pIndex].cartPrice = this.productList[pIndex].cartPrice + eventDetail['price'];
                this.totalPrice = this.totalPrice + eventDetail['price'];
                this.productList = [...this.productList]
            } else {
                let product = new Product()
                product.id = eventDetail.id;
                product.qty = 1;
                product.price = (eventDetail['price'] !== undefined) ? eventDetail['price'] : 0;
                product.productName = (eventDetail['productName'] !== undefined) ? eventDetail['productName'] : "";
                product.available = (eventDetail['available'] !== undefined) ? eventDetail['available'] : 0;
                product.code = (eventDetail['code'] !== undefined) ? eventDetail['code'] : "";
                product.cartPrice = (eventDetail['price'] !== undefined) ? eventDetail['price'] : 0;
                this.totalPrice = this.totalPrice + product.price;
                this.productList = [...this.productList, product]
            }
        }
    }

    /**
    * @fire pQutUpdated
    * @name decrement
    * @description Handle user action when user decrement the quantity of the product added to cart
    */
    decrement(product: Product) {
        if (product.qty > 0 && product.qty <= product.available) {
            let pIndex = this.getProduct(product.id)
            //console.log(pIndex, 'pIndex')
            if (pIndex != null) {
                this.productList[pIndex].qty = this.productList[pIndex].qty - 1;
                this.productList[pIndex].cartPrice = this.productList[pIndex].cartPrice - product['price'];
                this.totalPrice = this.totalPrice - product.price;
                this.pQutUpdated.emit(product);
            }
        }
    }

    private getProduct(productId: number) {
        let productIndex: number = this.productList.findIndex(p => p.id == productId)
        if (productIndex != -1) {
            return productIndex
        } else {
            return null
        }
    }

    /**
     * @fire pQutUpdated
     * @name increment
     * @description Handle user action when user increment the quantity of the product added to cart
     */
    increment(product: Product) {
        if (product.qty >= 0 && product.qty < product.available) {
            let pIndex = this.getProduct(product.id)
            //console.log(pIndex, 'pIndex')
            if (pIndex != null) {
                this.productList[pIndex].qty = this.productList[pIndex].qty + 1;
                this.productList[pIndex].cartPrice = this.productList[pIndex].cartPrice + product['price'];
                this.totalPrice = this.totalPrice + product['price'];
                this.productList = [...this.productList]
                this.pQutUpdated.emit(product);
            }
        }
    }



    /**
     * @function
     * @name render
     * @description Render the component html
     * @returns {string}
     */
    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <div class="card-title"><h3>Cart</h3></div>
                    <div class='table-responsive'>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.productList.length <= 0 ?
                                        <tr key={0}>
                                            <td colSpan={3} class="text-center">No product added yet.</td>
                                        </tr>
                                        :
                                        this.productList.map((product) =>
                                            <tr key={product.id}>
                                                <td>{product.productName}</td>
                                                <td class="space-caret">
                                                    <div class="input-group spinner">
                                                        <input type="text" class="form-control" value={product.qty} min={0} max={product.available} />
                                                        <div class="input-group-btn-vertical">
                                                            <button class="btn btn-default" type="button" onClick={() => this.increment(product)}>+</button>
                                                            <button class="btn btn-default" type="button" onClick={() => this.decrement(product)}>-</button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>${formatMoney(product.cartPrice, 2)}</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                            <tfoot class="total">
                                <tr>
                                    <th class="no-border"></th>
                                    <th class="no-border">Total</th>
                                    <th class="no-border">${formatMoney(this.totalPrice, 2)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
