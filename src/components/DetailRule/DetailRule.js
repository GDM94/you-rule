import CreateRuleProcess from './CreateRuleProcess';
import Rule from './Rule/Rule';
import TimerAntecedent from "./RuleElements/TimerAntecedent/TimerAntecedent"
import AlertConsequent from "./RuleElements/AlertConsequent/AlertConsequent"
import SwitchConsequent from "./RuleElements/SwitchConsequent/SwitchConsequent"
import ButtonAntecedent from './RuleElements/ButtonAntecedent/ButtonAntecedent';
import WaterLevelAntecedent from './RuleElements/WaterLevelAntecedent/WaterLevelAntecedent';

export default function DetailRule(props) {
    if (props.element.id && props.elementId !== "" && props.elements.length > 0 && props.addNewElement === false && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <Rule {...props} />
    } else if (props.elementId === "" && props.addNewElement === true && props.setRuleAntecedent === false && props.setRuleConsequent === false) {
        return <CreateRuleProcess {...props} />
    }
    else if (props.elementId !== "" && props.addNewElement === false  && props.ruleElementId !== "" && props.ruleElement.device_id) {
        if (props.setRuleAntecedent === true || props.setRuleConsequent === true){
            if (props.ruleElement.device_id.includes("timer")) {
                return <TimerAntecedent {...props}/>
            }
            else if (props.ruleElement.device_id.includes("WATERLEVEL")) {
                return <WaterLevelAntecedent {...props}/>
            }
            else if (props.ruleElement.device_id.includes("BUTTON")) {
                return <ButtonAntecedent {...props}/>
            }
            else if (props.ruleElement.device_id.includes("SWITCH")) {
                return <SwitchConsequent {...props}/>
            }
            else if (props.ruleElement.device_id.includes("alert")) {
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





