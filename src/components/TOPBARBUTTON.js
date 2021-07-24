import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function TOPBARBUTTON(props) {
  return (
      <LinkStyle to={props.url} >
        <LinkName>{props.button}</LinkName>
      </LinkStyle>

  );
}

const LinkStyle = styled(Link)`
  background-color: rgba(87,94,243,1);
  border-width: 2px;
  border-color: #000000;
  border-radius: 10px;
  border-style: solid;
  text-align: center;
  padding-right: 2%;
  padding-left: 2%;
  margin-right: 2%;
`;

const LinkName = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(223,239,70,1);
  font-size: 20px;
`;

export default TOPBARBUTTON;
