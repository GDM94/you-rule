import React from "react";
import styled from "styled-components";
import TOPBARBUTTON from "./TOPBARBUTTON";

function TOPBAR(props) {
  return (
    <Rect>
      <Ruleapp>RULEAPP</Ruleapp>
      <Group>
        <TOPBARBUTTON
          button="Login"
          url={process.env.REACT_APP_LOGIN_URL}
        ></TOPBARBUTTON>
        <TOPBARBUTTON
          button="Singup"
          url={process.env.REACT_APP_SINGUP_URL}
        ></TOPBARBUTTON>
      </Group>


    </Rect>

  );
}

const Rect = styled.div`
  background-color: rgba(54,48,48,1);
  flex-direction: row;
  display: flex;
  
  width: 100%;
  
`;

const Group = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Ruleapp = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(234,202,16,1);
  font-size: 24px;
  margin-left: 10px;
  float: left;
  text-align: center;
  
`;

export default TOPBAR;
