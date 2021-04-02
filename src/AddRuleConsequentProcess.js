import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default class AddRuleConsequentProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <Modal show={this.props.addRuleConsequentPopUp}
                    onHide={() => {
                        this.props.handleAddRuleConsequentPopUp();
                        this.props.handleSetRulePopUp();
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div>SWITCHES</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="GenericModalBody">
                            <table>
                                <tbody>
                                    <AddRuleConsequentDevice
                                        newRuleIdx={this.props.newRuleIdx}
                                        rules={this.props.rules}
                                        consequents={this.props.consequents}
                                        setConsequentRuleLocal={this.props.setConsequentRuleLocal}
                                    />
                                </tbody>
                            </table>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => {
                            this.props.handleAddRuleConsequentPopUp();
                            this.props.handleSetRulePopUp();
                        }}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}


function AddRuleConsequentDevice(props) {
    var i = -1;
    const ruleIdx = props.newRuleIdx;
    const consequentRule = props.rules[ruleIdx].consequent;
    var consequentsId = [];
    if (consequentRule.length > 0) {
        consequentsId = consequentRule.map(item => {
            return (item.device_id)
        })
    }

    return (
        props.consequents.map(item => {
            if (!consequentsId.some(c => c === item.id)) {
                i++;
                return (
                    <tr key={i}>
                        <td>
                            <button onClick={() => {
                                const newConsequent = { device_id: item.id, name: item.name, if_value: "on", else_value: "off" };
                                props.setConsequentRuleLocal(props.newRuleIdx, newConsequent);
                            }}>
                                {item.name}
                            </button>
                        </td>
                    </tr>
                )
            }
            else {
                return null;
            }
        })
    )
}