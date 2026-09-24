import axios from "axios"
import { useState } from "react"
import Err from "../../user/Err";
function CheckEmail(){
    const [email,setEmail]=useState("");
    const [errors,setErr]=useState({})
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit={};
        let err=false
        if(!email){
            errorSubmit.email="Vui lòng không để trống email";
            err=true
        }
        setErr(errorSubmit)
        if(!err){
            console.log(email)
            axios.post("http://127.0.0.1:8000/api/email/verify",{email:email})
            .then((res)=> {
                console.log(res.data)
            })
            .catch((error)=> {
                console.log("STATUS",console.log(error.response?.status));
                console.log("DATA",console.log(error.response?.data));

            })
    }
}
    return <>
    <Err errors={errors}/>
        <div className="col-sm-4">
            <div className="login-form">{/*login form*/}
                <h2>Verify Email</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Email Address" />
                    <button type="submit" className="btn btn-default">Verify</button>
                </form>
            </div>{/*/login form*/}
      </div>
    </>
}
export default CheckEmail