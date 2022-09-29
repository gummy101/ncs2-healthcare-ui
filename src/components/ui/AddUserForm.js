import { config } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { withNavigate,apiExecute } from '../../HelperFunc.js';
class AddUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            lastname: '',
            firstname: '',
            email: '',
            pwd: '',
            dob: '',
            uid: '',
            userrole: '',
            error: '',
            status: '',
            userRowId:''
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {

        this.setState({ [event.target.id]: event.target.value });

        console.log(this.state);
    }
    handleSubmit = async function (event)
    {
        event.preventDefault();
        //new code start
        let data = {
            firstName: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            birthDate: this.state.dob,
            userId: this.state.lastname+'_'+this.state.firstname,
            password: this.state.pwd,
            role: this.state.userrole
        };
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.addNewUser,
            methodName:'POST',
            contentType:'application/json',
            body: data
        };
        console.log(apiOptions);
        //returns a promise
        var user = await apiExecute(apiOptions);
        //new code end    
        console.log(user);
        
        var apiOptions_1 = {
            url:configinfo.apiUrl + configinfo.backendroutes.addNewCart+ '?userId=' + user.data.id,
            methodName:'POST',
            contentType:'application/json',
            body: {
                userId:user.id
            }
        };
        var cart = await apiExecute(apiOptions_1);
        console.log(cart);
        if(cart.data.id != null && user.data.id != null)
        {
            this.setState({
                status: "success"
            });
            //redirect to page where it came from
            this.props.navigate(-1);
        }
        else
        {
            this.setState({
                status: "failure"
            });
        }
        
    }
    render() {
        
        let failure_elem = (<div>
            <p className="text-bg-danger">
                Unable to onboard a new user.Please contact your application administrator.
            </p>
        </div>);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h2>Signup for eHealth</h2>
                    {this.state.status == "failure" && (failure_elem)}
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="lastname" className="form-label">Last Name</label>
                                        <input className="form-control" id="lastname" value={this.state.lastname} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="firstname" className="form-label">First Name</label>
                                        <input className="form-control" id="firstname" value={this.state.firstname} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="email" className="form-label">Email</label>
                                        <input className="form-control" id="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>

                                </div>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="dob" className="form-label">Date of Birth</label>
                                        <input className="form-control" id="dob" type="date" value={this.state.dob} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="uid" className="form-label">User Id</label>
                                        <input readOnly className="form-control" id="uid" value={this.state.lastname+'_'+this.state.firstname} onChange={this.handleChange} />
                                    </div>

                                </div>
                                <div className='col-sm-6'>

                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="pwd" className="form-label">Password</label>
                                        <input className="form-control" id="pwd" value={this.state.pwd} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="mb-3">
                                        <label for="pwd-repeat" className="form-label">Re-enter Password</label>
                                        <input className="form-control" id="pwd-repeat" value={this.state.pwd} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            <div className='col-sm-6'>
                                <label for="userrole" className="form-label">Role</label>
                                <select className="form-control" id="userrole" value={this.state.userrole} onChange={this.handleChange}>
                                    <option>User</option>
                                    <option>Admin</option>
                                </select> 
                                </div>
                            </div>
                            <input type="submit" value="Submit" className="mt-3 btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default withNavigate(AddUserForm);