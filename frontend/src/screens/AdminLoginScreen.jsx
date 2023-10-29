import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../slices/adminApiSlice";
import { setAdminCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.auth);
  const passwordStyles = {
    passwordInput: {
      position: "relative",
    },
    passwordToggle: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: "10px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <div style={passwordStyles.passwordInput}>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={passwordStyles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminLoginScreen;
