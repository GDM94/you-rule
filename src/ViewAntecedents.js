import React from 'react';


export default function ViewAntecedents(props) {
    return (
        <div className="AntecedentContainer">
            <div className="MyList">
                <table>
                    <thead>
                        <tr>
                            <th>
                                SENSORS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItemList
                            antecedents={props.antecedents}
                            handleDeviceAntecedentPopUp={props.handleDeviceAntecedentPopUp}
                            setNewAntecedent={props.setNewAntecedent}
                            getAntecedentById={props.getAntecedentById}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ItemList(props) {
    if (props.antecedents.length > 0) {
        const deviceIdList = props.antecedents.map(antecedent => { return antecedent.id });
        return (
            props.antecedents.map(antecedent => {
                var index = deviceIdList.indexOf(antecedent.id)
                return (
                    <tr key={index}>
                        <td>
                            <div>
                                <button variant="primary" onClick={() => {
                                    props.getAntecedentById(antecedent.id);
                                    props.setNewAntecedent(antecedent.id, antecedent.name, index);
                                    props.handleDeviceAntecedentPopUp();
                                }}>
                                    {antecedent.name}
                                </button>
                            </div >
                        </td>
                    </tr>
                )
            })
        );
    }
    else {
        return (
            <tr key={0}>
                <td>

                </td>
            </tr>
        )
    }

}

