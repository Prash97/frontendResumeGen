import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Moment from 'moment';
class CreateResumeComponent extends Component{
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
		        experience: ''
            }],
           
        }
        this.saveResume = this.saveResume.bind(this);
        this.addRow = this.addRow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addRow1 = this.addRow1.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
    }
    addRow = (e) => {
        console.log('add row button')
        this.setState((prevState)=>({
            experienceDetailsList: [...prevState.experienceDetailsList,{ index : Math.random(),
                                                                        employer: '',
                                                                        jobDescription: '',
                                                                        jobTitle: '',
                                                                        experience: ''}]
        }));
    }
    addRow1 = (e) => {
        this.setState((prevState)=>({
            skillsDetailsList: [...prevState.skillsDetailsList,{ index : Math.random(),
            technology: '',
            expertiseLevel: ''}]
        }));
        
    }
    addRow2 = (e) => {
        this.setState((prevState)=>({
            educationDetailsList: [...prevState.educationDetailsList,{ index : Math.random(),
                college: '',
                course: '',
                percentage:'',
                university: '',
                passingYear: ''}]
        }));
        
    }
    addRow3 = (e) => {
        console.log('add row button')
        this.setState((prevState)=>({
            certificationDetailsList: [...prevState.certificationDetailsList,{ index : Math.random(),
                                                                            certificationTitle: '',
                                                                            technology: '',
                                                                            instituteName: '',
                                                                            durationOfCompletion:'',
                                                                            certificationDate: ''}]
        }));
    }
    deleteRow(record){
        this.setState({
            experienceDetailsList: this.state.experienceDetailsList.filter(r => r!== record)
        });
    }
    deleteRow1(record){
        this.setState({
            skillsDetailsList: this.state.skillsDetailsList.filter(r => r!== record)
        });
    }
    deleteRow2(record){
        this.setState({
            educationDetailsList: this.state.educationDetailsList.filter(r => r!== record)
        });
    }
    deleteRow3(record){
        this.setState({
            certificationDetailsList: this.state.certificationDetailsList.filter(r => r!== record)
        });
    }
    handleChange = (e) => {
        if(["employer","experience","jobDescription","jobTitle"].includes(e.target.name)){
            let list = [...this.state.experienceDetailsList]
            list[e.target.dataset.id][e.target.name] = e.target.value;

        }else if(e.target.type === "checkbox"){

        }
        else{
            this.setState({[e.target.name] : e.target.value})
        }
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

    }
    saveResume = (e) => {
        e.preventDefault();
      //  let user = {userName: this.state.userName, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, contactNo: this.state.contactNo};
        let resume = {
            "experienceDetails": this.state.experienceDetailsList.map(x=>x),
            "educationDetails": this.state.educationDetailsList.map(x=>x),
            "certificationDetails": this.state.certificationDetailsList.map(x=>x),
            "skillsDetails": this.state.skillsDetailsList.map(x=>x),
            "personalDetails": {
                name: this.state.name,
                address: this.state.address,
                contactNo: this.state.contactNo,
                emailId: this.state.emailId,
                socialProfile: this.state.socialProfile,
                userId: this.state.userId,
                "userInfo": {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    emailId: this.state.emailId,
                    contactNo: this.state.contactNo,
                    userName:this.state.userName,
                    password: this.state.password,
                    id: this.state.userId
                }
            }
        }
        
        ApiService.createResume(resume)
            .then(res => {
                this.setState({message : 'resume added successfully.'});
                this.props.history.push('/existing-resume');
            });
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
            <div class ="move">

                
            <form>

            <div >
            <div class="jumbotron center">
            <div class="container">
          <div class="row">
          <div class="col col-lg-12">
                <p><i class="glyphicon glyphicon-education"></i>&nbsp;<strong>Personal Details</strong></p>
              <div class="form-group">
              <p id = "para1">
                  <input class="form-control" name="name" placeholder="Name"  value = {this.state.name} onChange = {this.onChange} required/>
                  </p>
              </div>
              <div class="form-group">
              <p id = "para1">
                  <input type="number" class="form-control"  name="contactNo" placeholder="contact number" value = {this.state.contactNo} onChange = {this.onChange} required/>
                  </p>
              </div>
              <div class="form-group">
              <p id = "para1">
                <input type="text" class="form-control"  name="address" placeholder="address" value = {this.state.address} onChange = {this.onChange} required/>
                </p>
              </div>
              <div class="form-group">
              <p id = "para1">
                <input type="email" class="form-control"  name="emailId" placeholder="abc@gmail.com" value = {this.state.emailId} onChange = {this.onChange} required/>
                </p>
              </div>
              <div class="form-group">
              <p id = "para1">
                <input type="text" class="form-control"  name="socialProfile" placeholder="e.g. Linkedin,github etc" value = {this.state.socialProfile} onChange = {this.onChange} required/>
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
                                    <button type="button" className = "btn btn-primary text-center" onClick ={this.addRow1}>+</button> 
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow1(val)}>-</button>
                             }
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control" name="technology" placeholder={technology} data-id={idx1} id={technology} onChange = {this.handleChange1}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control"  name="expertiseLevel" placeholder={expertiseLevel} data-id={idx1} id={expertiseLevel} onChange = {this.handleChange1} required/>
                                        </p>
                                    </div>
                                    
                            </div>
                          )})
                }
            </div>
            
            <div class="col col-lg-12">
            <br></br>  
            <p><strong>Experience Details</strong></p>
               { this.state.experienceDetailsList.map((val,idx) => {
                    let employer = `employer-${idx}`,experience = `experience-${idx}`,
                        jobDescription = `jobDescription-${idx}`,jobTitle = `jobTitle-${idx}`
                         return(
                            
                            <div className="col col-lg-12" onChange = {this.handleChange} key = {val.index}>
                            
                             {
                                    idx === (this.state.experienceDetailsList.length-1)? 
                                    <button type="button" className = "btn btn-primary text-center" onClick ={this.addRow}>+</button> 
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow(val)}>-</button>
                             }
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control" name="employer" placeholder={employer} data-id={idx} id={employer} onChange = {this.handleChange}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control"  name="experience" placeholder={experience} data-id={idx} id={experience} onChange = {this.handleChange} required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control"  name="jobDescription" placeholder={jobDescription} data-id={idx} id={jobDescription} onChange = {this.handleChange} required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                    <input type="text" class="form-control"  name="jobTitle" placeholder={jobTitle} data-id={idx} id={jobTitle} onChange = {this.handleChange}required/>
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
                            
                            <div className="col col-lg-12" onChange = {this.handleChange} key = {val.index}>
                            
                             {
                                    idx2 === (this.state.educationDetailsList.length-1)? 
                                    <button type="button" className = "btn btn-primary text-center" onClick ={this.addRow2}>+</button> 
                                    : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow2(val)}>-</button>
                             }
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control" name="college" placeholder={college} data-id={idx2} id={college} onChange = {this.handleChange2}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control" name="course" placeholder={course} data-id={idx2} id={course} onChange = {this.handleChange2}required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                        <input type="text" class="form-control"  name="percentage" placeholder={percentage} data-id={idx2} id={percentage} onChange = {this.handleChange2} required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                        <p id = "para1">
                                        <input type="text" class="form-control"  name="university" placeholder={university} data-id={idx2} id={university} onChange = {this.handleChange2} required/>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                    <p id = "para1">
                                    <input type="text" class="form-control"  name="passingYear" placeholder={passingYear} data-id={idx2} id={passingYear} onChange = {this.handleChange2}required/>
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
                    let certificateTitle = `certificateTitle-${idx}`,certificateDate = `certificateDate-${idx}`,
                    durationOfCompletion = `durationOfCompletion-${idx}`,instituteName = `instituteName-${idx}`
                        ,technology = `technology-${idx}`
                         return(
                                    <div class="col col-lg-12" onChange = {this.handleChange3} key = {val.index}>
                                                {
                                                            idx === (this.state.certificationDetailsList.length-1)? 
                                                            <button type="button" className = "btn btn-primary text-center" onClick ={this.addRow3}>+</button> 
                                                            : <button type="button" className = "btn btn-danger" onClick ={()=> this.deleteRow3(val)}>-</button>
                                                }
                                                <div class="form-group">
                                                <p id = "para1">
                                                    <input type="text" class="form-control" name="certificationTitle" placeholder={certificateTitle} data-id={idx} id={certificateTitle} onChange = {this.onChange3} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para1">
                                                    <input type="date" class="form-control"  name="certificationDate" placeholder={certificateDate}  data-id={idx} id={certificateDate} onChange = {this.onChange3} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para1">
                                                    <input type="text" class="form-control"  name="durationOfCompletion" placeholder={durationOfCompletion} data-id={idx} id={durationOfCompletion} onChange = {this.onChange3} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para1">
                                                    <input type="text" class="form-control"  name="instituteName" placeholder={instituteName} data-id={idx} id={instituteName} onChange = {this.onChange3} required/>
                                                    </p>
                                                </div>
                                                <div class="form-group">
                                                <p id = "para1">
                                                    <input type="text" class="form-control"  name="technology" placeholder={technology} data-id={idx} id={technology} onChange = {this.onChange3} required/>
                                                    </p>
                                                </div>
                                    </div>
                     )})
            }
            </div>
            </div>
         
          
        </div>
        <p id = "para1">
                    <button className="btn btn-success " onClick={this.saveResume} >Save</button>
                    </p>
        </div>
        </div>
                 </form>
                
                 </div>
                 

        );
    }
}

export default CreateResumeComponent;