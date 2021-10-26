import EditIcon from '@material-ui/icons/Edit';

export default function ConsequentRuleBody(props) {
    return (
        <ul style={{listStyle: "none", paddingLeft: "0%", paddingTop: "5px"}}>
            {props.element.rule_consequents.map(item => {
                return (
                    <li key={item.device_id + "antecedentRuleElement"}
                        style={{ color: "black", backgroundColor: "#cccccc", borderRadius: "25px", margin: "2%", marginTop: "0%", padding: "1%", paddingLeft: "5%", textAlign: "left"} }
                        onClick={() => {
                            props.handleSetRuleConsequent(true);
                            props.setRuleElement(item.device_id);
                            props.getRuleConsequentById(item.device_id);
                        }}>
                        <span> {item.device_name} </span>
                        <EditIcon fontSize="small" style={{ color: "black", float: "right", marginRight: "10px" }} />
                    </li>
                )
            })}
        </ul>
    )
}

