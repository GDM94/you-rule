import React from 'react';
import styled from "styled-components";


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
      <ContentContainer>

        <ElementTitle>
          <h1>ADD RULE:</h1>
        </ElementTitle>
        <ElementContent>
          <ElementSettings>
            <div className="GenericModalBody">
              <p style={{ display: this.state.checkCreateNewRule ? 'block' : 'none' }}> Error: rule name already exist! Choose another name.</p>
              <form onSubmit={this.createRule}>
                <label htmlFor="ruleName">rule name: </label>
                <input name="ruleName" id="ruleName" type="text"
                  onChange={(e) => {
                    const ruleName = e.target.value;
                    this.checkCreateRuleFunction(this.props.rules, ruleName);
                  }}
                />
              </form>
            </div>
          </ElementSettings>
          <button onClick={() => {
            if (!this.state.checkCreateNewRule) {
              const ruleName = this.state.ruleName;
              this.props.createRuleRequest(ruleName);
            }
          }}>
            NEXT
          </button>
          <button onClick={() => this.props.handleAddRulePopUp()}>CANCEL</button>
        </ElementContent>









      </ContentContainer>)
  }

}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
  max-height:100%;
  overflow-y: auto;
  background-color: #d9d9d9;
`;

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: center;
padding: 2%;
background-color: #cccccc;
`;


const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

const ElementSettings = styled.div`
margin-left: 2%;
margin-right: 2%;
justify-content: center;
padding: 1%;
display: flex;
flex-flow: column;
align-items: center;
`;