import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../services/api";

function Login(){

    const navigate=useNavigate();

    const[data,setData]=useState({

        email:"",
        password:""

    });

    const handleChange=(e)=>{

        setData({

            ...data,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const res=await API.post("/auth/login",data);

            localStorage.setItem("token",res.data.token);

            localStorage.setItem("user",JSON.stringify(res.data.user));

            navigate("/dashboard");

        }

        catch(err){

            alert(err.response.data.message);

        }

    };

    return(

        <div className="auth-container">

            <div className="auth-box">

                <h1>TaskFlow Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Email</label>

                        <input

                        type="email"

                        name="email"

                        onChange={handleChange}

                        required

                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input

                        type="password"

                        name="password"

                        onChange={handleChange}

                        required

                        />

                    </div>

                    <button className="auth-btn">

                        Login

                    </button>

                </form>

                <div className="auth-link">

                    <Link to="/register">

                        Create New Account

                    </Link>

                </div>

            </div>

        </div>

    )

}

export default Login;