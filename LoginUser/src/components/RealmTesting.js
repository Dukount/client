import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';
import Realm from 'realm'

import { realmThunk } from '../actions/actionRealm'
import { connect } from 'react-redux'

const realmSchema = {
  name: 'Dog',
  properties: {
    title: 'string',
    img: 'string',
    url: 'string',
  }
}

class App extends Component<{}> {
  constructor () {
    super()
    this.state = {
      realm: null
    }
  }
  realm () {
    Realm.open({
      schema: [realmSchema]
    }).then(realm => {
      realm.write(() => {
        axios.get()
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({ realm });
    });
  }
  componentDidMount() {
    this.realm()
    this.props.realm()
  }
  render() {
    const info = this.state.realm
  ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
  : 'Loading...';
    return (
      <View>
        <Text>{this.state.realm}</Text>
        <FlatList
          data={this.props.realmState}
          renderItem={({ item }) => {
            return (
              <View style={styles.list}>
                <View style={styles.column}>
                  <View style={ styles.imageLayer }>
                    <Image style={ styles.image } source={{ uri: `${item.thumbnailUrl}` }} />
                  </View>
                  <View style={ styles.content }>
                    <Text style={ styles.title }>{item.title}</Text>
                    <Text style={ styles.subtitle }>{item.url}</Text>
                  </View>
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderRadius: 0,
    borderWidth: 0.3,
    borderColor: '#E0E0E0'
  },
  column: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    width: 360,
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 12,
  },
  image: {
    height:35,
    width: 35,
    borderRadius: 12,
  },
  imageLayer: {
    padding: 10,
  },
  content: {
    paddingLeft: 5
  }
});

const mapStateToProps = (state) => {
  return {
    realmState: state.reducerRealm.floatedDataState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    realm: () => dispatch(realmThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
