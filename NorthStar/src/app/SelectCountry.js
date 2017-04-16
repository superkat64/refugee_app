import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

/*
  THIS IS FOR DYNAMIC DATA INTEGRATION

  buildOptions(data) {
  var options = [];
	for(var key in data) {
		var value = data[key];
		options.push(<option key={key} value={key}>{value}</option>)
	}
	return options;
}
*/

const styles = {
  customWidth: {
    width: '60%',
  },
  label: {
    float: 'left',
  },
};

export default class SelectCountry extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.onCountryChange(value);
  }

  render() {
    return (
      <div>
        <h3 style={styles.label}>Country of Origin: </h3>
        <DropDownMenu
          maxHeight={300}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
          value={this.props.originCountry}
        >
          <MenuItem value={0} primaryText="Afghanistan" />
          <MenuItem value={1} primaryText="Cameroon" />
          <MenuItem value={2} primaryText="Chad" />
          <MenuItem value={3} primaryText="Niger" />
          <MenuItem value={4} primaryText="Nigeria" />
          <MenuItem value={5} primaryText="Somalia" />
          <MenuItem value={6} primaryText="South Sudan" />
          <MenuItem value={7} primaryText="Syria" />
          <MenuItem value={8} primaryText="Other" />
        </DropDownMenu>
      </div>
    );
  }
}
