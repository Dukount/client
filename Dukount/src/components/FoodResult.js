import React, { Component } from 'react'
import {
  View,
  Text,
  Picker,
  Button,
  TouchableOpacity,
  Dimensions
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
      dinnerResult: '',
      activityDay: 20
    }
  }

  getResult () {
    let location = 'Gandaria'
    let breakfastSort = this.state.breakfast
    let lunchSort = this.state.lunch
    let dinnerSort = this.state.dinner
    let snackSort = this.state.snack
    let queryBreakfast = 'q=' + location + '&cuisines=114&sort=' + breakfastSort + '&order=asc'
    let queryLunch = 'q=' + location + '&cuisines=114%2C235&sort=' + lunchSort + '&order=asc'
    let queryDinner = 'q=' + location + '&cuisines=168%2C40%2C181&sort=' + dinnerSort + '&order=asc'
    let querySnack = 'q=' + location + '&cuisines=270&sort=' + snackSort + '&order=asc'
    console.log('query======= ',queryBreakfast)
    this.props.sortDataBreakfast(queryBreakfast)
    this.props.sortDataLunch(queryLunch)
    this.props.sortDataDinner(queryDinner)
  }

  resultOutcome () {
    const sumFoodOutcomeResult = this.props.breakfastPrice[0] + this.props.lunchPrice[0] + this.props.dinnerPrice[0]
    const resultFoodFinal = parseFloat(sumFoodOutcomeResult / 1000000 * this.state.activityDay).toFixed(3)
    if(resultFoodFinal && isNaN(resultFoodFinal) === false) {
       return (<Text>Result Rp {resultFoodFinal}.000</Text>)
    }else {
      return (<Text>Result -</Text>)
    }
  }


  render () {
    console.log('sarapan ',this.props.breakfastPrice)
    console.log('siang ',this.props.lunchPrice)
    console.log('malem ',this.props.dinnerPrice)
    return (
      <View style={{flexDirection: 'column', flex: 2}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'#57A8F8', paddingHorizontal: 10, justifyContent: 'flex-end', marginBottom: 1}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, textAlign: 'left'}}>Breakfast:</Text>
        </View>
        <View>
          <Picker
          style={{width: 100}}
          selectedValue={this.state.breakfast}
          onValueChange={(itemValue, itemIndex) => this.setState({breakfast:
          itemValue})}>
          <Picker.Item label='Cost' value='cost'/>
          <Picker.Item label='Rating' value='rating'/>
          </Picker>
        </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'#57A8F8', paddingHorizontal: 10, justifyContent: 'flex-end', marginBottom: 1}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Lunch:</Text>
        </View>
        <View>
          <Picker
          style={{width: 100}}
          selectedValue={this.state.lunch}
          onValueChange={(itemValue, itemIndex) => this.setState({lunch:
          itemValue})}>
          <Picker.Item label='Cost' value='cost'/>
          <Picker.Item label='Rating' value='rating'/>
          </Picker>
        </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor:'#57A8F8', paddingHorizontal: 10, justifyContent: 'flex-end'}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Dinner:</Text>
        </View>
          <Picker
          style={{width: 100}}
          selectedValue={this.state.dinner}
          onValueChange={(itemValue, itemIndex) => this.setState({dinner:
          itemValue})}>
          <Picker.Item label='Cost' value='cost'/>
          <Picker.Item label='Rating' value='rating'/>
          </Picker>
        </View>
        <View style={{marginBottom: 120}}>
        <TouchableOpacity onPress={() => this.getResult()}>
        <View style={{backgroundColor:'#1d81e5', padding: 15, alignItems: 'center', borderRadius: 3, width: 300, alignSelf: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold'}}>Check Price</Text>
        </View>
        </TouchableOpacity>
        </View>
        <View style={{marginBottom: 200}}>
        <View>
        {
          this.resultOutcome()
        }
        </View>
        <Text>Breakfast: Rp {parseFloat(this.props.breakfastPrice / 1000).toFixed(3)}</Text>
        <Text>Lunch: Rp {parseFloat(this.props.lunchPrice / 1000).toFixed(3)}</Text>
        <Text>Dinner: Rp {parseFloat(this.props.dinnerPrice / 1000).toFixed(3)}</Text>
        </View>
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
