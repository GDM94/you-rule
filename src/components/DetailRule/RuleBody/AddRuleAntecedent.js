import styled from "styled-components";
import Button from '@material-ui/core/Button';

export default function AddRuleAntecedent(props) {
    return (
        <>
            <AddRuleAntecedentsDevice {...props} />
            <AddRuleAntecedentSwitchLastTimeOn {...props} />
        </>
    )
}

function AddRuleAntecedentsDevice(props) {
    var antecedentsId = props.element.device_antecedents;
    return (
        props.antecedents.map(item => {
            if (!antecedentsId.some(c => c === item.id)) {
                return (
                    <MyButton onClick={() => {
                        props.setRuleElement(item.id, item.name, props.element.device_antecedents.length);
                        props.addNewRuleAntecedentRequest(item.id);
                        props.handleSetRuleAntecedent(true);
                    }}>
                        {item.name}
                    </MyButton>
                )
            }
            else {
                return <></>;
            }
        })
    )
}

function AddRuleAntecedentSwitchLastTimeOn(props) {
    var antecedentsId = props.element.device_antecedents;
    var consequents = props.element.rule_consequents;
    if (consequents.length > 0) {
        return (
            consequents.map(item => {
                if (!item.device_id.includes("alert")) {
                    if (!antecedentsId.some(c => c === item.device_id)) {
                        return (
                            <MyButton onClick={() => {
                                props.setRuleElement(item.id, item.name, props.element.device_antecedents.length);
                                props.addNewRuleAntecedentRequest(item.id);
                                props.handleSetRuleAntecedent(true);
                            }}>
                                {item.name}
                            </MyButton>
                        )
                    }
                    else {
                        return <></>
                    }
                } else {
                    return <></>
                }

            })
        )
    }
    else {
        return <></>
    }
}

const MyButton = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;