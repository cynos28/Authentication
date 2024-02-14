import React from 'react'
import Header from '../header/header'
import Footer from '../footer/Footer'


function Layout({children}) {
    return (
        <div>

            <Header />

            <div className='--pad' style={{minHeight:"80vh"}}>
                {children}
            </div>

            <Footer />

        </div>
    )
}

export default Layout