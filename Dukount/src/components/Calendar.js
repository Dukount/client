import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from "react-redux"
import Calendar from 'react-native-calendar-list'
import { StackNavigator } from 'react-navigation'
const date = new Date()


import { dateAction } from "../actions/foodAction";
import { fetch_trafi_route } from '../actions/MapAction'
const markStyle = {dayTextStyle: {color: '#C9CDCF', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#1d81e5'};
const markStyleDefault = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#C9CDCF'};


const month = new Date().getMonth()+1
const year = new Date().getFullYear()
class CalenderClass extends Component<{}>{
  static navigationOptions = {
    title: 'CalendarScreen'
  }
  constructor() {
    super()
    this.state = {
      counter: 0,
      dateSelected: [],
      dateUnselected: [],
      logDataSelected: '',
      dateNow: new Date(),
      marks: {},
      month: month,
      year: year,
      buttonDefault: false,
      buttonDelete: false
    }
  }

  convertFormatDate () {
    var dateSplit = this.state.dateNow.toString().split(" ")
    var arrFormatDate = []
    arrFormatDate.push(dateSplit[3])
    switch (dateSplit[1]) {
      case 'Jan':
        arrFormatDate.push('01')
        break
      case 'Feb':
        arrFormatDate.push('02')
        break
      case 'Mar':
        arrFormatDate.push('03')
        break
      case 'Apr':
        arrFormatDate.push('04')
        break
      case 'Mei':
        arrFormatDate.push('05')
        break
      case 'Jun':
        arrFormatDate.push('06')
        break
      case 'jul':
        arrFormatDate.push('07')
        break
      case 'Aug':
        arrFormatDate.push('08')
        break
      case 'Sep':
        arrFormatDate.push('09')
        break
      case 'Oct':
        arrFormatDate.push('10')
        break
      case 'Nov':
        arrFormatDate.push('11')
        break
      case 'Dic':
        arrFormatDate.push('12')
        break
    }
    arrFormatDate.push('01')
    return arrFormatDate.join("-")
  }
  setEventCounting(a) {
    this.dayPressed(a)
    var arrDateSelected = this.state.dateSelected
    if (arrDateSelected.length === 0) {
      arrDateSelected.push(a)
    } else {
      if (arrDateSelected.indexOf(a) === -1) {
        arrDateSelected.push(a)
      } else {
        arrDateSelected.pop ()
      }
    }
  }

  dayPressed(date){
    const newMarks = {...this.state.marks};
    if (newMarks[date] !== markStyle) {
      newMarks[date] = markStyle;
      this.setState({
        marks: newMarks,
      });
    } else {
      newMarks[date] = markStyleDefault;
      this.setState({
        marks: newMarks,
      });
    }
  }
  getDaysInMonth(year, month) {
    var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
      result.push(date.getDate() + "-" + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  clearStateUnselected () {
    this.setState({
      dateUnselected: []
    })
  }

  convertAllDate() {
    this.clearStateUnselected()
    var day = this.getDaysInMonth(this.state.year, this.state.month)
    var newMarks = {...this.state.marks};
    var arrDateSelected = this.state.dateSelected
    var arrDateUnselected = this.state.dateUnselected
    console.log('dibuat variable',arrDateUnselected);
    for (var i = 0; i < day.length; i++) {
      var dayCondition = day[i].split("-")[1]
      if (dayCondition === "mon" || dayCondition === "tue" || dayCondition === "wed" || dayCondition === "thu" || dayCondition === "fri" ) {
        var dateWorkFor = day[i].split("-")[0]
        if (dateWorkFor.length === 1) {
          newMarks[`${this.state.year}-${this.state.month}-${0+dateWorkFor}`] = markStyle;
          arrDateSelected.push(`${this.state.year}-${this.state.month}-${0+dateWorkFor}`)
          this.setState({
            marks: newMarks,
          });
        } else {
          newMarks[`${this.state.year}-${this.state.month}-${dateWorkFor}`] = markStyle;
          arrDateSelected.push(`${this.state.year}-${this.state.month}-${dateWorkFor}`)
          this.setState({
            marks: newMarks,
          });
        }
      } else if (dayCondition === "sun" || dayCondition === 'sat') {
        var dateHomeFor = day[i].split("-")[0]
        if (dateHomeFor.length === 1) {
          arrDateUnselected.push(`${this.state.year}-${this.state.month}-${0+dateHomeFor}`)
          // console.log('===================Sabtu minggu00', arrDateUnselected );
        } else {
          arrDateUnselected.push(`${this.state.year}-${this.state.month}-${dateHomeFor}`)
        }
      }
    }
    // console.log('sebelum di push ===========', this.state.dateUnselected);
  }
  clearAllDate() {
    var day = this.getDaysInMonth(this.state.year, this.state.month)
    var newMarks = {...this.state.marks};
    for (var i = 0; i < day.length; i++) {
      var dateClear = day[i].split("-")[0]
      if (dateClear.length === 1) {
        newMarks[`${this.state.year}-${this.state.month}-${0+dateClear}`] = markStyleDefault
        this.setState({
          marks: newMarks,
        });
      } else {
        newMarks[`${this.state.year}-${this.state.month}-${dateClear}`] = markStyleDefault
        this.setState({
          marks: newMarks,
        });
      }
    }
    this.clearStateSelected()
  }

  clearStateSelected() {
    this.setState({
      dateSelected: [],
    })
    this.clearStateUnselected()
    // this.homeDayDefaultScreen()
  }

  homeDayDefaultScreen () {
    var day = this.getDaysInMonth(this.state.year, this.state.month)
    var arrDateUnselected = this.state.dateUnselected
    for (var i = 0; i < day.length; i++) {
      var dateHomeDefault = day[i].split("-")[0]
      if (dateHomeDefault.length === 1) {
        arrDateUnselected.push(`${this.state.year}-${this.state.month}-${0+dateHomeDefault}`)
      } else {
        arrDateUnselected.push(`${this.state.year}-${this.state.month}-${dateHomeDefault}`)
      }
    }
  }

  submitToStore () {
    // console.log('=======Data dispatch', this.state.dateSelected);
    this.props.dateToStore(this.state.dateSelected)
  }

  jalan () {
    const { navigate } =   this.props.navigation
    navigate('TempResultScreen')
    this.submitToStore()
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

  componentDidMount() {
    this.fetchTrafiRouteMethod()
  }

  render () {
    const {goBack} = this.props.navigation;
    // console.log('====', this.state.dateSelected);
    return (
      <View>
        <View>
          <View style={{height: 50, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
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
        <Text>{date.toString().slice(0, 25)}</Text>
        <Calendar
          marks={this.state.marks}
          markStyle= {`2017-11-11`}
          startDate={this.convertFormatDate()}
          monthsCount={0}
          onDatePress={(a) => this.setEventCounting(a)}
          rowHeight={40}
          headerHeight={40} />
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginLeft: 10, marginRight: 10}}>
        <TouchableOpacity onPress={() => this.convertAllDate()} disabled = {this.state.buttonDefault}>
        <View style={{borderWidth: 2,
        borderColor:'#1d81e5',
        padding: 5,
        alignItems: 'center',
        borderRadius: 3,
        width: 200,
        height: 40,
        alignSelf: 'center',
        marginTop: 40,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'center'}}>
        <Image source={require('../assets/img/settings-work-tool.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={{color:'#1d81e5',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'}}>
          Workday Default
        </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.clearAllDate()} disabled = {this.state.buttonDelete}>
        <View style={{borderWidth: 2,
        borderColor:'#C91905',
        padding: 5,
        alignItems: 'center',
        borderRadius: 3,
        width: 100,
        height: 40,
        alignSelf: 'center',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center'}}>
        <Image source={require('../assets/img/delete.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={{color:'#C91905',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'}}>
          Clear
        </Text>
        </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.jalan()}>
        <View style={{backgroundColor:'#1d81e5',
        padding: 5,
        alignItems: 'center',
        borderRadius: 3,
        width: 250,
        height: 40,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'}}>
        <Text style={{color:'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'}}>
          Next
        </Text>
        <Image source={require('../assets/img/right-chevron.png')} style={{height: 20, width: 20, marginLeft: 20}} />
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dateToStore: (payload) => dispatch(dateAction(payload)),
    fetchTrafiRoute: (payload) => dispatch(fetch_trafi_route(payload)),
  }
}

const mapStateToProps = (state) => {
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalenderClass)
