import React, { useState } from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RuleNameList from './RuleNameList'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeviceDescription from './DeviceDescription';
import SwitchTitle from './SwitchTitle';

export default function DetailAlert(props) {
    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <ContentContainer>
            <SwitchTitle
                {...props}
            />
            <ElementContent>
                <DeviceDescription
                    {...props}
                    description={"consequent - alert email sender"}
                />
                <ElementMeasure>
                    <EmailTitle>
                        <h3> emails </h3>
                        <Button onClick={() => {
                            props.addNewAlertEmailRequest()
                        }}>
                            <AddIcon fontSize="small" style={{ color: "black" }} />
                        </Button >
                    </EmailTitle>
                    <Divider />
                    <table align="center">
                        <tbody>
                            <EmailDetail {...props} />
                        </tbody>
                    </table>
                </ElementMeasure>
                <br></br>
                <ul>
                    <li key={"rules"}>
                        <Button onClick={() => { handleClick(); }}>
                            RULES  {openRule ? <ExpandLess /> : <ExpandMore />}
                        </Button>
                    </li>
                    <Collapse in={openRule} timeout="auto" unmountOnExit>
                        <RuleNameList
                            {...props}
                            rulesDevice={props.consequents[props.consequentIdx].rules}
                        />
                    </Collapse>
                </ul>

            </ElementContent>
        </ContentContainer>
    )
}

function EmailDetail(props) {
    const consequent_idx = props.consequentIdx;
    const email_list = props.consequents[consequent_idx].email_list;
    var idx = -1;
    if (email_list.length > 0) {
        var email_element = email_list.map(email => {
            idx++;
            const key = idx.toString()
            return (
                <AddAlertEmailProcess
                    {...props}
                    email={email}
                    idx={idx}
                    key={key}
                />
            )
        })
        return (email_element)
    }
    else {
        return (<></>)
    }

}

function AddAlertEmailProcess(props) {
    const [modifyAlertEmail, handleModifyAlertEmail] = useState(props.email === "" ? true : false);
    const addNewAlertEmail = () => {
        props.modifyEmailRequest(props.email, props.idx);
        handleModifyAlertEmail(false);
    };

    return (
        <tr>
            <td>
                <FormModifyEmail
                    {...props}
                    modifyAlertEmail={modifyAlertEmail}
                    addNewAlertEmail={addNewAlertEmail}
                />
            </td>
            <td>
                <EmailButtonGroup
                    {...props}
                    modifyAlertEmail={modifyAlertEmail}
                    addNewAlertEmail={addNewAlertEmail}
                    handleModifyAlertEmail={handleModifyAlertEmail}
                />
            </td>
        </tr>
    )


}

function FormModifyEmail(props) {
    const modifyEmailSubmit = (event) => {
        props.addNewAlertEmail();
        event.preventDefault();
    }
    if (props.modifyAlertEmail) {
        return (
            <form onSubmit={modifyEmailSubmit}>
                <input type="text" id="email" name="email" defaultValue={props.email}
                    onChange={(e) => {
                        const email = e.target.value;
                        props.modifyEmailLocal(props.idx, email);
                    }} />
            </form>

        )
    }
    else {
        return (
            <div>{props.email} </div>
        )
    }
}

function EmailButtonGroup(props) {
    return (
        <ButtonGroup variant="text" color="default" aria-label="text primary button group">
            <Button onClick={() => {
                props.modifyAlertEmail ? props.addNewAlertEmail() : props.handleModifyAlertEmail(true)
            }}>
                {props.modifyAlertEmail ?
                    <DoneIcon fontSize="small" style={{ color: "black" }} /> : <EditIcon fontSize="small" style={{ color: "black" }} />}
            </Button >

            <Button style={{ display: props.modifyAlertEmail ? '' : 'none' }}
                onClick={() => { props.removeAlertEmailRequest(props.idx) }}>
                <DeleteIcon fontSize="small" style={{ color: "red" }} />
            </Button>
        </ButtonGroup>
    )
}


const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
  max-height:100%;
  overflow-y: auto;
  background-color: #d9d9d9;
`;

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
background-color: #cccccc;
`;

const ElementMeasure = styled.div`
border: solid black 2px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
padding: 2%;
background-color: #a7b4a8;
text-align: center;
justify-content: center;
background-color: #e6e6e6;
`;

const EmailTitle = styled.div`
text-align: center;
justify-content: center;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;