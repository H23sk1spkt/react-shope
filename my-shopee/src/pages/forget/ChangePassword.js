import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, } from "react";
import Err from "../../user/Err";
function ChangePassword() {
    // đối với dạng $token=... thì làm cách này
    const [searchParams]=useSearchParams();
    const token=searchParams.get("token");
    const [errors,setError]=useState({});
    const navigate=useNavigate();
    const [input,setInput]=useState({
        'password': "",
        'password_confirmation':""
    })
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/verify/${token}`)
        .then((res)=> {
            console.log(res.data);
        })
        .catch((error)=> {
            console.log("STATUS",error.response?.status);
            console.log("DATA",error.response?.data);
        })
    },[token])
    function handleInput(e){
        e.preventDefault();
        const name=e.target.name;
        const value=e.target.value;
        setInput((state)=> ({...state,[name]:value}));
    }
    function handleSubmit(e){
        e.preventDefault();
        let err=false;
        let errorSubmit={};
        console.log("eeeee")
        if(!input.password || !input.password_confirmation){
            errorSubmit.password="Vui lòng nhập đây đủ thông tin";
            err=true;
        }
        if(input.password!== input.password_confirmation){
            errorSubmit.password="Vui lòng nhập thông tin khớp nhau";
            err=true
        }
        setError(errorSubmit);
        if(!err){
            console.log("vào dầy")
            axios.put(`http://localhost:8000/api/changePassword/${token}`,{
                password:input.password,
                password_confirmation: input.password_confirmation
            })
            .then(res => {
                console.log(res.data);
                navigate('/login');
            })
            .catch((error)=> {
            console.log("STATUS",error.response?.status);
            console.log("DATA",error.response?.data);
        })
        }
    }
    return <>
    <Err errors={errors}/>
        <div className="col-sm-4">
            <div className="login-form">{/*login form*/}
                <h2>Change Password</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input type="password" name="password" onChange={handleInput}  placeholder="Password" />
                    <input type="password" name="password_confirmation"  onChange={handleInput}  placeholder="Password Confirmation" />
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>{/*/login form*/}
      </div>
    </>
}
export default ChangePassword;
