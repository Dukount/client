import React, { Component } from 'react'
import { 
  View,
  Text,
  Picker,
  Button 
} from "react-native"
import { connect } from "react-redux"

import { getBreakfast } from "../actions/foodAction";
import { getLunch } from "../actions/foodAction";
import { getDinner } from "../actions/foodAction";

class FoodResult extends Component {
  constructor() {
    super()
    this.state = {
      breakfast: 'cost',
      lunch: 'cost',
      dinner: 'cost',
      breakfastResult: '',
      lunchResult: '',
      dinnerResult: ''
    }
  }

  getResult () {
    let location = 'tangerang'
    let breakfastSort = this.state.breakfast
    let lunchSort = this.state.lunch
    let dinnerSort = this.state.dinner
    let snackSort = this.state.snack
    let queryBreakfast = 'q=' + location + '&sort=' + breakfastSort + '&order=asc'
    let queryLunch = 'q=' + location + '&cuisines=114%2C235&sort=' + lunchSort + '&order=asc'
    let queryDinner = 'q=' + location + '&cuisines=168%2C40%2C181&sort=' + dinnerSort + '&order=asc'
    let querySnack = 'q=' + location + '&cuisines=270&sort=' + snackSort + '&order=asc'
    console.log('query======= ',queryBreakfast)
    this.props.sortDataBreakfast(queryBreakfast)
    this.props.sortDataLunch(queryLunch)
    this.props.sortDataDinner(queryDinner)
  }

  render () {
    console.log('sarapan ',this.props.breakfastPrice)
    console.log('siang ',this.props.lunchPrice)
    console.log('malem ',this.props.dinnerPrice)
    return (
      <View>
        <View>
          <Text>Breakfast:</Text>
          <Picker 
          selectedValue={this.state.breakfast}
          onValueChange={(itemValue, itemIndex) => this.setState({breakfast:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' />
          <Picker.Item label='Rating' value='rating' />
          </Picker>
        </View>
        <View>
          <Text>Lunch:</Text>
          <Picker 
          selectedValue={this.state.lunch}
          onValueChange={(itemValue, itemIndex) => this.setState({lunch:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' />
          <Picker.Item label='Rating' value='rating' />
          </Picker>
        </View>
        <View>
          <Text>Dinner:</Text>
          <Picker 
          selectedValue={this.state.dinner}
          onValueChange={(itemValue, itemIndex) => this.setState({dinner:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' />
          <Picker.Item label='Rating' value='rating' />
          </Picker>
        </View>
        <Button onPress={() => this.getResult()} title='Submit'/>
      </View>
    )
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortDataBreakfast: (data) => dispatch(getBreakfast(data)),
    sortDataLunch: (data) => dispatch(getLunch(data)),
    sortDataDinner: (data) => dispatch(getDinner(data))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    breakfastPrice: state.price.breakfastResult,
    lunchPrice: state.price.lunchResult,
    dinnerPrice: state.price.dinnerResult
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodResult)