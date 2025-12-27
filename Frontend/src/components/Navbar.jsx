import {Link} from "react-router-dom";
import { useAuth } from "../authContext.jsx";

const navbar = () =>{
    const {token, logout} = useAuth();

    return(
        <nav style={{padding:"10px", borderBottom:"1px solid #ccc"}}>
           <Link to="/tasks">Tasks</Link>{"|"}
           <Link to="/groups">Groups</Link>{"|"}
           {!token?(
              <>
                 <Link to="/login">Login</Link>{"|"}
                 <Link to="/signup">SignUp</Link>
              </>
           ):(
               <button onClick={logout}>LogOut</button>
           )}
        </nav>
    )
}

export default navbar;