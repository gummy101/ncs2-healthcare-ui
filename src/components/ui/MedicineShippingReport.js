import React from 'react';

class MedicineShippingReport extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('inside componentdidmount');
    }
    render() {
        const shipdata = this.props.shipdata;
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Address Id</th>
                        <th>Address</th>                        
                        <th>Shipped Medicines</th>
                    </tr>
                </thead>
                <tbody>
                    {shipdata != null && Array.from(shipdata.keys()).map((key, index) => {
                        return (<tr>
                            <td>{key}</td>
                            <td>{shipdata.get(key).addr}</td>
                            <td>{shipdata.get(key).shippedMeds.join(',')}</td>
                        </tr>);
                    })};
                </tbody>
            </table>
        );
    }
}
export default MedicineShippingReport;