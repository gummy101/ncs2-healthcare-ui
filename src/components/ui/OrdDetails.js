import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withLocation, apiExecute } from '../../HelperFunc.js';
class OrdDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            currentOrderId: this.props.currentOrderId,
            currentOrder: { shippingAddress: {}, billingAddress: {}, items: [] }
        }
    }
    componentDidMount() {
        /*
        fetch(configinfo.apiUrl + configinfo.backendroutes.getOrderByOrderId + this.state.currentOrderId)
            .then(response => response.json())
            .then((order) => {
                this.setState({
                    isLoaded: true,
                    currentOrder: order
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        currentOrder: null
                    })
                }
            );*/
        //new code start
        var apiOptions = {
            url: configinfo.apiUrl + configinfo.backendroutes.getOrderByOrderId + this.state.currentOrderId,
            methodName: 'GET',
            contentType: 'application/json',
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res) => {
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                currentOrder: res.data
            }) : this.setState({
                isLoaded: false,
                currentOrder: null
            });
        });
        //new code end
    }
    render() {
        let { shippingAddress = {}, billingAddress = {}, items = [] } = this.state.currentOrder;
        console.log(this.state.currentOrder);
        return (this.props.currentOrderId &&
            <div className='Container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Billing Info</h5>
                                <p>{billingAddress.address}</p>
                                <p>{billingAddress.city + ', ' + billingAddress.state + ', ' + billingAddress.postalCode}</p>
                                <p>{billingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Shipping Info</h5>
                                <p>{shippingAddress.address}</p>
                                <p>{shippingAddress.city + ', ' + shippingAddress.state + ', ' + shippingAddress.postalCode}</p>
                                <p>{shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Order Items</h5>
                                {items.map((item, index) => (<p>{item.medicine.name + ' (Qty: '}   {item.quantity + ')'}</p>))}

                            </div>
                        </div>
                    </div>
                </div>

            </div>);
    }
}
export default withLocation(OrdDetails);
