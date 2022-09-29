import React from "react";
class RouteProtector extends React.Component
{
    constructor(props)
    {
        super(props);        
    }
    render()
    {        
        if (localStorage.getItem("login_status") == "success")
            return (this.props.children);
        else
            return (<div className = "container">
                        <h2>
                            <p className="text-info bg-light">
                                Not Authorized. Please login first.
                            </p>
                            <p className="text-info bg-light">
                                If you are a new user, please sign up using signup link.
                            </p> 
                        </h2>
                    </div>);                    
    }
}
export default RouteProtector;