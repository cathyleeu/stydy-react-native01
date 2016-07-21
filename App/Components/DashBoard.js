'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import Crypto from 'crypto-js'

import comicDetailView from './comicDetailView'
const REQUEST_URL = "http://gateway.marvel.com:80/v1/public/characters"


class DashBoard extends Component {
  constructor(props){
      super(props)
      this.timestamp = 1;
      this.public_key = '78cd2dfe46b9e0c79f36d7df549d29a9';
      this.private_key = '90da91693f5041eb3a537821d4c0f2c3125b2b8d';
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
          // 데이터 소스를 가지고 와서 리스트로 뿌려 주는 것임!
        }),
        loaded: false
      }
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    const hash = Crypto.MD5(this.timestamp + this.private_key + this.public_key);
    fetch(REQUEST_URL+'?ts='+this.timestamp+'&apikey='+this.public_key+'&hash='+hash)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data.results),
        loaded: true
      })
    })
  }
  renderLoadingView(){
    return(
      <View style={styles.container}>
        <Text style={{marginTop:100}}> 로딩중...</Text>
      </View>
    )
  }
  // 여기서 코믹의 디테일을 연결해준다. 클릭하면 그에 맞는 내용에 따라 넘어간다.
  // 사진을 클릭하면 onComicPressed가 실행된다 ㅋㅋㅋ
  renderComic(comic){
    return(
      <TouchableHighlight onPress={() => this.onComicPressed(comic)}>
        <Image source={{uri: comic.thumbnail.path+'.jpg'}} style={styles.backgroundImage}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{comic.name}</Text>
            <Text style={styles.available}>{comic.comics.available}</Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }
  // <View style={styles.container}>
  //   <Text style={styles.title}>
  //     for DashBoard
  //   </Text>
  // </View>
  render() {
      if(!this.state.loaded){
        return this.renderLoadingView();
      }
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComic.bind(this)}
          style={styles.listview}
        />
      )
  }
  // 이것은 네비게이션을 푸시해서 -> 디테일을 보여 주도록 한다. 
  //passProps -> 디테일 뷰에서 설정해준 route passProps이다
  onComicPressed(comic){
    this.props.navigator.push({
      name: 'Details',
      title: comic.name,
      passProps: {comic: comic}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  backgroundImage:{
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 150
  },
  rightContainer: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    alignSelf: 'stretch',
    paddingTop:30,
    height:150
  },
  title: {
    fontSize: 27,
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(52,52,52,0)'
  },
  available: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(52,52,52,0)'
  },
  listview: {
    paddingTop: 64,
    marginBottom: 49
  }
});

module.exports = DashBoard;
