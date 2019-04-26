import React, {Component} from 'react';
import { StyleSheet, FlatList} from 'react-native';
import theme from '../../style/theme.style.js';
import PropTypes from 'prop-types';
import PlayerComponent from './player_component';

export default class RosterShowComponent extends Component {
  static propTypes = {
    roster: PropTypes.array.isRequired
  }

  render() {
    return (
      <FlatList
        data={this.props.roster}
        renderItem={({ item }) => <PlayerComponent player={item} navigation={this.props.navigation}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white'
  }
})
