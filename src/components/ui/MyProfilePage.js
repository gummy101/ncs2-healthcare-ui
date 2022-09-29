import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import AddressForm from './AddressForm.js';
import PaymentInfo from './PaymentInfo.js';
import { apiExecute } from '../../HelperFunc.js';

class MyProfilePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            dateofbirth:'',
            email:'',
            userid:'',
            password:'',
            addresses:[],
            paymentinfo:[]
        }
    }
    componentDidMount()
    {
        //new code start
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getUserByUserName + localStorage.getItem("user_name"),
            methodName:'GET',
            contentType:'application/json',            
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                firstname:res.data.firstName,
                lastname:res.data.lastName,
                dateofbirth:res.data.birthDate,
                email:res.data.email,
                userid:res.data.userId,
                password:res.data.password,
                addresses:res.data.address,
                paymentinfo:res.data.paymentInfo
            }) : this.setState({
                status: "failure"        
            });
        });
        //new code end    
     
    }
    render()
    {
        return(<div>
                    <div className='py-5 text-center'>
                        <h3 className="mb-3">My Profile</h3>
                    </div>                
                    <div className='container'>                        
                        <div className='row g-3'>
                            <div className='col-sm-6'>
                                <h4 className="mt-1">Personal Info</h4>
                                <div className='row'>                                
                                    <div className='col-sm-5'>
                                        <label for="firstname" className="form-label">First name</label>
                                        <input type="text" className="form-control" id="firstname" placeholder="" value={this.state.firstname} required></input>
                                    </div>
                                    <div className='col-sm-5'>
                                        <label for="lastname" className="form-label">Last name</label>
                                        <input type="text" className="form-control" id="lastname" placeholder="" value={this.state.lastname} required></input>
                                    </div>
                                    <div className='col-sm-5'>
                                        <label for="birthdate" className="form-label">Birth Date</label>
                                        <input type="text" className="form-control" id="birthdate" placeholder="" value={this.state.birthdate} required></input>
                                    </div>
                                    <div className='col-sm-5'>
                                        <label for="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email" placeholder="" value={this.state.email} required></input>
                                    </div>
                                    <div className='col-sm-5'>
                                        <label for="userid" className="form-label">User Id</label>
                                        <input type="text" className="form-control" id="userid" placeholder="" value={this.state.userid} required></input>
                                    </div>
                                    <div className='col-sm-5'>
                                        <label for="password" className="form-label">Password</label>
                                        <input type="text" className="form-control" id="password" placeholder="" value={this.state.password} required></input>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='row'>
                                    <h4 className="mb-3">Addresses</h4>
                                    <AddressForm/>
                                </div>                                
                                <div className='row'>
                                    <h4 className="mb-3">Payment Methods</h4>
                                    <PaymentInfo paymentinfo = {this.state.paymentinfo} showaddlink = {true}/>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>);
    }

}
export default MyProfilePage;