import styled from "styled-components";
import Button from '@material-ui/core/Button';


export default function AddRuleConsequent(props) {
    var consequentsId = props.element.device_consequents;
    var idx = -1;
    return (
        props.consequents.map(item => {
            idx++;
            if (!consequentsId.some(c => c === item.id)) {
                return (
                    <MyButton key={idx} onClick={() => {
                        props.setRuleElement(item.id);
                        props.addNewRuleAConsequentRequest(item.id);
                        props.handleSetRuleConsequent(true);
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

const MyButton = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;