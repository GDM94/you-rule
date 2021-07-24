import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import Popper from '@material-ui/core/Popper';
import Modal from 'react-bootstrap/Modal';
import TopBarLogout from '../components/TopBarLogout';
import TopBar2 from '../components/TopBar2';

var jwt = require('jwt-simple');

class SensorsPage extends React.Component {
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
                    this.setState({ routeUrl: process.env.REACT_APP_SENSORS_URL, deviceAntecedentPopUp: true, deviceConsequentPopUp: false, setRulePopUp: false });
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
                    this.setState({ routeUrl: process.env.REACT_APP_SWITCHES_URL, deviceAntecedentPopUp: false, deviceConsequentPopUp: true, setRulePopUp: false })
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
                    this.setState({ routeUrl: process.env.REACT_APP_RULES_URL, deviceAntecedentPopUp: false, deviceConsequentPopUp: false, setRulePopUp: true });
                }
            });
        } catch (err) {
            console.warn(err)
        }
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
                <TopBarLogout/>
                <TopBar2/>
                <GreatBody>
                    {this.props.location.state.url}
                </GreatBody>
            </AppDiv>
        );

    }
}

export default withRouter(SensorsPage)


const PopperStyled = styled(Popper)`
color: white;
background-color: #737373;
border-style: solid;
`;



const AppDiv = styled.div`
display: flex;
flex-direction: column;
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





