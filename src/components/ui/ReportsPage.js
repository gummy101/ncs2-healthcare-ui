import React from 'react';
import { Link } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import Box from '@mui/material/Container';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import OrdDetails from './OrdDetails.js';
import { withNavigate, apiExecute } from '../../HelperFunc.js';
import { Parser } from 'json2csv';
import SaleReport from './SaleReport.js';
import MedicineShippingReport from './MedicineShippingReport.js';
import StockReport from './StockReport.js';


class ReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            saledata: null,
            ship_addr_data:null,
            stockdata :null,
            activeReport:""
        }
    }
    componentDidMount() {
        console.log("inside componentdidmount");
        //new code start
        //new code end

    }
    formatReportData(options, data) {
        switch (options.reptype) {
            case 'ship_addr_data':
                let shipaddrMap = new Map();
                let s = data.map((order,index,array)=>{
                    //reduce items array to a arry of medicine names
                    let medNames = order.items.reduce((accumulator,item,index,array)=>(accumulator.concat(item.medicine.name)),[]);
                    //concatenated ship address
                    let shipAddr = `${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.state} ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`;
                    console.log(shipAddr);
                    console.log(medNames);
                    if(shipaddrMap.has(order.shippingAddress.id) == true)
                    {
                        //an object containing ship addr and mednames array
                        let meds = shipaddrMap.get(order.shippingAddress.id)
                        meds.shippedMeds.concat(...medNames);
                        shipaddrMap.set(order.shippingAddress.id,meds)
                    }
                    else
                    {                        
                        shipaddrMap.set(order.shippingAddress.id,{addr:shipAddr, shippedMeds : medNames});
                    }                    
                });
                console.log(s);
                this.setState({
                    ship_addr_data:shipaddrMap
                });
                console.log(shipaddrMap);
                break;
            case 'sale':
                let medMap = new Map();
                let t = data.map((order, index, array) => {
                    order.items.map((oi, index, array) => {

                        //set the medicine in the map, and set count to 1
                        if (medMap.has(oi.medicine.name) == false) {
                            medMap.set(oi.medicine.name, 1)
                        }
                        else //increment the count by 1
                        {
                            let cnt = medMap.get(oi.medicine.name);
                            medMap.set(oi.medicine.name, cnt + 1);
                        }
                    });
                });
                this.setState({
                    saledata: medMap
                });
                //console.log(medMap);
                case 'stock':
                    let medStockMap = new Map();
                    let ts = data.map((order, index, array) => {
                        order.items.map((oi, index, array) => {
    
                            //set the medicine in the map, and set count to 1
                            if (medStockMap.has(oi.medicine.name) == false) {
                                medStockMap.set(oi.medicine.name, 1)
                            }
                            else //increment the count by 1
                            {
                                let cnt = medStockMap.get(oi.medicine.name);
                                medStockMap.set(oi.medicine.name, cnt + 1);
                            }
                        });
                    });
                    this.setState({
                        stockdata: medStockMap
                    });
                    //console.log(medMap);
            default:
                break;
        }        
    }
    runReport(options) {
        var apiOptions = {};
        var result = null;
        switch (options.reptype) {
            case 'ship_addr_data':
                apiOptions = {
                    url: configinfo.apiUrl + configinfo.backendroutes.getAllOrders,
                    methodName: 'GET',
                    contentType: 'application/json'
                };
                this.setState({activeReport:"ship_addr_data"});
                //console.log(apiOptions);
                result = apiExecute(apiOptions);
                result.then((res) => {
                    //console.log(res);
                    res.status == "success" ? this.formatReportData(options, res.data) : this.setState({
                        reportStatus: 'error'
                    });
                });
                break;
            case 'all_orders':
                break;
            case "stock":
                apiOptions = {
                    url: configinfo.apiUrl + configinfo.backendroutes.getAllOrders,
                    methodName: 'GET',
                    contentType: 'application/json'
                };
                this.setState({activeReport:"stock"});
                //console.log(apiOptions);
                result = apiExecute(apiOptions);
                result.then((res) => {
                    console.log(res);
                    res.status == "success" ? this.formatReportData(options, res.data) : this.setState({
                        reportStatus: 'error'
                    });
                });
                break;
            case 'sale':
                apiOptions = {
                    url: configinfo.apiUrl + configinfo.backendroutes.getAllOrders,
                    methodName: 'GET',
                    contentType: 'application/json'
                };
                this.setState({activeReport:"sale"});
                //console.log(apiOptions);
                result = apiExecute(apiOptions);
                result.then((res) => {
                    console.log(res);
                    res.status == "success" ? this.formatReportData(options, res.data) : this.setState({
                        reportStatus: 'error'
                    });
                });
            default:
                break;
        }
        //e.preventDefault();

    }
    

    render() {
        const {saledata,ship_addr_data,stockdata} = this.state;
        console.log(saledata);
        return (             
            <div className="container">
                <div className='row'>
                    <ul className='list-group list-group-horizontal'>
                        <li className='list-group-item'><Link to="" onClick={() => this.runReport({ reptype: 'ship_addr_data' })}>Medicine Shipping Report</Link></li>
                        <li className='list-group-item'><Link to="" onClick = {()=>this.runReport({ reptype: 'stock' })}>Stock Report</Link></li>
                        <li className='list-group-item'><Link to="" onClick={() => this.runReport({ reptype: 'sale' })}>Sale Report</Link></li>                        
                    </ul>
                </div>
                {this.state.activeReport == "sale" && <SaleReport saledata = {saledata} />}
                {this.state.activeReport == "ship_addr_data" && <MedicineShippingReport shipdata = {ship_addr_data} />}
                {this.state.activeReport == "stock" && <StockReport stockdata = {stockdata} />}
            </div>
        );
    }
}
export default ReportsPage;