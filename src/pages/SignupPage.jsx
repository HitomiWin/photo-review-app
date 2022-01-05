import React, { useRef, useState} from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


const SignupPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError(null)
    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("The password doesn't match")
    }
    try {
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    }catch(e){
      setError(e.message);
      setIsLoading(false)
    }
  }
  return (
    <>
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card className="rounded-lg px-3">
            <Card.Body>
              <Card.Title className="mb-3 text-center text-secondary">
                Sign Up
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3  text-secondary">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3  text-secondary">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group
                  id="password-confirm"
                  className="mb-3 text-secondary"
                >
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <Button disabled={isLoading} type="submit" variant ="primary" className="text-info">
                  Create Account
                </Button>
              </Form>
            </Card.Body>
            <div className="text-center m-3 text-light">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Log In
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SignupPage
