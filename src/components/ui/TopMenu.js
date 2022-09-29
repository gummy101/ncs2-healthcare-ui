import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faUsers,faCapsules,faInfo,faTruck,faRightToBracket,faLeftLong,faPrescription,faUserPlus,faUser,faFileExport } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
class TopMenu extends React.Component {    
    render() {
        return (            
                <div className="container">
                    <header className= "d-flex flex-wrap align-items-left justify-content-left justify-content-md-between py-3 mb-4 border-bottom">        
                        <nav className="navbar navbar-expand-lg bg-light">                          
                            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                <li>
                                    <Link to="/" className="nav-link navbar-brand"><FontAwesomeIcon icon={faHouse}/>Home</Link>
                                </li>
                                <li>
                                    <Link to="/users" className="nav-link navbar-brand"><FontAwesomeIcon icon={faUsers}/>Users</Link>
                                </li>
                                <li>
                                    <Link to= "/medicines" className="nav-link navbar-brand"><FontAwesomeIcon icon={faCapsules}/>Medicines</Link>
                                </li>
                                <li>
                                    <Link to= "/orders" className="nav-link navbar-brand text-dark"><FontAwesomeIcon icon={faTruck}/>Orders</Link>
                                </li>
                                <li>
                                    <Link to= "/reports" className="nav-link navbar-brand text-dark"><FontAwesomeIcon icon={faFileExport}/>Reports</Link>
                                </li>                                
                            </ul>
                        </nav>                                                
                        <div className = "col-md-3 text-end">
                            <div className='btn-group'>
                                <Link to="/login" className="btn btn-outline-primary" title="Login"><FontAwesomeIcon icon={faRightToBracket}/></Link>
                                <Link to="/logout" className="btn btn-outline-primary" title="Logout" onClick={this.handleLogout} value="Logout"><FontAwesomeIcon icon={faLeftLong}/></Link>   
                            </div>
                            <div className='btn-group'>
                                <Link to="/adduser" className="btn btn-outline-primary" title="Signup"><FontAwesomeIcon icon={faUserPlus}/></Link>
                            </div>
                            <div className='btn-group'>
                                <Link to="/myprofile" className="btn btn-outline-primary" title="My Profile"><FontAwesomeIcon icon={faUser}/></Link>
                            </div>
                            <div className='btn-group'>
                                <Link to="/displaycart" className="btn btn-outline-primary" title="My Cart"><FontAwesomeIcon icon={faPrescription}/></Link>
                            </div>
                        </div>                        
                    </header>
                </div>
            
        );
    }
}

export default TopMenu;