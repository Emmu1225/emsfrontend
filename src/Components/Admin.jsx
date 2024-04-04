import React from 'react';
import Navbar1 from './Navbar1';

import Footer from './Footer'; // Import Footer component
import Section from './Section';

const Admin = () => {
  return (
    <div className='row'>
      <Navbar1 />
      <div className="col-3 col-md-3"><Section/></div>
      <div className="col-9 col-md-9">
        
      </div>
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default Admin;