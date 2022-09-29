import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import med_img from '../images/home_med.jpg';
import { configinfo } from '../../Config.js';
class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userid:'',
            user_row_id:0,
            cartid:0,
            pwd:'',
            role:'', 
            error:'',
            status:'',
            token:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setlocalstorage = this.setlocalstorage.bind(this);        
    }
    handleChange(event) {       

        this.setState({ [event.target.id]: event.target.value },this.setlocalstorage);            
        //console.log(this.state);
    }    
    handleSubmit = async (e) =>{
        e.preventDefault();
        try
        {
            let url = configinfo.apiUrl + configinfo.backendroutes.signin + '?username=' + this.state.userid + '&password=' + this.state.pwd;
            let options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.            
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                //body: JSON.stringify(data) // body data type must match "Content-Type" header
            };  
            //using fetch api, validate user and get token, and store it in localstorage
            let res = await fetch(url,options);            
            let resjson = await res.json();
            if (res.status == 200) {
                this.setState({
                    status: "success",
                    role :resjson.role,
                    user_row_id :resjson.id, 
                    cartid:resjson.cartid,
                    token:resjson.token
                },this.setlocalstorage);                
            }
            else {
                this.setState({
                    status: "failure",
                    error:`${res.status} ${res.statusTextText}`
                },this.setlocalstorage);                
            }            
        }
        catch(oErr)
        {
            console.log(oErr);
            this.setState({
                status: "failure",
                error:oErr
            },this.setlocalstorage);
        }       
    }    
    setlocalstorage = function ()
    {
        console.log('inside setloclstorage');
        console.log(this.state);
        localStorage.setItem("login_status",this.state.status);
        localStorage.setItem("user_role",this.state.role);
        localStorage.setItem("user_name",this.state.userid);
        localStorage.setItem("user_row_id",this.state.user_row_id);
        localStorage.setItem("cart_id",this.state.cartid);
        localStorage.setItem("token",this.state.token);
    }    
    render()
    {
        let styles = {    
            width: '800px',
            height: '400px'            
        };
        let failure_elem = (<div>
                                <p className = "text-bg-danger">
                                Unable to login as {this.state.userid}. Please check your password. If you are a new user, please sign up first.
                                </p>
                            </div>);
    return (
        <div className='container'>
            {this.state.status == "success" && (<Navigate to="/homepage" replace={true}></Navigate>)}                                    
            <div className="card" style = {styles}>
                <div className="card-body">
                    {this.state.status == "failure" && (failure_elem)}
                    <form onSubmit = {this.handleSubmit}>
                            <div className='container'> 
                                <div className='row mt-3'>
                                    <div className="col-6">
                                        <div className="form-floating" data-testid="userId">
                                            <input type="text" className="form-control" id="userid" placeholder="Enter your userid here" value = {this.state.userid} onChange ={this.handleChange}/>
                                            <label for="userid">User Id</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="pwd" placeholder="Password" value = {this.state.pwd} onChange ={this.handleChange}/>
                                            <label for="pwd">Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                        <input type="submit" value="Submit" className="btn btn-primary" />                                                                                                        
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>        
    );
    }
}
export default LoginForm;