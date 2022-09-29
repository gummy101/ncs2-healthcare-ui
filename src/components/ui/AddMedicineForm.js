import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { configinfo } from '../../Config.js';
import { withNavigate,apiExecute } from '../../HelperFunc.js';
class AddMedicineForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            medname: '',
            meddescription: '',
            medmfgr: '',
            medprice: '',
            error: '',
            status: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
        console.log(this.state);
    }
    handleSubmit = async function (e) {
        e.preventDefault();
        
        //new code start
        let data = {
            name: this.state.medname,
            description: this.state.meddescription,
            manufacturer: this.state.medmfgr,
            price: this.state.medprice
        };
        var apiOptions = {
            url:configinfo.apiUrl + configinfo.backendroutes.addMedicine,
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
                status: "success"
            },()=>(this.props.navigate(-1))) : this.setState({
                status: "failure"        
            });
        });
        //new code end
    }

    render() {
        let failure_elem = (<div>
            <p className="text-bg-danger">
                Unable to add a new medicine.Please contact your application administrator.
            </p>
        </div>);
        return (
            <div className="container">
                {this.state.status == "success" && (<Navigate to="/medicines" replace={true}></Navigate>)}
                <form onSubmit={this.handleSubmit}>

                    <h2>Add New Medicine</h2>
                    {this.state.status == "failure" && (failure_elem)}
                    <div className="mb-3">
                        <label for="medname" className="form-label">Name</label>
                        <input className="form-control" id="medname" value={this.state.medname} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="meddescription" className="form-label">Description</label>
                        <input className="form-control" id="meddescription" value={this.state.meddescription} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="medmfgr" className="form-label">Manufacturer</label>
                        <input className="form-control" id="medmfgr" value={this.state.medmfgr} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="medprice" className="form-label">Price</label>
                        <input className="form-control" id="medprice" value={this.state.medprice} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        );
    }
}
export default withNavigate(AddMedicineForm);