import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function PageContent(props){
    const [title] = useState(props.title);
    const [children] = useState(props.children);
    return (
        <>
        <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{ title }</h1>
                <Link to="/" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                </Link>
            </div>
            { children }
        </div>
        </>
    );
}

export default PageContent;