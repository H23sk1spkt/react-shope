import axios from "axios"
import { useEffect, useState } from "react"

function AccountUpdate(){
    const [inputs,setInput]=useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        id_country: "",
        phone: "",
        avatar: null,
    });
    const [countries,SetCountries]=useState([]);
    const userLocal= JSON.parse(localStorage.getItem('user'));
    const [user,setUser]=useState({});
    useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/profile/member",{
            headers: {
                Authorization: `Bearer ${userLocal.token}`
            }
        })
        .then((res)=> {
            setUser(res.data.user.user);
            SetCountries(res.data.user.countries);
        })
        .catch((error)=> console.log(error))
    })
    function handleInput(e){
        e.preventDefault();
        const name=e.target.name;
        const value= e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setInput((state)=> ({...state,[name]:value}))
    }
    return <>
        <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Update user</h2>
                <div class="signup-form">
                    <h2>New User Signup!</h2>
                    <form action="#">
                        <input type="text" name="name" value={user.name} onChange={handleInput} placeholder="Name"/>
                        <input type="email" name="email" value={user.email} onChange={handleInput} placeholder="Email Address"/>
                        <input type="password" name="password" value={user.password_hash} onChange={handleInput} placeholder="Password"/>
                        <input type="password" name="password_confirmation" value={user.password_hash} onChange={handleInput} placeholder="Password"/>
                        <input type="text" name="address" value={user.address} onChange={handleInput} placeholder="Name"/>
                        <select value={user.id_country} onChange={handleInput} name="id_country">
                            {countries.map(value => {
                               return <>
                                 <option value={value.id}>{value.title}</option>
                               </>
                            })}
                        </select>
                        <input type="text" name="phone" value={user.phone} onChange={handleInput} placeholder="Name"/>
                        <input type="file" name="avatar" onChange={handleInput} placeholder="Name"/>
                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </div>  
            </div>
		</div>
    </>
}
export default AccountUpdate