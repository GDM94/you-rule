import CreateRuleProcess from './CreateRuleProcess';
import Rule from './Rule';
import SetRuleElementDetail from './RuleElements/SetRuleElementDetail';


export default function DetailRule(props) {
    if (props.element.id && props.elementId !== "" && props.elements.length > 0 && props.addNewElement === false && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <Rule {...props} />
    } else if (props.elementId === "" && props.addNewElement === true && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <CreateRuleProcess {...props} />
    }
    else if (props.elementId !== "" && props.addNewElement === false && props.setRuleAntecedent === true && props.setRuleConsequent === false && props.ruleElementId !== "") {
        return <SetRuleElementDetail {...props} />
    }
    else if (props.elementId !== "" && props.addNewElement === false && props.setRuleAntecedent === false && props.setRuleConsequent === true && props.ruleElementId !== "") {
        return <SetRuleElementDetail {...props} />
    }
    else {
        return (<></>)
    }

}





