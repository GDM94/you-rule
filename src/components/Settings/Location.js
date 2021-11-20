import React from 'react';
import styled from "styled-components";
import { withRouter } from 'react-router';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            displaySearch: false
        }
    }

    modifyLocationName = (newName) => {
        this.setState({ name: newName })
    }

    showSearchResults = (display) => {
        this.setState({ displaySearch: display })
    }

    submitFunction = (event) => {
        event.preventDefault();
        this.props.getCurrentLocation(this.state.name);
        this.showSearchResults(true);
    }

    render() {
        return (
            <ContentContainer>
                <ElementTitle>
                    <h2> <LocationOnIcon fontSize="large" style={{ color: 'balck' }} />  {process.env.REACT_APP_PAGE_SETTINGS_LOCATION}</h2>
                </ElementTitle>
                <ElementContent>
                    <CurrentLocationDescription {...this.props} />

                    <ElementSettings>
                        <form style={{ display: "inline" }} name="ItemName" onSubmit={this.submitFunction}>
                            <label style={{ marginRight: "10px" }} htmlFor="name">new location: </label>
                            <input type="text" id="name" name="name"
                                defaultValue=""
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    this.modifyLocationName(newName)
                                }}
                            />
                        </form>
                        <MyButton onClick={() => {
                            this.props.getCurrentLocation(this.state.name);
                            this.showSearchResults(true);
                        }}>
                            search
                        </MyButton>
                    </ElementSettings>
                    <br></br>
                    <FoundedLocationList
                        {...this.props}
                        {...this.state}
                        showSearchResults={this.showSearchResults}
                    />

                </ElementContent>

            </ContentContainer>
        )
    }
}

function CurrentLocationDescription(props) {
    return (
        <ElementDescription>
            <p>CURRENT LOCATION: </p>
            <ul>
                <li>name:  {props.locationName}</li>
                <li>country:  {props.locationCountry}</li>
                <li>lat:  {props.locationLat}</li>
                <li>lon:  {props.locationLon}</li>
            </ul>
        </ElementDescription>
    )
}

function FoundedLocationList(props) {
    var i = 0;
    var locationList = "no locations found"
    if (props.locationList.length > 0) {
        locationList = props.locationList.map(location => {
            const id = location.name + " (" + location.country + ")"
            i++;
            return (
                <>
                    <ListItem key={i} button onClick={() => {
                        props.setNewUserLocation(location.name, location.country, location.lat, location.lon);
                        props.showSearchResults(false)
                    }}>
                        <ListItemText primary={id} />
                    </ListItem>
                    <Divider />
                </>

            )
        })
    }

    return (
        <div style={{ display: props.displaySearch ? "" : "none" }}>
            <p>FOUNDED LOCATIONS</p>
            <Divider/>
            <List component="div" aria-label="main mailbox folders">
                {locationList}
            </List>

        </div>
    )
}

export default withRouter(Location)

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
  background-color: #d9d9d9;
`;


const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
background-color: #cccccc;
display: flex;
flex-flow: column;
`;


const ElementSettings = styled.div`
margin-left: 2%;
margin-right: 2%;
justify-content: center;
padding: 1%;
display: flex;
flex-flow: row;
align-items: center;
border: solid black 2px;
border-radius: 25px;
text-align: center;
background-color: #e6e6e6;
`;

const MyButton = styled(Button)`
border: black solid 1px !important;
`;

const ElementDescription = styled.div`
text-align: left;
margin-left: 2%;
margin-top: 5px;
display: flex;
flex-flow: column;
`;
