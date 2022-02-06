import React from "react";
import {
    Router,
    Route
} from "react-router-dom";
import Login from './pages/Login'
import SingUp from './pages/SingUp'
import axios from 'axios';
import history from "./history";
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
            modify: false,
            addRulePopUp: false,
            setRuleAntecedent: false,
            setRuleConsequent: false,
            ruleBody: process.env.REACT_APP_RULE_BODY_ANTECEDENTS,
            ruleElementId: "",

            antecedentId: "",
            consequentId: "",
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
            locationList: [],
            loading: false
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

    userLogoutRequest = async () => {
        console.log("UserAccess POST logout")
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/user/logout";
            axios.post(url).then(this.handleLogOut());
        }
        catch (err) {
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
                console.log('App GET Rules');
                const url = process.env.REACT_APP_BACKEND_URL + "/rule/user";
                let res = await axios.get(url);
                this.setState({ rules: res.data }, () => {
                    if (this.state.newRuleId !== "") {
                        this.getRuleById(this.state.newRuleId);
                    }
                });
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                console.log('App GET Antecedents');
                const url = process.env.REACT_APP_BACKEND_URL + "/device/get/antecedents";
                let res = await axios.get(url);
                this.setState({ antecedents: res.data }, () => {
                    if (this.state.antecedentId !== "") {
                        this.getDeviceById(this.state.antecedentId);
                    }
                });
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                console.log('App GET Consequents');
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
        console.log('App GET Consequents');
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
        console.log('App GET Antecedents');
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
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/get/antecedent/" + this.state.newRuleId + "/" + ruleElementId;
        try {
            let res = await axios.get(url);
            this.setState({ ruleElement: res.data });
        } catch (err) {
            console.warn(err)
        }
    }
    getRuleConsequentById = async (ruleElementId) => {
        console.log('App GET Rule Consequent');
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/get/consequent/" + this.state.newRuleId + "/" + ruleElementId;
        try {
            let res = await axios.get(url);
            this.setState({ ruleElement: res.data });
        } catch (err) {
            console.warn(err)
        }
    }

    getRuleElementMeasure = async (deviceId) => {
        console.log('App GET Device Measure');
        const url = process.env.REACT_APP_BACKEND_URL + "/device/get/measure/" + deviceId;
        try {
            let res = await axios.get(url);
            if (res.data.measure !== "false"){
                let ruleElement = this.state.ruleElement
                ruleElement.measure = res.data.measure
                this.setState({ ruleElement: ruleElement });
            } 
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
            var rules = this.state.rules;
            var idx = rules.length;
            const newRulesList = rules.concat(newRule)
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
            this.setState({ rule: rule }, () => { this.getRuleAntecedentById(ruleElementId) })
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
            this.setState({ rule: rule }, () => { this.getRuleConsequentById(ruleElementId) })
        } catch (err) {
            console.warn(err)
        }
    }
    updateRuleElementRequest = async (ruleId, ruleElementId) => {
        var url = "";
        if (this.state.setRuleAntecedent) {
            console.log("App POST update rule antecedent");
            url = process.env.REACT_APP_BACKEND_URL + "/rule/update/antecedent/" + ruleId + "/" + ruleElementId;
        }
        else {
            console.log("App POST update rule consequent");
            url = process.env.REACT_APP_BACKEND_URL + "/rule/update/consequent/" + ruleId + "/" + ruleElementId;
        }
        try {
            const ruleElement = this.state.ruleElement;
            const ruleElementJson = JSON.stringify(ruleElement);
            let res = await axios.post(url, { "ruleElement": ruleElementJson });
            this.setState({ rule: res.data })
        } catch (err) {
            console.warn(err)
        }
    }
    updateRuleNameRequest = async (rule) => {
        console.log("App POST update rule name");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/name";
        try {
            axios.post(url, {}, {
                params: {
                    rule_id: rule.id,
                    rule_name: rule.name
                }
            }).then(this.getElements())
        } catch (err) {
            console.warn(err)
        }
    }
    updateDeviceRequest = async (deviceId) => {
        console.log("App POST update device");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/update/" + deviceId;
        try {
            var device = ""
            if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                device = JSON.stringify(this.state.antecedent)
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                device = JSON.stringify(this.state.consequent)
            }
            axios.post(url, { data: device })
                .then(this.getElements());
        } catch (err) {
            console.warn(err)
        }
    }
    updateRuleConsequentOrderRequest = async (orderedElementsId) => {
        console.log("App POST update consequent order");
        const url = process.env.REACT_APP_BACKEND_URL + "/rule/update/consequents/order";
        try {
            const orderedElementsIdJson = JSON.stringify(orderedElementsId);
            let res = await axios.post(url, { "data": orderedElementsIdJson }, {
                params: {
                    rule_id: this.state.rule.id,
                }
            })
            this.setState({ rule: res.data })
        } catch (err) {
            console.warn(err)
        }
    }
    updateRuleConsequentOrderLocal = (items) => {
        var rule = this.state.rule;
        rule.rule_consequents = items;
        this.setState({ rule: rule })
    }
    registerDeviceRequest = async (newDeviceId) => {
        console.log("App POST register device");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/register/" + newDeviceId;
        setTimeout(() => {
            this.setState({ loading: false });
            this.handleRegisterDevicePopUp();
            this.getElements();
        }, 11000);
        try {
            let res = await axios.post(url);
            const result = res.data;
            if (result !== false) {
                this.setState({ loading: true })
                setTimeout();
            } else {
                this.handleRegisterElementError(true);
            }
        } catch (err) {
            console.warn(err)
        }
    }
    setConsequentAutomaticRequest = async (checked) => {
        console.log("App POST consequent automatic");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/automatic";
        var automatic = "false";
        if (checked === true) {
            automatic = "true";
        }
        try {
            await axios.post(url, {}, {
                params: {
                    device_id: this.state.consequentId,
                    automatic: automatic
                }
            });
            var consequent = this.state.consequent;
            consequent.automatic = automatic
            this.setState({ consequent: consequent })
        } catch (err) {
            console.warn(err)
        }
    }
    setConsequentManualMeasureRequest = async (manual_measure) => {
        console.log("App POST consequent manual measure");
        const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/manual";
        try {
            let res = await axios.post(url, {}, {
                params: {
                    device_id: this.state.consequentId,
                    manual_measure: manual_measure
                }
            });
            this.setState({ consequent: res.data })
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
    deleteRuleElementRequest = async (ruleId, deviceId) => {
        var url = "";
        if (this.state.setRuleAntecedent === true) {
            console.log("App DELETE rule antecedent")
            url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/antecedent/" + ruleId + "/" + deviceId;
        }
        else {
            console.log("App DELETE rule consequent")
            url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/consequent/" + ruleId + "/" + deviceId;
        }
        try {
            let res = await axios.delete(url);
            this.setState({ rule: res.data, ruleElement: {} })
        } catch (err) {
            console.warn(err)
        }
    }

    deleteElementRequest = async (elementId) => {
        try {
            if (this.state.routeUrl === process.env.REACT_APP_RULES_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/" + elementId;
                let res = await axios.delete(url);
                if (res.data === true) {
                    this.setState({ newRuleId: "", rule: {} }, () => {
                        this.getElements()
                    })
                }
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SENSORS_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + elementId;
                let res = await axios.delete(url);
                if (res.data === true) {
                    this.setState({ antecedentId: "", antecedent: {} }, () => {
                        this.getElements()
                    })
                }
            }
            else if (this.state.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
                const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + elementId;
                let res = await axios.delete(url);
                if (res.data === true) {
                    this.setState({ consequentId: "", consequent: {} }, () => {
                        this.getElements()
                    })
                }
            }
        } catch (err) {
            console.warn(err)
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
        var rule = this.state.rule
        rule.name = newRuleName
        this.setState({
            rule: rule
        })
    }


    //MODIFY DEVICES LOCAL
    setDeviceAntecedent = (device) => {
        this.setState({ antecedent: device })
    }
    setDeviceConsequent = (device) => {
        this.setState({ consequent: device })
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
    setNewRule = (ruleId) => {
        this.setState({
            newRuleId: ruleId,
            routeUrl: process.env.REACT_APP_RULES_URL
        })
    }
    setNewAntecedent = (antecedentId) => {
        this.setState({
            antecedentId: antecedentId
        })
    }
    setNewConsequent = (consequentId) => {
        this.setState({
            consequentId: consequentId
        })
    }
    setRouteUrl = (url) => {
        this.setState({ routeUrl: url }, () => { this.getElements() })
    }
    setRuleElementObject = (ruleElement) => {
        this.setState({ ruleElement: ruleElement })
    }
    setDeviceAntecedentObject = (antecedent) => {
        this.setState({ antecedent: antecedent })
    }
    setRuleElement = (id) => {
        this.setState({ ruleElementId: id })
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
        this.setState({ setRuleAntecedent: handle, setRuleConsequent: false });
    }
    handleSetRuleConsequent = (handle) => {
        this.setState({ setRuleConsequent: handle, setRuleAntecedent: false });
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
    getWeather = async () => {
        console.log('App GET weather');
        const url = process.env.REACT_APP_BACKEND_URL + "/user/get/weather";
        try {
            let res = await axios.get(url);
            console.log(res.data)
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
                            userLogoutRequest={this.userLogoutRequest}

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
                            modify={this.state.modifyDevice}
                            setNewRule={this.setNewRule}
                            setDeviceElement={this.setDeviceAntecedent}
                            handleModifyDevice={this.handleModifyDevice}
                            deleteElementRequest={this.deleteElementRequest}
                            updateDeviceRequest={this.updateDeviceRequest}
                            getAntecedentById={this.getDeviceById}
                            getRuleById={this.getRuleById}
                            registerDeviceRequest={this.registerDeviceRequest}
                            handleRegisterElementError={this.handleRegisterElementError}
                            AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                            handleSettings={this.handleSettings}
                            handleRuleBody={this.handleRuleBody}
                            setRouteUrl={this.setRouteUrl}
                            setDeviceAntecedentObject={this.setDeviceAntecedentObject}
                            getWeather={this.getWeather}
                        />}
                />
                <Route exact path={process.env.REACT_APP_SWITCHES_URL}
                    render={(props) =>
                        <DevicesPage
                            {...props}
                            {...this.state}
                            handleMenuPopUp={this.handleMenuPopUp}
                            handleLogOut={this.handleLogOut}
                            userLogoutRequest={this.userLogoutRequest}

                            element={this.state.consequent}
                            elements={this.state.consequents}
                            elementId={this.state.consequentId}
                            elementIdx={this.state.consequentIdx}
                            elementName={this.state.consequentName}
                            elementType={"consequent"}

                            addNewElement={this.state.registerDevicePopUp}
                            handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
                            setDeviceElement={this.setDeviceConsequent}
                            modify={this.state.modifyDevice}
                            setNewElement={this.setNewConsequent}
                            getElements={this.getElements}
                            getElementById={this.getDeviceById}
                            setNewConsequent={this.setNewConsequent}
                            handleModifyDevice={this.handleModifyDevice}
                            updateDeviceRequest={this.updateDeviceRequest}
                            deleteElementRequest={this.deleteElementRequest}
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
                            userLogoutRequest={this.userLogoutRequest}

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
                            deleteRuleElementRequest={this.deleteRuleElementRequest}
                            handleModify={this.handleModify}
                            updateRuleElementRequest={this.updateRuleElementRequest}
                            deleteElementRequest={this.deleteElementRequest}
                            modifyRuleName={this.modifyRuleName}
                            getRuleById={this.getRuleById}
                            getAntecedents={this.getAntecedents}
                            getConsequents={this.getConsequents}
                            handleSetRuleAntecedent={this.handleSetRuleAntecedent}
                            handleSetRuleConsequent={this.handleSetRuleConsequent}
                            setRuleElement={this.setRuleElement}
                            setRuleElementObject={this.setRuleElementObject}
                            addNewRuleAntecedentRequest={this.addNewRuleAntecedentRequest}
                            addNewRuleAConsequentRequest={this.addNewRuleAConsequentRequest}
                            getRuleAntecedentById={this.getRuleAntecedentById}
                            getRuleConsequentById={this.getRuleConsequentById}
                            updateRuleNameRequest={this.updateRuleNameRequest}
                            updateRuleConsequentOrderRequest={this.updateRuleConsequentOrderRequest}
                            updateRuleConsequentOrderLocal={this.updateRuleConsequentOrderLocal}



                            base_url={process.env.REACT_APP_BACKEND_URL}
                            handleAddRulePopUp={this.handleAddRulePopUp}
                            createRuleRequest={this.createRuleRequest}
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
                            userLogoutRequest={this.userLogoutRequest}
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








