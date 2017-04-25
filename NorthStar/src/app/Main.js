import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// COLORS
import {deepOrange500, grey900, white, darkBlack,
  fullBlack, lightBlue300
} from 'material-ui/styles/colors';


import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toolbar from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

import Form from './Form.js';
import AllOrgs from './AllOrgs.js'
import Results from './Results.js';


const styles = {
  container: {
    textAlign: 'center'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: fullBlack,
    accent1Color: lightBlue300,
    accent2Color: fullBlack,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseRule = this.parseRule.bind(this);
    this.ageRule = this.ageRule.bind(this);
    this.genderRule = this.genderRule.bind(this);
    this.calculateAge = this.calculateAge.bind(this);

    this.state = {
      open: false,
      showResults: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleSubmit(assets) {
    /*this.setState({
      showResults: true,
    });*/

    var main = this;

    firebase.database().ref().child('providers').once('value').then(function(snapshot) {
      var providers = snapshot.val();
      console.log(providers);
      var serviceCount = 0;
      var servicesArr = [];

      var i = 0;
      for (i = 0; i < Object.keys(providers).length; i++) {
        var provider = Object.keys(providers)[i];

        var serviceArr  = snapshot.val()[provider]["services"];

        var j = 0;
        for (j = 0; j < Object.keys(serviceArr).length; j++) {
            var service = Object.keys(serviceArr)[j];
            console.log(service);
            console.log("Here");
            var serviceDict = serviceArr[service];
            console.log("Fin Here");
            console.log(serviceDict);
            var shouldAdd = true;

            if ("rules" in serviceDict) {
              console.log("has rules");
              var k = 0;
              for (k = 0; k < Object.keys(serviceDict["rules"]).length; k++) {
                var rule = Object.keys(serviceDict["rules"])[k];
                console.log(rule);
                console.log(assets["birthDate"]);
                console.log(assets["gender"]);
                shouldAdd = shouldAdd && main.parseRule(rule, serviceDict["rules"][rule],
                    assets["dateOfBirth"], assets["gender"]);
              }
           }

           if (shouldAdd) {
            servicesArr[serviceCount] = {serviceName: service, serviceDict: serviceDict};
            serviceCount++;
          }
        }
      }

      console.log("service Arr" + servicesArr);
      main.setState({
        services: servicesArr,
      });

      main.setState({
        showResults: true,
      });
      //sessionStorage.setItem('services', servicesArr);
    });

    console.log(assets);

    //alert(assets);
  }

  parseRule(ruleKey, rule, birthday, gender) {
  switch (ruleKey) {
    case "age":
      return this.ageRule(rule, birthday);
      break;
    case "gender":
      return this.genderRule(rule, gender);
      break;
    default:
      return true;
  }
}

ageRule(rule, birthday) {
  var ruleArr;
  var maxAge = -1;
  var minAge = -1;

  if (birthday == null) {
    return true;
  }
  var age = this.calculateAge(birthday);
  console.log("The age is " + age);

  if (rule.includes(",")) {
    ruleArr = rule.split(", ");
  } else {
    ruleArr = [rule];
  }

  for (rule in ruleArr) {
    if(ruleArr[rule].includes("<")) {
      maxAge = Number.parseInt(ruleArr[rule].substring(1));
    } else {
      minAge = Number.parseInt(ruleArr[rule].substring(1));
    }
  }

  console.log("max age: " + maxAge);
  console.log("min age: " + minAge);

  if (maxAge == -1 && minAge == -1) {
    return true;
  } else if (maxAge == -1) {
    if (minAge < age) {
      return true;
    }
  } else if (minAge == -1){
     if (maxAge > age) {
       return true;
     }
  } else {
    if (maxAge > age && minAge < age) {
      return true;
    }
  }

  return false;

  if (maxAge != -1 && age < maxAge) {
    if (minAge != -1 && age > minAge) {
      return true;
    } else if (minAge == -1){
      return true;
    } else {
      return false;
    }
  }
  return false;
  //document.getElementById("maxAge").value = maxAge;
  //document.getElementById("minAge").value = minAge;
}

genderRule(rule, gender ) {
  if (gender == null) {
    return true;
  }

  if (rule.includes("M")) {
    console.log("Only males");
    if (gender == "male") {
      return true;
    } else {
      return false;
    }

  } else {
    if (gender == "male") {
      return false;
    }
  }

  return true;
}

calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    let services = null;
    if (this.state.showResults == true) {
      services = (
        <Results
          services = {this.state.services}
        />
      );
    } else if (this.state.showResults == false) {
      services = (
        <Form
          onSubmit= {this.handleSubmit}
        />
      );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Toolbar>
            <img
            src="../assets/images/lcrc_logo.png"
            height="40"
            style={{
              paddingTop: '10px'
            }}></img>
          </Toolbar>
          <Tabs>
            <Tab label="Form">
              <div>
                {services}
              </div>
            </Tab>
            <Tab label="Organizations">
              <div>
                <AllOrgs />
              </div>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
