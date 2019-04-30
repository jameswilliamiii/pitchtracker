import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import * as Animatable from 'react-native-animatable';
import PlayerCardComponent from './player_card_component';
import PropTypes from 'prop-types';

export default class PlayerComponent extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired
  }

  state = {
     front: true
  };

  render() {
    return (
      <View style={styles.padded}>
        <Grid>
          <Animatable.View style={{ flex: 1 }} ref={ref => (this.AnimationRef = ref)} duration={700}>
            {
              this.state.front?
                <PlayerCardComponent
                  player={this.props.player}
                  navigation={this.props.navigation}
                  today={true}
                  flip={this._flip}
                />
              :
                <PlayerCardComponent
                  player={this.props.player}
                  navigation={this.props.navigation}
                  today={false}
                  flip={this._flip}
                />
            }
          </Animatable.View>
        </Grid>
      </View>
    );
  }

  _flip = ()=>  {
    this.AnimationRef.flipInY();
    this._updateFrontState();
  }

  _updateFrontState = (bool)=> {
    setTimeout(()=> {this.setState({ front: !this.state.front })}, 200)
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10
  }
})
