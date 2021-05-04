import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default class UserRegisterProcess extends React.Component {
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
            password_length : 2,

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
        !this.props.duplicateUserError &&
        this.state.password.length > this.state.password_length && 
        this.state.email.includes("@") && 
        this.state.password === this.state.repeatPassword &&
        this.state.name.length>0 &&
        this.state.surname.length>0
        ) {
            this.setState({checkError: false});
            this.props.UserRegistrationRequest(this.state.email, this.state.password, this.state.name, this.state.surname);
        }
        else{
            this.setState({checkError: true});
            if(this.props.duplicateUserError){
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

    render() {
        return (
            <Modal show={this.props.userRegisterPopUp} onHide={() => this.props.handleRegisterPopUp()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        "SING UP"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            <input type="submit" style={{visibility:"hidden"}}/>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button onClick={() => {
                            this.registrationFunction();
                        }}>
                            SING UP
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}