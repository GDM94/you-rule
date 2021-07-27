import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


export default class AddAlertEmailProcess extends React.Component {
    constructor(props) {
        super(props);
        this.key_count = 0;
        this.state = {
            checkAddNewEmail: false,
            email: this.props.email,
            modifyAlertEmail: false,
        }
    }

    checkAddEmailFunction = (email) => {
        this.setState({
            email: email
        })
    }

    addNewAlertEmail = () => {
        if (!this.state.checkAddNewEmail) {
            const email = this.state.email
            this.props.modifyEmailRequest(email, this.props.idx);
            this.handleModifyAlertEmail(false);
        }
    }

    handleModifyAlertEmail = (state) => {
        this.setState({
            modifyAlertEmail: state
        }, ()=>{
            if (this.state.modifyAlertEmail){
                this.email_init()
            }
        })
    }

    email_init = ()=>{
        this.setState({
            email: this.props.email
        })
    }


    render() {
        return (
            <tr key={this.key_count++}>
                <td>
                    <FormModifyEmail
                        addNewAlertEmail={this.addNewAlertEmail}
                        email={this.state.email}
                        checkAddEmailFunction={this.checkAddEmailFunction}
                        modifyAlertEmail={this.state.modifyAlertEmail}
                    />

                </td>
                <td>
                    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                        <Button onClick={() => {
                            this.state.modifyAlertEmail || this.props.email === "" ? this.addNewAlertEmail() : this.handleModifyAlertEmail(true)
                        }}>
                            {this.state.modifyAlertEmail || this.props.email === "" ? <DoneIcon fontSize="small" style={{ color: "black" }} /> : <EditIcon fontSize="small" style={{ color: "black" }} />}

                        </Button >

                        <Button style={{ display: this.state.modifyAlertEmail || this.props.email === "" ? '' : 'none' }}
                            onClick={() => { this.props.removeAlertEmailRequest(this.props.idx) }}>
                            <DeleteIcon fontSize="small" style={{ color: "red" }} />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }

}

function FormModifyEmail(props) {
    const modifyEmailSubmit = (event) =>{
        props.addNewAlertEmail();
        event.preventDefault();
    }
    if (props.modifyAlertEmail || props.email === "") {
        return (
            <div>
                <form onSubmit={modifyEmailSubmit}>
                    <input type="text" id="email" name="email" defaultValue={props.email}
                        onChange={(e) => {
                            const email = e.target.value;
                            props.checkAddEmailFunction(email);
                        }} />
                </form>
            </div>
        )
    }
    else {
        return (
            <div>{props.email} </div>
        )
    }

}