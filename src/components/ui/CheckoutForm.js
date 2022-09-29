import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import AddressForm from './AddressForm.js';
import PaymentInfo from './PaymentInfo.js';
import { apiExecute } from '../../HelperFunc.js';


class CheckoutForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            addrs:[],
            cart:{},
            cartitems:[],
            paymentinfo:[], 
            selected_ship_addr_id:'',
            selected_bill_addr_id:'',
            payment_id:'',
            status:'0'
        };
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handlepaymentselection = this.handlepaymentselection.bind(this);
        this.handleshipaddrselection = this.handleshipaddrselection.bind(this);
        this.handlebilladdrselection = this.handlebilladdrselection.bind(this);

    }
    async clearcart()
    {
        //new code start
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.removeAllItemsFromCart+'?cartid=' + localStorage.getItem("cart_id"),
            methodName:'POST',
            contentType:'application/json',
            body: {}
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                status: "success"
            }) : this.setState({
                status: "failure"        
            });
        });
        //new code end
    }    
    handleSubmit = async function(e)
    {
        e.preventDefault();
        //insert payment first
        //new code start
        let data = {
            orderStatus: "Submitted",
            userId: localStorage.getItem("user_row_id"),
            cartId: localStorage.getItem("cart_id"),
            paymentInfoId:this.state.payment_id,
            billAddrId:this.state.selected_bill_addr_id,
            shipAddrId:this.state.selected_ship_addr_id            
        };
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.addNewOrder,
            methodName:'POST',
            contentType:'application/json',
            body: data
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                status: "success"
            }) : this.setState({
                status: "failure"        
            });
        })
        .then(()=>(this.clearcart()));
        //new code end
        
    }
    componentDidMount()
    {
        //new code start
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getUserByUserName +localStorage.getItem("user_name"),
            methodName:'GET',
            contentType:'application/json'
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                addrs: res.data.address,
                paymentinfo:res.data.paymentInfo
            }) : this.setState({
                isLoaded: false,
                addrs: []
            });
        });

        var apiOptions_1 = {
            url:configinfo.apiUrl + configinfo.backendroutes.getCartByCartId + localStorage.getItem("cart_id"),
            methodName:'GET',
            contentType:'application/json'
        };
        console.log(apiOptions_1);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                cart: res.data.cart,
                cartitems:res.data.cart.cartItems
            }) :   this.setState({
                isLoaded: false,
                cart: {}
            });
        });

        //new code end
        console.log(this.state);
    }
    handlepaymentselection = function(value)
    {
        this.setState({
            payment_id:value
        });
    }
    handleshipaddrselection = function(value)
    {
        this.setState({
            selected_ship_addr_id:value
        });
    }
    handlebilladdrselection = function(value)
    {
        this.setState({
            selected_bill_addr_id:value
        });
    }    
    render() {
        console.log(this.state);
        const {error,isLoade,addrs,cartitems} = this.state;        
        return (
            <div className="container">
                {this.state.status == "success" && (<Navigate to={"/orders"} replace={true}></Navigate>)}
                <main>
                    <form onSubmit = {this.handleSubmit}>
                        <div className="py-5 text-center">
                            <h2>Checkout Form</h2>
                        </div>
                        <div className="row g-5">
                            <div className="col-md-5 col-lg-4 order-md-last">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your cart</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    {cartitems.map((item,index)=>(
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                            <h6 className="my-0">{item.medicinename}</h6>
                                            <small className="text-muted">Qty:{item.quantity}</small>
                                            </div>
                                            <span className="text-muted">Unit Price: ${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <hr className="my-4"></hr>
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Totals</span>
                                </h4>
                                <div classNameName="card">
                                    <div className="card-body">
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                                <p>Total Quantity : {cartitems.reduce((total,item,index,arr)=>(total = total + item.quantity),0)}</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                                <p>Total Price : ${cartitems.reduce((total,item,index,arr)=>(total = total + (item.price * item.quantity)),0)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>                                
                            </div>
                            <div className="col-md-7 col-lg-8">
                                <h4 className="mb-3">Choose Billing address</h4>                            
                                <div className="row g-3">
                                <AddressForm addr_type={"Billing"} displayselectcol ={true} selchange = {this.handlebilladdrselection}/>                                                               
                                </div>

                                <hr className="my-4"></hr>
                                <h4 className="mb-3">Choose Shipping address</h4>                            
                                <div className="row g-3">
                                    <AddressForm addr_type={"Shipping"} displayselectcol ={true} selchange = {this.handleshipaddrselection}/>                                                               
                                </div>

                                <hr className="my-4"></hr>
                                <h4 className="mb-3">Choose Payment Method</h4>
                                <div className='row g-3'>                                    
                                        <PaymentInfo paymentinfo = {this.state.paymentinfo} selchange = {this.handlepaymentselection} showaddlink = {false} displayselectcol = {true}/>
                                        <input type="submit" value="Submit Order" className="btn btn-primary"></input>
                                                                                        
                                </div>
                            </div>
                        </div>
                    </form>            
                </main>
            </div>
        );
    }
}
export default CheckoutForm;