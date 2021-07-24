import React from "react";
import styled from "styled-components";
import TOPBARBUTTON from "./TOPBARBUTTON";

function TopBarLogout(props) {
  return (
    <TopBar1>
      <TopBar1Element>
        RULEAPP
      </TopBar1Element>
      <Group>
        <TOPBARBUTTON
          button="Logout"
          url={process.env.REACT_APP_LOGIN_URL}
        ></TOPBARBUTTON>
      </Group>

    </TopBar1>

  );
}

export default TopBarLogout;

const TopBar1 = styled.div`
  background-color: #737373;
  width: 100%;
  flex-direction: row;
  display: flex;
`;


const TopBar1Element = styled.span`
  float: left;
  color: #eead4c;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
  font-style: oblique;
  font-weight: bold !important;
  margin-left: 10px;
`;

const Group = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;