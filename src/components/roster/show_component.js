import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import common from '../../style/common.style.js';
import theme from '../../style/theme.style.js'
import PropTypes from 'prop-types';

export default class RosterShowComponent extends Component {
  static propTypes = {
    pitchers: PropTypes.array.isRequired
  }

  render() {
    return (
      <View styles={styles.list}>
        {this.props.pitchers.map( (pitcher, index) => {
          return(
            <View key={index}>
              <Text
                style={styles.text}
                onPress={() => this.props.navigation.navigate('RosterShow', {id: pitcher.id})}
              >
                {pitcher.name}
              </Text>
            </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    marginTop: 10,
    marginBottom: 10
  }
})
