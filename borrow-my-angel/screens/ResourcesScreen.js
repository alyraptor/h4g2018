import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ListView,
  FlatList,
  TouchableHighlight,
  Text,
  View,
  AppRegistry } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
//const firebased = require("firebase");
import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyANz8NASypAtpFUDJpta0n_nBoYM9xsArk",
  authDomain: "bma-h4g2018.firebaseapp.com",
  databaseURL: "https://bma-h4g2018.firebaseio.com",
  projectId: "bma-h4g2018",
  storageBucket: "bma-h4g2018.appspot.com",
  messagingSenderId: "455552526324"
};

const firebaseApp = firebase.initializeApp(config);



export default class ResourcesScreen extends React.Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2)=> r1 !== r2});
    this.state = {
      resourcesDataSource: ds
    }

    this.resourcesRef= this.getRef().child('/resources');

    this.renderRow= this.renderRow.bind(this);
    this.pressRow= this.pressRow.bind(this);
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  static navigationOptions = {
    title: 'Resources',
  };

  componentWillMount(){
    this.getResources(this.resourcesRef);
  }

  componentDidMount(){
    this.getResources(this.resourcesRef);
  }

  getResources(resourcesRef){
    resourcesRef.on('value', (snap)=> {
      let resources =[];
      snap.forEach((child) =>{
        if (child.val().category =='Self-Help Strategies') {
        resources.push({
          resource_name: child.val().resource_name,
          _key: child.key
        });
      }

      });

      this.setState({
        resourcesDataSource: this.state.resourcesDataSource.cloneWithRows(resources)
      });

    });
  }
  pressRow(resource){
    console.log(resource);
  }

  renderRow(resource){
    return(
      <TouchableHighlight onPress={()=>{

        this.pressRow(resource);
      }}>


        <Text style={styles.item}>{resource.resource_name}</Text>




      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Self Help</Text>
        <ListView
          dataSource= {this.state.resourcesDataSource}
          renderRow={this.renderRow}
        />
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#003366',
  },
  item: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  }
});
