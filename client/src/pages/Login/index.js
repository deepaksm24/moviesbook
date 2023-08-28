import React, { useEffect } from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Loginuser } from "../../api/users";
import { useDispatch } from "react-redux";
import {ShowLoading,Hideloading} from "../../redux/loadersSlice"

const Login = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();

  const onFinish = async (v) => {
    try {
      dispatch(ShowLoading());
      const response = await Loginuser(v);
      dispatch(Hideloading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);

        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column bd-highlight mb-3  bg-info "
      style={{ height: "100vh" }}
    >
      <div className="cards p-5">
        <div className="">
          <h1>Movie_book</h1>
        </div>
        <Form layout="vertical" onFinish={onFinish} className="m-2">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input Your Mail ID" }]}
          >
            <input className="w-100" type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input Your Password" }]}
          >
            <input className="w-100" type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-100 mt-2 mb-4">
            <h6>LOGIN</h6>
          </Button>
          <Link to="/register">
            <div className="text-success">Don't have an Account? Register</div>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
