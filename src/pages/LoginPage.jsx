import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card className="rounded-lg px-3">
            <Card.Body>
              <Card.Title className="mb-3  text-center text-secondary">
                Log In
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3 text-secondary">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3 text-secondary">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button
                  disabled={isLoading}
                  className="text-info"
                  type="submit"
                >
                  Log in
                </Button>
              </Form>
            </Card.Body>
            <div className="text-center m-3 text-light">
              Are you not a member yet?{" "}
              <Link to="/signup" className="text-primary">
                Sign up
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
