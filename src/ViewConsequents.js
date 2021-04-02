import React from 'react';



export default function ViewConsequents(props) {
    return (
        <div className="ConsequentContainer">
            <div className="MyList">
                <table>
                    <thead>
                        <tr>
                            <th>
                                SWITCHES
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItemList
                            consequents={props.consequents}
                            handleDeviceConsequentPopUp={props.handleDeviceConsequentPopUp}
                            setNewConsequent={props.setNewConsequent}
                            getConsequentById={props.getConsequentById}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ItemList(props) {
    if (props.consequents.length > 0) {
        const deviceIdList = props.consequents.map(consequent => { return consequent.id });
        return (
            props.consequents.map(consequent => {
                var index = deviceIdList.indexOf(consequent.id)
                return (
                    <tr key={index}>
                        <td>
                            <div>
                                <button variant="primary" onClick={() => {
                                    props.getConsequentById(consequent.id);
                                    props.setNewConsequent(consequent.id, consequent.name, index);
                                    props.handleDeviceConsequentPopUp();
                                }}>
                                    {consequent.name}
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