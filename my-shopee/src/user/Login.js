import axios from "axios"
import { useState } from "react"
import Err from "./Err"
import { useNavigate } from "react-router-dom"
function Login(){
    const [input,setInput]=useState({
        email:"",
        password:"",
        remember:false
    })
    const [errors,setErr]=useState({})
    const navigate=useNavigate();
    function handleInput(e){
        const name=e.target.name
        const value=e.target.type === "checkbox" ? e.target.checked : e.target.value
        setInput((state)=> ({...state,[name]:value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit={};
        let err=false
        if(!input.email || !input.password){
            errorSubmit.common="Vui lòng nhập đầy đủ thông tin";
            err=true
        }
        setErr(errorSubmit)
        if(!err){
            axios.post("http://127.0.0.1:8000/api/login",input)
            .then((res)=> {
                const user={
                    token : res.data.token,
                    Auth : res.data.Auth
                }
                localStorage.setItem('user',JSON.stringify(user))
                navigate("/blog")
            })
            .catch((error)=> console.log(error))
    }
}
    return <>
    <Err errors={errors}/>
        <div className="col-sm-4">
            <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" onChange={handleInput} placeholder="Email Address" />
                    <input type="password" name="password" onChange={handleInput} placeholder="Name" />
                    <span>
                    <input type="checkbox" name="remember" checked={input.remember} onChange={handleInput} className="checkbox" /> 
                    Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
      </div>
    </>
}
export default Login