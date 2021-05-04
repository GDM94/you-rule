import React from 'react';
import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export default function ViewConsequents(props) {
    return (
        <MyList>
            <List component="div" aria-label="main mailbox folders">
                <ItemList
                    consequents={props.consequents}
                    handleDeviceConsequentPopUp={props.handleDeviceConsequentPopUp}
                    setNewConsequent={props.setNewConsequent}
                    getConsequentById={props.getConsequentById}
                    consequentId={props.consequentId}
                    modifyDevice={props.modifyDevice}
                    handleModifyDevice={props.handleModifyDevice}
                    deleteDeviceRequest={props.deleteDeviceRequest}
                    updateDeviceRequest={props.updateDeviceRequest}
                />
            </List>
        </MyList>
    );
}

function ItemList(props) {
    if (props.consequents.length > 0) {
        const deviceIdList = props.consequents.map(consequent => { return consequent.id });
        return (
            props.consequents.map(consequent => {
                var index = deviceIdList.indexOf(consequent.id)
                return (
                    <div key={index}>
                            <ListItem style={{color:"black"}} className={props.consequentId === consequent.id ? "ItemButtonClicked" : ""}
                                onClick={() => {
                                    props.getConsequentById(consequent.id);
                                    props.setNewConsequent(consequent.id, consequent.name, index);

                                }}>
                                <ListItemText primary={consequent.name} />
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
