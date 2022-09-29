import React from 'react';

class SaleReport extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('inside componentdidmount');
    }
    render() {
        const saledata = this.props.saledata;
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Total Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {saledata != null && Array.from(saledata.keys()).map((key, index) => {
                        return (<tr>
                            <td>{key}</td>
                            <td>{saledata.get(key)}</td>
                        </tr>);
                    })};
                </tbody>
            </table>
        );
    }
}
export default SaleReport;