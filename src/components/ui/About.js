import React from 'react';
class AboutPage extends React.Component {
    render() {
        let styles = {    
                width: '800px',
                height: '400px'            
        };
        return (
            <div className='container'>
                <div className="card" style = {styles}>
                    <div className="card-body">
                        <p className="card-text">EHealth is a $2B multi national company.</p>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default AboutPage;