import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { withRouter } from "../../HelperFunc";
import { states, addressType , countries} from '../../LovData';
import { apiExecute } from '../../HelperFunc.js';

class AddAddresForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            street: '',
            city: '',
            state: '',
            postalcode: '',
            country: '',
            addresstype: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.user_row_id = localStorage.getItem("user_row_id");
    }
    handleSubmit = async function (event) {
        console.log(this.state);
        console.log(event);
        event.preventDefault();
        try {
            //new code start
            let data = {
                address: this.state.street,
                city: this.state.city,
                state: this.state.state,
                postalCode: this.state.postalcode,
                country: this.state.country,
                addressType: this.state.addresstype,
                userId: this.user_row_id
            };
            var apiOptions = {
                url:configinfo.apiUrl + configinfo.backendroutes.newAddress,
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
            });
            //new code end
        }
        catch (error) {
            this.setState({
                status: "failure"
            });
            console.log(error);
        }
    }
    handleChange = async function (event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        return (<div className="container">
            {this.state.status == "success" && (<Navigate to={"/addresses/user/" + this.props.match.param.id} replace={true}></Navigate>)}
            <h2>Add New Address</h2>
            <form onSubmit={this.handleSubmit}>
                <div className='col-lg-8'>
                    <div className="row mb-3">
                        <div className='col-sm-6'>
                            <label for="street" className="form-label">Street Address</label>
                            <input className="form-control" id="street" value={this.state.street} onChange={this.handleChange} />
                        </div>
                        <div className='col-sm-6'>
                            <label for="city" className="form-label">City</label>
                            <input className="form-control" id="city" value={this.state.city} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-sm-4'>
                            <label for="state" className="form-label">State</label>
                            <select className="form-select" id="state" value={this.state.state} onChange={this.handleChange}>
                                {states.map((item, index) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>
                        <div className='col-sm-4'>
                            <label for="postalcode" className="form-label">Postal Code</label>
                            <input className="form-control" id="postalcode" value={this.state.postalcode} onChange={this.handleChange} />
                        </div>
                        <div className='col-sm-4'>
                            <label for="country" className="form-label">Country</label>
                            <select className="form-select" id="country" value={this.state.country} onChange={this.handleChange}>
                            {countries.map((item, index) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-sm-8'>
                            <label for="state" className="form-label">Address Type</label>
                            <select className="form-select" id="addresstype" value={this.state.addresstype} onChange={this.handleChange}>
                                {addressType.map((item, index) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>
                        <div className='col-sm-4'></div>
                    </div>
                    <hr className="my-4"></hr>
                    <div className='row'>
                        <button type="submit" className="w-100 btn btn-primary btn-lg">Submit</button>
                    </div>
                </div>
            </form>
        </div>);
    }
}
export default withRouter(AddAddresForm);