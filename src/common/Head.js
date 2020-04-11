import React, { useState } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import PageContent from './PageContent';

function Head( props ){
    const [title] = useState(props.title);
    const [children] = useState(props.children);
    return (
        <>
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <Topbar ></Topbar>
                {/* Begin Page Content */}
                <PageContent title={title} children={children}/>
            </div>
            {/* Footer */}
            <Footer ></Footer>
        </div>
        </>
    );
}

export default Head;