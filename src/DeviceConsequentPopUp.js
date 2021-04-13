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
                    <Modal.Header id="DeviceConsequentHeader" closeButton>

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
                            setConsequentAutomaticRequest={this.props.setConsequentAutomaticRequest}
                            setConsequentManualMeasureRequest={this.props.setConsequentManualMeasureRequest}
                        />
                    </Modal.Body>
                    <Modal.Footer id="DeviceConsequentFooter">
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
                return (<tr key={ruleId}>
                    <td>
                        <button onClick={() => {
                            props.setNewRule(ruleId, rules[ruleIndex].name, ruleIndex);
                            props.handleDeviceConsequentPopUp();
                            props.handleSetRulePopUp();
                        }}>
                            {rules[ruleIndex].name}
                        </button>
                    </td>
                </tr>)
            })
            return (
                <table>
                    <tbody>
                        {rulesNameList}
                    </tbody>
                </table>
            )
        }
        else {
            return (<table></table>)
        }
    }
    catch (e) {
        const rulesIdList = rulesId.map(ruleId => {
            return (<tr key={ruleId}>
                <td>
                    {ruleId}
                </td>
            </tr>)
        })
        return (
            <table>
                <tbody>
                    {rulesIdList}
                </tbody>
            </table>
        )
    }

}

function ModifyName(props, checkDeviceNameFunction) {
    return (
        <form name="ItemName">
            <input className="DeviceDetailContent" type="text" id="name" name="name"
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
    if (measure_device !== "null" && measure_device !== "init") {
        const status = "connected"
        return { measure: measure_device, status: status }
    }
    else if (measure_device === "null") {
        const measure = "off";
        const status = "disconnected"
        return { measure: measure, status: status }
    }
    else {
        const measure = "init";
        const status = "connected"
        return { measure: measure, status: status }
    }
}


function DeviceDetail(props) {
    const consequent = props.consequents[props.index];
    const checkStatusDevice = checkDeviceStatusAndMeasure(props);
    const measure = checkStatusDevice["measure"]
    const status = checkStatusDevice["status"]
    return (
        <div className="ConsequentContentModal">
            <p style={{ display: props.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
            <div className="DeviceDetail-sx">
                <div className="SingleDeviceDetail" id="bigTitle">
                    Info
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Id:</div>
                    <div className="DeviceDetailContent"> {props.consequentId}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Name:</div>
                    <div className="DeviceDetailContent"> {props.modifyDevice ? ModifyName(props, props.checkDeviceNameFunction) : props.consequentName}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Status:</div>
                    <div className="DeviceDetailContent"> {status}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> measure:</div>
                    <div className="DeviceDetailContent"> {measure}</div>
                </div>
                <div className="SingleDeviceDetail" id="bigTitle">
                    Modality
                </div>
                <div className="SingleDeviceDetail">
                    {set_automatic_button(props)}
                </div>
                <div className="SingleDeviceDetail" id="bigTitle">
                    Manual Switch
                </div>
                <div className="SingleDeviceDetail">
                    {SetManualMeasureButton(props)}
                </div>
            </div>
            <div className="DeviceDetail-sx">
                <div className="SingleDeviceDetail" id="bigTitle">
                    Last Activity
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> last on:</div>
                    <div className="DeviceDetailContent"> {consequent.last_on}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> last off:</div>
                    <div className="DeviceDetailContent"> {consequent.last_off}</div>
                </div>
                <div className="SingleDeviceDetail" id="bigTitle">
                    Rules
                </div>
                <div className="SingleDeviceDetail" id="ruleList">
                    {props.rulesName}
                </div>
            </div>


        </div>
    )
}

function set_automatic_button(props) {
    const consequent = props.consequents[props.index];
    const automatic = consequent.automatic
    return (
        <form>
            <label htmlFor="automatic">automatic</label>
            <input type="radio" id="automatic" value="true" checked={automatic === "true"} onChange={(e) => { props.setConsequentAutomaticRequest(e.target.value) }} />
            <br></br>
            <label htmlFor="manual">manual</label>
            <input type="radio" id="manual" value="false" checked={automatic === "false"} onChange={(e) => { props.setConsequentAutomaticRequest(e.target.value) }} />
        </form>
    )
}

function SetManualMeasureButton(props) {
    const consequent = props.consequents[props.index];
    const measure = consequent.measure
    const automatic = consequent.automatic
    return (
        <form>
            <label htmlFor="on">on</label>
            <input type="radio" id="on" value="on" disabled={automatic === "true"} checked={measure === "on"} onChange={(e) => { props.setConsequentManualMeasureRequest(e.target.value) }} />
            <br />
            <label htmlFor="off">off</label>
            <input type="radio" id="off" value="off" disabled={automatic === "true"} checked={measure === "off"} onChange={(e) => { props.setConsequentManualMeasureRequest(e.target.value) }} />
        </form>
    )
}