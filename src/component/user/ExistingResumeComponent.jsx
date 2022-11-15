import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Moment from 'moment';
class ExistingResumeComponent extends Component{
    constructor(props){
        super(props);
        this.state =  {
           //Personal Details
           name : '',
           address: '',
           contactNo: '',
           emailId:'',
           socialProfile: '',
           //userInfo : to be set by fetching userId:(use componentdidmount method)
                   userId: '',
                   firstName: '',
                   lastName: '',
                   emailId: '',
                   contactNo:'',
                   userName:'',
                   password: '',
                   id: '',
            //Skill details
            skillsDetailsList:[{
                index : Math.random(),
                technology: '',
                expertiseLevel: ''
		        
            }],
            //Certification details
            certificationDetailsList:[{
                index : Math.random(),
                certificationTitle: '',
                technology: '',
                instituteName: '',
                durationOfCompletion:'',
                certificationDate: '',
            }],
            //education details
            educationDetailsList:[{
            index : Math.random(),
            college: '',
            course: '',
            percentage:'',
            university: '',
            passingYear: ''
		        
            }],
            //experience details
            experienceDetailsList:[{
                index : Math.random(),
                employer: '',
		        jobDescription: '',
		        jobTitle: '',
		        experienceInMonths: ''
            }],
            personalDetails:{}
           
        }
        this.saveResume = this.saveResume.bind(this);
    
        this.handleChange1 = this.handleChange1.bind(this)
        this.updateResume=this.updateResume.bind(this)
    }
    
   
    handleChange0 = (e) => {
       
         this.setState({[e.target.name] : e.target.value})
        
    }
    handleChange1 = (f) => {
        if(["technology","expertiseLevel"].includes(f.target.name)){
            let list = [...this.state.skillsDetailsList]
            list[f.target.dataset.id][f.target.name] = f.target.value;

        }else if(f.target.type === "checkbox"){

        }
        else{
            this.setState({[f.target.name] : f.target.value})
        }
    }
    handleChange2 = (f) => {
        if(["college","course","percentage","university","passingYear"].includes(f.target.name)){
            let list = [...this.state.educationDetailsList]
            list[f.target.dataset.id][f.target.name] = f.target.value;

        }else if(f.target.type === "checkbox"){

        }
        else{
            this.setState({[f.target.name] : f.target.value})
        }
    }
    handleChange3 = (e) => {
        if(["certificationTitle","technology","instituteName","durationOfCompletion","certificationDate"].includes(e.target.name)){
            let list = [...this.state.certificationDetailsList]
            list[e.target.dataset.id][e.target.name] = e.target.value;

        }else if(e.target.type === "checkbox"){

        }
        else{
            this.setState({[e.target.name] : e.target.value})
        }
    }
    componentDidMount() {
        this.setState({
            userId: window.localStorage.getItem("U_ID"),
            firstName: window.localStorage.getItem("F_NAME"),
            lastName: window.localStorage.getItem("L_NAME"),
            emailId: window.localStorage.getItem("EMAIL"),
            contactNo: window.localStorage.getItem("CONTACTNO"),
            userName: window.localStorage.getItem("U_NAME"),
            password : window.localStorage.getItem("PASSWORD"),
            id: window.localStorage.getItem("U_ID")
            })
            ApiService.getResumeById(window.localStorage.getItem("U_ID")).then((response) => {
              
              if(response.data.personalDetails !== null ){
                this.setState(
                    { 
                       
                        certificationDetailsList : response.data.certificationDetails,
                        experienceDetailsList : response.data.experienceDetails,
                        educationDetailsList : response.data.educationDetails,
                        skillsDetailsList : response.data.skillsDetails,
                        personalDetails : response.data.personalDetails  
                    }
                    
               )
      
                }
            
                console.log(response.data)
                 console.log(this.state.personalDetails)
                //console.log(response.data.certificationDetailsList)
                // console.log(response.data.experienceDetails)
                // console.log(response.data.educationDetails)
                // console.log(response.data.skillsDetails)
                // console.log(response.data.personalDetails)
                 console.log(this.state.experienceDetailsList)
                //  console.log(this.state.educationDetails)
                //   console.log(this.state.skillsDetails)
                //   console.log(this.state.certificationDetails)
                //   console.log(this.state.personalDetails)
            });
         
    }
    saveResume = (e) => {
        e.preventDefault();
      //  let user = {userName: this.state.userName, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, contactNo: this.state.contactNo};
        let resume = {
            "experienceDetails": this.state.experienceDetailsList.map(x=>x),
            "educationDetails": this.state.educationDetailsList.map(x=>x),
            "certificationDetails": this.state.certificationDetailsList.map(x=>x),
            "skillsDetails": this.state.skillsDetailsList.map(x=>x),
            "personalDetails" : this.state.personalDetails
            // "personalDetails": {
            //     name: this.state.name,
            //     address: this.state.address,
            //     contactNo: this.state.contactNo,
            //     emailId: this.state.emailId,
            //     socialProfile: this.state.socialProfile,
            //     userId: this.state.userId,
            //     "userInfo": {
            //         firstName: this.state.firstName,
            //         lastName: this.state.lastName,
            //         emailId: this.state.emailId,
            //         contactNo: this.state.contactNo,
            //         userName:this.state.userName,
            //         password: this.state.password,
            //         id: this.state.userId
            //     }
            // }
        }
        
        ApiService.createResume(resume)
            .then(res => {
                this.setState({message : 'resume added successfully.'});
                this.props.history.push('/resume-details'+'/id');
            });
    }
    updateResume=(e)=>{
        e.preventDefault();
       
    }
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        // handleSubmit = e => {
        //     e.preventDefault();
        //     try {   
        //         if(!this.state.name){
        //             new Error("Name is required")
        //         }else{

