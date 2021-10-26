import CreateRuleProcess from './CreateRuleProcess';
import Rule from './Rule/Rule';
import TimerAntecedent from "./RuleElements/TimerAntecedent/TimerAntecedent"
import AlertConsequent from "./RuleElements/AlertConsequent/AlertConsequent"
import SwitchConsequent from "./RuleElements/SwitchConsequent/SwitchConsequent"


export default function DetailRule(props) {
    if (props.element.id && props.elementId !== "" && props.elements.length > 0 && props.addNewElement === false && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <Rule {...props} />
    } else if (props.elementId === "" && props.addNewElement === true && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <CreateRuleProcess {...props} />
    }
    else if (props.elementId !== "" && props.addNewElement === false  && props.ruleElementId !== "") {
        if (props.setRuleAntecedent === true || props.setRuleConsequent === true){
            if (props.ruleElementId.includes("timer")) {
                return <TimerAntecedent {...props}/>
            }
            else if (props.ruleElementId.includes("WATERLEVEL")) {
                return (<p> set rule antecedent for WATERLEVEL</p>)
            }
            else if (props.ruleElementId.includes("BUTTON")) {
                return (<p> set rule antecedent for BUTTON</p>)
            }
            else if (props.ruleElementId.includes("SWITCH")) {
                return <SwitchConsequent {...props}/>
            }
            else if (props.ruleElementId.includes("alert")) {
                return <AlertConsequent {...props}/>
            }
            else{
                return(<></>)
            }
        }
    }
    else {
        return (<></>)
    }

}





