import React from 'react';
import styled from "styled-components";
import RegisterDeviceProcess from './RegisterDeviceProcess'
import ConsequentDevices from './ConsequentDevices';
import AntecedentDevices from './AntecedentDevices'
import { withRouter } from 'react-router';

class DetailDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        if (this.props.elementId !== "" && this.props.elements.length > 0 && this.props.addNewElement === false) {
            if (this.props.location.state.page === process.env.REACT_APP_PAGE_SENSORS) {
                return (
                    <AntecedentDevices
                        {...this.props}
                    />
                )
            }
            if (this.props.location.state.page === process.env.REACT_APP_PAGE_SWITCHES) {
                return (
                    <ConsequentDevices
                        {...this.props}
                    />
                )
            }

        }
        else if (this.props.elementId === "" && this.props.addNewElement === true) {
            return (<ContentContainer>
                <RegisterDeviceProcess
                    {...this.props}
                />
            </ContentContainer>)
        }
        else {
            return (<ContentContainer> </ContentContainer>)
        }
    }
}

export default withRouter(DetailDevice)




const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
`;



