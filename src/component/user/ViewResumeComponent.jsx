import React, { Component,useState, useEffect } from 'react'
import ApiService from "../../service/ApiService";
import LogoutComponent from "./LogoutComponent";

class ViewResumeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalDetails : [],
            educationDetails: [],
            skillsDetails : [],
            certificationDetails:[],
            experienceDetails:[],
            personalDetails:{}
        }
    }
   
    componentDidMount(){

        ApiService.getResumeById(window.localStorage.getItem("U_ID")).then((response) => {
            this.setState(
                { 
                    certificationDetails : response.data.certificationDetails,
                    experienceDetails : response.data.experienceDetails,
                    educationDetails : response.data.educationDetails,
                    skillsDetails : response.data.skillsDetails,
                    personalDetails:response.data.personalDetails
                }
           )
           
        });
     
    }

    render (){
        return (
            
            <div>
                  
                <h1 className = "text-center">Resume Details</h1>
                <form>
            


                <p><strong>Personal Details</strong></p>
                        
                        <p><b>Name :</b>  {this.state.personalDetails.name}</p>
                        <p><b>Address :</b>  {this.state.personalDetails.address}</p>
                        <p><b>Contact Number :</b>  {this.state.personalDetails.contactNo}</p>
                        <p><b>Email :</b>  {this.state.personalDetails.emailId}</p>
                        <p><b>Social Profile :</b>  {this.state.personalDetails.socialProfile}</p>                 

                <table className = "table table-striped" id="maintable">
                <thead>
                        <tr>
                            <th>Expertise level</th>
                            <th>Technology</th>
                        </tr>

                    </thead>
                    <tbody>
                    {
                            this.state.skillsDetails.map(
                                skills => 
                                <tr >
                                    <td> {skills.expertiseLevel}</td>
                                     <td> {skills.technology}</td>

                                </tr>
                            )
                        }
                       

                    </tbody>
                    <thead>
                        <tr>
                            <th>Employer</th>
                            <th>ExperienceInMonths</th>
                            <th>JobDescription</th>
                            <th>JobTitle</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.experienceDetails.map(
                                expDetails => 
                                <tr >
                                    <td> {expDetails.employer}</td>
                                     <td> {expDetails.experienceInMonths}</td>
                                     <td> {expDetails.jobDescription}</td>   
                                     <td> {expDetails.jobTitle}</td>
                                </tr>
                            )
                        }

                    </tbody>
                    <thead>
                        <tr>
                            <th>College</th>
                            <th>Course</th>
                            <th>Passing year</th>
                            <th>Percentage</th>
                            <th>University</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.educationDetails.map(
                                education => 
                                <tr >
                                    <td> {education.college}</td>
                                     <td> {education.course}</td>
                                     <td> {education.passingYear}</td>   
                                     <td> {education.percentage}</td>
                                     <td> {education.university}</td>  
                                </tr>
                            )
                        }

                    </tbody>
                    
                    <thead>
                        <tr>
                            <th>CertificationTitle</th>
                            <th>CertificationDate</th>
                            <th>DurationOfCompletion</th>
                            <th>InstituteName</th>
                            <th>Technology</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.certificationDetails.map(
                                certificationDetail => 
                                <tr >
                                    <td> {certificationDetail.certificationTitle}</td>
                                     <td> {certificationDetail.certificationDate}</td>
                                     <td> {certificationDetail.durationOfCompletion}</td>   
                                     <td> {certificationDetail.instituteName}</td>
                                     <td> {certificationDetail.technology}</td>  
                                </tr>
                            )
                        }

                    </tbody>
                    
                </table>
                <button className="btn btn-success " onClick={()=>{window.print()}} >View pdf</button>
                <a className="btn btn-warning" href="/Logout">Logout</a>
                </form>
            </div>

        )
    }
}

export default ViewResumeComponent