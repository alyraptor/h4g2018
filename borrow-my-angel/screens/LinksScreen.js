import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { WebBrowser } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.item} onPress={() => { WebBrowser.openBrowserAsync('https://4agc.com/donation_pages/c9252832-caf3-4cf1-99eb-7450c0dc4699?gift_id=3fbcc69f-54aa-4581-b01b-93106c58b131')}}> Donations </Text>
        <Text style={styles.item} onPress={() => { WebBrowser.openBrowserAsync('https://soundcloud.com/user-692077348')}}> SoundCloud </Text>
        <Text style={styles.item} onPress={() => { WebBrowser.openBrowserAsync('https://causemomentum.org/agency/borrowmyangel')}}> Cause Momentum </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#003366',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#fff',
    textAlign: 'center'
  },
});
