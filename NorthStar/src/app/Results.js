import React, {Component} from'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

import lightBlue300 from 'material-ui/styles/colors';

const styles = {
  icons: {
    color: lightBlue300,
    height: 1.5,
    marginRight: 2,
  },
  imgLogo: {
    height: 30,
  },
  card: {
    margin: 5,
  },
  header: {
    borderBottom: "1px solid #E0E0E0",
    paddingTop: 30,
    paddingBottom: 5,
    margin: "3%",
  },

};

export default class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      services: [],
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Component will update");
    console.log(nextState);
    console.log(nextProps);
  }

  render() {
    const ServicesCards = [];
    console.log("the services should be " + this.props.services);
    var servicesArr = this.props.services;

    for (let i = 0; i < servicesArr.length; i++) {
      console.log(servicesArr[i]);
      ServicesCards.push(
        <Card key={i} style={styles.card}>
          <CardHeader
            title={<img src="../assets/images/literacy_horizontal.png" style={styles.imgLogo}/>}
            subtitle={servicesArr[i].serviceName}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <p>{servicesArr[i]["serviceDict"].description}</p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>phone</FontIcon>
            {servicesArr[i]["serviceDict"]["contact"].phone}
          </p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>language</FontIcon>
            <a href="#">genericwebsite.com</a>
          </p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>room</FontIcon>
            {servicesArr[i]["serviceDict"]["address"]["street1"]} {servicesArr[i]["serviceDict"]["address"]["cityState"]}
          </p>
          </CardText>
        </Card>
      );
    };

    return (
      <div>
        <div className="education">
          {ServicesCards}
        </div>
      
      </div>
    );
  }
}
