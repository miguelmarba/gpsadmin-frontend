import React from 'react';
import Sidebar from './Sidebar';
import Head from './Head';

function Layout({ title, children }){
    return (
        <>
        <Sidebar />
        <Head title={title} children={children} />
        </>
    );
}

export default Layout;