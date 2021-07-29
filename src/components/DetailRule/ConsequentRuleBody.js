import React from 'react';
import ConsequentRuleDetails from './ConsequentRuleDetails';

export default function ConsequentRuleBody(props) {
    return (
        <table id="tableRule">
            <thead>
                <tr>
                    <th>ORDER</th>
                    <th>DELAY</th>
                    <th>DEVICE</th>
                    <th>STATUS</th>
                    <th>MODALITY</th>
                    <th>IF</th>
                    <th>ELSE</th>
                </tr>
            </thead>
            <tbody>
                <ConsequentRuleDetails
                    {...props}
                />
            </tbody>
        </table>
    )
}