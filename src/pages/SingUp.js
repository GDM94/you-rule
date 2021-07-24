import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TOPBAR from "../components/TOPBAR";

var jwt = require('jwt-simple');

class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkError: false,
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
      password_length: 2,
      duplicateUserError: false

    }
  }

  setName = (name) => {
    this.setState({ name: name })
}

setSurname = (surname) => {
    this.setState({ surname: surname })
}

setEmail = (email) => {
    this.setState({ email: email })
}
setPassword = (password) => {
    this.setState({ password: password })
}

setRepeatPassword = (password) => {
    this.setState({ repeatPassword: password })
}

registrationSubmit = (event) =>{
    this.registrationFunction();
    event.preventDefault();
}

registrationFunction = () => {
    if (
    !this.state.duplicateUserError &&
    this.state.password.length > this.state.password_length && 
    this.state.email.includes("@") && 
    this.state.password === this.state.repeatPassword &&
    this.state.name.length>0 &&
    this.state.surname.length>0
    ) {
        this.setState({checkError: false});
        this.UserRegistrationRequest(this.state.email, this.state.password, this.state.name, this.state.surname);
    }
    else{
        this.setState({checkError: true});
        if(this.state.duplicateUserError){
            this.setState({errorMessage: "Error: Email already registerd."});
        }
        else if(this.state.password.length <= this.state.password_length){
            this.setState({errorMessage: "Error: password don't attempt security standard. Password must be at least 2 character long."});
        }
        else if(!this.state.email.includes("@")){
            this.setState({errorMessage: "Error: email non valid"});
        }
        else if(this.state.password === this.state.repeatPassword){
            this.setState({errorMessage: "Error: the repeated password must be identical to the previous password"});
        }
        else{
            this.setState({errorMessage: "Error: you must register your name and surname"});
        }
    }
}

UserRegistrationRequest = async (email, password, name, surname) => {
  console.log("UserAccess POST registration")
  var access_token = jwt.encode({ email: email, password: password, name: name, surname: surname }, process.env.REACT_APP_JWT_SECRET);
  const url = process.env.REACT_APP_BACKEND_URL + "/user/registration?access_token=" + access_token;
  try {
      let res = await axios.get(url)
      const tokenId = res.data.tokenId;
      if (tokenId !== "false") {
          this.props.history.push({pathname: process.env.REACT_APP_SENSORS_URL, state: { token: tokenId } })
      } else {
          this.setState({ duplicateUserError: true });
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
              <Title>SINGUP</Title>
            </FormTitle>
            <FormBody>
              <div>
                <div>
                  <p style={{ display: this.state.checkError ? 'block' : 'none' }}> {this.state.errorMessage}</p>
                </div>
                <form name="login" onSubmit={this.registrationSubmit}>
                  <input type="text" id="name" name="name" placeholder="name"
                    onChange={(e) => {
                      const name = e.target.value;
                      this.setName(name)
                    }} />
                  <br></br>
                  <input type="text" id="surname" name="surname" placeholder="surname"
                    onChange={(e) => {
                      const surname = e.target.value;
                      this.setSurname(surname)
                    }} />
                  <br></br>
                  <input type="text" id="email" name="email" placeholder="email"
                    onChange={(e) => {
                      const email = e.target.value;
                      this.setEmail(email)
                    }} />
                  <br></br>
                  <input type="password" id="password" name="password" placeholder="password"
                    onChange={(e) => {
                      const password = e.target.value;
                      this.setPassword(password)
                    }} />
                  <br></br>
                  <input type="password" id="repeat_password" name="repeat_password" placeholder="repeat password"
                    onChange={(e) => {
                      const password = e.target.value;
                      this.setRepeatPassword(password)
                    }} />
                  <br></br>
                  <input type="submit" style={{ visibility: "hidden" }} />
                </form>
              </div>
            </FormBody>
            <FormBottom>
              <div>
                <button onClick={() => {
                  this.registrationFunction();
                }}>
                  SINGUP
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

export default withRouter(SingUp);
