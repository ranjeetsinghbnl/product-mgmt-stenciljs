/**
 * This file demonstrate the Product list component and corresponding properties
 */

// Importing the dependencies
import { Component, h, Event, EventEmitter, Listen, State } from '@stencil/core';
// Importing the helper functions
import { formatMoney } from "../../utils/utils";

/**
 * Interface for classes that represent a Product.
 *
 * @interface
 */
interface Product {
    id: number,
    productName: string;
    code: string;
    price: number;
    cartPrice: number;
    available: number;
    qty: number;
}

/**
 * Defining the ProductView component.
 * @class
 * @name ProductView
 * It will demonstrate:
 * 1. How we can listed to events
 * 2. How we can maintain the state of the component
 * 3. How we can Fire the events
 */
@Component({
    tag: 'mf-product-view',
    styleUrl: 'mf-product-view.scss'
})
export class ProductView {

    /** Define the state to hold Product list */
    @State() productList: Product[] = []

    /**
     * Define a productAdded Event
     * @description This event is fired,  when user add a product to the cart.
     */
    @Event() productAdded: EventEmitter;



    /**
     * @function
     * @name componentWillLoad
     * @description Handle life cycle function
     */
    componentWillLoad() {
        this.productList = [
            {
                id: 1,
                productName: 'JBL Flip 4',
                code: 'cat1-0001',
                price: 18.01,
                cartPrice: 0,
                available: 10,
                qty: 0
            }, {
                id: 2,
                productName: 'Bose Sound Link',
                code: 'cat1-0010',
                price: 129.05,
                cartPrice: 0,
                available: 9,
                qty: 0
            }, {
                id: 3,
                productName: 'AB Portable',
                code: 'cat1-0008',
                price: 19.78,
                cartPrice: 0,
                available: 11,
                qty: 0
            }, {
                id: 4,
                productName: 'AE-9 Portable',
                code: 'cat1-0011',
                price: 299.99,
                cartPrice: 0,
                available: 8,
                qty: 0
            }, {
                id: 5,
                productName: 'JBL Pulse 3',
                code: 'cat1-0009',
                price: 23.05,
                cartPrice: 0,
                available: 10,
                qty: 0
            }
        ];
    }

    /**
     * @function
     * @name componentDidUnload
     * @description Handle life cycle function
     */
    componentDidUnload() {
        this.productList = []
    }

    /**
     * Event reporting that a quantity is updated for added product .
     *
     * @event pQutUpdated
     * @property {event} CustomEvent - Contain the event details
     */
    @Listen('pQutUpdated', { target: 'document' })
    pQutUpdatedHandler(event: CustomEvent) {
        //console.log('Received the custom pQutUpdated event: ', event.detail);
        let eventDetail = event.detail
        if (eventDetail && 'id' in eventDetail) {
            let pIndex = this.getProduct(eventDetail.id)
            if (pIndex != -1) {
                this.productList[pIndex]['qty'] = eventDetail['qty']
                this.productList = [...this.productList]
            } else {
                alert('Invalid Product.');
            }
        }
    }


    /**
    * @fire productAdded
    * @name increment
    * @description Handle user action when user add a product to the cart and fire an event and update the Product state
    */
    addToCart(product: Product) {
        //console.log(product)
        if (product.qty === product.available) {
            alert('Product is out of Stock.');
        } else {
            let pIndex = this.getProduct(product.id)
            if (pIndex != -1) {
                this.productList[pIndex]['qty'] = this.productList[pIndex]['qty'] + 1
                this.productList = [...this.productList]
                this.productAdded.emit(product)
            }
            else {
                alert('Invalid Product.');
            }
        }
    }

    /**
     * @function
     * @name getProduct
     * @access private 
     * @description Get product by id
     * @returns {number}
     */
    private getProduct(productId: number): number {
        let productIndex: number = this.productList.findIndex(p => p.id == productId)
        if (productIndex != -1) {
            return productIndex
        } else {
            return null
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
                    <div class="card-title"><h3>Product List</h3></div>
                    <div class='table-responsive'>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Code</th>
                                    <th>Price</th>
                                    <th>Available</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.productList.map((product) =>
                                        <tr key={product.id}>
                                            <td>{product.productName}</td>
                                            <td>{product.code}</td>
                                            <td>${formatMoney(product.price, 2)}</td>
                                            <td>{product.available - product.qty}</td>
                                            <td>
                                                <button class="btn btn-primary" onClick={() => this.addToCart(product)} type="button" disabled={product.available - product.qty === 0}>Add</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
