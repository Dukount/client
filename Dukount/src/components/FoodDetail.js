import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

class FoodDetail extends Component {
  static navigationOptions = {
    title: 'FoodDetailScreen'
  }
  constructor() {
    super()
    this.state = {
      activityDay: 20,
      homeday: 10
    }
  }

  resultOutcome () {
    const sumFoodOutcome = this.props.breakfastPrice[0] + this.props.lunchPrice[0] + this.props.dinnerPrice[0]
    const sumFoodOutcomeResult = sumFoodOutcome * this.state.activityDay

    const sumFoodOutcomeHome = this.props.breakfastPriceHome[0] + this.props.lunchPriceHome[0] + this.props.dinnerPriceHome[0]
    const sumFoodOutcomeResultHome =  sumFoodOutcomeHome * this.state.homeday

    const sumPrice = sumFoodOutcomeResult + sumFoodOutcomeResultHome
    const resultFoodFinal = parseFloat(sumPrice / 1000000).toFixed(3)
    if(resultFoodFinal && isNaN(resultFoodFinal) === false) {
       return (<Text>Rp {resultFoodFinal}.000</Text>)
    }else {
      return (<Text>-</Text>)
    }
  }

  render() {
    console.log('wkwkwkwkwk ', this.props.resultAllFinal)
    return (
      <View>
      <Text>Result Final:</Text>
      {
        this.resultOutcome()
      }
      <Text>Food at work:</Text>
      <Text>Breakfast: Rp {parseFloat(this.props.breakfastPrice / 1000).toFixed(3)}</Text>
      <Text>Lunch: Rp {parseFloat(this.props.lunchPrice / 1000).toFixed(3)}</Text>
      <Text>Dinner: Rp {parseFloat(this.props.dinnerPrice / 1000).toFixed(3)}</Text>
      <Text>Food at home:</Text>
      <Text>Breakfast: Rp {parseFloat(this.props.breakfastPriceHome / 1000).toFixed(3)}</Text>
      <Text>Lunch: Rp {parseFloat(this.props.lunchPriceHome / 1000).toFixed(3)}</Text>
      <Text>Dinner: Rp {parseFloat(this.props.dinnerPriceHome / 1000).toFixed(3)}</Text>
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
    resultAllFinal: state.price.resultFinal
  }
}

export default connect(mapStateToProps, null)(FoodDetail)
