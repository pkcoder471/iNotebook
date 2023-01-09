import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'},
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          })
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate("/");
            props.showAlert("Logged in successfully","success")
          }
          else{
            props.showAlert("Invalid credentials","danger")
          }
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value })
    }
    return (
        <div className='container'>
            <h2 className='mt-2 mb-3'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name ="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
