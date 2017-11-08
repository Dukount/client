import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Linking,
  ScrollView,
  Button
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
    return (firstTrafiFare * 2 * this.props.calendarWorkDay.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  stringConverter(string) {
    if (string !== null) {
      return (string).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    } else {
      return 'You miss something to submit'
    }
  }

  numberConverter(number) {
    if (number !== null) {
      return (number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    } else {
      return 'You miss something to submit'
    }
  }

  foodCostGenerator(foodCost) {
    if (foodCost !== null) {
      return foodCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    } else {
      return 'Zomato API Request exceeded the maximum limit'
    }
  }

  adviseGenerator() {
    if (Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100) < 50) {
      return (
        <View style={{width: 320, alignSelf: 'center', marginTop: 10}}>
        <Text style={{fontSize: 14, textAlign: 'center'}}>Your Total Outcome is {Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100)} % of your Salary therefore you could save 20% of your salary's left for saving which is about IDR {(Math.round(((+this.state.salaryRestUser) * 20)/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginTop: 10, fontStyle: 'italic'}}>Consider to spend your money for shopping or traveling, check this: </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View>
          <TouchableHighlight onPress={() => Linking.openURL('https://www.tokopedia.com')}>
            <Image source={require('../assets/img/logo-tokopedia.png')} style={{height: 20, width: 80, marginRight: 10}} />
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.bukalapak.com')}>
          <Image source={require('../assets/img/Logo-Bukalapak.png')} style={{height: 20, width: 80}} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.traveloka.com')}>
          <Image source={require('../assets/img/Traveloka_Primary_Logo-1.png')} style={{height: 20, width: 80}} />
        </TouchableHighlight>
        </View>
        </View>
      )
    } else if ((Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100) > 50 && Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100) < 75) || Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100) == 50) {
      return (
        <View style={{width: 320, alignSelf: 'center', marginTop: 10}}>
        <Text style={{fontSize: 14, textAlign: 'center'}}>Your Total Outcome is {Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100)} % of your Salary therefore you could save 10% of your salary's left for saving which is about IDR {(Math.round(((+this.state.salaryRestUser) * 10)/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      )
    } else if (Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100) > 75) {
      return (
        <View style={{width: 320, alignSelf: 'center', marginTop: 10}}>
        <Text style={{fontSize: 14, textAlign: 'center'}}>It looks like you spend {Math.round(((this.props.foodOutcome + (+this.state.transportResult))/this.props.userSalary) * 100)} % of your salary for food and transportation</Text>
        <Text style={{fontSize: 14, textAlign: 'center'}}>Seriously, you should find a new job with good salary or maybe a side job that suit with your primary job. Find your job here: </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View>
          <TouchableHighlight onPress={() => Linking.openURL('https://www.glassdoor.com')}>
            <Image source={require('../assets/img/Glassdoor_logo.png')} style={{height: 20, width: 90, marginRight: 10}} />
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.jobstreet.com')}>
          <Image source={require('../assets/img/jobstreet-logo.png')} style={{height: 20, width: 90}} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.upwork.com')}>
          <Image source={require('../assets/img/Upwork-logo.svg.png')} style={{height: 20, width: 80}} />
        </TouchableHighlight>
        </View>
        <Text>You could take Cost Package for Food, only IDR {this.numberConverter(this.props.foodCostPackage)} and Recommended Package for Transportation, only IDR {this.cheapestTransportFare(this.props.firstTrafiFare)} to balance your income and outcome</Text>
        </View>
      )
    }
  }

  workDayCounter(workCalendar) {
    if (this.props.calendarWorkDay.length === 1) {
      return (
        <Text>Workdays: {this.props.calendarWorkDay.length} day / month</Text>
      )
    } else if (this.props.calendarWorkDay.length > 1) {
      return (
        <Text>Workdays: {this.props.calendarWorkDay.length} days / month</Text>
      )
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
        right: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 30,
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

    const {goBack, navigate} = this.props.navigation;
    return (
    <ScrollView>
    <View>
      <View>
        <View style={{height: 40, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
          <View style={{position: 'relative', justifyContent: 'center', flex: 1}}>
          <TouchableHighlight onPress={() => goBack()}>
            <Image source={require('../assets/img/arrow-point-to-right.png')} style={{height: 30, width: 30, alignItems: 'center'}}/>
          </TouchableHighlight>
          </View>
          <View style={{height: 30, width: 360, alignItems: 'center', alignSelf: 'center', position: 'absolute'}}>
            <Image source={require('../assets/img/logo_small_white.png')} style={{height: 30, width: 130}} />
          </View>
        </View>
      </View>
      <View>
      <View style={{backgroundColor: '#1d81e5', width: 300, height: 40, alignSelf: 'center', borderRadius: 5, marginTop: 20}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 3, fontSize: 24}}>Results</Text>
      </View>
      <View style={{width: 320, backgroundColor: '#1d81e5', alignSelf: 'center', height: 50, marginTop: 20, padding: 5}}>
        <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Your Salary</Text>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.stringConverter(this.props.userSalary)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{width: 160, backgroundColor: '#325495', alignSelf: 'center', height: 50, padding: 5}}>
          <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Food Outcome</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.foodCostGenerator(this.props.foodOutcome)}</Text>
        </View>
        <View style={{width: 160, backgroundColor: '#57A42D', alignSelf: 'center', height: 50, padding: 5}}>
          <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Transportation Outcome</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.stringConverter(this.state.transportResult)}</Text>
        </View>
      </View>
      <View style={{width: 320, backgroundColor: '#28A48E', alignSelf: 'center', height: 50, padding: 5}}>
        <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Your Final Outcome</Text>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR{this.numberConverter(this.state.userOutcome)}</Text>
      </View>
      <View style={{width: 320, borderColor: '#1d81e5', borderWidth: 1, alignSelf: 'center', height: 50, padding: 5}}>
        <Text style={{textAlign: 'center', color: '#1d81e5', fontStyle: 'italic', fontSize: 12}}>Salaries left</Text>
        <Text style={{textAlign: 'center', color: '#1d81e5', fontWeight: 'bold', fontSize: 18, fontStyle: 'italic'}}>IDR {this.numberConverter(this.state.salaryRestUser)}</Text>
      </View>
      <View>{this.workDayCounter()}</View>
      <View>{this.adviseGenerator()}</View>
        <View>
          <Pie
            data={data}
            options={options}
            accessorKey="population" />
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: -30, marginBottom: 10}}>
          <View style={{backgroundColor: '#57A8F8', width: 80}}><Text style={{textAlign: 'center', color: 'white', padding: 5, fontWeight: 'bold', fontSize: 9}}>Food</Text></View>
          <View style={{backgroundColor: '#3c89bc', width: 80, marginLeft: 2, marginRight: 2}}><Text style={{textAlign: 'center', color: 'white', padding: 5, fontWeight: 'bold', fontSize: 9}}>Transportation</Text></View>
          <View style={{backgroundColor: '#2980B9', width: 80}}><Text style={{textAlign: 'center', color: 'white', padding: 5, fontWeight: 'bold', fontSize: 9}}>Money Left</Text></View>
        </View>
        <View>
        <Button
        title="Save"
        onPress={() => navigate('SavedList')}
        />
        </View>
      </View>
    </View>
    </ScrollView>
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
