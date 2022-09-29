import { Route, Routes } from 'react-router-dom';
import MedicinesPage from '../src/components/ui/MedicinePage';
import TopMenu from '../src/components/ui/TopMenu';
import UsersPage from '../src/components/ui/UsersPage';
import './App.css';
import RouteProtector from './components/Routeprotector';
import AboutPage from '../src/components/ui/About';
import AddAddresForm from '../src/components/ui/AddAddressForm';
import AddMedicineForm from '../src/components/ui/AddMedicineForm';
import AddressForm from '../src/components/ui/AddressForm';
import AddUserForm from '../src/components/ui/AddUserForm';
import HomePage from '../src/components/ui/Homepage';
import LoginForm from '../src/components/ui/LoginForm';
import OrdersPage from '../src/components/ui/OrdersPage';
import DisplayCart from '../src/components/ui/DisplayCart';
import CheckoutForm from '../src/components/ui/CheckoutForm';
import MyProfilePage from './components/ui/MyProfilePage';
import React from 'react';
import AddNewPaymentForm from './components/ui/AddNewPaymentForm';
import LogoutPage from './components/ui/LogoutPage';
import UserMUI from './components/ui/UserPage_MUI';
import OrdDetails from './components/ui/OrdDetails';
import ReportsPage from './components/ui/ReportsPage';

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user_name:'',
            user_role:'',
            login_status:''
        }

    }
    render()
    {
        return (
            <>
                
                <TopMenu />            
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/homepage" element={<HomePage/>} />                    
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/adduser" element={<AddUserForm/>} />                

                    <Route path="/logout" element={<LogoutPage/>} />
                    <Route path="/users" element={
                        <RouteProtector>
                            <UserMUI/>
                        </RouteProtector>
                    } />
                    <Route path="/medicines" element={
                        <RouteProtector>
                            <MedicinesPage/>
                        </RouteProtector>
                    } />
                    <Route path="/orders" element={
                        <RouteProtector>
                            <OrdersPage/>
                        </RouteProtector>
                    } />
                    <Route path="/about" element={
                        <RouteProtector>
                            <AboutPage/>
                        </RouteProtector>
                    } />
                    <Route path="/addmedicine" element={
                        <RouteProtector>
                            <AddMedicineForm/>
                        </RouteProtector>
                    } />                
                    <Route path="/addresses/user/:id" element={
                        <RouteProtector>
                            <AddressForm/>
                        </RouteProtector>
                    }/>
                    <Route path="/addaddress/user/:id" element={
                        <RouteProtector>
                            <AddAddresForm/>
                        </RouteProtector>
                    } />
                    <Route path="/addpayment/user/:id" element={
                        <RouteProtector>
                            <AddNewPaymentForm/>
                        </RouteProtector>
                    } />
                    <Route path="/displaycart" element={
                        <RouteProtector>
                            <DisplayCart/>
                        </RouteProtector>
                    } />
                    <Route path="/checkout" element={
                        <RouteProtector>
                            <CheckoutForm/>
                        </RouteProtector>
                    } />
                    <Route path="/myprofile" element={
                        <RouteProtector>
                            <MyProfilePage/>
                        </RouteProtector>
                    } />
                    <Route path="/reports" element={
                        <RouteProtector>
                            <ReportsPage/>
                        </RouteProtector>
                    } />                                
                </Routes>
                      
          </>
      );
    }
}
export default App;
