import React,{ useState} from 'react';
import './form.scss'
import {addJobs,updateJobs} from '../crud-services/services';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form(props) {

    const [ job,setJob ] = useState(props.fields);
    const [disabled,setDisabled] = useState(false);

    const onBtnSubmit =()=>{
        const validation = baseValidationCheck();
        if(validation){
            return null;
        }
       
        if(job.formType === "add"){
            delete job.formType;
            addJobs(job);
        }else{
            delete job.formType;
            updateJobs(job);
        }
        props.triggerChange();
      }
    
      const updateData =(e)=>{
            const key = e.target.name;
            const updatedData= {...job,[key]:e.target.value}
            setJob(updatedData);
      }
      const dateChange = (date)=>{
        var u_date = date.getTime();
        const updatedData= {...job,"posted":u_date}
            setJob(updatedData);
      }
      const baseValidationCheck = ()=>{
          var error = false;
          Object.keys(job).forEach((obj) => {
            if((!job[obj] || (job[obj] === "selected" && obj ==="status")) && obj !== "options"){
                error =`Please enter ${obj} value ${job[obj]} f`;
            }
        })
        return error;
      }
  return (
    <div className="Add-form">
     <form className="form" action="javascript:void(0);">
          <div className="form-group">
            <label> Title </label>
            <input
              required
              type="text"
              className="form-control"
              value={job.title}
              name="title"
              onChange={ (e) => updateData(e)}
            />
            <div className="error"><span className={`error-msg-${1}`}></span></div>
          </div>

          <div className="form-group">
            <label> Status </label>
            <select value={job.status} name="status" className="form-control" onChange={ (e)=> updateData(e)}>
            <option value="selected">select</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Hide">Hide</option>
            <option value="Done">Done</option>
          </select>
          <div className="error"><span className={`error-msg-${2}`}></span></div>
          </div>

           <div className="form-group">
            <label> Posted </label>
            <DatePicker selected={ job.posted ? new Date(job.posted) : new Date() } name= "posted" onChange={(date) => dateChange(date)} />

            {/* <input
              required
              type="text"
              className="form-control"
              value={job.posted}
              name="posted"
              onChange={ (e)=> updateData(e)}
            /> */}
               
               <div className="error"><span className={`error-msg-${3}`}></span></div>
          </div>

          <div className="form-group">
            <label> Applicants </label>
            <textarea
              required
              type="text"
              className="form-control textAreaField"
              value={job.applicant}
              name="applicants"
              onChange={ (e)=> updateData(e)}
              
            />
             <div className="error"><span className={`error-msg-${4}`}></span></div>
          </div>

          <button className="btn btn-primary" onClick={()=>onBtnSubmit()} disabled= {disabled}>Submit</button>
        </form>
    </div>
  );
}

export default Form;