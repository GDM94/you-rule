import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import LocationOnIcon from "@material-ui/icons/LocationOn";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      displaySearch: false,
    };
  }

  render() {
    return (
      <ContentContainer>
        <AddDeviceElement
          onClick={() => {
            this.props.handleSearchNewLocation();
          }}
        >
          SEARCH NEW LOCATION
        </AddDeviceElement>

        <ElementContent>
          <ElementDescription>
            <p>
              <LocationOnIcon fontSize="small" style={{ color: "balck" }} />
              CURRENT LOCATION:
            </p>
            <ul>
              <li>name: {this.props.locationName}</li>
              <li>country: {this.props.locationCountry}</li>
              <li>lat: {this.props.locationLat}</li>
              <li>lon: {this.props.locationLon}</li>
            </ul>
          </ElementDescription>
        </ElementContent>
      </ContentContainer>
    );
  }
}



const AddDeviceElement = styled.div`
  color: balck;
  background-color: #cccccc;
  border-radius: 25px;
  margin: 10%;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 1%;
  &:hover {
    background: #d5d8d8;
  }
`;

export default withRouter(Location);

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  float: left;
  text-align: center;
  background-color: #d9d9d9;
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

const ElementDescription = styled.div`
  text-align: left;
  margin-left: 2%;
  margin-top: 5px;
  display: flex;
  flex-flow: column;
`;
