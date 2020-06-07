import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

function Layout({ title, children }){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    }
       
    return (
        <>
        <Sidebar isMenuOpen={isMenuOpen} />
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <Topbar toggleMenu={toggleMenu.bind()} ></Topbar>
                {/* Begin Page Content */}
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            {/* Footer */}
            <Footer ></Footer>
        </div>
        </>
    );
}

export default Layout;