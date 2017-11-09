import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  FlatList,
  Image,
  Modal,
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
      response: [],
      modalVisible: false,
      dataModalSalary: '',
      dataModalFoodTotal: '',
      dataModalSalaryLeft: '',
      dataModalTransportTotal: '',
      dataModalSalaryToSave: ''
    }
  }

  componentDidMount() {
    this.getToken()
    this.token()
  }

  token () {
    let plans = realm.objects('Plan')
    let plansToArray = Object.values(plans)
    let filtered = plansToArray.filter((thing, index, self) => self.findIndex((t) => {return t.id === thing.id}) === index)
    this.setState({
      plans: filtered.reverse()
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
    this.props.savedList.reverse().map(item => {
      realm.write( () => {
        savedPlan = realm.create('Plan', {
          id: item._id,
          createdAt: item.createdAt,
          salary: item.salary,
          foodCostTotal: item.foodCostTotal,
          transportationTotal: item.transportationTotal,
          salaryLeft: item.salaryLeft,
          salaryToSave: item.salaryToSave,
          author: item.salaryToSave,
        })
      })
    })
  }



  setModalVisible(visible, item) {
    this.setState({
      modalVisible: visible,
      dataModalSalary: item.salary,
      dataModalFoodTotal: item.foodCostTotal,
      dataModalTransportTotal: item.transportationTotal,
      dataModalSalaryLeft: item.salaryLeft,
      dataModalSalaryToSave: item.salaryToSave
    })
  }

  stringConverter(string) {
    if (string !== null) {
      return (string).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    } else {
      return 'You miss something to submit'
    }
  }

  foodCostGenerator(foodCost) {
    if (foodCost !== null) {
      return foodCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    } else {
      return 'Zomato API Request exceeded the maximum limit'
    }
  }

  closeModal(visible) {
    this.setState({
      modalVisible: visible
    })
  }

  render() {
    const { goBack } = this.props.navigation
    return (
      <View style={{backgroundColor: '#eff0f2'}}>
      <View>
        <View style={{height: 50, backgroundColor: '#1d81e5', flexDirection: 'row'}}>
          <View style={{position: 'relative', justifyContent: 'center', flex: 1}}>
          <TouchableHighlight onPress={() => goBack()}>
            <Image source={require('../assets/img/arrow-point-to-right.png')} style={{height: 30, width: 30, alignItems: 'center'}}/>
          </TouchableHighlight>
          </View>
          <View style={{height: 30, width: 360, alignItems: 'center', alignSelf: 'center', position: 'absolute'}}>
            <Image source={require('../assets/img/logo_small_white.png')} style={{height: 30, width: 130}} />
          </View>
        </View>
      </View>
      <FlatList data={this.state.plans}
      keyExtractor={(item, idx) => idx}
      style={{marginBottom: 80}}
      renderItem={({item}) => {
        return (
          <View>
          <TouchableOpacity onPress={() => {
            this.setModalVisible(!this.state.modalVisible, item)
          }}>
          <View style={{width: 350, height: 80, borderColor:'white', padding: 25, borderWidth: 1, flexDirection: 'row', alignSelf: 'center', borderWidth: 1, margin: 3, marginLeft: 15, marginRight: 15, backgroundColor: 'white'}}>
          <View style={{alignSelf: 'center'}}>
          <Text style={{color: '#1d81e5', fontSize: 22, marginBottom: 5, fontWeight: 'bold'}}>Total Cost: IDR {((+item.foodCostTotal) + (+item.transportationTotal)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
          <Text style={{color: '#1d81e5', fontStyle:'italic'}}>{item.createdAt}</Text>
          </View>
          </View>
          </TouchableOpacity>
          </View>
        )
      }} />
      <Modal
      animationType="fade"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}>
      <View style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#1d81e5', width: 300, height: 40, alignSelf: 'center', borderRadius: 5, marginTop: 20}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 3, fontSize: 24}}>Results</Text>
      </View>
      <View style={{width: 320, backgroundColor: '#1d81e5', alignSelf: 'center', height: 50, marginTop: 20, padding: 5}}>
        <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Your Salary</Text>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.state.dataModalSalary.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{width: 160, backgroundColor: '#325495', alignSelf: 'center', height: 50, padding: 5}}>
          <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Food Outcome</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.state.dataModalFoodTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
        <View style={{width: 160, backgroundColor: '#57A42D', alignSelf: 'center', height: 50, padding: 5}}>
          <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Transportation Outcome</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {this.state.dataModalTransportTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      </View>
      <View style={{width: 320, backgroundColor: '#28A48E', alignSelf: 'center', height: 50, padding: 5}}>
        <Text style={{textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: 12}}>Your Final Outcome</Text>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>IDR {((+this.state.dataModalFoodTotal) + (+this.state.dataModalTransportTotal)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      </View>
      <View style={{width: 320, borderColor: '#1d81e5', borderWidth: 1, alignSelf: 'center', height: 50, padding: 5}}>
        <Text style={{textAlign: 'center', color: '#1d81e5', fontStyle: 'italic', fontSize: 12}}>Salaries left</Text>
        <Text style={{textAlign: 'center', color: '#1d81e5', fontWeight: 'bold', fontSize: 18, fontStyle: 'italic'}}>IDR {this.state.dataModalSalaryLeft.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
      </View>
        <TouchableOpacity onPress={() => this.closeModal(!this.state.modalVisible)}>
        <View style={{backgroundColor: '#1d81e5', width: 300, height: 40, alignSelf: 'center', borderRadius: 5, marginTop: 20}}>
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 3, fontSize: 24}}>CLOSE</Text>
        </View>
        </TouchableOpacity>
      </View>
      </Modal>
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
