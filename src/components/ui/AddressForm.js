import React from "react";
import { Link, useParams } from "react-router-dom";
import { configinfo } from "../../Config";
import { withRouter,apiExecute } from "../../HelperFunc";
class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            addrs: [],
            error: '',
        }
        this.user_row_id = this.props.match.param.id == null ? localStorage.getItem("user_row_id") : this.props.match.param.id;
    }
    componentDidMount() {
        //new code start
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getAddressByUser + this.user_row_id,
            methodName:'GET',
            contentType:'application/json',            
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                addrs: res.data.address
            }) : this.setState({
                isLoaded: false,
                error: 'Addresses failed to load'      
            });
        });
        //new code end
    }
    render() {
        let { error, isLoaded, addrs } = this.state;
        { this.props.addr_type == "Shipping" && (addrs = addrs.filter(i => (i.addressType == "Shipping"))) };
        { this.props.addr_type == "Billing" && (addrs = addrs.filter(i => (i.addressType == "Billing"))) };
        if (error.length > 0)
            return (<div className="container">{this.state.error}</div>)
        return (<div className="container">
            <Link to={"/addaddress/user/" + this.user_row_id} className="bg-light">Add New Address</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {this.props.displayselectcol == false && <th>Id</th>}
                        {this.props.displayselectcol == true && <th></th>}

                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Address Type</th>
                    </tr>
                </thead>
                <tbody>
                    {addrs?.map((addr) => (
                        <tr>
                            {this.props.displayselectcol == false && <td>{addr.id}</td>}
                            {this.props.displayselectcol == true && <td><input id="selected_addr" onChange={(e) => this.props.selchange(e.target.value)} name={addr.addressType} type="radio" className="form-check-input" value={addr.id} ></input></td>}

                            <td>{addr.address}</td>
                            <td>{addr.city}</td>
                            <td>{addr.state}</td>
                            <td>{addr.postalCode}</td>
                            <td>{addr.country}</td>
                            <td>{addr.addressType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>);
    }
}
export default withRouter(AddressForm);
//export default AddressForm;