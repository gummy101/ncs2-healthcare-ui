import React from 'react';
import { Link } from 'react-router-dom';
import med_img from '../images/home_med.jpg';
import { configinfo } from '../../Config.js';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.renderwelcomemessage = this.renderwelcomemessage.bind(this);
    }

    renderwelcomemessage() {
        let elem;
        if (localStorage.getItem("login_status") == "success") {
            elem = <div>Welcome {localStorage.getItem("user_name")}. Your role is {localStorage.getItem("user_role")}</div>;
        }
        else if (localStorage.getItem("login_status") == "failure") {
            elem = <div>Unable to login as {this.state.userid}. Please check your password. If you are a new user, please sign up first.</div>;
        }
        return elem;
    }
    render() {
        return (
            <div className="container" id= "imgContainer" data-testid="imgContainer" style={{ backgroundImage: `url(${med_img})`, width: '100%', height: '600px' }}>
                <main>
                    <div className="row">
                        <h4 className="d-flex justify-content-between align-items-center mb-3 text-center">
                            {localStorage.getItem("login_status") == "success" &&
                                <p className="text-primary text-center">Welcome to eHealth, {localStorage.getItem("user_name")}</p>}
                        </h4>
                    </div>
                    <div className="row">
                        <div className='col-sm-10'>
                            <h4 className="justify-content-between mb-3">
                                <p className='card-text text-center'>Get Medicines delivered to your doorstep.</p>
                                <p className='card-text text-center'>Fast Checkout. Secure Delivery.</p>
                                <p className='card-text text-center'>Next Day delivery.</p>
                            </h4>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default HomePage;