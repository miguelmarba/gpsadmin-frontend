import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

function Layout({ title, children }){
    return (
        <>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <Topbar ></Topbar>
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