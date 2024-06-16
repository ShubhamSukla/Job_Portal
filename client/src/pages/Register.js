import{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/shared/InputFrom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import  toast  from "react-hot-toast";


const Register = () => {
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [values,setValues] = useState({
  //   name:"",
  //   lastName:"",
  //   email:"",
  //   password:""
  // });

  const {loading} = useSelector(state=>state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler= async(e)=>{
    e.preventDefault();
    try {
      if(!name || !lastName || !email || !password){
        return toast.error("Please Provide All fields");
      }
      dispatch(showLoading());
      const {data} = await axios.post("/api/v1/auth/register",{name,lastName,email,password});
      dispatch(hideLoading());
      if(data.success){
        toast.success("Register successful");
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details Please Try Again !");
      console.log(error);
    }
  }

  // const handleChange = (e)=>{
  //  const value = e.target.value;
  //  setValues({
  //   ...values,
  //   [e.target.name]:value,
  //  });
  // }
 

  return (
    <>
    {loading?<Spinner/>:(<>
      <div className="form-container">
  <form className="card p-2" onSubmit={submitHandler}>
  <img src="" alt="logo" height={150} width={300}/>
  <InputFrom 
  htmlFor="name" 
  labelText={"Name"} 
  type={"text"} 
  name={"name"}
  value={name}
  handleChange={(e)=>setName(e.target.value)}
  />
  <InputFrom 
  htmlFor="lastName" 
  labelText={"Last Name"} 
  type={"text"} 
  name={"lastName"}
  value={lastName}
  handleChange={(e)=>setLastName(e.target.value)}
  />
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
      Already register <Link to="/login">Login</Link>{" "}
    </p>
    <button type="submit" className="btn btn-primary" >
      Register
    </button>
  </div>
</form>
</div>
    </>)}
    </>
  )
}

export default Register;