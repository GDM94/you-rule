import React from "react";
import {
    Router,
    Route
} from "react-router-dom";
import Login from './pages/Login'
import SingUp from './pages/SingUp'
import axios from 'axios';
import history from "./history";
import DeviceAntecedents from './DeviceAntecedents'
import DevicesPage from "./pages/DevicesPage";
import RulesPage from "./pages/RulesPage";

var jwt = require('jwt-simple');

export default class MainRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            userLoginError: false,
            duplicateUserError: false,

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
            routeUrl: process.env.REACT_APP_SENSORS_URL,

            ruleBody: false,

            server_error: false,
            elementDetails: false,
            addNewElementComponent: false,
            registerElementError:false,

        }
    }

    loginRedirect = (token) => {
        const decoded = jwt.decode(token, process.env.REACT_APP_JWT_SECRET);
        const idToken = jwt.encode({ uid: decoded.uid }, process.env.REACT_APP_JWT_SECRET);
        axios.defaults.headers.common['Authorization'] = idToken;
        axios.defaults.timeout.toFixed(0);
        history.push({ pathname: process.env.REACT_APP_SENSORS_URL, state: { token: idToken, page: process.env.REACT_APP_PAGE_SENSORS } })
    }

    UserLoginRequest = async (email, password) => {
        console.log("UserAccess GET login")
        var access_token = jwt.encode({ email: email, password: password }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/login?access_token=" + access_token;
        try {
            let res = await axios.get(url)
            const tokenId = res.data.tokenId;
            if (tokenId !== "false") {
                this.setState({
                    menuPopUp: false
                })
                this.loginRedirect(tokenId);
            }
            else {
                this.handleUserLoginError("true");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    handleUserLoginError = (check) => {
        this.setState({ userLoginError: check });
    }

    UserRegistrationRequest = async (email, password, name, surname) => {
        console.log("UserAccess POST registration")
        var access_token = jwt.encode({ email: email, password: password, name: name, surname: surname }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/registration?access_token=" + access_token;
        try {
            let res = await axios.get(url)
            const tokenId = res.data.tokenId;
            if (tokenId !== "false") {
                this.setState({
                    menuPopUp: false
                })
                this.loginRedirect(tokenId);
            } else {
                this.setState({ duplicateUserError: true });
            }
        } catch (err) {
            console.warn(err)
        }
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
            this.setState({ antecedents: antecedents }, () => {
                if (!this.state.addRuleAntecedentPopUp) {
                    this.setState({ routeUrl: process.env.REACT_APP_SENSORS_URL, elementDetails: true, deviceAntecedentPopUp: true, deviceConsequentPopUp: false, setRulePopUp: false });
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
            this.setState({ consequents: consequents }, () => {
                if (!this.state.addRuleConsequentPopUp && !this.state.addRuleAntecedentPopUp) {
                    this.setState({ routeUrl: process.env.REACT_APP_SWITCHES_URL, elementDetails: true, deviceAntecedentPopUp: false, deviceConsequentPopUp: true, setRulePopUp: false })
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
            this.setState({ rules: rules }, () => {
                if (this.state.newRuleId !== "") {
                    this.getRuleById(this.state.newRuleId);
                }
                this.setState({ routeUrl: process.env.REACT_APP_RULES_URL, elementDetails: true, deviceAntecedentPopUp: false, deviceConsequentPopUp: false, setRulePopUp: true });
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
                this.setState({ routeUrl: process.env.REACT_APP_SENSORS_URL, elementDetails: true, deviceAntecedentPopUp: true, deviceConsequentPopUp: false, setRulePopUp: false });
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
                this.setState({ routeUrl: process.env.REACT_APP_SWITCHES_URL, elementDetails: true, deviceAntecedentPopUp: false, deviceConsequentPopUp: true, setRulePopUp: false })
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
            var rules = this.state.rules;
            const rulesIdList = rules.map(rule => { return rule.id });
            const idx = rulesIdList.indexOf(ruleId);
            rules[idx] = newRule;
            this.setState({ newRuleIdx: idx, rules: rules }, () => {
                this.setState({ routeUrl: process.env.REACT_APP_RULES_URL, elementDetails: true, deviceAntecedentPopUp: false, deviceConsequentPopUp: false, setRulePopUp: true });
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
            let res = await axios.post(url, {}, {
                params: {
                    device_id: newDevice.id,
                    device_name: newDevice.name,
                }
            });
            const result = res.data;
            if(result === "true"){
                this.registerNewDeviceLocal(type, newDevice);
            }else{
                this.handleRegisterElementError(true);
            }
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
            this.setState({ rules: NewRules, newRuleIdx: 0, newRuleName: "", newRuleId: "", setRulePopUp: false, elementDetails: false })
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
            this.setState({ antecedents: antecedents, antecedentIdx: 0, antecedentId: "", antecedentName: "", deviceAntecedentPopUp: false, elementDetails: false })
            try {
                await axios.delete(url);
            } catch (err) {
                console.warn(err)
            }
        }
        else {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + this.state.consequentId;
            const index = this.state.consequentIdx;
            var consequents = this.state.consequents;
            consequents.splice(index, 1);
            this.setState({ consequents: consequents, consequentIdx: 0, consequentId: "", consequentName: "", elementDetails: false })
            try {
                await axios.delete(url);
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
        const { destination, source } = result;
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
    modifyEmailLocal = (idx, email) => {
        const index = this.state.consequentIdx;
        const consequents = this.state.consequents;
        consequents[index].email_list[idx] = email;
        this.setState({
            consequents: consequents
        })
    }




    // CURRENT SELECTED ITEM VARIABLES
    setNewRule = (ruleId, ruleName, ruleIdx) => {
        this.setState({
            newRuleIdx: ruleIdx,
            newRuleId: ruleId,
            newRuleName: ruleName,
            routeUrl: process.env.REACT_APP_RULES_URL
        })
    }
    setNewAntecedent = (antecedentId, antecedentName, antecedentIdx) => {
        this.setState({
            antecedentId: antecedentId,
            antecedentName: antecedentName,
            antecedentIdx: antecedentIdx,
            routeUrl: process.env.REACT_APP_SENSORS_URL
        })
    }
    setNewConsequent = (consequentId, consequentName, consequentIdx) => {
        this.setState({
            consequentId: consequentId,
            consequentName: consequentName,
            consequentIdx: consequentIdx,
            routeUrl: process.env.REACT_APP_SWITCHES_URL
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
        this.setState({
            menuPopUp: false,
            antecedentId: "",
            consequentId: "",
            newRuleId: ""
        })
        //history.push({ pathname: "www.ruleapp.org", state: { token: "" } })
        window.location.assign('http://ruleapp.org');
    }
    handleAddAlertEmailPopUp = () => {
        this.setState({ addAlertEmailPopUp: !this.state.addAlertEmailPopUp })
    }
    handleModifyAlertEmail = (state) => {
        this.setState({ modifyAlertEmail: state })
    }


    AntecedentRulePopUpBody = () => {
        this.setState({ ruleBody: false })
    }
    ConsequentRulePopUpBody = () => {
        this.setState({ ruleBody: true })
    }
    handleServerErrorPopUp = () => {
        this.setState({
            server_error: !this.state.server_error
        })
    }
    handleRegisterElementError = (error) =>{
        this.setState({registerElementError: error});
    }



    render() {
        return (
            <Router history={history}>

                <Route exact path={process.env.REACT_APP_SENSORS_URL}
                    render={(props) =>
                        <DevicesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}
                            elements={this.state.antecedents}
                            setNewElement={this.setNewAntecedent}
                            getElements={this.getAntecedents}
                            getElementById={this.getAntecedentById}
                            elementId={this.state.antecedentId}
                            elementIdx={this.state.antecedentIdx}
                            elementName={this.state.antecedentName}
                            addNewElement={this.state.registerDevicePopUp}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            modifyElementName={this.modifyAntecedentName}
                            elementType={"antecedent"}
                            modify={this.state.modifyDevice}

                            setNewRule={this.setNewRule}
                            handleModifyDevice={this.handleModifyDevice}
                            handleDeviceAntecedentPopUp={this.handleDeviceAntecedentPopUp}
                            deleteDeviceRequest={this.deleteDeviceRequest}
                            updateDeviceRequest={this.updateDeviceRequest}
                            setNewAntecedent={this.setNewAntecedent}
                            modifyAntecedentSetting={this.modifyAntecedentSetting}
                            modifyAntecedentSettingError={this.modifyAntecedentSettingError}
                            getDeviceMeasureRequest={this.getDeviceMeasureRequest}
                            modifyAntecedentName={this.modifyAntecedentName}
                            handleSetRulePopUp={this.handleSetRulePopUp}
                            getAntecedentById={this.getAntecedentById}
                            getRuleById={this.getRuleById}
                            registerDeviceRequest={this.registerDeviceRequest}
                            handleRegisterElementError={this.handleRegisterElementError}

                        />}
                />
                <Route exact path={process.env.REACT_APP_SWITCHES_URL}
                    render={(props) =>
                        <DevicesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}
                            elements={this.state.consequents}
                            setNewElement={this.setNewConsequent}
                            getElements={this.getConsequents}
                            getElementById={this.getConsequentById}
                            elementId={this.state.consequentId}
                            elementIdx={this.state.consequentIdx}
                            elementName={this.state.consequentName}
                            addNewElement={this.state.registerDevicePopUp}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            modifyElementName={this.modifyConsequentName}
                            elementType={"consequent"}
                            modify={this.state.modifyDevice}

                            setNewConsequent={this.setNewConsequent}
                            handleDeviceConsequentPopUp={this.handleDeviceConsequentPopUp}
                            handleModifyDevice={this.handleModifyDevice}
                            updateDeviceRequest={this.updateDeviceRequest}
                            deleteDeviceRequest={this.deleteDeviceRequest}
                            getDeviceMeasureRequest={this.getDeviceMeasureRequest}
                            modifyConsequentName={this.modifyConsequentName}
                            setNewRule={this.setNewRule}
                            handleSetRulePopUp={this.handleSetRulePopUp}
                            setConsequentAutomaticRequest={this.setConsequentAutomaticRequest}
                            setConsequentManualMeasureRequest={this.setConsequentManualMeasureRequest}
                            removeAlertEmailRequest={this.removeAlertEmailRequest}
                            handleModifyAlertEmail={this.handleModifyAlertEmail}
                            handleAddAlertEmailPopUp={this.handleAddAlertEmailPopUp}
                            getConsequentById={this.getConsequentById}
                            getRuleById={this.getRuleById}
                            handleDeviceAntecedentPopUp={this.handleDeviceAntecedentPopUp}
                            addEmailLocal={this.addEmailLocal}
                            addNewAlertEmailRequest={this.addNewAlertEmailRequest}
                            modifyEmailRequest={this.modifyEmailRequest}
                            modifyEmailLocal={this.modifyEmailLocal}
                            registerDeviceRequest={this.registerDeviceRequest}
                            handleRegisterElementError={this.handleRegisterElementError}
                        />}
                />
                <Route exact path={process.env.REACT_APP_RULES_URL}
                    render={(props) =>
                        <RulesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}
                            elements={this.state.rules}
                            setNewElement={this.setNewRule}
                            getElements={this.getRules}
                            getElementById={this.getRuleById}
                            elementId={this.state.newRuleId}
                            elementIdx={this.state.newRuleIdx}
                            elementName={this.state.newRuleName}
                            addNewElement={this.state.AddRulePopUp}
                            handleRegisterDevicePopUp={this.handleAddRulePopUp}
                            modifyElementName={this.modifyRuleName}
                            modify={this.state.modify}

                            handleSetRulePopUp={this.handleSetRulePopUp}
                            deleteRuleConsequentRequest={this.deleteRuleConsequentRequest}
                            deleteRuleAntecedentRequest={this.deleteRuleAntecedentRequest}
                            handleModify={this.handleModify}
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
                            getRuleById={this.getRuleById}
                            getAntecedents={this.getAntecedents}
                            getConsequents={this.getConsequents}
                            setRuleConsequentDelay={this.setRuleConsequentDelay}
                            onDragEnd={this.onDragEnd}

                            base_url={process.env.REACT_APP_BACKEND_URL}
                            handleAddRulePopUp={this.handleAddRulePopUp}
                            createRuleRequest={this.createRuleRequest}
                            setConsequentRuleLocal={this.setConsequentRuleLocal}
                            setAntecedentRuleLocal={this.setAntecedentRuleLocal}
                        />}
                />
                <Route exact path={process.env.REACT_APP_LOGIN_URL}
                    render={(props) =>
                        <Login
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleUserLoginError={this.handleUserLoginError}
                            UserLoginRequest={this.UserLoginRequest}
                        />}
                />
                <Route exact path={process.env.REACT_APP_SINGUP_URL}
                    render={(props) =>
                        <SingUp
                            handleMenuPopUp={this.handleMenuPopUp}
                            UserRegistrationRequest={this.UserRegistrationRequest}
                            {...props}
                            {...this.state}
                        />}
                />
            </Router>
        )
    }
}








