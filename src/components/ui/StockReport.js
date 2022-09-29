import React from 'react';

class StockReport extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('inside componentdidmount');
    }
    render() {
        const stockdata = this.props.stockdata;
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Total Sale</th>
                        <th>Remaining Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {stockdata != null && Array.from(stockdata.keys()).map((key, index) => {
                        return (<tr>
                            <td>{key}</td>
                            <td>{stockdata.get(key)}</td>
                            <td>{Math.floor(Math.random() * 100)}</td>
                        </tr>);
                    })};
                </tbody>
            </table>
        );
    }
}
export default StockReport;