import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { withRouter,apiExecute } from "../../HelperFunc";
class AddNewPaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            accountNumber : '',
            amount :0            
        }
    }
    handleSubmit = async function (event)
    {
        event.preventDefault();
        try
        {
            
            //new code start
            let data = {
                accountId: this.state.accountNumber,
                amount: this.state.amount,
                userId: this.props.match.param.id                       
            };
            var apiOptions = {
                url:configinfo.apiUrl + configinfo.backendroutes.addNewPayment,
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
        catch(error)
        {
            console.log(error);
            this.setState({
                status: "failure"
            });
        }
    }
    handleChange = async function(e)
    {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {
        console.log(this.state);
        let failure_elem = (<div>
            <p className = "text-bg-danger">
            Unable to add a new payment method.Please contact application administrator.
            </p>
        </div>);
        return (<div className="container">
            {this.state.status == "success" && (<Navigate to="/myprofile" replace={true}></Navigate>)}                                    
            {this.state.status == "failure" && (failure_elem)}
            <form onSubmit = {this.handleSubmit}>
            <h2>Add New Payment Method</h2>
            <div className="row">
                <div className="col-sm-6">
                    <label for="creditCardNumber" class="form-label">Account #</label>
                    <input type="text" class="form-control" id="accountNumber" placeholder="" value={this.state.accountNumber} onChange={this.handleChange} required></input>
                    <label for="cardtype" class="form-label">Amount</label>
                    <input type="text" class="form-control" id="amount" placeholder="" value={this.state.amount} onChange={this.handleChange} required></input>
                    <hr className="my-4"></hr>
                    <button type="submit" className="w-100 btn btn-primary btn-lg">Submit</button>                    
                </div>
            </div>
            </form>
        </div>);
    }
}
export default withRouter(AddNewPaymentForm);