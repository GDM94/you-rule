import React from 'react';
import Modal from 'react-bootstrap/Modal'

export default class DeviceAntecedentPopUp extends React.Component {
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
        if (this.props.antecedents.length > 0) {
            const index = this.props.antecedentIdx;
            const rulesName = GetRulesName(this.props);
            return (
                <Modal show={this.props.deviceAntecedentPopUp} onHide={() => this.props.handleDeviceAntecedentPopUp()}>
                    <Modal.Header id="DeviceAntecedentHeader" closeButton>
                        <Modal.Title>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeviceDetails
                            antecedentIdx={this.props.antecedentIdx}
                            antecedentId={this.props.antecedentId}
                            antecedentName={this.props.antecedentName}
                            antecedents={this.props.antecedents}
                            index={index}
                            rulesName={rulesName}
                            modifyAntecedentName={this.props.modifyAntecedentName}
                            modifyAntecedentSetting={this.props.modifyAntecedentSetting}
                            modifyDevice={this.props.modifyDevice}
                            checkDeviceNameFunction={this.checkDeviceNameFunction}
                            checkDeviceName={this.state.checkDeviceName}
                        />
                    </Modal.Body>
                    <Modal.Footer id="DeviceAntecedentFooter">
                        <button onClick={() => {
                            this.props.getDeviceMeasureRequest("antecedent");
                        }}>
                            Refresh
                        </button>
                        <button onClick={() => {
                            if (this.props.modifyDevice) {
                                this.props.updateDeviceRequest("antecedent");
                                this.props.handleModifyDevice();
                            }
                            else {
                                this.props.handleModifyDevice();
                            }
                        }
                        }>
                            {this.props.modifyDevice ? 'Save' : 'Modify'}
                        </button>
                        <button
                            onClick={() => {
                                if (this.props.modifyDevice) {
                                    this.props.handleModifyDevice();
                                    this.props.handleDeviceAntecedentPopUp();
                                    this.props.deleteDeviceRequest("antecedent");
                                }
                                else {
                                    this.props.handleDeviceAntecedentPopUp();
                                }

                            }}>
                            {this.props.modifyDevice ? 'Delete' : 'Close'}
                        </button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else {
            return (<div></div>)
        }
    }
}

function GetRulesName(props) {
    const index = props.antecedentIdx;
    const rulesId = props.antecedents[index].rules;
    try {
        const rulesId = props.antecedents[index].rules;
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

function checkDeviceStatusAndMeasure(props) {
    const measure_device = props.antecedents[props.index].measure
    if (measure_device !== "null" && measure_device !== "init") {
        const setting = parseInt(props.antecedents[props.index].setting);
        const measure = parseInt(props.antecedents[props.index].measure);
        const measure_perc = ((measure * 100) / setting).toFixed(1);
        const status = "connected"
        return { measure: measure_perc, status: status }
    }
    else if (measure_device === "null") {
        const measure_perc = "//";
        const status = "disconnected"
        return { measure: measure_perc, status: status }
    }
    else {
        const measure_perc = "init";
        const status = "connected"
        return { measure: measure_perc, status: status }
    }
}

function DeviceDetails(props) {
    const deviceId = props.antecedentId;
    var measure = ""
    var status = ""
    var type = ""
    var settings = ""

    if (deviceId.includes("timer")) {
        var today = new Date();
        measure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        status = "connected"
        type = "sensor - timer"
        settings = "/"
    }
    else if (deviceId.includes("PHOTOCELL") || deviceId.includes("SOILMOISTURE")) {
        const checkStatusDevice = checkDeviceStatusAndMeasure(props);
        measure = checkStatusDevice["measure"] + "%"
        status = checkStatusDevice["status"]
        type = deviceId.includes("PHOTOCELL")? "sensor - photocell": "sensor - soil moisture"
        settings = "/"
    }
    else if (deviceId.includes("WATERLEVEL")) {
        const checkStatusDevice = checkDeviceStatusAndMeasure(props);
        measure = checkStatusDevice["measure"]+ "%"
        status = checkStatusDevice["status"]
        type="sensor - water level"
        settings = props.modifyDevice ? ModifySetting(props) : props.antecedents[props.index].setting
    }
    return (
        <div className="AntecedentContentModal">
            <p style={{ display: props.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
            <div className="DeviceDetail-sx">
                <div className="SingleDeviceDetail" id="AntecedentbigTitle">
                    Info
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Id:</div>
                    <div className="DeviceDetailContent"> {props.antecedentId}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Name:</div>
                    <div className="DeviceDetailContent"> {props.modifyDevice ? ModifyName(props, props.checkDeviceNameFunction) : props.antecedentName}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Type:</div>
                    <div className="DeviceDetailContent"> {type}</div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Measure:</div>
                    <div className="DeviceDetailContent"> {measure} </div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Status:</div>
                    <div className="DeviceDetailContent"> {status} </div>
                </div>
                <div className="SingleDeviceDetail">
                    <div className="DeviceDetailInfoHeader"> Settings:</div>
                    <div className="DeviceDetailContent"> {settings} </div>
                </div>
            </div>
            <div className="DeviceDetail-sx">
                <div className="SingleDeviceDetail" id="AntecedentbigTitle">
                    Rules
                </div>
                <div className="SingleDeviceDetail" id="ruleList">
                    {props.rulesName}
                </div>
            </div>
        </div>
    )

}

function ModifyName(props, checkDeviceNameFunction) {
    return (
        <form name="ItemName">
            <input className="DeviceDetailContent" type="text" id="name" name="name"
                defaultValue={props.antecedentName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkName = checkDeviceNameFunction(props.antecedents, NewName);
                    if (!checkName) {
                        props.modifyAntecedentName(NewName)
                    }

                }}
            />
        </form>
    )
}

function ModifySetting(props) {
    const index = props.antecedentIdx;
    return (
        <form name="ItemSetting">
            <label htmlFor="setting">Setting: </label>
            <input type="number" id="setting" name="setting"
                defaultValue={props.antecedents[index].setting}
                onChange={(e) => {
                    const newSetting = e.target.value;
                    props.modifyAntecedentSetting(newSetting);
                }}
            />
        </form>
    )
}