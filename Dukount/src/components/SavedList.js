import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import {
  listThunk
} from '../actions/listAction'

import realm from '../model'

class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      plans: [],
      response: []
    }
  }
  
  componentDidMount() {
    this.getToken()
    let plans = realm.objects('Plan')
    let plansToArray = Object.values(plans)
    let filtered = plansToArray.filter((thing, index, self) => self.findIndex((t) => {return t.id === thing.id}) === index)
    this.setState({
      plans: filtered
    })
    setTimeout(()=> {
      this.writeListToRealm()
    }, 2000)
  }

  getToken() {
    AsyncStorage.getItem('token', (value) => {
      this.setState({
        token: value
      })
    })
  }


  writeListToRealm() {
    this.props.savedList.map(item => {
      realm.write( () => {
        savedPlan = realm.create('Plan', {
          id: item._id,
          createdAt: item.createdAt,
          salary: item.salary,
          foodCostTotal: item.foodCostTotal,
          breakfastType: item.breakfastType,
          breakfastCost: item.breakfastCost,
          lunchCost: item.lunchCost,
          lunchType: item.lunchType,
          dinnerCost: item.dinnerCost,
          dinnerType: item.dinnerType,
          transportationTotal: item.transportationTotal,
          transportationType: item.transportationType,
          tripDurationTotal: item.tripDurationTotal,
          salaryLeft: item.salaryLeft,
          salaryToSave: item.salaryToSave,
          author: item.salaryToSave,
        })
      })
    })
  }
  render() {
    return (
      <View>
      <Text>jumlah : {this.state.plans.length}</Text>
      <ScrollView>
        <Text>{JSON.stringify(this.state.plans)}</Text>
      </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    savedList: state.listReducer.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    relog: (payload) => dispatch(listThunk(payload))
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(SavedList)

export default ConnectedComponent
