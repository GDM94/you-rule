import React from 'react';
import axios from 'axios';
import UserLoginProcess from './UserLoginProcess'
import UserRegisterProcess from './UserRegisterProcess'
import { Redirect } from 'react-router-dom';


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
            checkUserLoginCorrect: true,
        }
    }

    componentDidMount() {
        this.GetUserNameList();
    }

    GetUserNameList = () => {
        console.log("UserAccess GET user name list");
        const url = process.env.REACT_APP_BACKEND_URL + "/user/names";
        axios.get(url)
            .then(res => {
                const userNameList = res.data;
                console.log("user name list:", userNameList)
                this.setState({ userNameList: userNameList }, () => { this.render() })
            })
            .catch(err => console.warn(err));
    }

    UserLoginRequest = (user_name, password) => {
        console.log("UserAccess GET login")
        const url = process.env.REACT_APP_BACKEND_URL + "/user/login/" + user_name + "/" + password;;
        axios.get(url)
            .then(res => {
                const userId = res.data;
                console.log("user name:", user_name)
                console.log("user id:", userId)
                if (userId !== "false") {
                    this.handleLoginPopUp();
                    this.setState({ redirect: process.env.REACT_APP_PROTECTED_URL + '?user_id=' + userId + '&user_name=' + user_name }, () => { this.render() })
                }
                else {
                    this.handleCheckUserLoginCorrect(false);
                }
            })
            .catch(err => console.warn(err));
    }

    UserRegistrationRequest = (user_name, password) => {
        console.log("UserAccess POST registration")
        const url = process.env.REACT_APP_BACKEND_URL + "/user/registration/" + user_name + "/" + password;
        console.log("debug user_name ", user_name)
        axios.get(url)
            .then(res => {
                const userId = res.data;
                this.handleRegisterPopUp();
                this.setState({ redirect: process.env.REACT_APP_PROTECTED_URL + '?user_id=' + userId + '&user_name=' + user_name }, () => { this.render() })
            })
            .catch(err => console.warn(err));
    }

    handleCheckUserLoginCorrect = (check) => {
        this.setState({ checkUserLoginCorrect: check });
    }



    handleLoginPopUp = () => {
        this.setState({ userLoginPopUp: !this.state.userLoginPopUp })
    }
    handleRegisterPopUp = () => {
        this.GetUserNameList();
        this.setState({ userRegisterPopUp: !this.state.userRegisterPopUp })
    }

    render() {
        if (this.state.redirect === "") {
            return (
                <div className="App">
                    <div className="TopBar">
                        <div className="TopBarElement">
                            WELCOME PORTAL
                        </div>
                        <div className="TopBarElement">
                            <button variant="primary" onClick={() => { this.handleLoginPopUp() }}>LOGIN</button>
                        </div>
                        <div className="TopBarElement">
                            <button variant="primary" onClick={() => { this.handleRegisterPopUp() }}>REGISTER</button>
                        </div>
                    </div>
                    <div>
                        <UserLoginProcess
                            userLoginPopUp={this.state.userLoginPopUp}
                            handleLoginPopUp={this.handleLoginPopUp}
                            handleCheckUserLoginCorrect={this.handleCheckUserLoginCorrect}
                            checkUserLoginCorrect={this.state.checkUserLoginCorrect}
                            UserLoginRequest={this.UserLoginRequest}
                        />
                        <UserRegisterProcess
                            userRegisterPopUp={this.state.userRegisterPopUp}
                            handleRegisterPopUp={this.handleRegisterPopUp}
                            userNameList={this.state.userNameList}
                            UserRegistrationRequest={this.UserRegistrationRequest}

                        />

                    </div>
                </div>
            )
        }
        else {
            return (
                <Redirect to={this.state.redirect} />
            )
        }

    }
}
