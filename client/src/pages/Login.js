import { useState } from "react";
import InputFrom from "../components/shared/InputFrom"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import  toast  from "react-hot-toast";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {loading} = useSelector(state=>state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler= async(e)=>{
    e.preventDefault();
    try {
      if(!email || !password){
        return toast.error("Please Provide All fields");
      }
      dispatch(showLoading());
      const {data} = await axios.post("/api/v1/auth/login",{email,password});
      dispatch(hideLoading());
      if(data.success){
        localStorage.setItem("token",data.token);
        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Credential Please try again");
      console.log(error);
    }
  }

  return (
    <>
    {loading?<Spinner/>:(
      <div className="form-container">
  <form className="card p-2" onSubmit={submitHandler}>
  <img src="" alt="logo" height={150} width={300}/>
  <InputFrom 
  htmlFor="email" 
  labelText={"Email address"} 
  type={"email"} 
  name={"email"}
  value={email}
  handleChange={(e)=>setEmail(e.target.value)}
  />
   <InputFrom 
  htmlFor="password" 
  labelText={"Password"} 
  type={"password"} 
  name={"password"}
  value={password}
  handleChange={(e)=>setPassword(e.target.value)}
  />
  <div className="d-flex justify-content-between">
    <p>
      Not registered <Link to="/register">Register Here!</Link>{" "}
    </p>
    <button type="submit" className="btn btn-primary" >
      Login
    </button>
  </div>
</form>
</div>
    )}
    </>

  )
}

export default Login