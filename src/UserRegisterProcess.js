import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default class UserRegisterProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkuserName: false,
            userName: "",
            password:""
        }
    }

    setUserName = (userName) => {
        this.setState({ userName: userName }, () => { this.render() })
    }
    setPassword = (password) => {
        this.setState({ password: password }, () => { this.render() })
    }

    checkuserNameFunction = (newName) => {
        const userNameList = this.props.userNameList;
        var checkuserName = false;
        if (userNameList.some(username => username === newName)) {
            checkuserName = true;
        }
        this.setState({
            checkuserName: checkuserName
        }, () => { this.render() });

        return checkuserName
    }

    render() {
        return (
            <Modal show={this.props.userRegisterPopUp} onHide={() => this.props.handleRegisterPopUp()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        "REGISTER"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form name="login">
                            <label htmlFor="name">User Name: </label>
                            <input type="text" id="name" name="name"
                                onChange={(e) => {
                                    const NewName = e.target.value;
                                    var check = this.checkuserNameFunction(NewName);
                                    if (!check) {
                                        this.setUserName(NewName)
                                    }
                                }} />
                            <br></br>
                            <label htmlFor="password">Password: </label>
                            <input type="text" id="password" name="password"
                                onChange={(e) => {
                                    const password = e.target.value;
                                    this.setPassword(password)
                                }} />
                        </form>
                    </div>
                    <div>
                        <p style={{ display: this.state.checkuserName ? 'block' : 'none' }}> Error: User Name already exist. Choose another name!</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button onClick={() => {
                            if (!this.state.checkuserName && this.state.userName.length > 1 && this.state.password.length > 1) {
                                this.props.UserRegistrationRequest(this.state.userName, this.state.password);
                            }
                        }}>
                            REGISTER
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}