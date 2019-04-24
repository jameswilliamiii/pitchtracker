import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title='Add a pitcher'
          onPress={()=> this.props.navigation.navigate('PitcherNew')}
        />
        <Button
          title='View All Pitchers'
          onPress={()=> this.props.navigation.navigate('PitcherIndex')}
        />
      </View>
    );
  }
}
