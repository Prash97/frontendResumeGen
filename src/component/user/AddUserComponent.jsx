import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            firstName: '',
            lastName: '',
            emailId: '',
            contactNo: '',
            password: '',
            userName: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();  
        let user = {userName: this.state.userName, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, contactNo: this.state.contactNo};
        if(user.userName !== "" && user.password !== "" && user.firstName !== "" && user.lastName !== "" && user.emailId !== "" && user.contactNo !== ""){
        ApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
               
                this.props.history.push('/');
                
            });
        }
        else{
            this.setState({message : 'All fields are compulsory'})
        }
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Register User</h2>
                {this.state.message && 
                     <div className = "errormsg">
                      {this.state.message}
                         
                     </div>
                    }
            
                <form>
                <div className="form-group">
                        <label>User Name:</label>
                        <p id = "para1">
                        <input placeholder="userName" name="userName" className="form-control"value={this.state.userName}onChange={this.onChange} required/>
                        </p>
                    </div>

                    <div className="form-group">
                        <label>First Name:</label>
                        <p id = "para1">
                        <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange} required/>
                        </p>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <p id = "para1">
                        <input placeholder="Last name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange} required/>
                        </p>
                    </div>

                    <div className="form-group">
                        <label>Email :</label>
                        <p id = "para1">
                        <input  placeholder="emailId" name="emailId" className="form-control"value={this.state.emailId}onChange={this.onChange} required/>
                        </p>
                    </div>

                    <div className="form-group">
                        <label>ContactNo:</label>
                        <p id = "para1">
                        <input  placeholder="contactNo" name="contactNo" className="form-control" value={this.state.contactNo}onChange={this.onChange} required/>
                        </p>                  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <p id = "para1">
                        <input  placeholder="password" name="password" className="form-control" value={this.state.password}onChange={this.onChange} required/> 
                        </p>            
                    </div>
                <button className="btn btn-success" onClick={this.saveUser}>Register</button>
            </form>
    </div>
        );
    }
}

export default AddUserComponent;