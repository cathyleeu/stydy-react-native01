/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Tabs from './App/Components/Tabs'
import Details from './App/Components/comicDetailView'

/**
import DashBoard from './App/Components/DashBoard' => 데시보드 네비게이션만 했을때!
대시보드에 탭과 네비게이션을 함께할때 탭을 통해 대쉬보드를 부른다

import Tabs from './App/Components/Tabs'

*/

const NaviMap = {
  LeftButton(route, navigator, index){
    if(index == 0){
      return null
      //if(route.name =='Login') 이라면 Login페이지에는 오른쪽 버튼이 안나온다는 것임임임임임!!!
      // if(index == 0) 이라면 대시보드에 '뭘 뛰운다는 겨?' 라는 글이 안나오무이당!!
    }
    return(
      <TouchableHighlight onPress={() => {
        if(index > 0){
          navigator.pop();
        }
      }}>
        <Text style={{marginTop:10, marginLeft:20, color:'#007AFF'}}> 뒤로 </Text>
      </TouchableHighlight>
    );
  },
  RightButton(route, navigator, index){
    return null;  //search를 넣으면 되겠당!
  },
  Title(route, navigator, index){
    if(route.name == 'DashBoard'){
      return null
      // 이렇게 없앴다!!! 우키키키
    }
    return(
      <Text style={{marginTop:10, color:'#007AFF'}}>{route.name}</Text>
      // 각 스크린의 이름이 nav에서 나오는 것이군..허허허
    );
  }
}
// const NavbarColor = {
//   render(route, navigator){
//     if(route.name == 'Login'){
//       return null
//     }
//     return (style={{backgroundColor: '#5e5e5e'}});
//   }
// }

/**
case 'DashBoard': 네비게이션만 했을때
  return(
    <DashBoard {...route.props} navigator={navigator} route={route}></DashBoard>
  );

case 'DashBoard': 대시보드에 탭을 붙이고 네비게이션을 했을 때
  return(
    <Tabs {...route.props} navigator={navigator} route={route} />
  );

*/
class NavTest extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case 'DashBoard':
        return(
          <Tabs {...route.props} navigator={navigator} route={route} />
        );
      case 'Details':
        return(
          <Details {...route.props} navigator={navigator} route={route} />
        );
      //새로운 네이게이션을 사용하기 위해서는 switch에 꼭 이름을 설정해 주서야 한다~~
    }
  }
  // navcolor(route, navigator){
  //   if(route === 'Login'){
  //     return null
  //   }
  //   return ('style={{backgroundColor: '#5e5e5e'}}')
  // }

  render() {
    return (
        <Navigator
          style={{backgroundColor:'#fff'}}
          initialRoute={{name: 'DashBoard'}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            if(route.sceneConfig){
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NaviMap} />
          } />
    )
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('NavTest', () => NavTest);
