import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

export default function ButtonGroupRule(props) {
    return (
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button style={{ display: props.modify ? "" : "none" }}
                onClick={() => {
                    props.handleModify(false);
                    props.handleSetRulePopUp(false);
                    props.AntecedentRulePopUpBody();
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
                        props.setRuleRequest(ruleIdx);
                        props.handleModify(false);
                    }
                    else {
                        props.handleModify(true);
                    }
                }}>
                {props.modify ? <DoneIcon fontSize="large" style={{ color: "black" }} /> : <EditIcon fontSize="large" style={{ color: "black" }} />}

            </Button >
        </ButtonGroup>
    )
}