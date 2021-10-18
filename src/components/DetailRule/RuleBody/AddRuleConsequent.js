import styled from "styled-components";
import Button from '@material-ui/core/Button';


export default function AddRuleConsequent(props) {
    var consequentsId = props.element.device_consequents;
    return (
        props.consequents.map(item => {
            if (!consequentsId.some(c => c === item.id)) {
                return (
                    <MyButton onClick={() => {
                        //props.setConsequentRuleLocal(props.newRuleIdx, newConsequent);
                        props.setRuleElement(item.id, item.name, props.element.device_consequents.length);
                        props.addNewRuleAConsequentRequest(item.id);
                        props.handleSetRuleConsequent(true);
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

const MyButton = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;