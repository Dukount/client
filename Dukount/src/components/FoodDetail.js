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
  Item,
  StyleSheet,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

class FoodDetail extends Component {
  static navigationOptions = {
    title: 'FoodDetailScreen'
  }
  constructor() {
    super()
  }

  resultOutcome () {
    const dayWork = this.props.calendarWorkDay.length
    const dayHome = 30 - dayWork
    const sumFoodOutcome = this.props.breakfastPrice[0] + this.props.lunchPrice[0] + this.props.dinnerPrice[0]
    const sumFoodOutcomeResult = sumFoodOutcome * dayWork

    const sumFoodOutcomeHome = this.props.breakfastPriceHome[0] + this.props.lunchPriceHome[0] + this.props.dinnerPriceHome[0]
    const sumFoodOutcomeResultHome =  sumFoodOutcomeHome * dayHome

    const sumPrice = sumFoodOutcomeResult + sumFoodOutcomeResultHome
    console.log('ini sumPrice ', sumPrice)
    if(sumPrice && isNaN(sumPrice) === false) {
       return (<Text>IDR {sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>)
    }else {
      return (<Text>-</Text>)
    }
  }

  render() {
    const { goBack, navigate } = this.props.navigation
    return (
      <View>
      <View>
      <View style={{height: 40, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
      <View style={{position: 'relative', justifyContent: 'center'}}>
      <TouchableHighlight onPress={() => goBack()}>
        <Image source={require('../assets/img/arrow-point-to-right.png')} style={{height: 30, width: 30, alignItems: 'center'}}/>
      </TouchableHighlight>
      </View>
      <View style={{height: 30, width: 360, alignItems: 'center', alignSelf: 'center', position: 'absolute'}}>
        <Image source={require('../assets/img/logo_small_white.png')} style={{height: 30, width: 130}} />
      </View>
      </View>
      </View>
      <Text>Result Final:</Text>
      {
        this.resultOutcome()
      }
      <Text>Food at work:</Text>
      <Text>Breakfast: IDR {(this.props.breakfastPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      <Text>Lunch: IDR {(this.props.lunchPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      <Text>Dinner: IDR {(this.props.dinnerPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      <Text>Food at home:</Text>
      <Text>Breakfast: IDR {(this.props.breakfastPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      <Text>Lunch: IDR {(this.props.lunchPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      <Text>Dinner: IDR {(this.props.dinnerPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      </View>
    );
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
    resultAllFinal: state.price.resultFinal,
    calendarWorkDay: state.price.workCalendar
  }
}

export default connect(mapStateToProps, null)(FoodDetail)
