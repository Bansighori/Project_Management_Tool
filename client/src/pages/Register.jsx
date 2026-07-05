import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../services/api";

function Register(){

    const navigate=useNavigate();

    const[data,setData]=useState({

        name:"",

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

            await API.post("/auth/register",data);

            alert("Registration Successful");

            navigate("/login");

        }

        catch(err){

            alert(err.response.data.message);

        }

    };

    return(

        <div className="auth-container">

            <div className="auth-box">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Name</label>

                        <input

                        type="text"

                        name="name"

                        onChange={handleChange}

                        required

                        />

                    </div>

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

                        Register

                    </button>

                </form>

                <div className="auth-link">

                    <Link to="/login">

                        Already have an account?

                    </Link>

                </div>

            </div>

        </div>

    )

}

export default Register;