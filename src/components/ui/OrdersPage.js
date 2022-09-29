import React from 'react';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import Box from '@mui/material/Container';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import OrdDetails from './OrdDetails.js';
import { withNavigate,apiExecute } from '../../HelperFunc.js';


class OrdersPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded:false,
            error:'', 
            status:'',
            orders:[], 
            currorder:''
                         
        }        
    }    
    componentDidMount()
    {
        console.log("inside componentdidmount");
        //new code start
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getOrdersByUserId + localStorage.getItem("user_name"),
            methodName:'GET',
            contentType:'application/json',            
        };
        console.log(apiOptions);
        //returns a promise
        var result = apiExecute(apiOptions);
        console.log(result);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded: true,
                orders: res.data,
                status:'success'
            }) : this.setState({
                isLoaded: false,
                error:'Orders failed to load',
                status:'failure'        
            });
        });
        //new code end
         
    }
    formatcolumns()
    {
        const columns = [
            { field: 'id', headerName: 'Order Number', width: 100 },
            {
                field: 'createdDate',
                headerName: 'Created On',
                width: 100,
                valueGetter: (params) => (params.row.createdDate.slice(0,10)),   
                flex:1
            },
            {
                field: 'orderStatus',
                headerName: 'Order Status',
                width: 100,                
                flex:1
            },
            {
                field: '',
                headerName: 'Order Placed By',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 100,
                valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`,    
                flex:1                
            },            
        ];
        return columns;
    }
       
    
    render() {
        let {orders} = this.state;
        const columns = this.formatcolumns();
        const rows = orders;
        
        return (
            <div className="container">
                <h4 className = 'mt-1'>Orders</h4>
                <div className='row mt-1'>
                <div style={{height:'400px',width:'100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[5,10.20]}                            
                            disableSelectionOnClick
                            onRowClick = {(params)=>(this.setState({currorder:params.row.id}))}                                                      
                        />
                    </div>                
                </div>
                <div className='row mt-1'>
                
                {this.state.currorder && <OrdDetails key = {this.state.currorder} currentOrderId = {this.state.currorder}></OrdDetails>}
                </div>                
            </div>
        );
    }
}
export default OrdersPage;