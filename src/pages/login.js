import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Login } from "../helper/auth_handler";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Login(formData);
    if (result) {
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="login-container ">
      <Row className="vh-100 d-flex align-items-center justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="logo-container text-center">
            <img
              className="logo"
              src={logo}
              alt="Logo"
              height={100}
              width={100}
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
