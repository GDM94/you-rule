import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";


export default function DevicePreview(props, item) {
    return (
      <DeviceElement
        key={item.elementId}
        onClick={() => {
          props.setNewElement(item.id);
          props.getElementById(item.id);
          props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
          if (props.addNewElement === true) {
            props.handleRegisterDevicePopUp();
          }
        }}
      >
        <span> <FiberManualRecordIcon style={{ color: item.color }} fontSize="small" /> {item.type} | {item.name} </span>
       
      </DeviceElement>
    );
  }

  const DeviceElement = styled.li`
  color: balck;
  background-color: #cccccc;
  border-radius: 25px;
  margin: 20%;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 1%;
  padding-left: 5%;
  text-align: left;
  &:hover {
    background: #d5d8d8;
  }
`;
