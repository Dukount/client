import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { connect } from 'react-redux'

class FinalResult extends Component {
  static navigationOptions = {
    title: 'FinalResult'
  }
  constructor() {
    super()
  }

  render () {
    return (
      <View>
        <Text>Your salary : {this.props.userSalary}</Text>
        <Text>Your Food Outcome: {this.props.foodOutcome}</Text>
        <Text>Your Transportation Outcome: </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userSalary: state.salaryReducer.salary,
    foodOutcome: state.price.foodFinal
  }
}

export default connect(mapStateToProps, null)(FinalResult)
