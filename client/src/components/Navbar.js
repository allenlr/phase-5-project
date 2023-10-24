import React from 'react'

function Navbar(){
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <Link to="/account" className="nav-link">
                Account
            </Link>
            <Link to="/services" className="nav-link">
                Services
            </Link>

        </nav>
    )
}
    

export default Navbar;