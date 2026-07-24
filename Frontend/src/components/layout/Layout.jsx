import React from 'react'
import PreHeader from './Preheader'
import Header from './Header'
import Footer from './Footer'
const Layout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
          <PreHeader />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      );
}

export default Layout
