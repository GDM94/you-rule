import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function RuleTitle(props) {
    return (
        <RuleTitleComponent>
            <h1> <FiberManualRecordIcon style={{ color: props.elements[props.elementIdx].evaluation === "true" ? "green" : "red" }} /> {props.newRuleName} </h1>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button style={{ display: props.modify ? "" : "none" }}
                    onClick={() => {
                        props.handleModify(false);
                        props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                        props.deleteRuleRequest(props.newRuleId, props.newRuleIdx);

                    }}>
                    <DeleteIcon fontSize="large" style={{ color: "red" }} />
                </Button >
                <Button
                    onClick={() => {
                        props.getRuleById(props.newRuleId);
                    }}>
                    <RefreshIcon fontSize="large" style={{ color: "black" }} />
                </Button >
                <Button
                    onClick={() => {
                        if (props.modify) {
                            const ruleIdx = props.newRuleIdx;
                            //props.setRuleRequest(ruleIdx);
                            props.handleModify(false);
                        }
                        else {
                            props.handleModify(true);
                        }
                    }}>
                    {props.modify ? <DoneIcon fontSize="large" style={{ color: "black" }} /> : <EditIcon fontSize="large" style={{ color: "black" }} />}

                </Button >
            </ButtonGroup>
        </RuleTitleComponent >
    )
}

const RuleTitleComponent = styled.div`
display: flex;
flex-flow: row;
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
`;