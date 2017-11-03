import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Calendar from 'react-native-calendar-list'
const date = new Date()
const markStyle = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#08a'};
const markStyleDefault = {dayTextStyle: {color: '#08a', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: 'white'};

const month = new Date().getMonth()+1
const year = new Date().getFullYear()
class CalenderClass extends Component<{}>{
  constructor() {
    super()
    this.state = {
      counter: 0,
      dateSelected: [],
      logDataSelected: '',
      dateNow: new Date(),
      marks: {},
      month: month,
      year: year
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
    console.log(date);
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
  yearMonthState () {
    setState()
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

  convertAllDate() {
    console.log(this.getDaysInMonth(this.state.year, this.state.month));
    var day = this.getDaysInMonth(this.state.year, this.state.month)
    // console.log(day[1].split("-")[1]);
    const newMarks = {...this.state.marks};
    const date = []
    var arrDateSelected = this.state.dateSelected
    for (var i = 0; i < day.length; i++) {
      if (day[i].split("-")[1] === "mon" || day[i].split("-")[1] === "tue" || day[i].split("-")[1] === "wed" || day[i].split("-")[1] === "thu" || day[i].split("-")[1] === "fri" ) {
        var dateFor = day[i].split("-")[0]
        if (dateFor.length === 1) {
          var dateState =
          // console.log(`${this.state.year}-${this.state.month}-${0+dateFor}`);
          newMarks[`${this.state.year}-${this.state.month}-${0+dateFor}`] = markStyle;
          arrDateSelected.push(`${this.state.year}-${this.state.month}-${0+dateFor}`)
          this.setState({
            marks: newMarks,
          });
        } else {
          // console.log(`${this.state.year}-${this.state.month}-${dateFor}`);
          newMarks[`${this.state.year}-${this.state.month}-${dateFor}`] = markStyle;
          arrDateSelected.push(`${this.state.year}-${this.state.month}-${dateFor}`)
          this.setState({
            marks: newMarks,
          });
        }
      }
    }
    console.log(this.state.dateSelected);
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
          title="Test"
        />
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
