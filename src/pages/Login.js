import React from "react";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import TOPBAR from "../components/TOPBAR";

var jwt = require('jwt-simple');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      userLoginError: false
    }
  }

  setUserName = (userName) => {
    this.setState({ userName: userName })
  }
  setPassword = (password) => {
    this.setState({ password: password })
  }

  loginSubmit = (event) => {
    this.UserLoginRequest(this.state.userName, this.state.password);
    event.preventDefault();
  }

  handleUserLoginError = (check) => {
    this.setState({ userLoginError: check });
}


  UserLoginRequest = async (email, password) => {
    console.log("UserAccess GET login")
    var access_token = jwt.encode({ email: email, password: password }, process.env.REACT_APP_JWT_SECRET);
    const url = process.env.REACT_APP_BACKEND_URL + "/user/login?access_token=" + access_token;
    try {
      let res = await axios.get(url)
      const tokenId = res.data.tokenId;
      if (tokenId !== "false") {
        this.props.history.push({ pathname: process.env.REACT_APP_SENSORS_URL, state: { token: tokenId } })
      }
      else {
        this.setState({ userLoginError: true });
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <Container>
        <TOPBAR />
        <Rect>
          <Form>
            <FormTitle>
              <Title>LOGIN</Title>
            </FormTitle>
            <FormBody>
              <div>
                <p style={{ display: this.state.userLoginError ? '' : 'none' }}> Error: User Name or Password are not correct!</p>
              </div>
              <div>
                <form name="login" onSubmit={this.loginSubmit}>
                  <input type="text" id="name" name="name" placeholder="email"
                    onChange={(e) => {
                      this.handleUserLoginError(false);
                      const NewName = e.target.value;
                      this.setUserName(NewName)
                    }}
                  />
                  <br></br>
                  <input type="password" id="password" name="password" placeholder="password"
                    onChange={(e) => {
                      this.handleUserLoginError(false);
                      const password = e.target.value;
                      this.setPassword(password)
                    }}
                  />
                  <br></br>
                  <input type="submit" style={{ visibility: "hidden" }} />
                </form>
              </div>
            </FormBody>
            <FormBottom>
              <div>
                <button onClick={() => {
                  this.UserLoginRequest(this.state.userName, this.state.password);
                }}>
                  LOGIN
                </button>
              </div>
            </FormBottom>
          </Form>
        </Rect>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Rect = styled.div`
  width: 100%;
  height: 100%;
  background-color: #E6E6E6;
  display: flex;
  padding: 5%;
`;

const Form = styled.div`
  width: 100%;
  background-color: rgba(243,240,240,1);
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.div`
  width: 100%;
  background-color: rgba(243,240,240,1);
  display: flex;
  justify-content: center;
`;

const FormBody = styled.div`
  width: 100%;
  background-color: rgba(243,240,240,1);
  display: flex;
  justify-content: center;
  padding: 5%;
`;

const FormBottom = styled.div`
  width: 100%;
  background-color: rgba(243,240,240,1);
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 34px;
  text-decoration-line: underline;
`;

export default withRouter(Login);
