import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Button,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import {
  post_salary
} from '../actions/salaryAction'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: '',
      modalVisible: false
    };
  }

  // componentDidMount() {
  //   // do stuff while splash screen is shown
  //   // After having done stuff (such as async tasks) hide the splash screen
  //   SplashScreen.hide();
  // }

  delimiter(num) {
    return num
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  addressJoiner(address) {
    if (address === null) {
      return address
    } else {
      return address.join(' ')
    }
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    })
  }

  submitButton() {
    if (this.state.salary !== '') {
      this.setModalVisible(true)
      this.props.postSalary(this.state.salary)
    }
  }

  listItem() {
    const { navigate } = this.props.navigation
    navigate('Login')
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
      <View>
        <Image source={require('../assets/img/logo_small_white.png')} style={{height: 50, width: 210, marginBottom: 30}} />
      </View>
        <View style={styles.salaryInputRow}>
        <Text style={{color: 'white'}}>IDR (Indonesian Rupiah)</Text>
          <View style={styles.salaryInput}>
            <TextInput
              editable = {true}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {20}
              style={{color: 'white'}}
              onChangeText={(salary) => this.setState({salary: salary.split('.').join('')})}
              value={this.delimiter(this.state.salary)}
              keyboardType = {'numeric'}
              placeholder={'Input your salary'}
              placeholderTextColor="white"
            />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={{backgroundColor: 'white', marginTop: 170, marginRight: 50, marginLeft: 50, width: 250, height: 370, borderRadius: 13}}>
            <View style={{paddingTop: 60, paddingRight: 30, paddingLeft: 30}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, alignSelf: 'center'}}>Your Salary Submitted</Text>
              <Text style={{marginTop: 50, fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>IDR {this.delimiter(this.state.salary)}</Text>

              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <View style={styles.buttonHideModal}>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>Hide Modal</Text>
                </View>
              </TouchableHighlight>

            </View>
           </View>
          </Modal>
          <TouchableOpacity onPress={() => this.submitButton()}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Submit</Text>
          </View>
          </TouchableOpacity>
        </View>
        <TouchableHighlight onPress={() => navigate('FromLocation')}>
        <View style={styles.buttonPickTo}>
        <Image source={require('../assets/img/maps-and-flags.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={styles.textButtonPickTo}>
          From Location
        </Text>
        </View>
        </TouchableHighlight>

        <View style={styles.toBox}>
          <Text style={styles.textToBox}>{this.addressJoiner(this.props.addressFrom)}</Text>
        </View>

        <TouchableHighlight onPress={() => navigate('ToLocation')}>
        <View style={styles.buttonPickTo}>
        <Image source={require('../assets/img/location-arrow.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={styles.textButtonPickTo}>
          To Location
        </Text>
        </View>
        </TouchableHighlight>
        <View style={styles.toBox}>
          <Text style={styles.textToBox}>{this.addressJoiner(this.props.addressTo)}</Text>
        </View>
        <TouchableHighlight onPress={() => navigate('CalendarScreen')}>
        <View style={styles.buttonPickWork}>
        <Image source={require('../assets/img/date.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={styles.textButtonPickWork}>
          Pick Your Workdays
        </Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('Login')}>
        <View style={styles.buttonPickWork}>
        <Image source={require('../assets/img/date.png')} style={{height: 20, width: 20, marginRight: 10}} />
        <Text style={styles.textButtonPickWork}>
          Saved List
        </Text>
        </View>
        </TouchableHighlight>
      </View>
    );
  }
}
// navigate('Main')
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1d81e5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sentence: {
    fontSize: 30
  },
  salaryInputRow: {
    top: 0,
    height: 30,
    marginTop: 0,
    marginBottom: 80
  },
  salaryInput: {
    width: 250,
    height: 35,
    alignSelf: 'center'
  },
  button: {
    backgroundColor:'#57A8F8',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    width: 140,
    height: 30,
    alignSelf: 'center'
  },
  buttonHideModal: {
    backgroundColor:'#57A8F8',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    width: 140,
    height: 40,
    alignSelf: 'center',
    marginTop: 70
  },
  buttonPickWork: {
    backgroundColor:'#2F273A',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    width: 240,
    height: 40,
    alignSelf: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textButton: {
    color:'white',
    fontWeight: 'bold'
  },
  textButtonPickWork: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  buttonPickTo: {
    backgroundColor:'white',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    width: 240,
    height: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textButtonPickTo: {
    color:'#1d81e5',
    fontWeight: 'bold',
    fontSize: 18
  },
  toBox: {
    borderColor:'white',
    padding: 5,
    alignItems: 'center',
    borderRadius: 3,
    width: 240,
    height: 40,
    alignSelf: 'center',
    marginBottom: 5,
    borderWidth: 0.5
  },
  textToBox: {
    color:'white',
    fontSize: 12
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postSalary: (payload) => dispatch(post_salary(payload))
  }
}

const mapStateToProps = (state) => {
  return {
    latitudeFrom: state.MapReducer.latitudeFrom,
    longitudeFrom: state.MapReducer.longitudeFrom,
    addressFrom: state.MapReducer.addressFrom,
    latitudeTo: state.MapReducer.latitudeTo,
    longitudeTo: state.MapReducer.longitudeTo,
    addressTo: state.MapReducer.addressTo
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps)(Home)

export default ConnectedComponent
