import React from "react";
import styled from "styled-components";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

function LateralButtonViewElement(props) {
    if (props.elements.length > 0) {
        const deviceIdList = props.elements.map(element => { return element.id });
        return (
            props.elements.map(element => {
                var index = deviceIdList.indexOf(element.id)
                return (
                    <div key={index}>
                            <MyListItem style={{color:"black"}} className={props.elementId === element.id ? "ItemButtonClicked" : ""}
                                onClick={() => {
                                    props.getElementById(element.id);
                                    props.setNewElement(element.id, element.name, index);
                                    props.AntecedentRulePopUpBody();
                                    if(props.addNewElement===true){
                                        props.handleRegisterDevicePopUp();
                                    }
                                }}>
                                <ListItemText primary={element.name} />
                            </MyListItem>
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

export default LateralButtonViewElement;

const MyListItem = styled(ListItem)`
padding-bottom: 0px !important;
padding-top: 10px !important;

`;