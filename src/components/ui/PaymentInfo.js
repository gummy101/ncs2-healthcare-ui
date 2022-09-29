import React from 'react';
import { Link, useParams } from "react-router-dom";
import { withRouter } from '../../HelperFunc';
class PaymentInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (<div>
            {this.props.showaddlink &&  <Link to={"/addpayment/user/" + localStorage.getItem("user_row_id")} className="bg-light">Add New Payment Method</Link>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        {this.props.displayselectcol == false &&<th>Id</th>}
                        {this.props.displayselectcol == true &&<th></th>}
                        <th>Account #</th>
                        <th>Balance Amount</th>
                        <th>Created Date</th>                        
                    </tr>
                </thead>
                <tbody>
                            {this.props.paymentinfo.map((p)=>(
                                <tr key={p.id}>
                                    {this.props.displayselectcol == false &&  <td>{p.id}</td>}   
                                    {this.props.displayselectcol == true &&  <td><input id="selected_payment" onChange = {(e)=> this.props.selchange(e.target.value)} name="selected_payment" type="radio" className="form-check-input" value={p.id} ></input></td>}                              
                                    <td>{p.accountNumber}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.created.slice(0,10)}</td>                                               
                                </tr>
                            ))}
                        </tbody>
            </table>
        </div>);
    }

}
export default withRouter(PaymentInfo);