import styled from "styled-components";
import Button from '@material-ui/core/Button';

export default function AddRuleAntecedent(props) {
    return (
        <>
            <AddRuleAntecedentsDevice {...props} />
        </>
    )
}

function AddRuleAntecedentsDevice(props) {
    var antecedentsId = props.element.device_antecedents;
    var idx = 500;
    return (
        props.antecedents.map(item => {
            idx++;
            if (!antecedentsId.some(c => c === item.id)) {
                return (
                    <MyButton key={idx} onClick={() => {
                        props.setRuleElement(item.id);
                        props.addNewRuleAntecedentRequest(item.id);
                        props.handleSetRuleAntecedent(true);
                    }}>
                        {item.name}
                    </MyButton>
                )
            }
            else {
                return null;
            }
        })
    )
}

function AddRuleAntecedentSwitchLastTimeOn(props) {
    var antecedentsId = props.element.device_antecedents;
    var consequents = props.element.rule_consequents;
    var idx = 10000;
    if (consequents.length > 0) {
        idx++;
        return (
            consequents.map(item => {
                if (!item.device_id.includes("alert")) {
                    if (!antecedentsId.some(c => c === item.device_id)) {
                        return (
                            <MyButton key={idx} onClick={() => {
                                props.setRuleElement(item.id);
                                props.addNewRuleAntecedentRequest(item.id);
                                props.handleSetRuleAntecedent(true);
                            }}>
                                {item.name}
                            </MyButton>
                        )
                    }
                    else {
                        return null
                    }
                } else {
                    return null
                }

            })
        )
    }
    else {
        return null
    }
}

const MyButton = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;