import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input } from "antd";
import toast from 'react-hot-toast'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        toast("Redirection to home page");
        localStorage.setItem("token", res.data.data)
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    
    < div className='authentication'>
    <div className='authentication-form card p-3' >
      <h1 className='card-title'>Nice to meet you</h1>

        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
         <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="anchor m-2">
            Already user login here
          </Link>
          <button className="btn primary-button" type="submit">
            Register
          </button>
        </Form>
      </div>

      </div>
    
  );
};

export default Register;