import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import common from '../../style/common.style.js';
import RosterShowComponent from '../../components/roster/show_component';
import {db} from '../../config';

let pitchersRef = db.ref('/pitchers')

export default class RosterIndex extends Component {
  state = {
    pitchers: []
  };

  static navigationOptions = {
    title: 'Roster',
  };

  componentDidMount() {
    pitchersRef.on('value', snapshot => {
      if (snapshot) {
        let data = snapshot.val()
        let pitchers = Object.entries(data).map(arr =>
          ({
            id: arr[0],
            name: arr[1].name
          })
        )
        this.setState({pitchers: pitchers});
      } else {
        return false
      }
    });
  }

  render() {
    return (
      <View style={styles.main}>
        {this.state.pitchers.length > 0 ?
          (<RosterShowComponent pitchers={this.state.pitchers} navigation={this.props.navigation} />) :
          (null)
        }
        <TouchableHighlight
          style={[common.btn, styles.btn]}
          underlayColor='white'
          onPress={() => this.props.navigation.navigate('RosterNew')}
        >
          <Text style={common.btnText}>New Pitcher</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  btn: {
    marginTop: 15
  }
})
