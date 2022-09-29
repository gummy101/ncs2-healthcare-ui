import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { apiExecute } from '../../HelperFunc.js';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

class MedicinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error :"",
            cartid:''
        };
        this.addToCart = this.addItemsToCart.bind(this);
    }
    componentDidMount()
    {
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.getAllMedicine,
            methodName:'GET',
            contentType:'application/json'
        };
        console.log(apiOptions);
        var result = apiExecute(apiOptions);
        result.then((res)=>{
            console.log(res);
            res.status == "success" ? this.setState({
                isLoaded : true,
                items:res.data
            }) : this.setState({
                isLoaded:false,
                items:[]
            });
        });
    }
    addItemsToCart = async function  (event,id) {
        try{
            let data = {
                medicineId: id,
                cartId:localStorage.getItem("cart_id")
            };
            var apiOptions = {
                url:configinfo.apiUrl + configinfo.backendroutes.addItemtoCart,
                methodName:'POST',
                contentType:'application/json',
                body: data
            };
            console.log(apiOptions);
            //returns a promise
            var result = apiExecute(apiOptions);
            console.log(result);
            result.then((res)=>{
                console.log(res);
                res.status == "success" ? this.setState({
                    additemtocartstatus:'success'
                }) : this.setState({
                    additemtocartstatus:'failure',
                    error :"Error while adding items to cart"        
                });
            });                
        }
        catch(oErr)
        {

        }
    }    
    formatcolumns()
    {
        const columns = [
            { field: 'id', headerName: 'Id', width: 30 },            
            {
                field: 'name',
                headerName: 'Name',
                width: 100,
                editable: true,
                flex:1
            },
            {
                field: 'description',
                headerName: 'Description',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
                flex:1                
            },
            {
                field:'createdDate',
                headerName: 'Created Date',
                width:20,
                flex:1,   
                valueGetter: (params) => (params.row.createdDate.slice(0,10))             
            },            
            {
                field: 'manufacturer',
                headerName: 'Manufacturer',
                description: 'This column has a value getter and is not sortable.',
                sortable: true,
                width: 100,
                flex:1,                                 
            },
            {
                field: 'price',
                headerName: 'Price',
                sortable: true,
                width: 100,
                flex:1,                
            },
            {
                field: 'addtocart',
                headerName: '',
                sortable: false,
                width: 20,
                flex:1,     
                renderCell:(params)=>(<button className = "btn btn-link" onClick = {(e)=>this.addItemsToCart(e,params.row.id)}>
                    <FontAwesomeIcon icon={faCartPlus}/>
                    </button>),
                           
            },            
            
        ];
        return columns;
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const columns = this.formatcolumns();
        const rows = items;
        
        if (error) {
            return (<div> <h1>Error : {error.message}</h1></div >);
        }
        else if (!isLoaded) {
            return (<div id='loadMsg'> <h1>Loading Medicines....</h1></div >);
        }
        else {
            return (
                <div className="container">
                    <h4 className = 'mt-1'>Medicines</h4>
                    <Link to="/addmedicine" className="bg-light">Add Medicine</Link>
                    <div data-testid = "medTable" style={{height:'600px',width:'100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[5]}                            
                            disableSelectionOnClick                            
                        />
                    </div>
                </div>
            );
        }

    }
}
export default MedicinePage;