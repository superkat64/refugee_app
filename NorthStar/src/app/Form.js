import React, {Component} from'react';

import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import SelectCountry from './SelectCountry.js';
import CheckboxDialog from './CheckboxDialog.js';
import Services from './Services.js';


const styles = {
  block: {
    maxWidth: '100%',
  },
  radioButton: {
    marginBottom: 16,
  },
};

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogServicesOpen: false,
      dialogOrgsOpen: false,

      dateOfBirth: null,
      gender: null,
      arrivalDate: null,
      addressLine1: "",
      addressLine2: "",
      addressCity: "",
      addressState: "",
      addressZip: "",
      originCountry: 0,
      services: [],
      orgs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDOBChange = this.handleDOBChange.bind(this);
    this.handleArrivalChange = this.handleArrivalChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDialogChange = this.handleDialogChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.reset = this.reset.bind(this);
  }

  // EVENT HANDLERS
  handleChange(event, value) {
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleDOBChange(event, date) {
    this.setState({
      dateOfBirth: date,
    });
  };

  handleArrivalChange(event, date) {
    this.setState({
      arrivalDate: date,
    });
  };

  handleSelectChange(value) {
    this.setState({
      originCountry: value,
    });
  };

  handleDialogChange(dialog, openValue, arrayValues) {

    if (dialog == "services") {
      if (arrayValues != null) {
        this.setState({
          dialogServicesOpen: openValue,
          services: arrayValues,
        });
      } else {
        this.setState({
          dialogServicesOpen: openValue,
        });
      }

    } else if (dialog == "orgs") {
      if (arrayValues != null) {
        this.setState({
          dialogOrgsOpen: openValue,
          orgs: arrayValues,
        });
      } else {
        this.setState({
          dialogOrgsOpen: openValue,
        });
      }
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    var dateOfBirth = this.state.dateOfBirth;
    var gender = this.state.gender;
    var arrivalDate = this.state.arrivalDate;
    var addressLine1 = this.state.addressLine1;
    var addressLine2 = this.state.addressLine2;
    var addressCity =  this.state.addressCity;
    var addressState = this.state.addressState;
    var addressZip = this.state.addressZip;
    var originCountry = this.state.originCountry;
    var services = this.state.services;
    var orgs = this.state.organizations;

    alert("These are the values: \n" + dateOfBirth + "\n" + gender + "\n" +
      arrivalDate + "\n" + addressLine1 + "\n" + addressLine2 + "\n" +
      addressCity + "\n" + addressState + "\n" + addressZip + "\n" +
      originCountry + "\n" + services + "\n" + orgs);

      //this.reset();
  };

  reset() {
    this.setState({
      dialogServicesOpen: false,
      dialogOrgsOpen: false,

      dateOfBirth: null,
      gender: null,
      arrivalDate: null,
      addressLine1: "",
      addressLine2: "",
      addressCity: "",
      addressState: "",
      addressZip: "",
      originCountry: 0,
      services: [],
      orgs: [],
    });
  };

  render() {
    return (
      <form>
        <div>
          <div className="dateOfBirth">
            <h3>Date of Birth: </h3>
            <DatePicker
            name="dateOfBirth"
            hintText="YYYY/MM/DD"
            fullWidth={true}
            value={this.state.dateOfBirth}
            onChange={this.handleDOBChange}
            />
          </div>
          <div className="gender">
            <h3>Gender: </h3>
            <RadioButtonGroup
              name="gender"
              labelPosition="left"
              style={styles.block}
              onChange={this.handleChange}>
              <RadioButton
                value="female"
                label="Female"
                style={styles.radioButton}
              />
              <RadioButton
                value="male"
                label="Male"
                style={styles.radioButton}
              />
            </RadioButtonGroup>
          </div>
          <div className="arrivalDate">
            <h3>Date of Arrival in the USA:  </h3>
            <DatePicker
            hintText="YYYY/MM/DD"
            fullWidth={true}
            value={this.state.arrivalDate}
            onChange={this.handleArrivalChange}
            />
          </div>
          <div className="address">
            <h3>Current Address: </h3>
            <TextField
              name="addressLine1"
              hintText="Address Line 1"
              fullWidth={true}
              floatingLabelFixed={true}
              value={this.state.addressLine1}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="addressLine2"
              hintText="Address Line 2"
              fullWidth={true}
              value={this.state.addressLine2}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="addressCity"
              hintText="City"
              fullWidth={true}
              value={this.state.addressCity}
              onChange={this.handleChange}
            />
            <TextField
              name="addressState"
              hintText="State"
              fullWidth={true}
              value={this.state.addressState}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="addressZip"
              hintText="Zip Code"
              fullWidth={true}
              value={this.state.addressZip}
              onChange={this.handleChange}
            />
          </div>
          <SelectCountry
            originCountry={this.state.originCountry}
            onCountryChange={this.handleSelectChange}
          />
          <br />
          <div className="servicesAndOrgs" style={styles.radioButton}>
            <CheckboxDialog
              type="services"
              label="Services Available"
              open={this.state.dialogServicesOpen}
              onDialogChange={this.handleDialogChange}
              returnArray={this.state.services}
            />
            <CheckboxDialog
              type="orgs"
              label="Organizations"
              open={this.state.dialogOrgsOpen}
              onDialogChange={this.handleDialogChange}
              returnArray={this.state.orgs}
            />
          </div>
          <RaisedButton
            label="SUBMIT"
            labelColor="#FFF"
            backgroundColor="#4FC3F7"
            onTouchTap={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}
