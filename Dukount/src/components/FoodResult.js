import React, { Component } from 'react'
import {
  View,
  Text,
  Picker,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
  StyleSheet
} from "react-native"
import { connect } from "react-redux"
import { StackNavigator } from 'react-navigation'

import {
  getBreakfast,
  getLunch,
  getDinner,
  getBreakfastHome,
  getLunchHome,
  getDinnerHome,
  sendResultData
} from "../actions/foodAction";


class FoodResult extends Component {
  static navigationOptions = {
    title: 'FoodResultScreen'
  }
  constructor() {
    super()
    this.state = {
      breakfast: 'cost',
      lunch: 'cost',
      dinner: 'cost',
      breakfastResult: '',
      lunchResult: '',
      dinnerResult: '',
      activityDay: 20,
      homeday: 10
    }
  }

  getResult () {
    let workLocation = 'Sudirman'
    let homeLocation = 'Tangerang'
    let breakfastSort = this.state.breakfast
    let lunchSort = this.state.lunch
    let dinnerSort = this.state.dinner

    let queryBreakfast = 'q=' + workLocation + '&cuisines=114&sort=' + breakfastSort + '&order=asc'
    let queryLunch = 'q=' + workLocation + '&cuisines=114%2C235&sort=' + lunchSort + '&order=asc'
    let queryDinner = 'q=' + workLocation + '&cuisines=168%2C40%2C181&sort=' + dinnerSort + '&order=asc'

    let queryBreakfastHome = 'q=' + homeLocation + '&cuisines=114&sort=' + breakfastSort + '&order=asc'
    let queryLunchHome = 'q=' + homeLocation + '&cuisines=114%2C235&sort=' + lunchSort + '&order=asc'
    let queryDinnerHome = 'q=' + homeLocation + '&cuisines=168%2C40%2C181&sort=' + dinnerSort + '&order=asc'

    this.props.sortDataBreakfast(queryBreakfast)
    this.props.sortDataLunch(queryLunch)
    this.props.sortDataDinner(queryDinner)
    this.props.sortDataBreakfastAtHome(queryBreakfastHome)
    this.props.sortDataLunchAtHome(queryLunchHome)
    this.props.sortDataDinnerAtHome(queryDinnerHome)
  }

  resultOutcome () {
    const dayWork = this.props.calendarWorkDay.length
    const dayHome = 30 - dayWork
    const sumFoodOutcome = this.props.breakfastPrice[0] + this.props.lunchPrice[0] + this.props.dinnerPrice[0]
    const sumFoodOutcomeResult = sumFoodOutcome * dayWork

    const sumFoodOutcomeHome = this.props.breakfastPriceHome[0] + this.props.lunchPriceHome[0] + this.props.dinnerPriceHome[0]
    const sumFoodOutcomeResultHome =  sumFoodOutcomeHome * dayHome

    const sumPrice = sumFoodOutcomeResult + sumFoodOutcomeResultHome
    const resultFoodFinal = parseFloat(sumPrice / 1000000).toFixed(3)
    if(resultFoodFinal && isNaN(resultFoodFinal) === false) {
       return (<Text style={styles.resultFont}>Rp {resultFoodFinal}.000</Text>)
    }else {
      return (<Text style={styles.nullFont}>-</Text>)
    }
  }


