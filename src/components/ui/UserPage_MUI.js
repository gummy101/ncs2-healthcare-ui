import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { configinfo } from '../../Config.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Container';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

class UserMUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: ""
        }
    }
    componentDidMount() {
        fetch(configinfo.apiUrl + configinfo.backendroutes.getAllUsers)
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
                        isLoaded: false,                        
                    })
                }
            );
    }
    formatcolumns()
    {
        const columns = [
            { field: 'id', headerName: 'Id', width: 30 },
            {
                field: 'firstName',
                headerName: 'First name',
                width: 100,
                editable: true,
                flex:1
            },
            {
                field: 'lastName',
                headerName: 'Last name',
                width: 100,
                editable: true,
                flex:1
            },
            {
                field: 'email',
                headerName: 'Email',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                flex:1                
            },
            {
                field:'address',
                headerName: 'Address',
                width:20,
                flex:1,
                align:'center',
                headerAlign:'center',
                renderCell:(params)=>(<Link to= {"/addresses/user/" + params.row.id} className="bg-light"><FontAwesomeIcon icon={faAddressCard}/></Link>)
                
            },            
            {
                field: 'birthDate',
                headerName: 'Birth Date',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                flex:1,
                valueGetter: (params) => (params.row.birthDate.slice(0,10)),                   
            },
            {
                field: 'userId',
                headerName: 'User Id',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                flex:1,                
            },
            {
                field: 'password',
                headerName: 'Password',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                flex:1,                
            },
            {
                field: 'role',
                headerName: 'Role',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 60,
                flex:1,                
            },
            {
                field: 'createdDate',
                headerName: 'Created On',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 60,
                flex:1,    
                valueGetter: (params) => (params.row.createdDate.slice(0,10)),            
            },
            
        ];
        return columns;
    }
    render() {
        const { error, isLoaded, items } = this.state;        
        if (error) {
            return (<div className = "container"> <h1>Error : {error.message}</h1></div >);
        }
        else if (!isLoaded){
            return (<div className = "container"> <h1>Loading Users....</h1></div >);
        }
        const columns = this.formatcolumns();
        const rows = items;
        return (
                <div className = "container">
                    <h4 className = 'mt-1'>Users</h4>                
                    <Link to="/adduser" className="bg-light">Add User</Link>                
                    <div style={{height:'600px',width:'100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[5]}                            
                            disableSelectionOnClick                            
                        />
                    </div>
                </div>
            
        )
    }
}
export default UserMUI;