import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";
import api from "../api.js";
import { use, useState } from "react";

const login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login}=useAuth();
    const navigate = useNavigate();
 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await api.post("/auth/login", {email, password});
        login(res.data.token);
        navigate("/");
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}

export default login;