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
        this.setState({ userName: userName }, () => { this.render() })
    }
    setPassword = (password) => {
        this.setState({ password: password }, () => { this.render() })
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
                        <form name="login">
                            <label htmlFor="name">User Name: </label>
                            <input type="text" id="name" name="name"
                                onChange={(e) => {
                                    this.props.handleCheckUserLoginCorrect(true);
                                    const NewName = e.target.value;
                                    this.setUserName(NewName)
                                }}
                            />
                            <br></br>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password"
                                onChange={(e) => {
                                    this.props.handleCheckUserLoginCorrect(true);
                                    const password = e.target.value;
                                    this.setPassword(password)
                                }}
                            />
                        </form>
                    </div>
                    <div>
                        <p style={{ display: this.props.checkUserLoginCorrect ? 'none' : 'block' }}> Error: User Name or Password are not correct!</p>
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