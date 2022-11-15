import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import HeaderComponent from "./HeaderComponent";
// import FooterComponent from "./FooterComponent";


class LogInComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            id: '',
            firstName: '',
            lastName: '',
            emailId: '',
            contactNo: '',
            password: '',
            userName: '',
            personalDetails:{},
        }
        this.validateUser = this.validateUser.bind(this);
       
    }
    validateUser = (e) => {
        e.preventDefault();
            if(this.state.userName !== "" && this.state.password !== ""){
                        ApiService.fetchUsers()
                        .then((res) => {
                            this.setState({users: res.data})
                            console.log(this.state.users);
                            this.state.users.forEach(
                                (user)  =>{
                                    if(user.userName === this.state.userName && user.password === this.state.password) {
                                        console.log("found")
                                        user !== null && this.setState({message : 'User Login successfully.'});
                                        user !== null && window.localStorage.setItem("U_NAME",user.userName);
                                        user !== null && window.localStorage.setItem("F_NAME", user.firstName);
                                        user !== null && window.localStorage.setItem("U_ID", user.id);
                                        user !== null && window.localStorage.setItem("L_NAME", user.lastName);
                                        user !== null && window.localStorage.setItem("EMAIL", user.emailId);
                                        user !== null && window.localStorage.setItem("CONTACTNO", user.contactNo);
                                        user !== null && window.localStorage.setItem("PASSWORD", user.password);
                                        user !== null && JSON.stringify(window.localStorage.setItem("U_ID", user.id));
                                        ApiService.getResumeById(window.localStorage.getItem("U_ID")).then((response) => {
                                           if(response.data.personalDetails !== null){
                                            this.props.history.push('/existing-resume');
                                           }
                                           else{
                                            this.props.history.push('/create-resume');  
                                           }
                                        });
                                        
                                    }
                                })
                        });
                    this.setState({message : 'Invalid Credentials'})
            }else{
                this.setState({message : 'All fields are compulsory'})
            }
    }

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

     render() {
        return(
         
                
            <div class="container"> 
                <div class = "row">
                    <div class="container; colorfont">
                        <div class = "row">

                    
                        </div>
                    </div>
                    <div class = "col-xxl-6">
                    <div class="card">
                            <div class="card-header">
                                <h3>Sign In</h3>
                            </div>
                            
                            <div class="card-body">
                                    <form>
                                        <div class="input-group form-group">
                                            <div class="input-group-prepend">
                                            
                                         <img src="https://img.icons8.com/plasticine/100/000000/user-male.png" height ="35"/>
                                            </div>
                                            <input type="text" placeholder="Username" name="userName" className="form-control" value={this.state.userName} onChange={this.onChange} required/>   
                                        </div>
                                        <div class="input-group form-group">
                                            <div class="input-group-prepend">
                                                
                                            <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000
                                            /external-password-cyber-security-kiranshastry-lineal-color-kiranshastry-5.png" height ="35"/>
                                            </div>
                                            <input type="password"  placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} required/>
                                        </div>
                                        <div class="form-group">
                                        <p id = "para">
                                            <input type="submit" onClick={this.validateUser} value="Login" class="btn btn-primary"></input>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer">
                                <p id = "para">
                                <a href = "create-user" className="btn btn-success">Register User</a>
                                </p>
                                </div>
                               
                           </div>
		                
                        
                    </div>
                    </div>
                </div>
                        

        );
    }

}

export default LogInComponent;