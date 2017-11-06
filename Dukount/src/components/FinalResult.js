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
    this.state = {
      transportResult: null,
      resultFinal: null,
      userOutcome: '-',
      salaryRestUser: '-'
    }
  }

  transportationResult () {
    var uber = this.props.uberTransportPrice
    var trafi = this.props.trafiTransportPrice
    var userChoice = this.props.userTransportMode
    var transportResult = null

    if (userChoice === true) {
      this.setState({
        transportResult : trafi
      })
    } else {
      this.setState({
        transportResult : uber
      })
    }
  }

  finalAllResult () {
    let salary = this.props.userSalary
    let food = this.props.foodOutcome
    let transport = this.state.transportResult
    let sumOutcome = food + (+transport)
    let restSalary = (+salary) - sumOutcome
    console.log('food ', food);
    console.log('transport ', transport);
    console.log('hasil ', sumOutcome);
    console.log('gaji ', salary);

    this.setState({
      userOutcome: parseFloat(sumOutcome),
      salaryRestUser: parseFloat(restSalary)
    })
  }

  componentWillMount() {
    this.transportationResult()
  }

  componentDidMount() {
    this.finalAllResult()
  }

  render () {
    var dataPrice = this.props.foodOutcome
    var resultFood = parseFloat(dataPrice / 1000000).toFixed(3)
    return (
      <View>
        <Text>Your salary : {this.props.userSalary}</Text>
        <Text>Your Food Outcome: IDR {resultFood}.000</Text>
        <Text>Your Transportation Outcome: {this.state.transportResult}</Text>
        <Text>Your Final Outcome : {this.state.userOutcome}</Text>
        <Text>The rest of Salary  : {this.state.salaryRestUser}</Text>
        <Text>Jangan Lupa Paket Hemat dengan makan paket cost seharga IDR {this.props.foodCostPackage} dan transport paket recommended IDR {this.props.transportRecommendedPackage} </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userSalary: state.salaryReducer.salary,
    foodOutcome: state.price.foodFinal,
    userTransportMode: state.MapReducer.transportMode,
    uberTransportPrice: state.MapReducer.uberFare,
    trafiTransportPrice: state.MapReducer.trafiFare,
    foodCostPackage: state.salaryReducer.foodCostPackage,
    transportRecommendedPackage: state.MapReducer.transportRecommendedPackage
  }
}

export default connect(mapStateToProps, null)(FinalResult)
