import React from 'react';
import Modal from 'react-bootstrap/Modal'

export default class DeviceConsequentPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkDeviceName: false
        }
    }

    checkDeviceNameFunction = (devices, newName) => {
        var checkDeviceName = false;
        if (devices.some(device => device.name === newName)) {
            checkDeviceName = true;
        }
        this.setState({
            checkDeviceName: checkDeviceName
        }, () => { this.render() });

        return checkDeviceName
    }


    render() {
        if (this.props.consequents.length > 0) {
            const index = this.props.consequentIdx;
            var rulesName = GetRulesName(this.props);
            return (
                <Modal show={this.props.deviceConsequentPopUp} onHide={() => this.props.handleDeviceConsequentPopUp()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            SWITCH
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeviceDetail
                            checkDeviceName={this.state.checkDeviceName}
                            modifyDevice={this.props.modifyDevice}
                            consequentName={this.props.consequentName}
                            consequentId={this.props.consequentId}
                            consequents={this.props.consequents}
                            consequentIdx={this.props.consequentIdx}
                            index={index}
                            rulesName={rulesName}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => {
                            this.props.getDeviceMeasureRequest("consequent");
                        }}>
                            Refresh
                        </button>
                        <button onClick={() => {
                            if (this.props.modifyDevice) {
                                this.props.updateDeviceRequest("consequent");
                                this.props.handleModifyDevice();
                            }
                            else {
                                this.props.handleModifyDevice();
                            }
                        }}>
                            {this.props.modifyDevice ? 'Save' : 'Modify'}
                        </button>
                        <button
                            onClick={() => {
                                if (this.props.modifyDevice) {
                                    this.props.deleteDeviceRequest("consequent");
                                    this.props.handleModifyDevice();
                                    this.props.handleDeviceConsequentPopUp();
                                }
                                else {
                                    this.props.handleModifyDevice();
                                    this.props.handleDeviceConsequentPopUp();
                                }

                            }}>
                            {this.props.modifyDevice ? 'Delete' : 'Close'}
                        </button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else {
            return (<div> </div>)
        }
    }
}


function GetRulesName(props) {
    const index = props.consequentIdx;
    const rulesId = props.consequents[index].rules;
    try {
        const rulesId = props.consequents[index].rules;
        const rules = props.rules;
        if (rulesId.length > 0 && rules.length > 0) {
            const rulesIdList = rules.map(rule => { return rule.id });
            const rulesNameList = rulesId.map(ruleId => {
                var ruleIndex = rulesIdList.indexOf(ruleId);
                return (<li key={ruleId}><button onClick={() => {
                    props.setNewRule(ruleId, rules[ruleIndex].name, ruleIndex);
                    props.handleDeviceConsequentPopUp();
                    props.handleSetRulePopUp();
                }}>
                    {rules[ruleIndex].name}
                </button>
                </li>)
            })
            return (rulesNameList)
        }
        else {
            return (<li></li>)
        }
    }
    catch (e) {
        const rulesIdList = rulesId.map(ruleId => {
            return (<li key={ruleId}>{ruleId}</li>)
        })
        return rulesIdList
    }

}

function ModifyName(props, checkDeviceNameFunction) {
    return (
        <form name="ItemName">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name"
                defaultValue={props.consequentName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkName = checkDeviceNameFunction(props.consequents, NewName);
                    if (!checkName) {
                        props.modifyConsequentName(NewName)
                    }
                }}
            />
        </form>
    )
}


function checkDeviceStatusAndMeasure(props) {
    const measure_device = props.consequents[props.index].measure
    if (measure_device !== "null" && measure_device!=="init") {
        const status = "connected"
        return { measure: measure_device, status: status }
    }
    else if(measure_device==="null") {
        const measure = "off";
        const status = "disconnected"
        return { measure: measure, status: status }
    }
    else{
        const measure = "init";
        const status = "connected"
        return { measure: measure, status: status }
    }
}


function DeviceDetail(props) {
    const checkStatusDevice = checkDeviceStatusAndMeasure(props);
    const measure = checkStatusDevice["measure"]
    const status = checkStatusDevice["status"]
    return (
        <div>
            <p style={{ display: props.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
            <ol>
                <li key="name">{props.modifyDevice ? ModifyName(props, props.checkDeviceNameFunction) : "Name: " + props.consequentName}</li>
                <li key="id">id: {props.consequentId}</li>
                <li key="measure">measure: {measure}</li>
                <li key="status">Status: {status}</li>
                <li key="rules">rules:</li>
                <ul>
                    {props.rulesName}
                </ul>
            </ol>
        </div>
    )
}