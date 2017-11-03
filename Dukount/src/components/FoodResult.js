import React, { Component } from 'react'
import {
  View,
  Text,
  Picker,
  Button,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native"
import { connect } from "react-redux"

import {
  getBreakfast,
  getLunch,
  getDinner,
  getBreakfastHome,
  getLunchHome,
  getDinnerHome
} from "../actions/foodAction";


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
    const sumFoodOutcome = this.props.breakfastPrice[0] + this.props.lunchPrice[0] + this.props.dinnerPrice[0]
    const sumFoodOutcomeResult = sumFoodOutcome * this.state.activityDay

    const sumFoodOutcomeHome = this.props.breakfastPriceHome[0] + this.props.lunchPriceHome[0] + this.props.dinnerPriceHome[0]
    const sumFoodOutcomeResultHome =  sumFoodOutcomeHome * this.state.homeday

    const sumPrice = sumFoodOutcomeResult + sumFoodOutcomeResultHome
    const resultFoodFinal = parseFloat(sumPrice / 1000000).toFixed(3)
    if(resultFoodFinal && isNaN(resultFoodFinal) === false) {
       return (<Text style={{marginTop: 15, fontSize: 24, fontWeight: 'bold', color: '#F4FF81'}}>Rp {resultFoodFinal}.000</Text>)
    }else {
      return (<Text style={{marginTop: 15, fontSize: 24, color: 'white'}}>-</Text>)
    }
  }

  render () {
    console.log('sarapan ',this.props.breakfastPrice)
    console.log('siang ',this.props.lunchPrice)
    console.log('malem ',this.props.dinnerPrice)
    return (
      <View style={{flexDirection: 'column', flex: 2}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'rgba(29, 129, 229, 0.1)', paddingHorizontal: 10, justifyContent: 'flex-end', marginBottom: 1}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: '#1d81e5', fontSize: 18, textAlign: 'left'}}>Breakfast:</Text>
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'rgba(29, 129, 229, 0.1)', paddingHorizontal: 10, justifyContent: 'flex-end', marginBottom: 1}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: '#1d81e5', fontSize: 18}}>Lunch:</Text>
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor:'rgba(29, 129, 229, 0.1)', paddingHorizontal: 10, justifyContent: 'flex-end'}}>
        <View style={{width: 240}}>
          <Text style={{fontWeight: 'bold', color: '#1d81e5', fontSize: 18}}>Dinner:</Text>
        </View>
          <Picker
          style={{width: 100}}
          selectedValue={this.state.dinner}
          onValueChange={(itemValue, itemIndex) => this.setState({dinner:
          itemValue})}>
          <Picker.Item label='Cost' value='cost' color='#1d81e5'/>
          <Picker.Item label='Rating' value='rating' color='#1d81e5'/>
          </Picker>
        </View>
        <View style={{marginBottom: 20}}>
        <TouchableOpacity onPress={() => this.getResult()}>
        <View style={{backgroundColor:'#1d81e5', padding: 15, alignItems: 'center', borderRadius: 3, width: 300, alignSelf: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold'}}>Check Price</Text>
        </View>
        </TouchableOpacity>
        </View>
        <View style={{marginBottom: 50}}>
        <View style={{backgroundColor: '#57A8F8', alignSelf: 'center', height: 120, width: 350, marginBottom: 2, borderRadius: 4, flexDirection: 'row'}}>
          <Image source={require('../assets/img/food.png')} style={{width: 58, height: 110, marginLeft: 20, marginTop: 5}}/>
          <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 50, width: 150}}>
          <Text style={{fontSize: 18,fontWeight: 'bold', color: 'white', fontStyle: 'italic', marginTop: 10}}>Food Outcome</Text>
          {
            this.resultOutcome()
          }
          <Text style={{color: 'white', fontStyle: 'italic', fontSize: 11}}>(per month)</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#1DE9B6', alignSelf: 'center', height: 120, width: 350, marginBottom: 2, borderRadius: 4, flexDirection: 'row'}}>
        <Image source={require('../assets/img/transport.png')} style={{width: 90, height: 110, marginLeft: 17, marginTop: 5}}/>
        <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 10, width: 180}}>
        <Text style={{fontSize: 18,fontWeight: 'bold', color: 'white', fontStyle: 'italic', marginTop: 10}}>Transport Outcome</Text>
        <Text style={{marginTop: 15, fontSize: 24, fontWeight: 'bold', color: '#F4FF81'}}>-</Text>
        <Text style={{color: 'white', fontStyle: 'italic', fontSize: 11}}>(per month)</Text>
        </View>
        </View>
        <Text>Food at work:</Text>
        <Text>Breakfast: Rp {parseFloat(this.props.breakfastPrice / 1000).toFixed(3)}</Text>
        <Text>Lunch: Rp {parseFloat(this.props.lunchPrice / 1000).toFixed(3)}</Text>
        <Text>Dinner: Rp {parseFloat(this.props.dinnerPrice / 1000).toFixed(3)}</Text>
        <Text>Food at home:</Text>
        <Text>Breakfast: Rp {parseFloat(this.props.breakfastPriceHome / 1000).toFixed(3)}</Text>
        <Text>Lunch: Rp {parseFloat(this.props.lunchPriceHome / 1000).toFixed(3)}</Text>
        <Text>Dinner: Rp {parseFloat(this.props.dinnerPriceHome / 1000).toFixed(3)}</Text>
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
    sortDataDinnerAtHome: (data) => dispatch(getDinnerHome(data))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    breakfastPrice: state.price.breakfastResult,
    lunchPrice: state.price.lunchResult,
    dinnerPrice: state.price.dinnerResult,
    breakfastPriceHome: state.price.breakfastResultHome,
    lunchPriceHome: state.price.lunchResultHome,
    dinnerPriceHome: state.price.dinnerResultHome
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodResult)
