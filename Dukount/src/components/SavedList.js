import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  FlatList
} from 'react-native';
import { connect } from 'react-redux'
import {
  listThunk
} from '../actions/listAction'

class SavedList extends Component {
  constructor() {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    this.getToken()
  }

  getToken() {
    AsyncStorage.getItem('token').then(value => {
      console.log('ini harusnya token :===>', value);
      this.setState({
        token: value
      })
    })
  }

  render() {
    console.log('ini savedList ', this.props.savedList)
    return (
      <View>
      <Text>Yeaay masuk List</Text>
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
