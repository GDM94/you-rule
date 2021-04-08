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
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p style={{ display: this.state.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
                            {this.props.modifyDevice ? ModifyName(this.props, this.checkDeviceNameFunction) : this.props.antecedentName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
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
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
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
                return (<li key={ruleId}><button onClick={() => {
                    props.setNewRule(ruleId, rules[ruleIndex].name, ruleIndex);
                    props.handleDeviceAntecedentPopUp();
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

function checkDeviceStatusAndMeasure(props) {
    const measure_device = props.antecedents[props.index].measure
    if (measure_device !== "null" && measure_device !== "init") {
        const setting = parseInt(props.antecedents[props.index].setting);
        const measure = parseInt(props.antecedents[props.index].measure);
        const measure_perc = ((measure * 100) / setting).toFixed(1);
        const status = "connected"
        return { measure: measure_perc, status: status }
    }
    else if (measure_device==="null"){
        const measure_perc = "//";
        const status = "disconnected"
        return { measure: measure_perc, status: status }
    }
    else{
        const measure_perc = "init";
        const status = "connected"
        return { measure: measure_perc, status: status }
    }
}

function DeviceDetails(props) {
    const deviceId = props.antecedentId;
    if (deviceId.includes("timer")) {
        var today = new Date();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return (
            <ol>
                <li key="type">Type: sensor - timer</li>
                <li key="id">Id: {props.antecedentId}</li>
                <li key="measure">Measure: {time}</li>
                <li key="rules">Rules:</li>
                <ul>
                    {props.rulesName}
                </ul>
            </ol>
        )

    }
    else if (deviceId.includes("PHOTOCELL") || deviceId.includes("SOILMOISTURE")) {
        const checkStatusDevice = checkDeviceStatusAndMeasure(props);
        const measure_perc = checkStatusDevice["measure"]
        const status = checkStatusDevice["status"]
        return (
            <ol>
                <li key="type">Type: sensor - {deviceId.includes("PHOTOCELL") ? "photocell" : "soil moisture"}</li>
                <li key="id">Id: {props.antecedentId}</li>
                <li key="measure">Measure: {measure_perc} %</li>
                <li key="status">Status: {status}</li>
                <li key="rules">Rules:</li>
                <ul>
                    {props.rulesName}
                </ul>
            </ol>

        )

    }
    else if (deviceId.includes("WATERLEVEL")) {
        const checkStatusDevice = checkDeviceStatusAndMeasure(props);
        const measure_perc = checkStatusDevice["measure"]
        const status = checkStatusDevice["status"]
        return (
            <ol>
                <li key="type">Type: sensor - water level</li>
                <li key="id">id: {props.antecedentId}</li>
                <li key="measure">measure: {measure_perc} %</li>
                <li key="status">Status: {status}</li>
                <li key="setting">{props.modifyDevice ? ModifySetting(props) : "Setting:" + props.antecedents[props.index].setting}</li>
                <li key="rules">rules:</li>
                <ul>
                    {props.rulesName}
                </ul>
            </ol>

        )
    }

}

function ModifyName(props, checkDeviceNameFunction) {
    return (
        <form name="ItemName">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name"
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