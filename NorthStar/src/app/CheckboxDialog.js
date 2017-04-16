import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  button: {
    float: 'left',
    width: '60%',
    textAlign: 'center',
  },
};

export default class CheckboxDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      returnArray: [],
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleOpen() {
    this.props.onDialogChange(this.props.type, true, null);
  };
  handleClose() {
    this.props.onDialogChange(this.props.type, false, null);
  };

  handleSave() {
    // TODO: FIND A WAY TO MAKE SURE ALL BOXES THAT ARE CHECKED ARE IN THE RETURN
    // ARRAY AND ALL THE BOXES THAT AREN'T, AREN'T
    this.props.onDialogChange(this.props.type, false, this.state.returnArray);
  };

  handleCheck(event, isInputChecked) {
    var actionDone = false;
    var newArray = (this.state.returnArray).slice();
    if (isInputChecked == true) {
      newArray.push(event.target.value)
      this.setState({ returnArray: newArray, });


    } else if (isInputChecked == false) {
      newArray.sort(function(a, b){return a - b});
      var index = event.target.value;
      newArray.splice(index, 1);
      this.setState({ returnArray: newArray, });
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ];

    const staticServices = ['Education', 'Employment',
      'Child Services', 'Health Care Services', 'Legal Services',
      'Support Groups'];
    const staticOrganizations = ['CWS Immigration & Refugee Program',
      'Lutheran Refugee Services', 'Eastern Mennonite Missions',
      'SouthEat Lancaster Health Services', 'Lancaster General Health',
      'Lancaster-Lebanon IU13', 'School District of Lancaster-Lebanon',
      'The Web Institute for Civic Engagement at Franklin & Marshall College'];

    // TODO: CREATE CHECKED ATTRIBUTE TO ALLOW FOR CHECKBOXES TO BE FILLED.
    const checkboxes = [];

    // DYNAMIC RENDERING OF SERVICES
    if (this.props.type == "services") {
      for (let i = 0; i < staticServices.length; i++) {
        checkboxes.push(
          <Checkbox
            key={i}
            value={i}
            label={staticServices[i]}
            style={styles.checkbox}
            onCheck={this.handleCheck}
          />
        );
      }
    // DYNAMIC RENDERING OF ORGANIZATIONS
    } else if (this.props.type == "orgs") {
      for (let i = 0; i < staticOrganizations.length; i++) {
        checkboxes.push(
          <Checkbox
            key={i}
            value={i}
            label={staticOrganizations[i]}
            style={styles.checkbox}
            onCheck={this.handleCheck}
          />
        );
      }
    }


    return (
      <div style={styles.button}>
        <RaisedButton label={this.props.label} onTouchTap={this.handleOpen}/>
        <Dialog
          title={this.props.label}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={styles.block}>
            {checkboxes}
          </div>
        </Dialog>
      </div>
    );
  }
}
