import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Pie } from 'react-native-pathjs-charts'

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
      userOutcome: sumOutcome,
      salaryRestUser: restSalary
    })
  }

  cheapestTransportFare(firstTrafiFare) {
    return (firstTrafiFare * 2 * this.props.calendarWorkDay.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  stringConverter(string) {
    if (string !== null) {
      return (string).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return 'You miss something to submit'
    }
  }

  numberConverter(number) {
    if (number !== null) {
      return (number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return 'You miss something to submit'
    }
  }

  foodCostGenerator(foodCost) {
    if (foodCost !== null) {
      return foodCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return 'Zomato API Request exceeded the maximum limit'
    }
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
    var transport = parseFloat(this.state.transportResult)
    var sum = dataPrice + transport
    var salaryData = this.props.userSalary
    var money = (+salaryData) - sum

    let data = [{
      "name": "Food",
      "population": dataPrice
    }, {
      "name": "Transport",
      "population": transport
    }, {
      "name": "Money Left",
      "population": money
    }]

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View>
      <Text>Your salary : {this.stringConverter(this.props.userSalary)}</Text>
      <Text>Your Food Outcome: IDR {this.foodCostGenerator(this.props.foodOutcome)}</Text>
      <Text>Your Transportation Outcome: {this.stringConverter(this.state.transportResult)}</Text>
      <Text>Your Final Outcome : {this.numberConverter(this.state.userOutcome)}</Text>
      <Text>The rest of Salary  : {this.numberConverter(this.state.salaryRestUser)}</Text>
      <Text>Jangan Lupa Paket Hemat dengan makan paket cost seharga IDR {this.props.foodCostPackage} dan transport paket recommended IDR {this.cheapestTransportFare(this.props.firstTrafiFare)} </Text>
        <View>
          <Pie
            data={data}
            options={options}
            accessorKey="population" />
        </View>
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
    firstTrafiFare: state.MapReducer.firstTrafiFare,
    calendarWorkDay: state.price.workCalendar
  }
}

export default connect(mapStateToProps, null)(FinalResult)
