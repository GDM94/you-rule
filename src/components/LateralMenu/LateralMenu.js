import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import LateralButtonAddElement from "./LateralButtonAddElement";
import List from '@material-ui/core/List';
import LateralButtonViewElement from './LateralButtonViewElement'


function LateralMenu(props) {
    return (
        <LateralMenuDiv>
            <LateralButtonAddElement
                {...props}
            />
            <MyList>
                <List component="div" aria-label="main mailbox folders">
                    <LateralButtonViewElement
                        {...props}
                    />
                </List>
            </MyList>



        </LateralMenuDiv>

    );
}


export default withRouter(LateralMenu);


const LateralMenuDiv = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  float:left;
  text-align: center;
  color: rgba(15, 82, 13, 0.541);
  border-right: #bfbfbf solid 1px !important;
  background-color: #e6e6e6;
`;

const MyList = styled.div`
 color: white;
  margin: 5px;
  padding-left: 5px;
  padding-right: 0px;
  
  height: 100%;
  overflow-y:auto;
  text-align: center;
`;


