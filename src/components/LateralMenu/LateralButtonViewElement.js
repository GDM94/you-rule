import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";


function LateralButtonViewElement(props) {
    if (props.elements.length > 0) {
        const deviceIdList = props.elements.map(element => { return element.id });
        return (
            props.elements.map(element => {
                var index = deviceIdList.indexOf(element.id)
                return (
                    <div key={index}>
                            <MyListItem style={{ color: "black" }} selected={props.elementId === element.id}
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


const MyListItem = withStyles({
    root: {
      "&$selected": {
        fontWeight: "bold !important",
        color: "#000000 !important",
        borderBottom: "#000000 solid 5px !important",
        backgroundColor: "#d5d8d8",
      },
      "&:hover": {
        backgroundColor: "#d5d8d8",
        color: "black"
      }
    },
    selected: {}
  })(MuiListItem);