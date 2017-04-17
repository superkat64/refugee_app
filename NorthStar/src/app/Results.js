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
  }
  render() {
    const ServicesCards = []
    for (let i = 0; i < 3; i++) {
      ServicesCards.push(
        <Card key={i} style={styles.card}>
          <CardHeader
            title={<img src="../assets/images/literacy_horizontal.png" style={styles.imgLogo}/>}
            subtitle={`Organization ${i + 1}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <p>They offer services in: this, this, and this...</p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>phone</FontIcon>
            (123) 456 - 7890
          </p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>language</FontIcon>
            <a href="#">genericwebsite.com</a>
          </p>
          <p>
            <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>room</FontIcon>
            123 Some Street, Newtown PA, 19403
          </p>
          </CardText>
        </Card>
      );
    };

    return (
      <div>
        <div className="education">
          <h2 style={styles.header}>Education</h2>
          <Card style={styles.card}>
            <CardHeader
              title={<img src="../assets/images/emm_horizontal.png" style={styles.imgLogo}/>}
              subtitle="Eastern Mennonite Missions"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>Services: </p>
              <ul>
                <li>Mobilizes service-oriented volunteers from local faith communities to respond to refugee needs</li>
                <li>Provides cross-cultural training and coaching for volunteers</li>
                <li>Facilitates cultural awareness opportunities for churches, youth groups, and the community</li>
              </ul>
              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>phone</FontIcon>
                (717) 898 - 2251
              </p>
              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>language</FontIcon>
                <a href="https://www.emm.org/">www.emm.org</a>
              </p>
              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>room</FontIcon>
                53 West Brandt Blvd, PO Box 458, Salunga, PA 17538 - 0458
              </p>
            </CardText>
          </Card>
          {ServicesCards}
        </div>
        <div className="employment">
          <h2 style={styles.header}>Employment</h2>
          <Card style={styles.card}>
            <CardHeader
              title={<img src="../assets/images/cws_horizontal.png" style={styles.imgLogo}/>}
              subtitle="CWS Immigration & Refugee Program"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>Provides assistance & placements.</p>
              <p>Offices are open Monday through Friday</p>

              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>phone</FontIcon>
                (717) 381 - 2890
              </p>
              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>language</FontIcon>
                <a href="https://cwsglobal.org/">cwsglobal.org/employment</a>
              </p>
              <p>
                <FontIcon className="material-icons" style={styles.icons} color={lightBlue300}>room</FontIcon>
                308 East King St, PO Box 1676, Lancaster, PA 17602-5013
              </p>
            </CardText>
          </Card>
          {ServicesCards}
        </div>
        <div className="child_services">
          <h2 style={styles.header}>Child Services</h2>
          {ServicesCards}
        </div>
      </div>
    );
  }
}
