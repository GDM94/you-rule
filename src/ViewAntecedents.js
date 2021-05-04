import React from 'react';
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export default function ViewAntecedents(props) {
    return (

        <MyList>
            <List component="div" aria-label="main mailbox folders">
                <ItemList
                    antecedents={props.antecedents}
                    handleDeviceAntecedentPopUp={props.handleDeviceAntecedentPopUp}
                    setNewAntecedent={props.setNewAntecedent}
                    getAntecedentById={props.getAntecedentById}
                    antecedentId={props.antecedentId}
                    modifyDevice={props.modifyDevice}
                    updateDeviceRequest={props.updateDeviceRequest}
                    handleModifyDevice={props.handleModifyDevice}
                    deleteDeviceRequest={props.deleteDeviceRequest}
                />
            </List >
        </MyList >
    );
}

function ItemList(props) {
    if (props.antecedents.length > 0) {
        const deviceIdList = props.antecedents.map(antecedent => { return antecedent.id });
        return (
            props.antecedents.map(antecedent => {
                var index = deviceIdList.indexOf(antecedent.id)
                return (
                    <div key={index}>
                            <ListItem style={{color:"black"}} className={props.antecedentId === antecedent.id ? "ItemButtonClicked" : ""}
                                onClick={() => {
                                    props.getAntecedentById(antecedent.id);
                                    props.setNewAntecedent(antecedent.id, antecedent.name, index);
                                }}>
                                <ListItemText primary={antecedent.name} />
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

