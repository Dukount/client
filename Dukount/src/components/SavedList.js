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
import {
  listThunk
} from '../actions/listAction'
import realm from '../model'

class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      plans: []
    }
  }

  componentDidMount() {
    this.getToken()
    this.realmReadList()
  }

  realmReadList() {
    let plans = realm.objects('Plan')
    let plansToArray = Object.values(plans)
    let filterPlans = plansToArray.filter((thing, index, self) => self.findIndex((t) => {return t._id === thing._id}) === index)
    this.setState({
      plans: filterPlans
    })
    this.writeListToRealm()
  }

  getToken() {
    AsyncStorage.getItem('token').then(value => {
      console.log('ini harusnya token :===>', value);
      this.setState({
        token: value
      })
    })
  }

  writeListToRealm() {
    if (this.props.savedList !== null) {
      this.props.savedList.map(plan => {
        realm.write( () => {
          savedList = realm.create('Plan', {
            id: plan._id,
            createdAt: plan.createdAt,
            salary: plan.salary,
            foodCostTotal: plan.foodCostTotal,
            breakfastCost: plan.breakfastCost,
            breakfastType: plan.breakfastType,
            lunchCost: plan.lunchCost,
            lunchType: plan.lunchType,
            dinnerCost: plan.dinnerCost,
            dinnerType: plan.dinnerType,
            transportationTotal: plan.transportationTotal,
            transportationType: plan.transportationType,
            tripDurationTotal: plan.tripDurationTotal,
            salaryLeft: plan.salaryLeft,
            salaryToSave: plan.salaryToSave,
            author: plan.author
          })
        })
      })
    }
  }

  render() {
    console.log('ini savedList ', this.props.savedList)
    return (
      <View>
      <Text>Yeaay masuk List</Text>
      <Text>{JSON.stringify(this.state.plans)}</Text>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    savedList: state.listReducer.list
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  null)(SavedList)

export default ConnectedComponent
