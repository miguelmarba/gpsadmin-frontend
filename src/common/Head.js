import React from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import PageContent from './PageContent';

function Head(){
    return (
        <>
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <Topbar ></Topbar>
            </div>
            {/* Begin Page Content */}
            <PageContent title="Usuarios" />
            {/* Footer */}
            <Footer ></Footer>
        </div>
        </>
    );
}

export default Head;