import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
//* to import icons

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import {axiosInstance} from '../../Utility/axios'



//* initializing dotenv
let server = `${axiosInstance.defaults.baseURL}`;
let url = `${server}/user/register`;

// *for cookie
// *--------
const SignUp = () => {
  const [response, setresponse] = useState();
  //* for confirm password not pasting
  const [password, setPassword] = useState("");
  // **********icon part *********
  const [type, setType] = useState("password");
  //* to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);

  const [type1, setType1] = useState("password");
  const [icon1, setIcon1] = useState(eyeOff);

  const [userData, setUserData] = useState({
    user_first_name: "",
    user_last_name: "",
    user_name:"",
    user_email: "",
    user_password: "",
    Confirm_Password: "",
  });
  // *for navigation
  let navigate = useNavigate();

  //* to change the icon when clicked
  const HandleIconChange = () => {
    //* event listen for Password function
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  //* to change the icon when clicked
  const HandleIconChangee = () => {
    //* event listen for Password function
    if (type1 === "password") {
      setIcon1(eye);
      setType1("text");
    } else {
      setIcon1(eyeOff);
      setType1("password");
    }
  };

  //* for confirmation of password not to be pasted
  const handlePaste = (event) => {
    event.preventDefault();
    setPassword("");
  };



  const formSubmitter = (e) => {
    e.preventDefault();
    if (userData.user_password === userData.Confirm_Password) {
      let userFile = {
        user_first_name: userData.user_first_name,
        user_last_name: userData.user_last_name,
        user_name :userData.user_name,
        user_email: userData.user_email,
        user_password: userData.user_password
      };
      axios({
        method: "post",
        url,
        data: userFile,
      })
        // .then((data) => {
        //   setresponse(data.data);
        //   let token = data?.data?.token;
        //   if (token) {
        //     cookies.set("token", token, {
        //       path: "/",
        //       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //     });
        //     dispatch(getUser());
        //     navigate("/dashbord");
        //   }
        // })
        .then((data) => {
              setresponse(data.data);})
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return setresponse({
        messageToTheFront: "Passwords Doesn't Match",
        navigation: "/signup",
        messageToUser: "Click Here To Go Back To Signup  Page",
      });
    }
  };

  // ******************************
  let handleChange = (e) => {
    switch (e.target.name) {
      case "user_last_name":
        setUserData((pre) => {
          return { ...pre, user_last_name: e.target.value };
        });
        break;
      case "user_first_name":
        setUserData((pre) => {
          return { ...pre, user_first_name: e.target.value };
        });
        break;
      case "user_email":
        setUserData((pre) => {
          return { ...pre, user_email: e.target.value };
        });
        break;
     
      case "user_password":
        setUserData((pre) => {
          return { ...pre, user_password: e.target.value };
        });
        break;
      case "user_name":
        setUserData((pre) => {
          return { ...pre, user_name: e.target.value };
        });
        break;
      
      case "Confirm_Password":
        setUserData((pre) => {
          return { ...pre, Confirm_Password: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  // ****************************
  if (response) {
      return (
        <div className="forSuccessPa">
          <h1 className="thankYou">{response.messageToTheFront}</h1>
          <a className="thankYouAnch" href={response.navigation}>
            {response.messageToUser}
          </a>
        </div>
      );
  } else {
    return (
      <div className="d-flex signUpAkafi">
      
          <div className="form_wrapper  p-5 d-flex flex-column">
            <p className="p11">EVANGADI STACK OVERFLOW </p>
            <p className="p22 lorem">
              Already have an account?
              <Link to="/login" className="a11">
                Sign in
              </Link>
            </p>
            <div className="">
            <form onSubmit={formSubmitter}>
              <div className="FLname d-flex">
                <input
                  required
                  className="in11 me-1"
                  autoComplete="new-password"
                  name="user_first_name"
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  required
                  className="in11 ms-1"
                  name="user_last_name"
                  onChange={handleChange}
                  type="text"
                  autoComplete="new-password"
                  placeholder="Last Name"
                />
            
              </div>
              <input
                  required
                  className="in11 mr-1"
                  name="user_name"
                  onChange={handleChange}
                  type="text"
                  autoComplete="new-password"
                  placeholder="user name"
                />
              <input
                required
                className="in11 mr-1"
                name="user_email"
                autoComplete="new-password"
                onChange={handleChange}
                type="email"
                placeholder="Email"
              />
              <input
                required
                className="in11"
                onChange={handleChange}
                name="user_password"
                autoComplete="new-password"
                type={type}
                placeholder="Password with"
              />

              <span className="showHide ">
                <Icon
                  icon={icon}
                  size={22}
                  onClick={HandleIconChange}
                  className="iconss"
                />
              </span>
              <input
                required
                className="in11 mt-4"
                onChange={handleChange}
                name="Confirm_Password"
                autoComplete="new-password"
                type={type1}
                onPaste={handlePaste}
                placeholder="Confirm Password"
              />
              <span className="showHide ">
                <Icon
                  icon={icon1}
                  size={22}
                  onClick={HandleIconChangee}
                  className="iconss"
                />
              </span>

              <button className="btnSign">Agree and Join</button>
            </form>
            </div>
        </div>
        <div className="sideNote2 container col-12 col-md-6 ms-md-2 mt-sm-5">
          <p className="forTitle">About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem voluptate officiis beatae nobis pariatur omnis facere accusamus laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum quisquam! Molestias, ut commodi!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem voluptate officiis beatae nobis pariatur omnis facere accusamus laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum quisquam! Molestias, ut commodi!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ipsum, provident minus laudantium esse soluta maiores nostrum nisi sunt perferendis dolorum. Praesentium necessitatibus quia consectetur sunt tempora possimus eveniet voluptates?</p>

        </div>
      </div>
    );
  }
};

export default SignUp;
