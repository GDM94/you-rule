import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default class UserLoginProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    setUserName = (userName) => {
        this.setState({ userName: userName })
    }
    setPassword = (password) => {
        this.setState({ password: password })
    }

    loginSubmit = (event) => {
        this.props.UserLoginRequest(this.state.userName, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <Modal show={this.props.userLoginPopUp} onHide={() => this.props.handleLoginPopUp()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        "LOGIN"
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p style={{ display: this.props.userLoginError ? '' : 'none' }}> Error: User Name or Password are not correct!</p>
                    </div>
                    <div>
                        <form name="login" onSubmit={this.loginSubmit}>
                            <input type="text" id="name" name="name" placeholder="email"
                                onChange={(e) => {
                                    this.props.handleUserLoginError(false);
                                    const NewName = e.target.value;
                                    this.setUserName(NewName)
                                }}
                            />
                            <br></br>
                            <input type="password" id="password" name="password" placeholder="password"
                                onChange={(e) => {
                                    this.props.handleUserLoginError(false);
                                    const password = e.target.value;
                                    this.setPassword(password)
                                }}
                            />
                            <br></br>
                            <input type="submit" style={{visibility:"hidden"}}/>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button onClick={() => {
                            this.props.UserLoginRequest(this.state.userName, this.state.password);
                        }}>
                            LOGIN
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}