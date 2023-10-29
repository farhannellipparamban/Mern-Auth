import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h2 className="text-center mb-4">
            Welcome {userInfo ? userInfo.name : ""}
          </h2>
          {/* <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p> */}
          <img
            src={"https://media.tenor.com/rePDfDWO3XoAAAAd/hacking.gif"}
            alt={userInfo ? userInfo.name : ""}
            style={{
              width: "310px",
              height: "170px",
              // borderRadius: '50%',
            }}
            className=""
          />
          {userInfo ? (
            ""
          ) : (
            <div className="d-flex" style={{ marginTop: "15px" }}>
              <LinkContainer to="/login">
                <Button variant="primary" className="me-3">
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button variant="secondary">Sign Up</Button>
              </LinkContainer>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
