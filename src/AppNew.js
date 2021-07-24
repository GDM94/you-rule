import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRuleProcess from './CreateRuleProcess'
import AddRuleConsequentProcess from './AddRuleConsequentProcess'
import AddRuleAntecedentProcess from './AddRuleAntecedentProcess'
import RegisterDeviceProcess from './RegisterDeviceProcess'
import { Redirect, withRouter } from 'react-router-dom';
import LateralMenu from './LateralMenu';
import ElementDetails from './ElementDetails'
import styled from "styled-components";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeviceAntecedents from './DeviceAntecedents'
import Modal from 'react-bootstrap/Modal';

var jwt = require('jwt-simple');

class AppNew extends React.Component {
    constructor(props) {
        super(props);
        const decoded = jwt.decode(this.props.location.state.token, process.env.REACT_APP_JWT_SECRET);
        const idToken = jwt.encode({ uid: decoded.uid }, process.env.REACT_APP_JWT_SECRET);
        axios.defaults.headers.common['Authorization'] = idToken;
        axios.defaults.timeout.toFixed(0);
        this.state = {
            email: decoded.email,
            password: decoded.password,
            name: decoded.name,
            surname: decoded.surname,

            menuPopUp: false,
            anchorEl: undefined,
            AddRulePopUp: false,
            setRulePopUp: false,
            addRuleAntecedentPopUp: false,
            addRuleConsequentPopUp: false,
            registerDevicePopUp: false,
            addAlertEmailPopUp: false,
            modifyAlertEmail: false,

            newRuleId: "",
            newRuleIdx: 0,
            newRuleName: "",
            modify: false,

            deviceAntecedentPopUp: false,
            antecedentId: "",
            antecedentName: "",
            antecedentIdx: 0,

            deviceConsequentPopUp: false,
            consequentId: "",
            consequentName: "",
            consequentIdx: 0,

            modifyDevice: false,

            antecedents: [],
            consequents: [],
            rules: [],
            allDeviceId: [],

            logout: false,
            routeUrl: "sensor",
            refreshAntecedents: true,
            refreshConsequents: true,
            refreshRules: true,

            ruleBody: false,
            classButtonRuleSelection: "AntecedentRuleSelection",

            server_error: false
        }
    }

    componentDidMount() {
        this.getAntecedents();
    }


