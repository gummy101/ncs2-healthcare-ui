import React from 'react';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiExecute } from '../../HelperFunc.js';

class DisplayCart extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            items:[],
            error:'',
            isLoaded:false
        }
        this.handleQtyChange = this.handleQtyChange.bind(this);        
    }
    handleQtyChange = function (e,item,index)
    {
        e.preventDefault();
        let cpy = this.state.items.slice();
        cpy[index].quantity = e.target.value;         
        this.setState({
            items:cpy
        });               
    }    
    displaytotals = function ()
    {
        let total_price = this.state.items?.reduce((total,item,index,arr)=>{
            return (total + Number(item.price)*Number(item.quantity));
        },0);
        let total_qty = this.state.items?.reduce((total,item,index,arr)=>{
            return (total + Number(item.quantity));
        },0);
        return(<><div><ul className = "list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <span>Total Price: + {total_price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <span>Total No of Items: + {total_qty}</span>
                </li>
            </ul></div></>);
    }
    removeItemsfromCart = async function(event,item,index)
    {
        event.preventDefault();
        console.log('inside delete item');
        console.log(item);
        console.log(index);
        try
        {
            var apiOptions = {
                url: configinfo.apiUrl + configinfo.backendroutes.removeItemFromCart + '?cartid=' + localStorage.getItem("cart_id") + '&cartitemid='+item.cartitemid,
                methodName:'POST',
                contentType:'application/x-www-form-urlencoded'
            };
            console.log(apiOptions);
            var result = apiExecute(apiOptions);
            console.log(result);
            result.then((res)=>{
                console.log(res);
                res.status == "success" ? this.setState({
                    status:"success"
                }) : this.setState({
                    status:"failure"
                });
                console.log(this.state);
            });
            
            //end new code
        }
        catch(error)
        {
            console.log(error);
        }
        
    }    
    componentDidMount()
    {        
        //start new code
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getCartByUserId + localStorage.getItem("user_name"),
            methodName:'GET',
            contentType:'application/json'
        };
        console.log(apiOptions);
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                items: res.data.cartItems
            }) : this.setState({
                isLoaded: false,
                items: [],
                error:'Error in loading cart items'
            });
            console.log(this.state);
        });
        
        //end new code
    }
    render()
    {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return (<div> <h1>Error : {error.message}</h1></div >);
        }
        else if (!isLoaded) {
            return (<div> <h1>Loading Medicines....</h1></div >);
        }
        else
        {
            return(<div>
                    {this.state.status == "success" && <div className = "container text-danger">Item deleted successfully</div>}
                    <div className="container">
                        <div><h3>My Cart</h3></div>
                        <div className='row g-5'>
                            <div className='col-sm-9'>
                                <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine</th>                            
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items?.length > 0 && items.map((item,index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{item.medicinename}</td>
                                            <td>{item.price}</td>
                                            <td><input type="text" className = "form-control" value = {item.quantity} onChange = {(e)=>{this.handleQtyChange(e,item,index)}}></input></td>                                
                                            <td><button className = "btn btn-link" onClick = {(e)=>this.removeItemsfromCart(e,item,index)}><FontAwesomeIcon icon={faTrashCan}/></button></td>                                    
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            <div className='col-sm-3 order-md-last'>
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-primary">Summary</span>
                                </h4>
                                <div>{this.displaytotals()}</div>                                
                            </div>
                        </div>
                        <div className='row g-5'>
                            <div className='col-sm-3'></div>
                            <div className ="col-sm-9">
                                <Link to= "/checkout" className="btn btn-primary">Checkout</Link>
                            </div>                            
                        </div>                    
                    </div>                
                </div>
            );
        }        
    }
}

export default DisplayCart;