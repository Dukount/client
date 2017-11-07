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
       return (<Text style={{textAlign: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white', fontSize: 16, fontStyle: 'italic'}}>IDR {sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} (per-month)</Text>)
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
      <View style={{width: 320, backgroundColor: '#1d81e5', alignSelf: 'center', height: 60, marginTop: 10, height: 70, borderRadius: 5}}>
      <View style={{justifyContent: 'center', padding: 10}}>
      <Text style={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold'}}>Total Food Outcome</Text>
        {
          this.resultOutcome()
        }
      </View>
      </View>
      <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#1d81e5', marginTop: 20}}>Food at work:</Text>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5}}>
        <Image source={require('../assets/img/two-bread-toasts.png')} style={{height: 30, width: 30}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Breakfast: IDR {(this.props.breakfastPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5, margin: 2}}>
        <Image source={require('../assets/img/roast-turkey.png')} style={{height: 30, width: 30, marginRight: 2}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Lunch: IDR {(this.props.lunchPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5}}>
        <Image source={require('../assets/img/dinner.png')} style={{height: 30, width: 30, marginRight: 2}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Dinner: IDR {(this.props.dinnerPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
      <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#1d81e5', marginTop: 20}}>Food at home:</Text>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5}}>
        <Image source={require('../assets/img/two-bread-toasts.png')} style={{height: 30, width: 30}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Breakfast: IDR {(this.props.breakfastPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5, margin: 2}}>
        <Image source={require('../assets/img/roast-turkey.png')} style={{height: 30, width: 30, marginRight: 2, margin: 2}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Lunch: IDR {(this.props.lunchPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
      <View style={{width: 280, borderColor: '#1d81e5', borderWidth: 1.5, borderRadius: 5, height: 40, alignSelf: 'center', flexDirection: 'row', padding: 5}}>
        <Image source={require('../assets/img/dinner.png')} style={{height: 30, width: 30, marginRight: 2}} />
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>Dinner: IDR {(this.props.dinnerPriceHome).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        <Text style={{padding: 5, color: '#1d81e5', fontStyle: 'italic'}}>(per-day)</Text>
      </View>
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
