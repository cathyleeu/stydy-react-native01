'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Heroes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          for Heroes
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 100,
    fontSize: 25
  }
});

module.exports = Heroes;
