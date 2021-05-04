import React from 'react';
import axios from 'axios';
import UserLoginProcess from './UserLoginProcess'
import UserRegisterProcess from './UserRegisterProcess'
import { Redirect } from 'react-router-dom';
import yourule_logo2 from './yourule_logo2.png';
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';

var jwt = require('jwt-simple');

export default class UserAccessProcess extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            userNameList: [],
            userLoginPopUp: false,
            userRegisterPopUp: false,
            userName: "",
            password: "",
            redirect: "",
            userLoginError: false,
            idToken: "",
            duplicateUserError: false,

            menuPopUp: false,
            anchorEl: undefined
        }
    }

    UserLoginRequest = (email, password) => {
        console.log("UserAccess GET login")
        var access_token = jwt.encode({ email: email, password: password }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/login?access_token=" + access_token;
        axios.get(url)
            .then(res => {
                const tokenId = res.data.tokenId;
                if (tokenId !== "false") {
                    this.handleLoginPopUp();
                    this.setUser(email, tokenId)
                }
                else {
                    this.setState({ userLoginError: true });
                }
            })
            .catch(err => console.warn(err));
    }


    UserRegistrationRequest = (email, password, name, surname) => {
        console.log("UserAccess POST registration")
        var access_token = jwt.encode({ email: email, password: password, name: name, surname: surname }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/registration?access_token=" + access_token;
        axios.get(url)
            .then(res => {
                const tokenId = res.data.tokenId;
                if (tokenId !== "false") {
                    this.handleRegisterPopUp();
                    this.setUser(email, tokenId);
                } else {
                    this.setState({ duplicateUserError: true });
                }

            })
            .catch(err => console.warn(err));
    }

    handleMenuPopUp = (event) => {
        this.setState({
            menuPopUp: !this.state.menuPopUp,
            anchorEl: event.currentTarget
        });
    }

    handleUserLoginError = (check) => {
        this.setState({ userLoginError: check });
    }

    handleLoginPopUp = () => {
        this.setState({ userLoginPopUp: !this.state.userLoginPopUp })
    }
    handleRegisterPopUp = () => {
        this.setState({ userRegisterPopUp: !this.state.userRegisterPopUp })
    }

    setUser = (email, idToken) => {
        this.setState({
            email: email,
            idToken: idToken,
            redirect: process.env.REACT_APP_PROTECTED_URL + '?email=' + email + '&idToken=' + idToken
        })
        console.log("redirect")
    }

    render() {
        if (this.state.redirect === "") {
            return (
                <AppDiv>
                    <TopBar>
                        <TopBarElement>
                            WELCOME PORTAL
                        </TopBarElement>
                        <TopBarButton onClick={(event) => { this.handleMenuPopUp(event) }}>
                            <MenuIcon fontSize="large" style={{ color: 'white' }} />
                        </TopBarButton>
                        <PopperStyled placement="bottom-end" id='menu-popper' open={this.state.menuPopUp} anchorEl={this.state.anchorEl}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button onClick={() => {
                                    this.handleLoginPopUp();
                                }}>
                                    <ListItemIcon>
                                        <VpnKeyIcon fontSize="small" style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="LOGIN" />
                                </ListItem>
                                <Divider style={{ color: 'white !important' }} />
                                <ListItem button onClick={() => {
                                    this.handleRegisterPopUp();
                                }}>
                                    <ListItemIcon>
                                        <CreateIcon fontSize="small" style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="REGISTER" />
                                </ListItem>
                            </List>
                            <Divider />
                        </PopperStyled>
                    </TopBar>
                    <UserLoginProcess
                        userLoginPopUp={this.state.userLoginPopUp}
                        handleLoginPopUp={this.handleLoginPopUp}
                        handleUserLoginError={this.handleUserLoginError}
                        userLoginError={this.state.userLoginError}
                        UserLoginRequest={this.UserLoginRequest}
                        setUser={this.setUser}
                    />
                    <UserRegisterProcess
                        userRegisterPopUp={this.state.userRegisterPopUp}
                        handleRegisterPopUp={this.handleRegisterPopUp}
                        UserRegistrationRequest={this.UserRegistrationRequest}
                        setUser={this.setUser}
                        duplicateUserError={this.state.duplicateUserError}
                    />
                    <GreatBody>
                        <img src={yourule_logo2} alt="fireSpot" />
                    </GreatBody>
                </AppDiv>
            )
        }
        else {
            return (
                <Redirect to={{
                    pathname: process.env.REACT_APP_PROTECTED_URL,
                    state: { idToken: this.state.idToken }

                }



                } />
            )
        }

    }
}


const PopperStyled = styled(Popper)`
color: white;
background-color: rgb(21, 33, 207);
border-style: solid;
`;


const AppDiv = styled.div`
display: flex;
flex-flow: column;
width: 100%;
height: 100%;
background-color: rgb(190, 210, 218);
`;

const TopBar = styled.div`
background-color: rgb(21, 33, 207);
width: 100%;
`;

const TopBarElement = styled.div`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
`;

const TopBarButton = styled(IconButton)`
  float: right;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const GreatBody = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  justify-content: center;
`;







