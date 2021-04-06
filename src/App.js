import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRuleProcess from './CreateRuleProcess'
import SetRuleProcess from './SetRuleProcess'
import AddRuleConsequentProcess from './AddRuleConsequentProcess'
import AddRuleAntecedentProcess from './AddRuleAntecedentProcess'
import ViewRules from './ViewRules'
import ViewAntecedents from './ViewAntecedents'
import ViewConsequents from './ViewConsequents'
import DeviceAntecedentPopUp from './DeviceAntecedentPopUp'
import RegisterDeviceProcess from './RegisterDeviceProcess'
import DeviceConsequentPopUp from './DeviceConsequentPopUp'
import { Redirect } from 'react-router-dom';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = this.props.idToken;
    this.state = {
      menuPopUp: false,
      AddRulePopUp: false,
      setRulePopUp: false,
      addRuleAntecedentPopUp: false,
      addRuleConsequentPopUp: false,
      registerDevicePopUp: false,

      newRuleId: 0,
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
      

    }
  }

  componentDidMount() {
    this.getAntecedents();
    this.getConsequents();
    this.getRules();
  }

  //GET ALL
  getAllDeviceIdRegistered = () => {
    console.log('App GET all devices ID registered');
    const url = process.env.REACT_APP_BACKEND_URL + "/device/get/all";
    axios.get(url)
      .then(res => {
        const data = res.data;
        this.setState({ allDeviceId: data }, () => { this.render() })
      })
      .catch(err => console.warn(err));
  }


  //GET BY USER
  getAntecedents = () => {
    console.log('App GET antecedent By User');
    const url = process.env.REACT_APP_BACKEND_URL + "/device/get/antecedents";
    axios.get(url, {}, {params:{user_id: this.props.user_id}})
      .then(res => {
        const data = res.data;
        this.setState({ antecedents: data }, () => { this.render() });

      })
      .catch(err => console.warn(err));
  }
  getConsequents = () => {
    console.log('App GET consequents By User');
    const url = process.env.REACT_APP_BACKEND_URL + "/device/get/consequents";
    axios.get(url, {}, {params:{user_id: this.props.user_id}})
      .then(res => {
        const data = res.data;
        this.setState({ consequents: data }, () => { this.render() });
      })
      .catch(err => console.warn(err));
  }
  getRules = () => {
    console.log('App GET Rules by user');
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/user";
    axios.get(url, {}, {params:{user_id: this.props.user_id}})
      .then(res => {
        const data = res.data;
        this.setState({ rules: data }, () => { this.render() });
      })
      .catch(err => console.warn(err));
  }

  //GET BY ID
  getAntecedentById = (antecedentId) => {
    console.log('App GET antecedent By Id');
    const url = process.env.REACT_APP_BACKEND_URL + "/device/antecedent/id/" + antecedentId;
    axios.get(url)
      .then(res => {
        const newAntecedent = res.data;
        const idx = this.state.antecedentIdx;
        var antecedents = this.state.antecedents;
        antecedents[idx] = newAntecedent;
        this.setState({ antecedents: antecedents }, () => { this.render() });
      })
  }
  getConsequentById = (consequentId) => {
    console.log('App GET consequent By Id');
    const url = process.env.REACT_APP_BACKEND_URL + "/device/consequent/id/" + consequentId;
    axios.get(url)
      .then(res => {
        const newConsequent = res.data;
        var consequents = this.state.consequents;
        const consequentIdx = this.state.consequentIdx;
        consequents[consequentIdx] = newConsequent;
        this.setState({ consequents: consequents }, () => { this.render() });
      })
  }
  getRuleById = (ruleId) => {
    console.log('App GET Rule By ID');
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/id/" + ruleId;
    axios.get(url, {}, {params:{user_id: this.props.user_id}})
      .then(res => {
        const newRule = res.data;
        var rules = this.state.rules;
        const idx = this.state.newRuleIdx;
        rules[idx] = newRule;
        this.setState({ rules: rules }, () => { this.render() });
      })
      .catch(err => console.warn(err));
  }
  getDeviceMeasureRequest = (type) => {
    console.log('App GET device measure');
    if (type === "antecedent") {
      const url = process.env.REACT_APP_BACKEND_URL + "/device/measure/" + this.state.antecedentId;
      axios.get(url)
        .then(res => {
          const newMeasure = res.data;
          const index = this.state.antecedentIdx;
          var antecedents = this.state.antecedents;
          antecedents[index].measure = newMeasure;
          this.setState({ antecedents: antecedents }, () => { this.render() });
        })
    }
  }

  //ADD and UPDATE ELEMENTS
  createRuleRequest = (rule_name) => {
    console.log('App POST create rule');
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/create/" + rule_name;
    axios.post(url,{}, {params:{user_id: this.props.user_id}})
      .then(res => {
        const ruleId = res.data;
        const newRule = { id: ruleId, name: rule_name, antecedent: [], consequent: [] };
        var rules = this.state.rules;
        var idx = rules.length;
        const newRulesList = rules.concat([newRule])
        this.setState({
          rules: newRulesList,
          newRuleIdx: idx,
          newRuleId: ruleId,
          newRuleName: rule_name
        }, () => {
          this.render();
          this.handleAddRulePopUp();
          this.handleSetRulePopUp();
        })
      }).catch(err => console.warn(err));
  }
  setRuleAntecedentRequest = (newAntecedent) => {
    console.log("App POST new rule antecedent");
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/antecedent";
    axios.post(url, {}, {
      params: {
        user_id: this.props.user_id,
        rule_id: this.state.newRuleId,
        device_id: newAntecedent.device_id,
        start_value: newAntecedent.start_value,
        stop_value: newAntecedent.stop_value,
        condition: newAntecedent.condition
      }
    })
      .catch(err => console.warn(err));
  }
  setRuleConsequentRequest = (newConsequent) => {
    console.log("App POST new rule consequent");
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/consequent";
    axios.post(url, {}, {
      params: {
        user_id: this.props.user_id,
        rule_id: this.state.newRuleId,
        device_id: newConsequent.device_id,
      }
    })
      .catch(err => console.warn(err));
  }
  updateDeviceRequest = (type) => {
    console.log("App POST update device");
    var deviceId = "";
    var device_name = "";
    var setting = 0;
    if (type === "antecedent") {
      const index = this.state.antecedentIdx;
      deviceId = this.state.antecedentId;
      device_name = this.state.antecedentName;
      setting = this.state.antecedents[index].setting;
    }
    else {
      deviceId = this.state.consequentId;
      device_name = this.state.consequentName;
      setting = "";
    }
    const url = process.env.REACT_APP_BACKEND_URL + "/device/update";
    axios.post(url, {}, {
      params: {
        user_id: this.props.user_id,
        device_id: deviceId,
        device_name: device_name,
        setting: setting
      }
    }).catch(err => console.warn(err));

  }
  registerDeviceRequest = (type, newDevice) => {
    console.log("App POST register device");
    const url = process.env.REACT_APP_BACKEND_URL + "/device/register";
    axios.post(url, {}, {
      params: {
        device_id: newDevice.id,
        device_name: newDevice.name,
        user_id: this.props.user_id
      }
    }).catch(err => console.warn(err));
    this.registerNewDeviceLocal(type, newDevice);
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
          this.render();
          this.handleDeviceAntecedentPopUp();
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
          this.render();
          this.handleDeviceConsequentPopUp();
        })
    }
  }
  updateRuleName = () => {
    console.log("App POST update rule name")
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/set/name";
    axios.post(url, {}, {
      params: {
        user_id: this.props.user_id,
        rule_id: this.state.newRuleId,
        rule_name: this.state.newRuleName
      }
    }).catch(err => console.warn(err));
  }

  // REMOVE ELEMENT FROM ARRAYS
  deleteRuleRequest = (ruleId, ruleIdx) => {
    console.log("App DELETE rule")
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/" + ruleId;
    axios.delete(url, {}, {params:{user_id: this.props.user_id}}).catch(err => console.warn(err));
    var NewRules = this.state.rules;
    NewRules.splice(ruleIdx, 1)
    this.setState({ rules: NewRules, newRuleIdx: 0 }, () => {
      this.render()
    })
  }
  deleteRuleConsequentRequest = (ruleId, deviceId) => {
    console.log("App DELETE rule consequent")
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/consequent/" + ruleId + "/" + deviceId;
    axios.delete(url, {}, {params:{user_id: this.props.user_id}}).catch(err => console.warn(err));
    this.deleteRuleConsequentLocal(ruleId, deviceId)
  }
  deleteRuleConsequentLocal = (deviceId) => {
    var rules = this.state.rules;
    const idx_rule = this.state.newRuleIdx
    var rule_consequent = rules[idx_rule].consequent
    const idx_consequent = rule_consequent.indexOf(deviceId)
    rules[idx_rule].consequent.splice(idx_consequent, 1);
    this.setState({ rules: rules }, () => { this.render() });
  }
  deleteRuleAntecedentRequest = (ruleId, deviceId) => {
    console.log("App DELETE rule antecedent")
    const url = process.env.REACT_APP_BACKEND_URL + "/rule/delete/antecedent/" + ruleId + "/" + deviceId;
    axios.delete(url, {}, {params:{user_id: this.props.user_id}})
      .catch(err => console.warn(err));
    this.deleteRuleAntecedentLocal(deviceId)
  }
  deleteRuleAntecedentLocal = (deviceId) => {
    var rules = this.state.rules;
    const idx_rule = this.state.newRuleIdx
    var rule_antecedent = rules[idx_rule].antecedent
    const idx_antecedent = rule_antecedent.indexOf(deviceId)
    rules[idx_rule].antecedent.splice(idx_antecedent, 1);
    this.setState({ rules: rules }, () => { this.render() });
  }
  deleteDeviceRequest = (type) => {
    console.log("App DELETE device")
    if (type === "antecedent") {
      const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + this.state.antecedentId;
      var antecedents = this.state.antecedents;
      const index = this.state.antecedentIdx;
      antecedents.splice(index, 1);
      axios.delete(url,{}, {params:{user_id: this.props.user_id}})
        .then(this.setState({ antecedentIdx: 0, antecedents: antecedents }, () => { this.render() }))
        .catch(err => console.warn(err));

    }
    else {
      const url = process.env.REACT_APP_BACKEND_URL + "/device/delete/" + this.state.consequentId;
      const index = this.state.consequentIdx;
      var consequents = this.state.consequents;
      consequents.splice(index, 1)
      axios.delete(url, {}, {params:{user_id: this.props.user_id}})
        .then(this.setState({ consequentIdx: 0, consequents: consequents }, () => { this.render() }))
        .catch(err => console.warn(err));

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
      this.render();
      this.handleAddRuleConsequentPopUp();
      this.handleSetRulePopUp();
    });
  }
  setAntecedentRuleLocal = (newRuleIdx, newAntecedent) => {
    var rulesList = this.state.rules;
    rulesList[newRuleIdx].antecedent.push(newAntecedent);
    this.setState({ rules: rulesList }, () => {
      this.render();
      this.handleAddRuleAntecedentPopUp();
      this.handleSetRulePopUp();
    });
  }
  setNewRuleCondition = (ruleIdx, index, newCondition) => {
    const rules = this.state.rules;
    rules[ruleIdx].antecedent[index].condition = newCondition;
    if (newCondition === "between") {
      rules[ruleIdx].antecedent[index].stop_value = rules[ruleIdx].antecedent[index].start_value;
    }
    else {
      rules[ruleIdx].antecedent[index].stop_value = "//";
    }
    this.setState({ rules: rules }, () => { this.render() });
  }
  setNewStartValue = (ruleIdx, index, newStart) => {
    const rules = this.state.rules;
    rules[ruleIdx].antecedent[index].start_value = newStart;
    this.setState({ rules: rules }, () => { this.render() });
  }
  setNewStopValue = (ruleIdx, index, newStop) => {
    const rules = this.state.rules;
    rules[ruleIdx].antecedent[index].stop_value = newStop;
    this.setState({ rules: rules }, () => { this.render() });
  }

  //MODIFY DEVICES LOCAL
  modifyAntecedentSetting = (newSetting) => {
    var antecendents = this.state.antecedents;
    const index = this.state.antecedentIdx;
    antecendents[index].setting = newSetting;
    this.setState({ antecendents: antecendents }, () => {
      this.render()
    })
  }
  modifyAntecedentName = (newName) => {
    var antecendents = this.state.antecedents;
    const index = this.state.antecedentIdx;
    antecendents[index].name = newName;
    this.setState({ antecendents: antecendents, antecedentName: newName }, () => {
      this.render()
    })
  }
  modifyConsequentName = (newName) => {
    var consequents = this.state.consequents;
    const index = this.state.consequentIdx;
    consequents[index].name = newName;
    this.setState({ consequents: consequents, consequentName: newName }, () => {
      this.render()
    })
  }

  // CURRENT SELECTED ITEM VARIABLES
  setNewRule = (ruleId, ruleName, ruleIdx) => {
    this.setState({
      newRuleIdx: ruleIdx,
      newRuleId: ruleId,
      newRuleName: ruleName
    }, () => { this.render() })
  }
  setNewAntecedent = (antecedentId, antecedentName, antecedentIdx) => {
    this.setState({
      antecedentId: antecedentId,
      antecedentName: antecedentName,
      antecedentIdx: antecedentIdx
    }, () => { this.render() })
  }
  setNewConsequent = (consequentId, consequentName, consequentIdx) => {
    this.setState({
      consequentId: consequentId,
      consequentName: consequentName,
      consequentIdx: consequentIdx
    }, () => { this.render() })
  }




  handleMenuPopUp = () => {
    this.setState({
      menuPopUp: !this.state.menuPopUp
    })
  }
  handleAddRulePopUp = () => {
    this.setState({
      AddRulePopUp: !this.state.AddRulePopUp
    })
  }
  handleSetRulePopUp = () => {
    this.setState({
      setRulePopUp: !this.state.setRulePopUp
    })
  }
  handleModify = () => {
    this.setState({
      modify: !this.state.modify
    })
  }
  handleModifyDevice = () => {
    this.setState({
      modifyDevice: !this.state.modifyDevice
    })
  }
  handleAddRuleAntecedentPopUp = () => {
    this.setState({ addRuleAntecedentPopUp: !this.state.addRuleAntecedentPopUp })
  }
  handleAddRuleConsequentPopUp = () => {
    this.setState({ addRuleConsequentPopUp: !this.state.addRuleConsequentPopUp })
  }
  handleRegisterDevicePopUp = () => {
    this.setState({ registerDevicePopUp: !this.state.registerDevicePopUp })
  }
  handleDeviceAntecedentPopUp = () => {
    this.setState({ deviceAntecedentPopUp: !this.state.deviceAntecedentPopUp })
  }
  handleDeviceConsequentPopUp = () => {
    this.setState({ deviceConsequentPopUp: !this.state.deviceConsequentPopUp })
  }
  handleLogOut = () => {
    this.setState({ logout: true }, () => { this.render() });
  }





  render() {
    if (this.state.logout) {
      return (
        <Redirect to={process.env.REACT_APP_LOGIN_URL} />
      )
    }
    else {
      return (
        <div className="App">
          <div className="TopBar">
            <div className="TopBarElement">
              Welcome {this.props.user_name}
            </div>
            <div className="TopBarButtonMenu">
              <button onClick={() => { this.handleMenuPopUp() }}>MENU</button>
            </div>
            <ButtonMenu
              menuPopUp={this.state.menuPopUp}
              handleMenuPopUp={this.handleMenuPopUp}
              handleAddRulePopUp={this.handleAddRulePopUp}
              handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
              handleModify={this.handleModify}
              handleLogOut={this.handleLogOut}
            />
            <CreateRuleProcess
              AddRulePopUp={this.state.AddRulePopUp}
              rules={this.state.rules}
              user_id={this.props.user_id}
              base_url={process.env.REACT_APP_BACKEND_URL}
              handleAddRulePopUp={this.handleAddRulePopUp}
              createRuleRequest={this.createRuleRequest}
            />
            <SetRuleProcess
              setRulePopUp={this.state.setRulePopUp}
              handleSetRulePopUp={this.handleSetRulePopUp}
              rules={this.state.rules}
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
            />
            <AddRuleConsequentProcess
              addRuleConsequentPopUp={this.state.addRuleConsequentPopUp}
              handleSetRulePopUp={this.handleSetRulePopUp}
              handleAddRuleConsequentPopUp={this.handleAddRuleConsequentPopUp}
              newRuleIdx={this.state.newRuleIdx}
              rules={this.state.rules}
              consequents={this.state.consequents}
              setConsequentRuleLocal={this.setConsequentRuleLocal}
            />
            <AddRuleAntecedentProcess
              addRuleAntecedentPopUp={this.state.addRuleAntecedentPopUp}
              handleSetRulePopUp={this.handleSetRulePopUp}
              handleAddRuleAntecedentPopUp={this.handleAddRuleAntecedentPopUp}
              newRuleIdx={this.state.newRuleIdx}
              rules={this.state.rules}
              antecedents={this.state.antecedents}
              setAntecedentRuleLocal={this.setAntecedentRuleLocal}
            />
            <RegisterDeviceProcess
              registerDevicePopUp={this.state.registerDevicePopUp}
              handleRegisterDevicePopUp={this.handleRegisterDevicePopUp}
              registerDeviceRequest={this.registerDeviceRequest}
            />
            <DeviceAntecedentPopUp
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
              updateDeviceRequest={this.updateDeviceRequest}
              deleteDeviceRequest={this.deleteDeviceRequest}
              getDeviceMeasureRequest={this.getDeviceMeasureRequest}
              modifyAntecedentName={this.modifyAntecedentName}
              setNewRule={this.setNewRule}
              handleSetRulePopUp={this.handleSetRulePopUp}
            />

            <DeviceConsequentPopUp
              rules={this.state.rules}
              consequents={this.state.consequents}
              consequentId={this.state.consequentId}
              consequentName={this.state.consequentName}
              consequentIdx={this.state.consequentIdx}
              setNewConsequent={this.setNewConsequent}
              handleDeviceConsequentPopUp={this.handleDeviceConsequentPopUp}
              deviceConsequentPopUp={this.state.deviceConsequentPopUp}
              modifyDevice={this.state.modifyDevice}
              handleModifyDevice={this.handleModifyDevice}
              updateDeviceRequest={this.updateDeviceRequest}
              deleteDeviceRequest={this.deleteDeviceRequest}
              getDeviceMeasureRequest={this.getDeviceMeasureRequest}
              modifyConsequentName={this.modifyConsequentName}
              setNewRule={this.setNewRule}
              handleSetRulePopUp={this.handleSetRulePopUp}
            />


          </div>
          <ViewAntecedents
            antecedents={this.state.antecedents}
            handleDeviceAntecedentPopUp={this.handleDeviceAntecedentPopUp}
            setNewAntecedent={this.setNewAntecedent}
            getAntecedentById={this.getAntecedentById}
          />
          <ViewRules
            handleSetRulePopUp={this.handleSetRulePopUp}
            rules={this.state.rules}
            setNewRule={this.setNewRule}
            getRuleById={this.getRuleById}
          />
          <ViewConsequents
            consequents={this.state.consequents}
            handleDeviceConsequentPopUp={this.handleDeviceConsequentPopUp}
            setNewConsequent={this.setNewConsequent}
            getConsequentById={this.getConsequentById}
          />



        </div>
      );
    }
  }
}

function ButtonMenu(props) {
  return (
    <Modal show={props.menuPopUp} onHide={() => props.handleMenuPopUp()}>
      <Modal.Header closeButton>
        <Modal.Title>"MENU"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="MenuPopUp">
          <button onClick={() => {
            props.handleMenuPopUp();
            props.handleRegisterDevicePopUp();
          }}>
            ADD DEVICE
          </button>
          <br></br>
          <button onClick={() => {
            props.handleMenuPopUp();
            props.handleAddRulePopUp();
            props.handleModify()
          }}>
            ADD RULE
            </button>
          <br></br>
          <button
            onClick={() => {
              props.handleLogOut();
            }}
          >
            LOGOUT
            </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => props.handleMenuPopUp()}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

