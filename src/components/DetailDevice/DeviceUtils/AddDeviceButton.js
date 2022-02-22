import React from "react";
import styled from "styled-components";

export default function RegisterDeviceForm(props) {


    return (
      <AddDeviceElement
        onClick={() => {
          props.handleRegisterDevicePopUp();
          props.setNewElement("");
          props.handleRuleBody(
            process.env.REACT_APP_RULE_BODY_ANTECEDENTS
          );
        }}
      >
        ADD NEW DEVICE
      </AddDeviceElement>
    );
  
}

const AddDeviceElement = styled.div`
  color: balck;
  background-color: #cccccc;
  border-radius: 25px;
  margin: 10%;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 1%;
  &:hover {
    background: #d5d8d8;
  }
`;
