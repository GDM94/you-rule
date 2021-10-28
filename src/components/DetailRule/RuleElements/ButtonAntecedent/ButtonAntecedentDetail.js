import React from 'react';
import styled from "styled-components";

export default function ButtonAntecedentDetail(props) {
    return (
        <ElementContent>
            <ElementMeasure>
                if pressed: {props.ruleElement.start_value}
                <br></br>
                if Not pressed: {props.ruleElement.stop_value}
            </ElementMeasure>
        </ElementContent>
    )
}





const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
background-color: #cccccc;
`;

const ElementMeasure = styled.div`
border: solid black 2px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
padding: 2%;
background-color: #a7b4a8;
text-align: left;
justify-content: left;
background-color: #e6e6e6;
`;


