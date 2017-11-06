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
    var dataPrice = this.props.foodOutcome
    var resultFood = parseFloat(dataPrice / 1000000).toFixed(3)
    return (
      <View>
        <Text>Your salary : {this.props.userSalary}</Text>
        <Text>Your Food Outcome: IDR {resultFood}.000</Text>
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
