import React, { Component } from 'react'
import { 
  View,
  Text,
  Picker,
  Button,
  TouchableOpacity 
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
    let location = 'Tebet'
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
      <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'left', width: 100, height: 50}}>
          <Text>Breakfast:</Text>
          <Picker
          style={{width: 100}} 
          selectedValue={this.state.breakfast}
          onValueChange={(itemValue, itemIndex) => this.setState({breakfast:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' color='#57A8F8'/>
          <Picker.Item label='Rating' value='rating' color='#57A8F8'/>
          </Picker>
        </View >
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>Lunch:</Text>
          <Picker
          style={{width: 100}}  
          selectedValue={this.state.lunch}
          onValueChange={(itemValue, itemIndex) => this.setState({lunch:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' color='#57A8F8'/>
          <Picker.Item label='Rating' value='rating' color='#57A8F8'/>
          </Picker>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 50}}>
          <Text>Dinner:</Text>
          <Picker
          style={{width: 100}}  
          selectedValue={this.state.dinner}
          onValueChange={(itemValue, itemIndex) => this.setState({dinner:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' color='#57A8F8'/>
          <Picker.Item label='Rating' value='rating' color='#57A8F8'/>
          </Picker>
        </View>
        <View style={{marginBottom: 120}}>
        <TouchableOpacity onPress={() => this.getResult()}>
        <View style={{backgroundColor:'#57A8F8', width:150, height:30, alignSelf:'center', padding: 5, alignItems: 'center', borderRadius: 5}}>
          <Text style={{color:'white', fontWeight: 'bold'}}>Submit</Text>
        </View>
        </TouchableOpacity>
        </View>
        <View style={{marginBottom: 200}}>
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