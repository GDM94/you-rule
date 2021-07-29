import React from 'react';
import AntecedentRuleDetails from './AntecedentRuleDetails';

export default function AntecedentRuleBody(props) {
    return (
        <table id="tableRule">
            <thead>
                <tr>
                    <th>DEVICE</th>
                    <th>STATUS</th>
                    <th>MEASURE</th>
                    <th>VALUE</th>
                    <th>CONDITION</th>
                    <th>START</th>
                    <th>STOP</th>
                </tr>
            </thead>
            <tbody>
                <AntecedentRuleDetails
                    {...props}
                />
            </tbody>
        </table>
    )
}