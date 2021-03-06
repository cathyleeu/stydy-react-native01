'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class comicDetailView extends Component{
  constructor(props){
    super(props);
    this.passProps = this.props.route.passProps
    this.modified = this.passProps.comic.modified.slice(0,10)
  }

  render(){
    return(
      <View style={styles.container}>
        <Image source={{uri: this.passProps.comic.thumbnail.path+'.jpg'}}
               style={styles.image} />
        <Text style={styles.title}> {this.passProps.comic.name}</Text>
        <Text style={styles.description}> {this.passProps.comic.description}</Text>
        <Text style={styles.description}> {this.passProps.comic.modified}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  title: {
    color: '#007AFF',
    fontSize: 23
  },
  description: {
    marginTop: 20,
    fontSize: 16
  },
  image: {
    alignSelf: 'stretch',
    height: 300
  }
});

module.exports = comicDetailView;
