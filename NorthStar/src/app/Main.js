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
    this.setState({
      showResults: true,
    });

    alert(assets);
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
        <Results />
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
