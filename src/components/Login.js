import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
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
          }
          else{
            alert("Invalid credentials")
          }
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value })
    }
    return (
        <div className='container'>
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
