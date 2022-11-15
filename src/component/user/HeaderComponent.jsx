import React, {Component } from 'react';
import {Navbar , NavbarBrand , Jumbotron} from 'reactstrap';


class HeaderComponent extends Component{
    render(){

        return(
           <React.Fragment> 
           <Navbar dark>
             <div className="container">
              <NavbarBrand href="/">Resume</NavbarBrand>
             </div>

           </Navbar>
           {/* <Jumbotron> */}
               <div className="container">
                 <div className ="row row-header" >
                     <div className="col-12 col-sm-6">
                         <h1> Welcome to resume page</h1>
                         <p> </p>
                         
                     </div>

                 </div>
               </div>
           {/* </Jumbotron> */}

           </React.Fragment>

        );
    }
}

export default HeaderComponent;