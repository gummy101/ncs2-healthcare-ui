import React, { Children } from 'react';
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom';

function withRouter(Children)
{
    return (props)=>{
        const match = {param:useParams()}
        return <Children {...props} match={match}/>
    }
}

function withNavigate(Children)
{
    return (props)=>{
        const navigate = useNavigate();
        return <Children {...props} navigate={navigate}/>
    }
}
function withLocation(Children)
{
    return (props)=>{
        const location = useLocation();
        return <Children {...props} location={location} />
    }
}

async function apiExecute(fetchParams)
{
    /**********************************************
     * execute fetch api with appropriate methods and return results
     * ************************************************/
     let url = fetchParams.url;
     let options = {
         method: fetchParams.methodName, // *GET, POST, PUT, DELETE, etc.            
         headers: {
         'Content-Type': fetchParams.contentType,
         'Authorization': 'bearer ' + localStorage.getItem("token")
         },
         redirect: 'follow', // manual, *follow, error         
         body: JSON.stringify(fetchParams.body) // body data type must match "Content-Type" header
     };  
     //using fetch api, validate user and get token, and store it in localstorage
     let res = await fetch(url,options);            
     let resjson = await res.json();
     if (res.status == 200 || res.status == 201) {
         var result = {
             status:"success",
             data:resjson
         }
         return result;                
     }
     else {
         var err = {
             status:"failure",
             data:{}
         };
         return err;                
     }

}
export {withRouter,withNavigate,withLocation,apiExecute}