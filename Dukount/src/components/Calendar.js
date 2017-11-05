import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';
import { connect } from "react-redux"
import Calendar from 'react-native-calendar-list'
import { StackNavigator } from 'react-navigation'
const date = new Date()


import { dateAction } from "../actions/foodAction";
const markStyle = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#08a'};
const markStyleDefault = {dayTextStyle: {color: '#08a', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: 'white'};


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
  componentWillMount() {
    // this.homeDayDefaultScreen()
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
  render () {
    // console.log('====', this.state.dateSelected);
    return (
      <View>
        <Text>{date.toString()}</Text>
        <Calendar
          marks={this.state.marks}
          markStyle= {`2017-11-11`}
          startDate={this.convertFormatDate()}
          monthsCount={0}
          onDatePress={(a) => this.setEventCounting(a)}
          rowHeight={40}
          headerHeight={40} />

        <Button
          onPress={()=> this.convertAllDate()}
          title="Workday Default"
          disabled = {this.state.buttonDefault}
        />
        <Button
          onPress={()=> this.clearAllDate()}
          title="Hapus State"
          disabled = {this.state.buttonDelete}
        />
        <Button
          onPress={()=> this.jalan()}
          title="NEXT"
        />
        <ScrollView>
          <Text>WorkDay {this.state.dateSelected.length}</Text>
          <Text>{JSON.stringify(this.state.dateSelected)}</Text>
          <Text>HomeDay {this.state.dateUnselected.length}</Text>
          <Text>{JSON.stringify(this.state.dateUnselected)}</Text>
        </ScrollView>

      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dateToStore: (payload) => dispatch(dateAction(payload)),
  }
}

export default connect(null, mapDispatchToProps)(CalenderClass)