        //         }
        //     } catch (error) {
        //         console.log()
        //     }
        // }

    render() {
        return(
            <div>
            <form>
            <div class="jumbotron center">
            <div class="container">
          <div class="row">
          <div class="col col-lg-12">
                <p><i class="glyphicon glyphicon-education"></i>&nbsp;<strong>Personal Details</strong></p>
              <div class="form-group">
              <p id = "para">
                  <input class="form-control" name="name" placeholder="Name"  value = {this.state.personalDetails.name}  onChange = {this.onChange} required/>
                  </p>
              </div>
              <div class="form-group">
              <p id = "para">
                  <input type="number" class="form-control"  name="contactNo" placeholder="contact number" value = {this.state.personalDetails.contactNo} onChange = {this.onChange} required/>
                  </p>
              </div>
              <div class="form-group">
              <p id = "para">
                <input type="text" class="form-control"  name="address" placeholder="address" value = {this.state.personalDetails.address} onChange = {this.onChange} required/>
                </p>
              </div>
              <div class="form-group">
              <p id = "para">
                <input type="email" class="form-control"  name="emailId" placeholder="abc@gmail.com" value = {this.state.personalDetails.emailId} onChange = {this.onChange} required/>
                </p>
              </div>
              <div class="form-group">
              <p id = "para">
                <input type="text" class="form-control"  name="socialProfile" placeholder="e.g. Linkedin,github etc" value = {this.state.personalDetails.socialProfile} onChange = {this.onChange} required/>
                </p>
              </div>
          </div>   

          <div class="col col-lg-12">
          <br></br>    
            <p><strong>Skills</strong></p>
               { this.state.skillsDetailsList.map((val,idx1) => {
                    let technology = `technology-${idx1}`,expertiseLevel = `expertiseLevel-${idx1}`
                         return(
                            
                            <div className="col col-lg-12" onChange = {this.handleChange1} key = {val.index}>
                            
                             {
                                    idx1 === (this.state.skillsDetailsList.length-1)? 
                                    <p id = "para">
                                    <button type="button" className = "btn btn-primary text-center" >+</button> 
                                    </p>
                                       
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow1(val)}>-</button>
                                    
                             } 
                            
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control" id="tech"name="technology" placeholder={technology} data-id={idx1} id={technology} onChange = {this.handleChange1} value={val.technology}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control"  name="expertiseLevel" placeholder={expertiseLevel} data-id={idx1} id={expertiseLevel} onChange = {this.handleChange1} value={val.expertiseLevel} required/>
                                        </p>
                                        
                                    </div>
                                    
                            </div>
                          )})
                }
            </div>
            
            <div class="col col-lg-12">
            <br></br>  
            <p><strong>Experience Details</strong></p>
               { this.state.experienceDetailsList.map((val,idx6) => {
                    let employer = `employer-${idx6}`,experienceInMonths = `experienceInMonths-${idx6}`,
                        jobDescription = `jobDescription-${idx6}`,jobTitle = `jobTitle-${idx6}`
                         return(
                            
                            <div className="col col-lg-12" onChange = {this.handleChange0} key = {val.index}>
                            
                             {
                                    idx6 === (this.state.experienceDetailsList.length-1)? 
                                    <button type="button" className = "btn btn-primary text-center" >+</button> 
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow(val)}>-</button>
                             }
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control" name="employer" placeholder={employer} data-id={idx6} id={employer}  value={val.employer}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control"  name="experienceInMonths" placeholder={experienceInMonths} data-id={idx6} id={experienceInMonths} onChange = {this.handleChange0} value= {val.experienceInMonths}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control"  name="jobDescription" placeholder={jobDescription} data-id={idx6} id={jobDescription} onChange = {this.handleChange0} value={val.jobDescription} required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                    <input type="text" class="form-control"  name="jobTitle" placeholder={jobTitle} data-id={idx6} id={jobTitle} onChange = {this.handleChange0}value={val.jobTitle}required/>
                                    </p>
                                    </div>
                               
                            </div>
                          )})
                }
            </div>
            <div class="col col-lg-12">
            <br></br>  
            <p><strong>Education Details</strong></p>
               { this.state.educationDetailsList.map((val,idx2) => {
                    let college = `college-${idx2}`,course = `course-${idx2}`,percentage = `percentage-${idx2}`,
                    university = `university-${idx2}`,passingYear = `passingYear-${idx2}`
                         return(
                            
                            <div className="col col-lg-12" onChange = {this.handleChange2} key = {val.index}>
                            
                             {
                                    idx2 === (this.state.educationDetailsList.length-1)? 
                                    <button type="button" className = "btn btn-primary text-center">+</button> 
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow2(val)}>-</button>
                             }
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control" name="college" placeholder={college} data-id={idx2} id={college} onChange = {this.handleChange2} value= {val.college}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control" name="course" placeholder={course} data-id={idx2} id={course} onChange = {this.handleChange2} value= {val.course}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control"  name="percentage" placeholder={percentage} data-id={idx2} id={percentage} onChange = {this.handleChange2} value={val.percentage}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                        <input type="text" class="form-control"  name="university" placeholder={university} data-id={idx2} id={university} onChange = {this.handleChange2} value={val.university} required/>

                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para">
                                    <input type="text" class="form-control"  name="passingYear" placeholder={passingYear} data-id={idx2} id={passingYear} onChange = {this.handleChange2} value={val.passingYear}required/>
                                    </p>
                                    </div>
                               
                            </div>
                          )})
                }
            </div>
            <div class="col col-lg-12">
            <br></br>
            <p><i class="glyphicon glyphicon-education"></i>&nbsp;<strong>Certification Details</strong></p>
            {this.state.certificationDetailsList.map((val,idx) => {
                    let certificateTitle = `certificateTitle-${idx}`,certificationDate = `certificationDate-${idx}`,
                    durationOfCompletion = `durationOfCompletion-${idx}`,instituteName = `instituteName-${idx}`
                        ,technology = `technology-${idx}`
                         return(
                                    <div class="col col-lg-12" onChange = {this.handleChange3} key = {val.index}>
                                                {
                                                            idx === (this.state.certificationDetailsList.length-1)? 
                                                            <button type="button" className = "btn btn-primary text-center">+</button> 
                                                            : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow3(val)}>-</button>
                                                }
                                                <div class="form-group">
                                                <p id = "para">
                                                    <input type="text" class="form-control" name="certificationTitle" placeholder={certificateTitle} data-id={idx} id={certificateTitle} onChange = {this.handleChange3} value={val.certificationTitle} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para">
                                                    <input type="date" class="form-control"  name="certificationDate" placeholder={certificationDate}  data-id={idx} id={certificationDate} onChange = {this.handleChange3} value={val.certificationDate} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para">
                                                    <input type="text" class="form-control"  name="durationOfCompletion" placeholder={durationOfCompletion} data-id={idx} id={durationOfCompletion} onChange = {this.handleChange3} value={val.durationOfCompletion} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para">
                                                    <input type="text" class="form-control"  name="instituteName" placeholder={instituteName} data-id={idx} id={instituteName} onChange = {this.handleChange3} value ={val.instituteName} value = {val.instituteName} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para">
                                                    <input type="text" class="form-control"  name="technology" placeholder={technology} data-id={idx} id={technology} onChange = {this.handleChange3} value={val.technology} required/>
                                                    </p>
                                                </div>
                                    </div>
                     )})
            }
            </div>
            </div>
         
          
        </div>
                   <a className="btn btn-success " href="/view-resume">View</a>
                   <a className="btn btn-danger " href="/update-resume">Reset</a>
        </div>
        
                 </form>
                 </div>

        );
    }
}

export default ExistingResumeComponent;