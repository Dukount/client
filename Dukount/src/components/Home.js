import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux'

import {
  post_salary
} from '../actions/salaryAction'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: '',
    };
  }

  render() {
    console.log('ini salary di home ', this.state.salary)
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.salaryInputRow}>
          <View style={styles.salaryInput}>
            <TextInput
              editable = {true}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {20}
              onChangeText={(salary) => this.setState({salary})}
              value={this.state.salary}
              keyboardType = {'numeric'}
              placeholder={'Input your salary'}
            />
          </View>
          <Button
            title = 'Save'
            style={styles.saveButton}
            onPress={() => this.props.postSalary(this.state.salary)}
          />
        </View>
        <TouchableHighlight onPress={() => navigate('CalendarScreen')}>
        <Text style={styles.sentence}>
          Pick Your Workdays
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => navigate('FromLocation')}>
        <Text style={styles.sentence}>
          From Location
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressFrom}</Text>
        </View>

        <TouchableHighlight onPress={() => navigate('ToLocation')}>
        <Text style={styles.sentence}>
          To Location
        </Text>
        </TouchableHighlight>

        <View>
          <Text>{this.props.addressTo}</Text>
        </View>
      </View>
    );
  }
}
// navigate('Main')
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#d1ddf0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sentence: {
    fontSize: 30
  },
  salaryInputRow: {
    flexDirection: 'row',
    top: 0,
    height: 30,
    marginTop: 0,
    marginBottom: 10
  },
  salaryInput: {
    width: 250,
    height: 35
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postSalary: (payload) => dispatch(post_salary(payload))
  }
}

const mapStateToProps = (state) => {
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Home)

export default ConnectedComponent