  render () {
    console.log("ini ganang ", this.props.calendarWorkDay);
    const { navigate } =   this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.picker}>
          <View style={{width: 240}}>
            <Text style={styles.pickerLabel}>Breakfast:</Text>
          </View>
          <View>
            <Picker
            style={{width: 100}}
            selectedValue={this.state.breakfast}
            onValueChange={(itemValue, itemIndex) => this.setState({breakfast:
            itemValue})}>
            <Picker.Item label='Cost' value='cost' color='#1d81e5'/>
            <Picker.Item label='Rating' value='rating' color='#1d81e5'/>
            </Picker>
          </View>
        </View>
        <View style={styles.picker}>
          <View style={{width: 240}}>
            <Text style={styles.pickerLabel}>Lunch:</Text>
          </View>
          <View>
            <Picker
            style={{width: 100}}
            selectedValue={this.state.lunch}
            onValueChange={(itemValue, itemIndex) => this.setState({lunch:
            itemValue})}>
            <Picker.Item label='Cost' value='cost' color='#1d81e5'/>
            <Picker.Item label='Rating' value='rating' color='#1d81e5'/>
            </Picker>
          </View>
        </View>
        <View style={styles.picker}>
          <View style={{width: 240}}>
            <Text style={styles.pickerLabel}>Dinner:</Text>
          </View>
          <View>
            <Picker
            style={{width: 100}}
            selectedValue={this.state.dinner}
            onValueChange={(itemValue, itemIndex) => this.setState({dinner:
            itemValue})}>
            <Picker.Item label='Cost' value='cost' color='#1d81e5'/>
            <Picker.Item label='Rating' value='rating' color='#1d81e5'/>
            </Picker>
          </View>
        </View>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <TouchableOpacity onPress={() => this.getResult()}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Check Price</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableHighlight onPress={() => navigate('FoodDetailScreen')}>
        <View style={styles.foodCard}>
          <Image source={require('../assets/img/food.png')} style={styles.foodIcon}/>
          <View style={styles.foodCardContent}>
            <Text style={styles.cardHeader}>Food Outcome</Text>
            {
              this.resultOutcome()
            }
            <Text style={styles.perMonthFont}>(per month)</Text>
          </View>
        </View>
        </TouchableHighlight>
          <View style={styles.transportCard}>
            <Image source={require('../assets/img/transport.png')} style={styles.transportIcon}/>
            <View style={styles.transportCardContent}>
              <Text style={styles.cardHeader}>Transport Outcome</Text>
              <Text style={styles.nullFont}>-</Text>
              <Text style={styles.perMonthFont}>(per month)</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortDataBreakfast: (data) => dispatch(getBreakfast(data)),
    sortDataLunch: (data) => dispatch(getLunch(data)),
    sortDataDinner: (data) => dispatch(getDinner(data)),
    sortDataBreakfastAtHome: (data) => dispatch(getBreakfastHome(data)),
    sortDataLunchAtHome: (data) => dispatch(getLunchHome(data)),
    sortDataDinnerAtHome: (data) => dispatch(getDinnerHome(data)),
    resultSumPrice: (data) => dispatch(sendResultData(data))
  }
}

const mapStateToProps = (state) => {
  return {
    breakfastPrice: state.price.breakfastResult,
    lunchPrice: state.price.lunchResult,
    dinnerPrice: state.price.dinnerResult,
    breakfastPriceHome: state.price.breakfastResultHome,
    lunchPriceHome: state.price.lunchResultHome,
    dinnerPriceHome: state.price.dinnerResultHome,
    calendarWorkDay: state.price.workCalendar
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2
  },
  picker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'rgba(29, 129, 229, 0.1)',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    marginBottom: 1
  },
  pickerLabel: {
    fontWeight: 'bold',
    color: '#1d81e5',
    fontSize: 18
  },
  button: {
    backgroundColor:'#1d81e5',
    padding: 15,
    alignItems: 'center',
    borderRadius: 3,
    width: 300,
    alignSelf: 'center'
  },
  textButton: {
    color:'white',
    fontWeight: 'bold'
  },
  foodCard: {
    backgroundColor: '#57A8F8',
    alignSelf: 'center',
    height: 120,
    width: 350,
    marginBottom: 2,
    borderRadius: 4,
    flexDirection: 'row'
  },
  transportCard: {
    backgroundColor: '#1DE9B6',
    alignSelf: 'center',
    height: 120,
    width: 350,
    marginBottom: 2,
    borderRadius: 4,
    flexDirection: 'row'
  },
  foodIcon: {
    width: 58,
    height: 110,
    marginLeft: 20,
    marginTop: 5
  },
  transportIcon: {
    width: 90,
    height: 110,
    marginLeft: 17,
    marginTop: 5
  },
  foodCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 50,
    width: 150
  },
  transportCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
    width: 180
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    marginTop: 10
  },
  perMonthFont: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 11
  },
  resultFont: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4FF81'
  },
  nullFont: {
    marginTop: 15,
    fontSize: 24,
    color: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodResult)
