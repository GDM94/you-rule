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
import SettingPage from "./pages/SettingPage";

var jwt = require('jwt-simple');

export default class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            userLoginError: false,
            duplicateUserError: false,
            registerElementError: false,
            routeUrl: process.env.REACT_APP_SENSORS_URL,
            settingsPage: process.env.REACT_APP_PAGE_SETTINGS,

            menuPopUp: false,

            modifyAlertEmail: false,

            newRuleId: "",
            newRuleIdx: 0,
            newRuleName: "",
            modify: false,
            addRulePopUp: false,
            setRuleAntecedent: false,
            setRuleConsequent: false,
            ruleBody: process.env.REACT_APP_RULE_BODY_ANTECEDENTS,
            ruleElementId: "",
            ruleElementName: "",
            ruleElementIdx: 0,

            antecedentId: "",
            antecedentName: "",
            antecedentIdx: 0,
            consequentId: "",
            consequentName: "",
            consequentIdx: 0,
            modifyDevice: false,
            registerDevicePopUp: false,

            antecedents: [],
            consequents: [],
            rules: [],
            antecedent: {},
            consequent: {},
            rule: {},
            device: {},
            ruleElement: {},

            locationName: "",
            locationCountry: "",
            locationLat: "",
            locationLon: "",
            locationList: []
        }
    }

    loginRedirect = (token) => {
        this.setState({ menuPopUp: false })
        const decoded = jwt.decode(token, process.env.REACT_APP_JWT_SECRET);
        const idToken = jwt.encode({ "user_id": decoded.user_id }, process.env.REACT_APP_JWT_SECRET);
        axios.defaults.headers.common['token'] = idToken;
        axios.defaults.timeout.toFixed(0);
        history.push({
            pathname: process.env.REACT_APP_SENSORS_URL,
            state: {
                token: token,
                page: process.env.REACT_APP_PAGE_SENSORS,
                path: process.env.REACT_APP_SENSORS_URL
            }
        })
    }

    handleUserLoginError = (e) => {
        this.setState({ userLoginError: e })
    }

    UserLoginRequest = async (email, password) => {
        console.log("UserAccess GET login")
        var access_token = jwt.encode({ email: email, password: password }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/login?access_token=" + access_token;
        try {
            let res = await axios.get(url)
            const tokenId = res.data;
            if (tokenId !== false) {
                this.loginRedirect(tokenId);
            }
            else {
                this.handleUserLoginError(true);
            }
        } catch (err) {
            console.warn(err)
        }
    }

    changeUserSingUpCredentials = () => {
        this.setState({ duplicateUserError: false });
    }

    UserRegistrationRequest = async (email, password, name, surname) => {
        console.log("UserAccess POST registration")
        var access_token = jwt.encode({ email: email, password: password, name: name, surname: surname }, process.env.REACT_APP_JWT_SECRET);
        const url = process.env.REACT_APP_BACKEND_URL + "/user/registration?access_token=" + access_token;
        try {
            let res = await axios.get(url)
            const tokenId = res.data;
            if (tokenId !== false) {
                this.loginRedirect(tokenId);
            } else {
                this.setState({ duplicateUserError: true });
            }
        } catch (err) {
            console.warn(err)
        }
    }

    //GET BY USER
    getElements = async () => {
        try {
            if (this.state.routeUrl === process.env.REACT_APP_RULES_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/rule/user";
                let res = await axios.get(url);
                this.setState({ rules: res.data }, () => {
                    if (this.state.newRuleId !== "") {
                        this.getRuleById(this.state.newRuleId);
                    }
                });
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/device/get/antecedents";
                let res = await axios.get(url);
                this.setState({ antecedents: res.data }, () => {
                    if (this.state.antecedentId !== "") {
                        this.getDeviceById(this.state.antecedentId);
                    }
                });
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/device/get/consequents";
                let res = await axios.get(url);
                this.setState({ consequents: res.data }, () => {
                    if (this.state.consequentId !== "") {
                        this.getDeviceById(this.state.consequentId);
                    }
                });
            }
        } catch (err) {
            console.warn(err)
        }
    }

    getConsequents = async () => {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/get/consequents";
            let res = await axios.get(url);
            this.setState({ consequents: res.data }, () => {
                if (this.state.consequentId !== "") {
                    this.getDeviceById(this.state.consequentId);
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }

    getAntecedents = async () => {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/device/get/antecedents";
            let res = await axios.get(url);
            this.setState({ antecedents: res.data }, () => {
                if (this.state.antecedentId !== "") {
                    this.getDeviceById(this.state.antecedentId);
                }
            });
        } catch (err) {
            console.warn(err)
        }
    }

    //GET BY ID
    getDeviceById = async (deviceId) => {
        console.log('App GET device By Id');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/get/" + deviceId;
        try {
            let res = await axios.get(url);
            if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                this.setState({ antecedent: res.data });
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                this.setState({ consequent: res.data });
            }
        } catch (err) {
            console.warn(err)
        }
    }
    
    getRuleById = async (ruleId) => {
        console.log('App GET Rule By ID');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/id/" + ruleId;
        try {
            let res = await axios.get(url);
            this.setState({ rule: res.data });
        } catch (err) {
            console.warn(err)
        }
    }

    getRuleAntecedentById = async (ruleElementId) => {
        console.log('App GET Rule Antecedent');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/get/antecedent/"+this.state.newRuleId+"/"+ruleElementId;
        try {
            let res = await axios.get(url);
            this.setState({ ruleElement: res.data });
        } catch (err) {
            console.warn(err)
        }
    }
    getRuleConsequentById = async (ruleElementId) => {
        console.log('App GET Rule Consequent');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/get/consequent/"+this.state.newRuleId+"/"+ruleElementId;
        try {
            let res = await axios.get(url);
            this.setState({ ruleElement: res.data });
        } catch (err) {
            console.warn(err)
        }
    }



    //ADD and UPDATE ELEMENTS
    createRuleRequest = async (rule_name) => {
        console.log('App POST create rule');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/create/" + rule_name;
        try {
            let res = await axios.post(url);
            const newRule = res.data;
            const ruleId = newRule.id;
            console.log("response rule id: ", ruleId)
            console.log(newRule)
            var rules = this.state.rules;
            var idx = rules.length;
            const newRulesList = rules.concat([newRule])
            this.setState({
                rules: newRulesList,
                newRuleIdx: idx,
                newRuleId: ruleId,
                newRuleName: rule_name,
                rule: newRule
            }, () => {
                this.handleModify(true);
                this.handleAddRulePopUp();
            })
        } catch (err) {
            console.warn(err)
        }
    }
    addNewRuleAntecedentRequest = async (ruleElementId) => {
        console.log("App POST add new rule element");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/add/antecedent";
        try {
            let res = await axios.post(url, {}, {
                params: {
                    rule_id: this.state.newRuleId,
                    device_id: ruleElementId
                }
            });
            const rule = res.data;
            console.log(rule)
            this.setState({rule: rule}, ()=>{this.getRuleAntecedentById(ruleElementId)})
        } catch (err) {
            console.warn(err)
        }
    }
    addNewRuleAConsequentRequest = async (ruleElementId) => {
        console.log("App POST add new rule element");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/add/consequent";
        try {
            let res = await axios.post(url, {}, {
                params: {
                    rule_id: this.state.newRuleId,
                    device_id: ruleElementId
                }
            });
            const rule = res.data;
            console.log(rule)
            this.setState({rule: rule}, ()=>{this.getRuleConsequentById(ruleElementId)})
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
    updateDeviceRequest = async (deviceId) => {
        console.log("App POST update device");
        console.log(deviceId)
        const url = process.env.REACT_APP_BACKEND_URL + "/device/update/" + deviceId;
        try {
            var device = ""
            if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                device = JSON.stringify(this.state.antecedent)
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                device = JSON.stringify(this.state.consequent)
            }
            await axios.post(url, { data: device });
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
            if (result === true) {
                this.registerNewDeviceLocal(type, newDevice);
                this.handleRegisterDevicePopUp();
            } else {
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
            this.setState({ consequents: consequents })
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
            const consequent = this.state.consequent;
            consequent.manual_measure = manual_measure;
            consequent.measure = manual_measure;
            this.setState({ consequent: consequent })
        } catch (err) {
            console.warn(err)
        }
    }
    modifyEmailRequest = async (email, idx) => {
        console.log("App Modify email alert");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/alert/modify/" + email + "/" + idx;
        try {
            await axios.post(url);
            var consequent = this.state.consequent;
            consequent.email_list[idx] = email;
            this.setState({
                consequent: consequent
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
            this.setState({ rules: NewRules, newRuleIdx: 0, newRuleName: "", newRuleId: "" })
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
            this.setState({ antecedents: antecedents, antecedentIdx: 0, antecedentId: "", antecedentName: "" })
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
            this.setState({ consequents: consequents, consequentIdx: 0, consequentId: "", consequentName: "" })
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
            var consequent = this.state.consequent;
            consequent.email_list.splice(index, 1);
            this.setState({
                consequent: consequent
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
            this.handleRuleBody(process.env.REACT_APP_RULE_BODY_CONSEQUENTS);
        });
    }
    setAntecedentRuleLocal = (newRuleIdx, newAntecedent) => {
        var rulesList = this.state.rules;
        rulesList[newRuleIdx].antecedent.push(newAntecedent);
        this.setState({ rules: rulesList }, () => {
            this.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
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
        var antecedent = this.state.antecedent;
        antecedent.name = newName;
        this.setState({ antecendents: antecendents, antecedentName: newName, antecedent: antecedent })
    }
    modifyConsequentName = (newName) => {
        var consequents = this.state.consequents;
        const index = this.state.consequentIdx;
        consequents[index].name = newName;
        var consequent = this.state.consequent;
        consequent.name = newName;
        this.setState({ consequents: consequents, consequentName: newName, consequent: consequent })
    }
    addEmailLocal = () => {
        var consequent = this.state.consequent;
        consequent.email_list.push("");
        this.setState({
            consequent: consequent
        }, () => {
            this.handleModifyAlertEmail(true);
        })
    }
    modifyEmailLocal = (idx, email) => {
        var consequent = this.state.consequent;
        consequent.email_list[idx] = email;
        this.setState({
            consequent: consequent
        })
    }

    // CURRENT SELECTED ITEM VARIABLES
    setNewRule = (ruleId, ruleName, ruleIdx) => {
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
    setRouteUrl = (url) => {
        this.setState({ routeUrl: url }, () => { this.getElements() })
    }
    setRuleElementObject = (ruleElement) => {
        this.setState({ ruleElement: ruleElement })
    }
    setRuleElement = (id, name, idx) => {
        this.setState({ ruleElementId: id, ruleElementName: name, ruleElementIdx: idx })
    }

    handleMenuPopUp = (event) => {
        this.setState({
            menuPopUp: !this.state.menuPopUp,
        });
    }
    handleAddRulePopUp = () => {
        this.setState({ addRulePopUp: !this.state.addRulePopUp });
    }
    handleSetRuleAntecedent = (handle) => {
        this.setState({ setRuleAntecedent: handle });
    }
    handleSetRuleConsequent = (handle) => {
        this.setState({ setRuleConsequent: handle });
    }
    handleModify = (state) => {
        this.setState({ modify: state });
    }
    handleModifyDevice = () => {
        this.setState({ modifyDevice: !this.state.modifyDevice });
    }
    handleRegisterDevicePopUp = () => {
        this.setState({ registerDevicePopUp: !this.state.registerDevicePopUp });
        this.handleRegisterElementError(false);
    }


    handleLogOut = () => {
        console.log("logout");
        this.setState({
            menuPopUp: false,
            antecedentId: "",
            consequentId: "",
            newRuleId: ""
        })
        window.location.assign('http://ruleapp.org');
    }
    handleSettings = () => {
        console.log("settings");
        this.setState({
            menuPopUp: false,
            antecedentId: "",
            consequentId: "",
            newRuleId: "",
            settingsPage: process.env.REACT_APP_PAGE_SETTINGS
        })
    }
    handleModifyAlertEmail = (state) => {
        this.setState({ modifyAlertEmail: state })
    }


    handleRuleBody = (page) => {
        this.setState({ ruleBody: page, setRuleAntecedent: false, setRuleConsequent: false })
    }
    AntecedentRulePopUpBody = () => {
        this.setState({ ruleBody: false })
    }
    ConsequentRulePopUpBody = () => {
        this.setState({ ruleBody: true })
    }

    handleRegisterElementError = (error) => {
        this.setState({ registerElementError: error });
    }

    setSettingsPage = (page) => {
        this.setState({ settingsPage: page })
    }

    // GEOGRAPHIC LOCATION
    getLocationByUserId = async () => {
        console.log('App GET user location');
        const url = process.env.REACT_APP_BACKEND_URL + "/user/location";
        try {
            let res = await axios.get(url);
            const location = res.data;
            console.log(location)
            this.setState({
                locationName: location.name,
                locationCountry: location.country,
                locationLat: location.lat,
                locationLon: location.lon
            })
        } catch (err) {
            console.warn(err)
        }
    }
    getCurrentLocation = async (name) => {
        console.log('App GET current location');
        const url = process.env.REACT_APP_BACKEND_URL + "/user/search/location/" + name
        try {
            let res = await axios.get(url);
            const locationList = res.data;
            console.log(locationList)
            if (locationList.constructor === Array) {
                this.setState({
                    locationList: locationList
                })
            }
            else {
                this.setState({
                    locationList: []
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }
    setNewUserLocation = async (name, country, lat, lon) => {
        console.log('App POST set new user location');
        const url = process.env.REACT_APP_BACKEND_URL + "/user/set/location";
        try {
            await axios.post(url, {}, {
                params: {
                    name: name,
                    country: country,
                    lat: lat,
                    lon: lon
                }
            });
            this.setState({
                locationName: name,
                locationCountry: country,
                locationLat: lat,
                locationLon: lon
            })
        } catch (err) {
            console.warn(err)
        }
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

                            element={this.state.antecedent}
                            elements={this.state.antecedents}
                            elementId={this.state.antecedentId}
                            elementIdx={this.state.antecedentIdx}
                            elementName={this.state.antecedentName}
                            elementType={"antecedent"}

                            setNewElement={this.setNewAntecedent}
                            getElements={this.getElements}
                            getElementById={this.getDeviceById}
                            addNewElement={this.state.registerDevicePopUp}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            modifyElementName={this.modifyAntecedentName}
                            modify={this.state.modifyDevice}
                            setNewRule={this.setNewRule}
                            handleModifyDevice={this.handleModifyDevice}
                            deleteDeviceRequest={this.deleteDeviceRequest}
                            updateDeviceRequest={this.updateDeviceRequest}
                            setNewAntecedent={this.setNewAntecedent}
                            modifyAntecedentSetting={this.modifyAntecedentSetting}
                            modifyAntecedentSettingError={this.modifyAntecedentSettingError}
                            getDeviceMeasureRequest={this.getDeviceMeasureRequest}
                            modifyAntecedentName={this.modifyAntecedentName}
                            getAntecedentById={this.getDeviceById}
                            getRuleById={this.getRuleById}
                            registerDeviceRequest={this.registerDeviceRequest}
                            handleRegisterElementError={this.handleRegisterElementError}
                            AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                            handleSettings={this.handleSettings}
                            handleRuleBody={this.handleRuleBody}
                            setRouteUrl={this.setRouteUrl}
                        />}
                />
                <Route exact path={process.env.REACT_APP_SWITCHES_URL}
                    render={(props) =>
                        <DevicesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}

                            element={this.state.consequent}
                            elements={this.state.consequents}
                            elementId={this.state.consequentId}
                            elementIdx={this.state.consequentIdx}
                            elementName={this.state.consequentName}
                            elementType={"consequent"}

                            addNewElement={this.state.registerDevicePopUp}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            modifyElementName={this.modifyConsequentName}
                            modify={this.state.modifyDevice}
                            setNewElement={this.setNewConsequent}
                            getElements={this.getElements}
                            getElementById={this.getDeviceById}
                            setNewConsequent={this.setNewConsequent}
                            handleModifyDevice={this.handleModifyDevice}
                            updateDeviceRequest={this.updateDeviceRequest}
                            deleteDeviceRequest={this.deleteDeviceRequest}
                            getDeviceMeasureRequest={this.getDeviceMeasureRequest}
                            modifyConsequentName={this.modifyConsequentName}
                            setNewRule={this.setNewRule}
                            setConsequentAutomaticRequest={this.setConsequentAutomaticRequest}
                            setConsequentManualMeasureRequest={this.setConsequentManualMeasureRequest}
                            removeAlertEmailRequest={this.removeAlertEmailRequest}
                            handleModifyAlertEmail={this.handleModifyAlertEmail}
                            getConsequentById={this.getDeviceById}
                            getRuleById={this.getRuleById}
                            addEmailLocal={this.addEmailLocal}
                            addNewAlertEmailRequest={this.addNewAlertEmailRequest}
                            modifyEmailRequest={this.modifyEmailRequest}
                            modifyEmailLocal={this.modifyEmailLocal}
                            registerDeviceRequest={this.registerDeviceRequest}
                            handleRegisterElementError={this.handleRegisterElementError}
                            AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                            handleSettings={this.handleSettings}
                            handleRuleBody={this.handleRuleBody}
                            setRouteUrl={this.setRouteUrl}
                        />}
                />
                <Route exact path={process.env.REACT_APP_RULES_URL}
                    render={(props) =>
                        <RulesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}

                            element={this.state.rule}
                            elements={this.state.rules}
                            elementId={this.state.newRuleId}
                            elementIdx={this.state.newRuleIdx}
                            elementName={this.state.newRuleName}

                            addNewElement={this.state.addRulePopUp}
                            handleRegisterDevicePopUp={this.handleAddRulePopUp}
                            modifyElementName={this.modifyRuleName}
                            modify={this.state.modify}
                            setNewElement={this.setNewRule}
                            getElements={this.getElements}
                            getElementById={this.getRuleById}
                            deleteRuleConsequentRequest={this.deleteRuleConsequentRequest}
                            deleteRuleAntecedentRequest={this.deleteRuleAntecedentRequest}
                            handleModify={this.handleModify}
                            setNewRuleCondition={this.setNewRuleCondition}
                            setNewStartValue={this.setNewStartValue}
                            setNewStopValue={this.setNewStopValue}
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
                            handleSetRuleAntecedent={this.handleSetRuleAntecedent}
                            handleSetRuleConsequent={this.handleSetRuleConsequent}
                            setRuleElement={this.setRuleElement}
                            setRuleElementObject={this.setRuleElementObject}
                            addNewRuleAntecedentRequest={this.addNewRuleAntecedentRequest}
                            addNewRuleAConsequentRequest={this.addNewRuleAConsequentRequest}
                            getRuleAntecedentById={this.getRuleAntecedentById}
                            getRuleConsequentById={this.getRuleConsequentById}



                            base_url={process.env.REACT_APP_BACKEND_URL}
                            handleAddRulePopUp={this.handleAddRulePopUp}
                            createRuleRequest={this.createRuleRequest}
                            setConsequentRuleLocal={this.setConsequentRuleLocal}
                            setAntecedentRuleLocal={this.setAntecedentRuleLocal}
                            AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                            ConsequentRulePopUpBody={this.ConsequentRulePopUpBody}
                            handleSettings={this.handleSettings}
                            handleRuleBody={this.handleRuleBody}
                            setRouteUrl={this.setRouteUrl}
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
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            UserRegistrationRequest={this.UserRegistrationRequest}
                            changeUserSingUpCredentials={this.changeUserSingUpCredentials}
                        />}
                />
                <Route exact path={process.env.REACT_APP_SETTINGS_URL}
                    render={(props) =>
                        <SettingPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            UserRegistrationRequest={this.UserRegistrationRequest}
                            handleSettings={this.handleSettings}
                            handleLogOut={this.handleLogOut}
                            addNewElement={false}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            setSettingsPage={this.setSettingsPage}
                            getCurrentLocation={this.getCurrentLocation}
                            getLocationByUserId={this.getLocationByUserId}
                            setNewUserLocation={this.setNewUserLocation}
                        />}
                />
            </Router>
        )
    }
}








