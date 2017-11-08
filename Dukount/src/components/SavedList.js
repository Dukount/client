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
// import realm from '../model'

class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      plans: [],
      gans: [{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      },{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      },{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      },{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      },{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      },{
        id: 1,
        createdAt: 'selasa-17 Agustus 2017',
        salary: 600000,
        foodCostTotal: 200000,
        breakfastCost: 488888
      }]
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
    var url = `http://35.199.117.172:3000/`
    axios.get(url, {
      headers: {token: this.state.token}
    })
    .then(resp => {
      resp.data.map(plan => {
        realm.write( () => {
          savedList = realm.create('Plan', {
            id: plan._id,
            // createdAt: plan.createdAt,
            // salary: plan.salary,
            // foodCostTotal: plan.foodCostTotal,
            // breakfastCost: plan.breakfastCost,
            // breakfastType: plan.breakfastType,
            // lunchCost: plan.lunchCost,
            // lunchType: plan.lunchType,
            // dinnerCost: plan.dinnerCost,
            // dinnerType: plan.dinnerType,
            // transportationTotal: plan.transportationTotal,
            // transportationType: plan.transportationType,
            // tripDurationTotal: plan.tripDurationTotal,
            // salaryLeft: plan.salaryLeft,
            // salaryToSave: plan.salaryToSave,
            // author: plan.author
          })
        })
      })
    })
    // if (this.props.savedList === null) {
    //   this.setState({
    //     plans: ['masih null']
    //   })
    // } else {
    //   this.props.savedList.map(plan => {
    //     realm.write( () => {
    //       savedList = realm.create('Plan', {
    //         id: plan._id,
    //         createdAt: plan.createdAt,
    //         salary: plan.salary,
    //         foodCostTotal: plan.foodCostTotal,
    //         breakfastCost: plan.breakfastCost,
    //         breakfastType: plan.breakfastType,
    //         lunchCost: plan.lunchCost,
    //         lunchType: plan.lunchType,
    //         dinnerCost: plan.dinnerCost,
    //         dinnerType: plan.dinnerType,
    //         transportationTotal: plan.transportationTotal,
    //         transportationType: plan.transportationType,
    //         tripDurationTotal: plan.tripDurationTotal,
    //         salaryLeft: plan.salaryLeft,
    //         salaryToSave: plan.salaryToSave,
    //         author: plan.author
    //       })
    //     })
    //   })
    // }
  }

  render() {
    console.log('ini savedList ', this.props.savedList)
    return (
      <View>
      <Text>Yeaay masuk List</Text>
      <FlatList data={this.state.gans}
      keyExtractor={(item, idx) => idx}
      renderItem={({item}) => {
        return (
          <View>
          <Text>{item.salary}</Text>
          </View>
        )
      }} />
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
