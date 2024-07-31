import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
       <div className='authentication'>
        <div  className='authentication-form card p-3'>
          <h1 className='card-title'> Welcome Back </h1>     
              <Form 
                layout="vertical" onFinish={onfinishHandler} className="register-form">
                
                 <h3 className="text-center">Login From</h3>

                <Form.Item label="Email" name="email">
                  <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input type="password" required />
                </Form.Item>
                <Link to="/register" className="anchor m-2">
                  Not a user Register here
                </Link>
                <button className="btn primary-button" type="submit">
                  Login
                </button>
              </Form>
            
            </div>
            </div>
  );
};

export default Login;