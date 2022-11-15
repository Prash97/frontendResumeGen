import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddUserComponent from "./component/user/AddUserComponent";
import LogInComponent from './component/user/LogInComponent';
import ExistingResumeComponent from './component/user/ExistingResumeComponent';
import CreateResumeComponent from './component/user/CreateResumeComponent';
import UpdateResumeComponent from './component/user/UpdateResumeComponent';
import ViewResumeComponent from './component/user/ViewResumeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import LogoutComponent from './component/user/LogoutComponent';



function App() {
  return (
      <div className="container">
          <Router>
              <div className="RegisterWidth">
                  <Switch>
                    
                       
                            
                        
                      <Route path="/" exact component={LogInComponent} />
                    
                      
                      
                      
                      <Route path="/create-user" component={AddUserComponent} />



                      <Route path="/existing-resume" component={ExistingResumeComponent} />



                      <Route path="/create-resume" component={CreateResumeComponent} />




                      <Route path="/update-resume" component={UpdateResumeComponent} />



                      <Route path="/view-resume" component={ViewResumeComponent} />



                      <Route path="/Logout" component={LogoutComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;
