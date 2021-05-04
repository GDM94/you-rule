import React from 'react';
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export default function ViewRules(props) {
    return (
        <MyList>
            <List component="div" aria-label="main mailbox folders">
                <ItemList
                    handleSetRulePopUp={props.handleSetRulePopUp}
                    setNewRule={props.setNewRule}
                    rules={props.rules}
                    getRuleById={props.getRuleById}
                    newRuleId={props.newRuleId}
                    modify={props.modify}
                    handleModify={props.handleModify}
                    AntecedentRulePopUpBody={props.AntecedentRulePopUpBody}
                    deleteRuleRequest={props.deleteRuleRequest}
                    newRuleIdx={props.newRuleIdx}
                    setRuleRequest={props.setRuleRequest}

                />
            </List>
        </MyList>
    );
}


function ItemList(props) {
    if (props.rules.length > 0) {
        var i = 0;
        return (
            props.rules.map(rule => {
                return (
                    <div key={i++}>
                        <ListItem style={{color:"black"}} className={props.newRuleId === rule.id ? "ItemButtonClicked" : ""}
                            onClick={() => {
                                props.getRuleById(rule.id);
                                props.setNewRule(rule.id, rule.name);

                            }}>
                            <ListItemText primary={rule.name} />
                        </ListItem>
                        <Divider />
                    </div>
                )
            })
        );
    }
    else {
        return (
            <Divider />
        )
    }

}

const MyList = styled.div`
 color: white;
  margin: 5px;
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  overflow-y:auto;
  text-align: center;
`;
