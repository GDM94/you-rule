import TimerAntecedent from "./TimerAntecedent/TimerAntecedent"

export default function SetRuleElementDetail(props){
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
        return (<p> set rule antecedent for SWITCH</p>)
    }
    else if (props.ruleElementId.includes("alert")) {
        return (<p> set rule antecedent for alert</p>)
    }
    else{
        return(<></>)
    }
}