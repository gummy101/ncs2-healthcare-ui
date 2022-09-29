import React from 'react';
class LogoutPage extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentDidMount()
    {
            console.log('logout event fired');        
            localStorage.setItem("login_status","");
            localStorage.setItem("user_role","");
            localStorage.setItem("user_name","");
            localStorage.setItem("cart_id","");
            localStorage.setItem("user_row_id","");
        
    }
    render()
    {
        return(<div className = "container">
            <div className = "row"><h3>You have successfully logged out.</h3>
                <p>Thank you for using eHealth. Have a nice day.</p></div>
        </div>);
    }

}
export default LogoutPage;