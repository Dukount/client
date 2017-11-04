import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Calendar from 'react-native-calendar-list'
import { StackNavigator } from 'react-navigation'
const date = new Date()
const markStyle = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#08a'};
const markStyleDefault = {dayTextStyle: {color: '#08a', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: 'white'};


class CalenderClass extends Component<{}>{
  static navigationOptions = {
    title: 'CalendarScreen'
  }
  constructor() {
    super()
    this.state = {
      counter: 0,
      dateSelected: [],
      logDataSelected: '',
      dateNow: new Date(),
      marks: {}
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
        console.log('tanggal dimasukan');
      } else {
        arrDateSelected.pop ()
        console.log('tanggal dibatalkan');
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
  render () {
    const { navigate } =   this.props.navigation
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
        <Button title='Submit' onPress={() => navigate('FoodResultScreen')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  weekendDayButton: {
    backgroundColor: '#F5FCFF',
  },
});

export default CalenderClass
