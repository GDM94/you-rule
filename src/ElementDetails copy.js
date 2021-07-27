import React from 'react';
import DeviceAntecedentPopUp from './DeviceAntecedentPopUp'
import SetRuleProcess from './SetRuleProcess'
import DeviceConsequentPopUp from './DeviceConsequentPopUp'


export default class ElementDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (this.props.routeUrl === process.env.REACT_APP_SENSORS_URL) {
            return (
                <DeviceAntecedentPopUp
                    {...this.props}
                />
            )

        }
        else if (this.props.routeUrl ===  process.env.REACT_APP_SWITCHES_URL) {
            return (<DeviceConsequentPopUp
                {...this.props}
            />)

        }
        else if ( this.props.routeUrl === process.env.REACT_APP_RULES_URL) {
            return (
                <SetRuleProcess
                {...this.props}
                    
                />
            )
        }
        else {
            return (<div></div>)
        }
    }

}