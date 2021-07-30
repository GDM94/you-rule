import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';


function RuleNameList(props) {
    const rules = props.rulesDevice;

    if (rules.length > 0) {
        const rulesIdList = rules.map(rule => { return rule.id });
        const rulesNameList = rules.map(rule => {
            const ruleId = rule.id;
            const ruleName = rule.name;
            const ruleIdx = rulesIdList.indexOf(ruleId);
            return (
                <div key={ruleId}>
                    <ListItem key={ruleId} button onClick={() => {
                        props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                        props.setNewRule(ruleId, ruleName, ruleIdx);
                        props.location.state.page = process.env.REACT_APP_PAGE_RULES
                        props.history.push({ pathname: process.env.REACT_APP_RULES_URL, state: props.location.state })
                    }}>
                        <ListItemText primary={ruleName} />
                    </ListItem>
                    <Divider />
                </div>

            )
        })
        return (
            <List component="div" aria-label="main mailbox folders">
                {rulesNameList}
            </List>
        )
    }
    else {
        return (
            <List component="div" aria-label="main mailbox folders">
                <ListItem>
                    <ListItemText primary="no rules setted" />
                </ListItem>
                <Divider />
            </List>)
    }
}

export default withRouter(RuleNameList)


