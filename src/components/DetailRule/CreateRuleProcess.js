import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default class CreateRuleProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkCreateNewRule: false,
      ruleName: "",
    }

  }

  checkCreateRuleFunction(rules, ruleName) {
    if (rules.some(rule => rule.name === ruleName)) {
      this.setState({
        checkCreateNewRule: true
      })
    }
    else {
      this.setState({
        checkCreateNewRule: false,
        ruleName: ruleName
      })
    }
  }

  createRule = (event) => {
    if (!this.state.checkCreateNewRule) {
      const ruleName = this.state.ruleName
      this.props.createRuleRequest(ruleName);
    }
    event.preventDefault();
  }





  render() {
    return (
      <div>
        <Modal show={this.props.AddRulePopUp} onHide={() => this.props.handleAddRulePopUp()}>
          <Modal.Header closeButton>
            <Modal.Title>ADD RULE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="GenericModalBody">
              <p style={{ display: this.state.checkCreateNewRule ? 'block' : 'none' }}> Error: rule name already exist! Choose another name.</p>
              <form onSubmit={this.createRule}>
                <label htmlFor="ruleName">RULE NAME: </label>
                <input name="ruleName" id="ruleName" type="text"
                  onChange={(e) => {
                    const ruleName = e.target.value;
                    this.checkCreateRuleFunction(this.props.rules, ruleName);
                  }}
                />
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => {
              if (!this.state.checkCreateNewRule) {
                const ruleName = this.state.ruleName;
                this.props.createRuleRequest(ruleName);
              }
            }}>
              NEXT
                </button>
            <button onClick={() => this.props.handleAddRulePopUp()}>Close</button>
          </Modal.Footer>
        </Modal>
      </div >)
  }

}