    //GET BY USER
    getAntecedents = async () => {
        console.log('App GET antecedent By User');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/get/antecedents";
        try {
            let res = await axios.get(url);
            const antecedents_list = res.data;
            var antecedents = this.state.antecedents;
            if (antecedents.length > 0) {
                const antecedentId_list = antecedents.map(antecedent => { return antecedent.id });
                antecedentId_list.map(antecedent => {
                    if (!antecedentId_list.some(id => id === antecedent.id)) {
                        antecedents.concat(antecedent);
                    } else {
                        const antecedent_idx = antecedentId_list.indexOf(antecedent.id);
                        antecedents[antecedent_idx].measure = antecedent.measure;
                    }
                    return null;
                })
            } else {
                antecedents = antecedents_list;
            }
            this.setState({ antecedents: antecedents, refreshAntecedents: false }, () => {
                if (!this.state.addRuleAntecedentPopUp) {
                    this.setState({ routeUrl: "sensor", deviceAntecedentPopUp: true, deviceConsequentPopUp: false, setRulePopUp: false });
                    if (this.state.antecedentId !== "") {
                        this.getAntecedentById(this.state.antecedentId);
                    }
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    getConsequents = async () => {
        console.log('App GET consequents By User');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/get/consequents";
        try {
            let res = await axios.get(url);
            const consequents_list = res.data;
            var consequents = this.state.consequents;
            if (consequents.length > 0) {
                const consequentId_list = consequents.map(consequent => { return consequent.id });
                consequents_list.map(consequent => {
                    if (!consequentId_list.some(id => id === consequent.id)) {
                        consequents.concat(consequent);
                    }
                    else {
                        const consequent_idx = consequentId_list.indexOf(consequent.id);
                        consequents[consequent_idx].measure = consequent.measure;
                    }
                    return null;
                })
            }
            else {
                consequents = consequents_list;
            }
            this.setState({ consequents: consequents, refreshConsequents: false }, () => {
                if (!this.state.addRuleConsequentPopUp && !this.state.addRuleAntecedentPopUp) {
                    this.setState({ routeUrl: "switch", deviceAntecedentPopUp: false, deviceConsequentPopUp: true, setRulePopUp: false })
                    if (this.state.consequentId !== "") {
                        this.getConsequentById(this.state.consequentId);
                    }
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    getRules = async () => {
        console.log('App GET Rules by user');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/user";
        try {
            let res = await axios.get(url);
            const rules_list = res.data;
            var rules = this.state.rules;
            if (rules.length > 0) {
                const rulesId_list = rules.map(rule => { return rule.id });
                rules_list.map(rule => {
                    if (!rulesId_list.some(id => id === rule.id)) {
                        rules.concat(rule)
                    } else {
                        const ruleIdx = rulesId_list.indexOf(rule.id);
                        rules[ruleIdx].evaluation = rule.evaluation;
                    }
                    return null;
                });
            }
            else {
                rules = rules_list;
            }
            this.setState({ rules: rules, refreshRules: false }, () => {
                if (this.state.newRuleId !== "") {
                    this.getRuleById(this.state.newRuleId);
                }
                else {
                    this.setState({ routeUrl: "rule", deviceAntecedentPopUp: false, deviceConsequentPopUp: false, setRulePopUp: true });
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }

    //GET BY ID
    getAntecedentById = async (antecedentId) => {
        console.log('App GET antecedent By Id');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/antecedent/id/" + antecedentId;
        try {
            let res = await axios.get(url);
            const newAntecedent = res.data;
            console.log(newAntecedent)
            const idx = this.state.antecedentIdx;
            var antecedents = this.state.antecedents;
            antecedents[idx] = newAntecedent;
            this.setState({ antecedents: antecedents }, () => {
                this.setState({ routeUrl: "sensor", deviceAntecedentPopUp: true, deviceConsequentPopUp: false, setRulePopUp: false });
            });
        } catch (err) {
            console.warn(err)
        }
    }
    getConsequentById = async (consequentId) => {
        console.log('App GET consequent By Id');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/id/" + consequentId;
        try {
            let res = await axios.get(url);
            const newConsequent = res.data;
            var consequents = this.state.consequents;
            const consequentIdx = this.state.consequentIdx;
            consequents[consequentIdx] = newConsequent;
            this.setState({ consequents: consequents }, () => {
                this.setState({ routeUrl: "switch", deviceAntecedentPopUp: false, deviceConsequentPopUp: true, setRulePopUp: false })
            });
        } catch (err) {
            console.warn(err)
        }
    }
    getRuleById = async (ruleId) => {
        console.log('App GET Rule By ID');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/id/" + ruleId;
        try {
            let res = await axios.get(url);
            const newRule = res.data;
            console.log(newRule)
            var rules = this.state.rules;
            const idx = this.state.newRuleIdx;
            rules[idx] = newRule;
            this.setState({ rules: rules }, () => {
                this.setState({ routeUrl: "rule", deviceAntecedentPopUp: false, deviceConsequentPopUp: false, setRulePopUp: true });
            });
        } catch (err) {
            console.warn(err)
        }
    }
    getDeviceMeasureRequest = async (type) => {
        console.log('App GET device measure');
        if (type === "antecedent") {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/measure/" + this.state.antecedentId;
            try {
                let res = await axios.get(url);
                const newMeasure = res.data;
                const index = this.state.antecedentIdx;
                var antecedents = this.state.antecedents;
                antecedents[index].measure = newMeasure;
                this.setState({ antecedents: antecedents }, () => { this.render() });
            } catch (err) {
                console.warn(err)
            }
        }
        else {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/measure/" + this.state.consequentId;
            try {
                let res = await axios.get(url);
                const newMeasure = res.data;
                const index = this.state.consequentIdx;
                var consequents = this.state.consequents;
                consequents[index].measure = newMeasure;
                this.setState({ consequents: consequents }, () => { this.render() });
            } catch (err) {
                console.warn(err)
            }
        }
    }

    //ADD and UPDATE ELEMENTS
    createRuleRequest = async (rule_name) => {
        console.log('App POST create rule');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/create/" + rule_name;
        try {
            let res = await axios.post(url);
            const ruleId = res.data;
            console.log("response rule id: ", ruleId)
            const newRule = { id: ruleId, name: rule_name, antecedent: [], consequent: [], evaluation: "false" };
            var rules = this.state.rules;
            var idx = rules.length;
            const newRulesList = rules.concat([newRule])
            this.setState({
                rules: newRulesList,
                newRuleIdx: idx,
                newRuleId: ruleId,
                newRuleName: rule_name
            }, () => {
                this.handleModify(true);
                this.ruleRoute();
                this.handleAddRulePopUp();
                this.handleSetRulePopUp(true);
            })
        } catch (err) {
            console.warn(err)
        }
    }
    setRuleRequest = async (ruleIdx) => {
        console.log("App POST set new rule");
        const rule = this.state.rules[ruleIdx]
        const rule_json = JSON.stringify(rule);
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/set";
        try {
            await axios.post(url, { rule_json });
        } catch (err) {
            console.warn(err)
        }
    }
    setRuleAntecedentRequest = async (newAntecedent) => {
        console.log("App POST new rule antecedent");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/antecedent";
        try {
            await axios.post(url, {}, {
                params: {
                    rule_id: this.state.newRuleId,
                    device_id: newAntecedent.device_id,
                    start_value: newAntecedent.start_value,
                    stop_value: newAntecedent.stop_value,
                    condition: newAntecedent.condition,
                    measure: newAntecedent.measure
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    setRuleConsequentRequest = async (newConsequent) => {
        console.log("App POST new rule consequent");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/consequent";
        try {
            await axios.post(url, {}, {
                params: {
                    rule_id: this.state.newRuleId,
                    device_id: newConsequent.device_id,
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    updateDeviceRequest = async (type) => {
        console.log("App POST update device");
        var deviceId = "";
        var device_name = "";
        var setting = 0;
        var error = 0;
        if (type === "antecedent") {
            const index = this.state.antecedentIdx;
            deviceId = this.state.antecedentId;
            device_name = this.state.antecedentName;
            setting = this.state.antecedents[index].setting;
            error = this.state.antecedents[index].error;
        }
        else {
            deviceId = this.state.consequentId;
            device_name = this.state.consequentName;
            setting = "";
            error = "";
        }
        const url = process.env.REACT_APP_BACKEND_URL + "/device/update";
        try {
            await axios.post(url, {}, {
                params: {
                    device_id: deviceId,
                    device_name: device_name,
                    setting: setting,
                    error: error
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    registerDeviceRequest = async (type, newDevice) => {
        console.log("App POST register device");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/register";
        try {
            await axios.post(url, {}, {
                params: {
                    device_id: newDevice.id,
                    device_name: newDevice.name,
                }
            });
            this.registerNewDeviceLocal(type, newDevice);
        } catch (err) {
            console.warn(err)
        }
    }
    registerNewDeviceLocal = (type, newDevice) => {
        if (type === "antecedent") {
            var newAntecedents = this.state.antecedents;
            const newIndex = newAntecedents.length;
            this.setState({
                antecedents: newAntecedents.concat([newDevice]),
                antecedentId: newDevice.id,
                antecedentName: newDevice.name,
                antecedentIdx: newIndex,
                modifyDevice: true,
            },
                () => {
                    this.sensorRoute();
                    this.handleDeviceAntecedentPopUp(true);
                })
        }
        else {
            var newConsequents = this.state.consequents;
            const newIndex = newConsequents.length;
            this.setState({
                consequents: newConsequents.concat([newDevice]),
                consequentId: newDevice.id,
                consequentName: newDevice.name,
                consequentIdx: newIndex,
                modifyDevice: true,
            },
                () => {
                    this.switchRoute();
                    this.handleDeviceConsequentPopUp(true);
                })
        }
    }
    updateRuleName = async () => {
        console.log("App POST update rule name")
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/name";
        try {
            await axios.post(url, {}, {
                params: {
                    rule_id: this.state.newRuleId,
                    rule_name: this.state.newRuleName
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }
    setConsequentAutomaticRequest = async (automatic) => {
        console.log("App POST consequent automatic");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/automatic";
        try {
            let res = await axios.post(url, {}, {
                params: {
                    device_id: this.state.consequentId,
                    automatic: automatic
                }
            });
            const consequent = res.data;
            const consequents = this.state.consequents;
            const idx = this.state.consequentIdx;
            consequents[idx] = consequent;
            this.setState({ consequents: consequents }, () => { this.render() })
        } catch (err) {
            console.warn(err)
        }
    }
    setConsequentManualMeasureRequest = async (manual_measure) => {
        console.log("App POST consequent manual measure");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/manual";
        try {
            await axios.post(url, {}, {
                params: {
                    device_id: this.state.consequentId,
                    manual_measure: manual_measure
                }
            });
            const consequents = this.state.consequents;
            const idx = this.state.consequentIdx;
            consequents[idx].manual_measure = manual_measure;
            consequents[idx].measure = manual_measure;
            this.setState({ consequents: consequents }, () => { this.render() })
        } catch (err) {
            console.warn(err)
        }
    }
    modifyEmailRequest = async (email, idx) => {
        console.log("App ADD email alert");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/alert/modify/" + email + "/" + idx;
        try {
            await axios.post(url);
            const consequent_idx = this.state.consequentIdx;
            var consequents = this.state.consequents;
            consequents[consequent_idx].email_list[idx] = email;
            this.setState({
                consequents: consequents
            })
        } catch (err) {
            console.warn(err)
        }
    }

    addNewAlertEmailRequest = async () => {
        console.log("App ADD email alert");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/alert/add/";
        try {
            await axios.post(url);
            this.addEmailLocal();
        } catch (err) {
            console.warn(err)
        }
    }

    // REMOVE ELEMENT FROM ARRAYS
    deleteRuleRequest = async (ruleId, ruleIdx) => {
        console.log("App DELETE rule")
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/" + ruleId;
        try {
            await axios.delete(url);
            var NewRules = this.state.rules;
            NewRules.splice(ruleIdx, 1)
            this.setState({ rules: NewRules, newRuleIdx: 0, newRuleName: "", newRuleId: "", setRulePopUp: false })
        } catch (err) {
            console.warn(err)
        }
    }
    deleteRuleConsequentRequest = async (ruleId, deviceId) => {
        console.log("App DELETE rule consequent")
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/consequent/" + ruleId + "/" + deviceId;
        try {
            await axios.delete(url);
            this.deleteRuleConsequentLocal(deviceId)
        } catch (err) {
            console.warn(err)
        }
    }
    deleteRuleConsequentLocal = (deviceId) => {
        var rules = this.state.rules;
        const idx_rule = this.state.newRuleIdx
        var rule_consequent = rules[idx_rule].consequent
        const consequentIdList = rule_consequent.map(consequent => { return consequent.device_id });
        const idx_consequent = consequentIdList.indexOf(deviceId)
        var idx = 0;
        var newRuleConsequents = rule_consequent.map(consequent => {
            if (idx > idx_consequent) {
                consequent.order = (parseInt(consequent.order) - 1).toString();
            }
            idx++;
            return consequent
        })
        newRuleConsequents.splice(idx_consequent, 1);
        console.log(newRuleConsequents)
        rules[idx_rule].consequent = newRuleConsequents;
        this.setState({ rules: rules });
    }
    deleteRuleAntecedentRequest = async (ruleId, deviceId) => {
        console.log("App DELETE rule antecedent")
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/antecedent/" + ruleId + "/" + deviceId;
        try {
            await axios.delete(url);
            this.deleteRuleAntecedentLocal(deviceId)
        } catch (err) {
            console.warn(err)
        }
    }
    deleteRuleAntecedentLocal = (deviceId) => {
        var rules = this.state.rules;
        const idx_rule = this.state.newRuleIdx
        var rule_antecedent = rules[idx_rule].antecedent
        const antecedentIdList = rule_antecedent.map(antecedent => { return antecedent.device_id });
        const idx_antecedent = antecedentIdList.indexOf(deviceId)
        rules[idx_rule].antecedent.splice(idx_antecedent, 1);
        this.setState({ rules: rules });
    }
    deleteDeviceRequest = async (type) => {
        console.log("App DELETE device")
        if (type === "antecedent") {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + this.state.antecedentId;
            var antecedents = this.state.antecedents;
            const index = this.state.antecedentIdx;
            antecedents.splice(index, 1);
            try {
                await axios.delete(url);
                this.setState({ antecedentIdx: 0, antecedents: antecedents, deviceAntecedentPopUp: false })
            } catch (err) {
                console.warn(err)
            }
        }
        else {
            console.log(this.state.consequentId)
            const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + this.state.consequentId;
            const index = this.state.consequentIdx;
            var consequents = this.state.consequents;
            consequents.splice(index, 1);
            try {
                await axios.delete(url);
                this.setState({ consequentIdx: 0, consequents: consequents })
            } catch (err) {
                console.warn(err)
            }
        }
    }
    removeAlertEmailRequest = async (index) => {
        console.log("App DELETE email alert");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/alert/delete/" + index;
        try {
            await axios.delete(url);
            const consequent_idx = this.state.consequentIdx;
            var consequents = this.state.consequents;
            consequents[consequent_idx].email_list.splice(index, 1);
            console.log(consequents[consequent_idx])
            this.setState({
                consequents: consequents
            })
        } catch (err) {
            console.warn(err)
        }
    }



    //MODIFY AND SET RULE LOCAL
    modifyRuleName = (newRuleName) => {
        var rules = this.state.rules;
        const index = this.state.newRuleIdx;
        rules[index].name = newRuleName;
        this.setState({
            rules: rules,
            newRuleName: newRuleName
        }, () => { this.render() })
    }
    setConsequentRuleLocal = (newRuleIdx, newConsequent) => {
        var rulesList = this.state.rules;
        rulesList[newRuleIdx].consequent.push(newConsequent);
        this.setState({ rules: rulesList }, () => {
            this.handleAddRuleConsequentPopUp();
            this.handleSetRulePopUp(true);
        });
    }
    setAntecedentRuleLocal = (newRuleIdx, newAntecedent) => {
        var rulesList = this.state.rules;
        rulesList[newRuleIdx].antecedent.push(newAntecedent);
        this.setState({ rules: rulesList }, () => {
            this.handleAddRuleAntecedentPopUp();
            this.handleSetRulePopUp(true);
        });
    }
    setNewRuleCondition = (ruleIdx, index, newCondition) => {
        var rules = this.state.rules;
        rules[ruleIdx].antecedent[index].condition = newCondition;
        if (newCondition === "between" || newCondition === "isteresi") {
            rules[ruleIdx].antecedent[index].stop_value = rules[ruleIdx].antecedent[index].start_value;
        }
        else {
            rules[ruleIdx].antecedent[index].stop_value = "//";
        }
        this.setState({ rules: rules });
    }
    setNewStartValue = (ruleIdx, index, newStart) => {
        var rules = this.state.rules;
        rules[ruleIdx].antecedent[index].start_value = newStart;
        this.setState({ rules: rules });
    }
    setNewStopValue = (ruleIdx, index, newStop) => {
        var rules = this.state.rules;
        rules[ruleIdx].antecedent[index].stop_value = newStop;
        this.setState({ rules: rules });
    }
    setNewRuleMeasure = (ruleIdx, index, newMeasure) => {
        var rules = this.state.rules;
        rules[ruleIdx].antecedent[index].measure = newMeasure;
        if (newMeasure === "now") {
            rules[ruleIdx].antecedent[index].condition = "between";
            rules[ruleIdx].antecedent[index].stop_value = rules[ruleIdx].antecedent[index].start_value;
        }
        else {
            rules[ruleIdx].antecedent[index].condition = "delta";
            rules[ruleIdx].antecedent[index].stop_value = "//";
        }
        this.setState({ rules: rules });
    }
    setRuleConsequentDelay = (ruleIdx, index, delay) => {
        var rules = this.state.rules;
        rules[ruleIdx].consequent[index].delay = delay;
        this.setState({ rules: rules });
    }
    onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const ruleIdx = this.state.newRuleIdx;
        var rules = this.state.rules
        var consequents = rules[ruleIdx].consequent;
        var consequent = consequents[source.index];
        var newConsequents = consequents.map(c => {
            var Corder = parseInt(c.order);
            if (Corder >= source.index && Corder < destination.index) {
                Corder = Corder - 1;
                c.order = Corder.toString();
            }
            else if (Corder >= destination.index) {
                Corder = Corder + 1;
                c.order = Corder.toString();
            }
            return c;
        })
        newConsequents.splice(source.index, 1);
        consequent.order = destination.index.toString();
        newConsequents.splice(destination.index, 0, consequent);
        rules[ruleIdx].consequent = newConsequents;
        this.setState({
            rules: rules
        })
    }

    //MODIFY DEVICES LOCAL
    modifyAntecedentSetting = (newSetting) => {
        var antecendents = this.state.antecedents;
        const index = this.state.antecedentIdx;
        antecendents[index].setting = newSetting;
        this.setState({ antecendents: antecendents }, () => {
            var antecedents = this.state.antecedents;
            const idx = this.state.antecedentIdx;
            const deviceDetail = DeviceAntecedents("relative_measure", this.state.antecedents, this.state.antecedentIdx);
            antecedents[idx].measure = deviceDetail.measure;
            this.setState({
                antecedents: antecedents
            })
        })
    }
    modifyAntecedentSettingError = (error) => {
        var antecendents = this.state.antecedents;
        const index = this.state.antecedentIdx;
        antecendents[index].error = error;
        this.setState({ antecendents: antecendents }, () => {
            var antecedents = this.state.antecedents;
            const idx = this.state.antecedentIdx;
            const deviceDetail = DeviceAntecedents("relative_measure", this.state.antecedents, this.state.antecedentIdx);
            antecedents[idx].measure = deviceDetail.measure;
            this.setState({
                antecedents: antecedents
            })
        })
    }
    modifyAntecedentName = (newName) => {
        var antecendents = this.state.antecedents;
        const index = this.state.antecedentIdx;
        antecendents[index].name = newName;
        this.setState({ antecendents: antecendents, antecedentName: newName })
    }
    modifyConsequentName = (newName) => {
        var consequents = this.state.consequents;
        const index = this.state.consequentIdx;
        consequents[index].name = newName;
        this.setState({ consequents: consequents, consequentName: newName })
    }
    addEmailLocal = () => {
        const index = this.state.consequentIdx;
        const consequents = this.state.consequents;
        consequents[index].email_list.push("");
        this.setState({
            consequents: consequents
        }, () => {
            this.handleModifyAlertEmail(true);
        })
    }

    // CURRENT SELECTED ITEM VARIABLES
    setNewRule = (ruleId, ruleName) => {
        const rules = this.state.rules;
        const rulesIdList = rules.map(rule => { return rule.id });
        const ruleIdx = rulesIdList.indexOf(ruleId);
        this.setState({
            newRuleIdx: ruleIdx,
            newRuleId: ruleId,
            newRuleName: ruleName
        })
    }
    setNewAntecedent = (antecedentId, antecedentName, antecedentIdx) => {
        this.setState({
            antecedentId: antecedentId,
            antecedentName: antecedentName,
            antecedentIdx: antecedentIdx
        })
    }
    setNewConsequent = (consequentId, consequentName, consequentIdx) => {
        this.setState({
            consequentId: consequentId,
            consequentName: consequentName,
            consequentIdx: consequentIdx
        })
    }



    handleMenuPopUp = (event) => {
        this.setState({
            menuPopUp: !this.state.menuPopUp,
            anchorEl: event.currentTarget
        });
    }
    handleAddRulePopUp = () => {
        this.setState({ AddRulePopUp: !this.state.AddRulePopUp });
    }
    handleModify = (state) => {
        this.setState({ modify: state });
    }
    handleModifyDevice = () => {
        this.setState({ modifyDevice: !this.state.modifyDevice });
    }
    handleAddRuleAntecedentPopUp = () => {
        this.setState({ addRuleAntecedentPopUp: !this.state.addRuleAntecedentPopUp }, () => {
            if (this.state.addRuleAntecedentPopUp) {
                this.getAntecedents();
            }
        });
    }
    handleAddRuleConsequentPopUp = () => {
        this.setState({ addRuleConsequentPopUp: !this.state.addRuleConsequentPopUp }, () => {
            if (this.state.addRuleConsequentPopUp) {
                this.getConsequents();
            }
        });
    }
    handleRegisterDevicePopUp = () => {
        this.setState({ registerDevicePopUp: !this.state.registerDevicePopUp });
    }
    handleDeviceAntecedentPopUp = (event) => {
        this.setState({ deviceAntecedentPopUp: event });
    }
    handleDeviceConsequentPopUp = (event) => {
        this.setState({ deviceConsequentPopUp: event });
    }
    handleSetRulePopUp = (event) => {
        this.setState({ setRulePopUp: event });
    }
    handleLogOut = () => {
        console.log("logout")
        this.props.history.push({pathname: process.env.REACT_APP_LOGIN_URL, state: { token: "" }})
    }
    handleAddAlertEmailPopUp = () => {
        this.setState({ addAlertEmailPopUp: !this.state.addAlertEmailPopUp })
    }
    handleModifyAlertEmail = (state) => {
        this.setState({ modifyAlertEmail: state })
    }

    handleRefreshAntecedents = (refresh) => {
        this.setState({ refreshAntecedents: refresh });
    }
    handleRefreshConsequents = (refresh) => {
        this.setState({ refreshConsequents: refresh });
    }
    handleRefreshRules = (refresh) => {
        this.setState({ refreshRules: refresh });
    }
    AntecedentRulePopUpBody = () => {
        this.setState({ ruleBody: false, classButtonRuleSelection: "AntecedentRuleSelection" })
    }
    ConsequentRulePopUpBody = () => {
        this.setState({ ruleBody: true, classButtonRuleSelection: "ConsequentRuleSelection" })
    }
    handleServerErrorPopUp = () => {
        this.setState({
            server_error: !this.state.server_error
        })
    }


    sensorRoute = () => {
        console.log("sensor route")
        const url = this.state.routeUrl;
        if (url !== "sensor") {
            this.getAntecedents();
        }
    }
    ruleRoute = () => {
        console.log("rule route")
        const url = this.state.routeUrl;
        if (url !== "rule") {
            this.getRules();
        }
    }
    switchRoute = () => {
        console.log("switch route")
        const url = this.state.routeUrl;
        if (url !== "switch") {
            this.getConsequents();
        }
    }

    render() {
        return (
            <AppDiv>
                <TopBar1>
                    <TopBar1Element>
                        RULEAPP
                        </TopBar1Element>
                    <TopBar1Button onClick={(event) => { this.handleMenuPopUp(event) }}>
                        <MenuIcon fontSize="large" style={{ color: 'white' }} />
                    </TopBar1Button>
                    <PopperStyled placement="bottom-end" id='menu-popper' open={this.state.menuPopUp} anchorEl={this.state.anchorEl}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button >
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="profile" />
                            </ListItem>
                            <Divider style={{ color: 'white !important' }} />
                            <ListItem button onClick={() => {
                                this.handleLogOut();
                            }}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="logout" />
                            </ListItem>
                        </List>
                        <Divider />
                    </PopperStyled>

                    <ServerErrorPopUp
                        server_error={this.state.server_error}
                        handleServerErrorPopUp={this.handleServerErrorPopUp}
                        sensorRoute={this.sensorRoute}
                    />

                    <CreateRuleProcess
                        AddRulePopUp={this.state.AddRulePopUp}
                        rules={this.state.rules}
                        base_url={process.env.REACT_APP_BACKEND_URL}
                        handleAddRulePopUp={this.handleAddRulePopUp}
                        createRuleRequest={this.createRuleRequest}
                        ruleRoute={this.ruleRoute}
                        handleModify={this.handleModify}
                    />

                    <AddRuleConsequentProcess
                        addRuleConsequentPopUp={this.state.addRuleConsequentPopUp}
                        handleSetRulePopUp={this.handleSetRulePopUp}
                        handleAddRuleConsequentPopUp={this.handleAddRuleConsequentPopUp}
                        newRuleIdx={this.state.newRuleIdx}
                        rules={this.state.rules}
                        consequents={this.state.consequents}
                        setConsequentRuleLocal={this.setConsequentRuleLocal}
                        handleModify={this.handleModify}
                    />
                    <AddRuleAntecedentProcess
                        addRuleAntecedentPopUp={this.state.addRuleAntecedentPopUp}
                        handleSetRulePopUp={this.handleSetRulePopUp}
                        handleAddRuleAntecedentPopUp={this.handleAddRuleAntecedentPopUp}
                        newRuleIdx={this.state.newRuleIdx}
                        rules={this.state.rules}
                        antecedents={this.state.antecedents}
                        consequents={this.state.consequents}
                        setAntecedentRuleLocal={this.setAntecedentRuleLocal}
                        handleModify={this.handleModify}
                    />
                    <RegisterDeviceProcess
                        registerDevicePopUp={this.state.registerDevicePopUp}
                        handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                        registerDeviceRequest={this.registerDeviceRequest}
                        allDeviceId={this.state.allDeviceId}
                    />

                </TopBar1>
                <div className="TopBar2">
                    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                        <Button style={{ color: "#bfbfbf" }} className={this.state.routeUrl === "sensor" ? "ButtonClicked" : ""} onClick={() => { this.sensorRoute(); }}>
                            SENSORS
                            </Button>
                        <Button style={{ color: "#bfbfbf" }} className={this.state.routeUrl === "rule" ? "ButtonClicked" : ""} onClick={() => { this.ruleRoute(); }}>
                            RULES
                            </Button>
                        <Button style={{ color: "#bfbfbf" }} className={this.state.routeUrl === "switch" ? "ButtonClicked" : ""} onClick={() => { this.switchRoute(); }}>
                            SWITCHES
                            </Button>
                    </ButtonGroup>

                </div>

                <GreatBody>
                    <LateralMenu
                        routeUrl={this.state.routeUrl}
                        antecedents={this.state.antecedents}
                        handleDeviceAntecedentPopUp={this.handleDeviceAntecedentPopUp}
                        setNewAntecedent={this.setNewAntecedent}
                        getAntecedentById={this.getAntecedentById}
                        handleSetRulePopUp={this.handleSetRulePopUp}
                        rules={this.state.rules}
                        setNewRule={this.setNewRule}
                        getRuleById={this.getRuleById}
                        consequents={this.state.consequents}
                        handleDeviceConsequentPopUp={this.handleDeviceConsequentPopUp}
                        setNewConsequent={this.setNewConsequent}
                        getConsequentById={this.getConsequentById}
                        antecedentId={this.state.antecedentId}
                        consequentId={this.state.consequentId}
                        newRuleId={this.state.newRuleId}
                        sensorRoute={this.sensorRoute}
                        ruleRoute={this.ruleRoute}
                        switchRoute={this.switchRoute}
                        modifyDevice={this.state.modifyDevice}
                        updateDeviceRequest={this.updateDeviceRequest}
                        handleModifyDevice={this.handleModifyDevice}
                        deleteDeviceRequest={this.deleteDeviceRequest}
                        handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                        handleAddRulePopUp={this.handleAddRulePopUp}
                        modify={this.state.modify}
                        handleModify={this.handleModify}
                        AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                        deleteRuleRequest={this.deleteRuleRequest}
                        newRuleIdx={this.state.newRuleIdx}
                        setRuleRequest={this.setRuleRequest}
                    />
                    <ContentContainer>
                        <ElementDetails
                            routeUrl={this.state.routeUrl}
                            ruleRoute={this.ruleRoute}
                            rules={this.state.rules}
                            deviceAntecedentPopUp={this.state.deviceAntecedentPopUp}
                            handleDeviceAntecedentPopUp={this.handleDeviceAntecedentPopUp}
                            modifyDevice={this.state.modifyDevice}
                            handleModifyDevice={this.handleModifyDevice}
                            antecedents={this.state.antecedents}
                            antecedentId={this.state.antecedentId}
                            antecedentName={this.state.antecedentName}
                            antecedentIdx={this.state.antecedentIdx}
                            setNewAntecedent={this.setNewAntecedent}
                            modifyAntecedentSetting={this.modifyAntecedentSetting}
                            modifyAntecedentSettingError={this.modifyAntecedentSettingError}
                            updateDeviceRequest={this.updateDeviceRequest}
                            deleteDeviceRequest={this.deleteDeviceRequest}
                            getDeviceMeasureRequest={this.getDeviceMeasureRequest}
                            modifyAntecedentName={this.modifyAntecedentName}
                            setNewRule={this.setNewRule}
                            handleSetRulePopUp={this.handleSetRulePopUp}
                            setRulePopUp={this.state.setRulePopUp}
                            newRuleIdx={this.state.newRuleIdx}
                            newRuleId={this.state.newRuleId}
                            newRuleName={this.state.newRuleName}
                            deleteRuleConsequentRequest={this.deleteRuleConsequentRequest}
                            deleteRuleAntecedentRequest={this.deleteRuleAntecedentRequest}
                            handleModify={this.handleModify}
                            modify={this.state.modify}
                            setNewRuleCondition={this.setNewRuleCondition}
                            setNewStartValue={this.setNewStartValue}
                            setNewStopValue={this.setNewStopValue}
                            handleAddRuleAntecedentPopUp={this.handleAddRuleAntecedentPopUp}
                            handleAddRuleConsequentPopUp={this.handleAddRuleConsequentPopUp}
                            setRuleAntecedentRequest={this.setRuleAntecedentRequest}
                            setRuleConsequentRequest={this.setRuleConsequentRequest}
                            deleteRuleRequest={this.deleteRuleRequest}
                            modifyRuleName={this.modifyRuleName}
                            updateRuleName={this.updateRuleName}
                            setNewRuleMeasure={this.setNewRuleMeasure}
                            setRuleRequest={this.setRuleRequest}
                            consequents={this.state.consequents}
                            consequentId={this.state.consequentId}
                            consequentName={this.state.consequentName}
                            consequentIdx={this.state.consequentIdx}
                            setNewConsequent={this.setNewConsequent}
                            handleDeviceConsequentPopUp={this.handleDeviceConsequentPopUp}
                            deviceConsequentPopUp={this.state.deviceConsequentPopUp}
                            modifyConsequentName={this.modifyConsequentName}
                            setConsequentAutomaticRequest={this.setConsequentAutomaticRequest}
                            setConsequentManualMeasureRequest={this.setConsequentManualMeasureRequest}
                            removeAlertEmailRequest={this.removeAlertEmailRequest}
                            modifyAlertEmail={this.state.modifyAlertEmail}
                            handleModifyAlertEmail={this.handleModifyAlertEmail}
                            handleAddAlertEmailPopUp={this.handleAddAlertEmailPopUp}
                            getRuleById={this.getRuleById}
                            getAntecedentById={this.getAntecedentById}
                            getConsequentById={this.getConsequentById}
                            addEmailLocal={this.addEmailLocal}
                            addNewAlertEmailRequest={this.addNewAlertEmailRequest}
                            modifyEmailRequest={this.modifyEmailRequest}
                            getAntecedents={this.getAntecedents}
                            getConsequents={this.getConsequents}
                            setRuleConsequentDelay={this.setRuleConsequentDelay}
                            onDragEnd={this.onDragEnd}
                        />
                    </ContentContainer>
                </GreatBody>
            </AppDiv>
        );

    }
}

function ServerErrorPopUp(props) {
    return (
        <Modal show={props.server_error}
            onHide={() => {
                props.handleServerErrorPopUp();
                props.sensorRoute();
            }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    ERROR
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Server Error! Try Again</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => {
                    props.handleServerErrorPopUp();
                    props.sensorRoute();
                }}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default withRouter(AppNew)


const PopperStyled = styled(Popper)`
color: white;
background-color: #737373;
border-style: solid;
`;



const AppDiv = styled.div`
display: flex;
flex-flow: column;
width: 100%;
height: 100%;
background-color: rgb(190, 210, 218);
`;

const TopBar1 = styled.div`
background-color: #737373;
width: 100%;
`;

const TopBar1Element = styled.div`
  float: left;
  color: #eead4c;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
  font-style: oblique;
  font-weight: bold !important;
`;

const TopBar1Button = styled(IconButton)`
  float: right;
  margin: 2%;
`;

const GreatBody = styled.div`
display: flex;
flex-flow: row;
width: 100%;
height: 100%;
`;

const ContentContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
text-align: center;
max-height:100%;
overflow-y: auto;
background-color: #e6e6e6;
`;





