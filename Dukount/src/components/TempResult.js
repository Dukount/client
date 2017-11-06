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
  sendResultData,
  send_food_cost
} from "../actions/foodAction";
import {
  fetch_trafi_route,
  fetch_uber_fare,
  trafi_label_index,
  post_trafi_fare,
  post_uber_fare,
  post_uber_duration,
  post_uber_type
} from '../actions/MapAction'


class TempResult extends Component {
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
      TransportMode: true,
      trafiLabel: [],
      trafiLabelTotalFare: [],
      selectedTrafiLabel: '',
      trafiSuggestionPrice: '-',
      uberLabel: ['uberMotor','uberPOOL','uberX','uberXL','uberBLACK'],
      selectedUberLabel: '',
      uberSuggestionPrice: '-'
    }
  }

  getResult () {
    let workLocation = this.props.addressTo[4]
    let homeLocation = this.props.addressFrom[4]
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
       return (<Text style={styles.resultFont}>IDR {resultFoodFinal}.000</Text>)
       this.props.foodCost(sumPrice)
    }else {
      return (<Text style={styles.nullFont}>-</Text>)
    }
  }

  fetchTrafiRouteMethod() {
    let payload = {
      latitudeFrom: this.props.latitudeFrom,
      longitudeFrom: this.props.longitudeFrom,
      latitudeTo: this.props.latitudeTo,
      longitudeTo: this.props.longitudeTo
    }
    this.props.fetchTrafiRoute(payload)
  }

  fetchUberFareMethod() {
  let payload = {
      latitudeFrom: this.props.latitudeFrom,
      longitudeFrom: this.props.longitudeFrom,
      latitudeTo: this.props.latitudeTo,
      longitudeTo: this.props.longitudeTo
    }
    this.props.fetchUberFare(payload)
  }

  checkFoodTransportation() {
    this.getResult()
    this.trafiSuggestionsLabel()
    this.trafiSuggestionsFare()
    this.transportInfoSummary()
    this.postLabelIndex()
  }

  checkFoodUber() {
    this.getResult()
    this.uberSuggestionsFare()
  }

  validateCheckPrice() {
    if (this.state.TransportMode === true) {
      this.checkFoodTransportation()
    } else if (this.state.TransportMode === false){
      this.checkFoodUber()
    }
  }

  validatePicker() {
    if (this.state.TransportMode === true) {
      return (
        <View>
          <Picker
          style={{width: 100}}
          mode="dropdown"
          selectedValue={this.state.selectedTrafiLabel}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedTrafiLabel:
          itemValue})}>
          {this.state.trafiLabel.map((item, index) => {
            return (
              <Item label={item} value={index} key={index}/>
            )
          })}
          </Picker>
        </View>
      )
    } else if (this.state.TransportMode === false){
      return (
        <View>
          <Picker
          style={{width: 100}}
          mode="dropdown"
          selectedValue={this.state.selectedUberLabel}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedUberLabel:
          itemValue})}>
          {this.state.uberLabel.map((item, index) => {
            return (
              <Item label={item} value={index} key={index}/>
            )
          })}
          </Picker>
        </View>
      )
    }
  }

  validateTransportationSummary() {
    if (this.state.TransportMode === true) {
      const { navigate } =   this.props.navigation
      return (
        <TouchableHighlight onPress={() => navigate('PublicTransport')}>
          <View style={styles.transportCard}>
            <Image source={require('../assets/img/transport.png')} style={styles.transportIcon}/>
            <View style={styles.transportCardContent}>
              <Text style={styles.cardHeader}>Transport Outcome</Text>
              <Text style={styles.nullFont}>IDR {this.checkerTrafiSuggestionsPrice()}</Text>
              <Text style={styles.perMonthFont}>(per month)</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    } else if (this.state.TransportMode === false) {
      const { navigate } =   this.props.navigation
      return (
        <TouchableHighlight onPress={() => navigate('UberTransport')}>
          <View style={styles.transportCard}>
            <Image source={require('../assets/img/transport.png')} style={styles.transportIcon}/>
            <View style={styles.transportCardContent}>
              <Text style={styles.cardHeader}>Uber Outcome</Text>
              <Text style={styles.nullFont}>IDR {this.state.uberSuggestionsFare}</Text>
              <Text style={styles.perMonthFont}>(per month)</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  }

  componentDidMount() {
    this.fetchTrafiRouteMethod()
    this.fetchUberFareMethod()
  }

  trafiSuggestionsLabel() {
    let label = this.props.trafiSuggestions.map(suggestion => {
      return suggestion.PreferenceLabel
    })
    this.setState({
      trafiLabel: label
    })
  }

  trafiSuggestionsFare() {
    let Transports = []
    let farePerLabel = []
    let transport = []
    let fare = 0
    let fareSuggestion = this.props.trafiSuggestions.map(suggestion => {
      suggestion.RouteSegments.map(segment => {
        if (segment.Transport === null) {
          fare += 0
        } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('TransJakarta') !== -1 && transport.indexOf('TransJakarta') === -1) {
          transport.push('TransJakarta')
          fare += 3500
        } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('KRL') !== -1 && transport.indexOf('KRL') === -1) {
          transport.push('KRL')
          fare += 4000
        } else if (segment.Transport !== null && segment.Transport.Name.split(' ').indexOf('KRL') === -1 && segment.Transport.Name.split(' ').indexOf('TransJakarta') === -1) {
          transport.push(segment.Transport.Name)
          fare += 4000
        }
      })
      Transports.push(transport)
      farePerLabel.push(fare)
      transport=[]
      fare = 0
    })
    this.setState({
      trafiLabelTotalFare: farePerLabel
    })
  }

  transportInfoSummary() {
    if (this.state.selectedTrafiLabel === '') {
      console.log(this.state.trafiLabelTotalFare[0] * 2 * this.props.calendarWorkDay.length)
      this.setState({
        trafiSuggestionPrice: `${this.state.trafiLabelTotalFare[0] * 2 * this.props.calendarWorkDay.length}`
      })
      // return ((this.state.trafiLabelTotalFare[0] * 2 * this.props.calendarWorkDay.length)/1000).toFixed(3)
    } else {
      this.setState({
        trafiSuggestionPrice: `${this.state.trafiLabelTotalFare[this.state.selectedTrafiLabel] * 2 * this.props.calendarWorkDay.length}`
      })
      // return ((this.state.trafiLabelTotalFare[this.state.selectedTrafiLabel] * 2 * this.props.calendarWorkDay.length)/1000).toFixed(3)
    }
  }

  checkerTrafiSuggestionsPrice() {
    if (this.state.trafiSuggestionPrice === '-') {
      return '-'
    } else if (isNaN(this.state.trafiSuggestionPrice) === true) {
      this.props.postTrafiFare(`${this.state.trafiLabelTotalFare[0] * 2 * this.props.calendarWorkDay.length}`)
      return `${this.state.trafiLabelTotalFare[0] * 2 * this.props.calendarWorkDay.length}`
    } else if (isNaN(this.state.trafiSuggestionPrice) === false) {
      this.props.postTrafiFare(this.state.trafiSuggestionPrice)
      return this.state.trafiSuggestionPrice
    }
  }

  postLabelIndex() {
  let payload = {
      index: this.state.selectedTrafiLabel === '' ? 0 : this.state.selectedTrafiLabel
    }
    this.props.postLabelIndex(payload)
  }

  uberSuggestionsFare() {
    console.log(this.props.uberSuggestions)
    if (this.state.selectedUberLabel === '' || this.state.selectedUberLabel === 0) {
      this.setState({
        uberSuggestionsFare: Math.round((this.props.uberSuggestions[0].high_estimate + this.props.uberSuggestions[0].low_estimate)/2) * 2 * this.props.calendarWorkDay.length
      })
      this.props.postUberFare(`${Math.round((this.props.uberSuggestions[0].high_estimate + this.props.uberSuggestions[0].low_estimate)/2) * 2 * this.props.calendarWorkDay.length}`)
      this.props.postUberType(`${this.props.uberSuggestions[0].display_name}`)
      this.props.postUberDuration(`${Math.round(this.props.uberSuggestions[0].duration/60)}`)
    } else if (this.state.selectedUberLabel === 1) {
      this.setState({
        uberSuggestionsFare: Math.round((this.props.uberSuggestions[1].high_estimate + this.props.uberSuggestions[1].low_estimate)/2) * 2 * this.props.calendarWorkDay.length
      })
      this.props.postUberFare(`${Math.round((this.props.uberSuggestions[1].high_estimate + this.props.uberSuggestions[1].low_estimate)/2) * 2 * this.props.calendarWorkDay.length}`)
      this.props.postUberType(`${this.props.uberSuggestions[1].display_name}`)
      this.props.postUberDuration(`${Math.round(this.props.uberSuggestions[1].duration/60)}`)
    } else if (this.state.selectedUberLabel === 2) {
      this.setState({
        uberSuggestionsFare: Math.round((this.props.uberSuggestions[2].high_estimate + this.props.uberSuggestions[2].low_estimate)/2) * 2 * this.props.calendarWorkDay.length
      })
      this.props.postUberFare(`${Math.round((this.props.uberSuggestions[2].high_estimate + this.props.uberSuggestions[2].low_estimate)/2) * 2 * this.props.calendarWorkDay.length}`)
      this.props.postUberType(`${this.props.uberSuggestions[2].display_name}`)
      this.props.postUberDuration(`${Math.round(this.props.uberSuggestions[2].duration/60)}`)
    } else if (this.state.selectedUberLabel === 3) {
      this.setState({
        uberSuggestionsFare: Math.round((this.props.uberSuggestions[3].high_estimate + this.props.uberSuggestions[3].low_estimate)/2) * 2 * this.props.calendarWorkDay.length
      })
      this.props.postUberFare(`${Math.round((this.props.uberSuggestions[3].high_estimate + this.props.uberSuggestions[3].low_estimate)/2) * 2 * this.props.calendarWorkDay.length}`)
      this.props.postUberType(`${this.props.uberSuggestions[3].display_name}`)
      this.props.postUberDuration(`${Math.round(this.props.uberSuggestions[3].duration/60)}`)
    } else if (this.state.selectedUberLabel === 4) {
      this.setState({
        uberSuggestionsFare: Math.round((this.props.uberSuggestions[4].high_estimate + this.props.uberSuggestions[4].low_estimate)/2) * 2 * this.props.calendarWorkDay.length
      })
      this.props.postUberFare(`${Math.round((this.props.uberSuggestions[4].high_estimate + this.props.uberSuggestions[4].low_estimate)/2) * 2 * this.props.calendarWorkDay.length}`)
      this.props.postUberType(`${this.props.uberSuggestions[4].display_name}`)
      this.props.postUberDuration(`${Math.round(this.props.uberSuggestions[4].duration/60)}`)
    }
  }


  render () {
    console.log('ini state ', this.state.foodPriceResult);
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
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
        <View style={styles.picker}>
          <View style={{width: 240}}>
            <Text style={styles.pickerLabel}>Transport:</Text>
          </View>
          {this.validatePicker()}
        </View>
        <View>
        <View style={{width: 240}}>
          <Text style={styles.pickerLabel}>Transport Mode:</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Button
            title="Public Transport"
            onPress={() => {
              this.setState({
                TransportMode: true
              })
            }}
          />
          <Button
            title="Onlyne Transport"
            onPress={() => {
              this.setState({
                TransportMode: false
              })
            }}
          />
        </View>
        </View>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <TouchableOpacity onPress={() => this.validateCheckPrice()}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Check Price</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
          <Button onPress={() => navigate('FinalResult')} title='RESULT' />
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
        {this.validateTransportationSummary()}
        </View>
      </View>
      </ScrollView>
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
    resultSumPrice: (data) => dispatch(sendResultData(data)),
    fetchTrafiRoute: (payload) => dispatch(fetch_trafi_route(payload)),
    fetchUberFare: (payload) => dispatch(fetch_uber_fare(payload)),
    postLabelIndex: (payload) => dispatch(trafi_label_index(payload)),
    postTrafiFare: (payload) => dispatch(post_trafi_fare(payload)),
    postUberFare: (payload) => dispatch(post_uber_fare(payload)),
    postUberType: (payload) => dispatch(post_uber_type(payload)),
    postUberDuration: (payload) => dispatch(post_uber_duration(payload)),
    foodCost: (payload) => dispatch(send_food_cost(payload))
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
    calendarWorkDay: state.price.workCalendar,
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo,
    trafiSuggestions: state.MapReducer.suggestions,
    uberSuggestions: state.MapReducer.uberSuggestions,
    userSalary: state.salaryReducer.salary
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
    marginBottom: 1,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F4FF81'
  },
  nullFont: {
    marginTop: 15,
    fontSize: 24,
    color: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TempResult)
