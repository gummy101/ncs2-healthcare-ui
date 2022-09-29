import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: ""
        }
    }
    componentDidMount() {
        fetch(configinfo.apiUrl + '/User')
            .then(response => response.json())
            .then((users) => {
                console.log(users);
                this.setState({
                    isLoaded: true,
                    items: users
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        items: [{
                            "id": 1, "firstName": "Abhilash", "lastName": "Chacko", "email": "abhik78@yahoo.com", "createdDate": "0001 - 01 - 01T00: 00: 00",
                            "updatedDate": "0001-01-01T00:00:00", "birthDate": "1978-02-12T00:00:00", "userId": "abhik78", "password": "xxx", "address": []
                        }]
                    })
                }
            );                
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return (<div> <h1>Error : {error.message}</h1></div >);
        }
        else if (!isLoaded){
            return (<div> <h1>Loading Users....</h1></div >);
        }
        return (
            <div className="container">
                <Link to="/adduser" className="bg-light">Add User</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birth Date</th>
                            <th>User Id</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Created Date</th>
                            <th>Updated Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.birthDate.slice(0,10)}</td>
                                <td>{item.userId}</td>
                                <td>{item.password}</td>
                                <td>{item.role}</td>
                                <td><Link to= {"/addresses/user/" + item.id} className="bg-light"><FontAwesomeIcon icon={faAddressCard}/></Link></td>
                                <td>{item.createdDate.slice(0,10)}</td>
                                <td>{item.updatedDate.slice(0,10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default UsersPage;