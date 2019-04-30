import {StyleSheet} from 'react-native';
import vars from './../../native-base-theme/variables/material'

export default StyleSheet.create({
  bodyLabel: {
    color: '#999999',
    alignSelf: 'center',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  body: {
    backgroundColor: '#FAFAFA'
  },
  defaultCard: {
    backgroundColor: 'white',
    color: '#333333'
  },
  warningCard: {
    backgroundColor: 'white',
    color: vars.brandWarning
  },
  dangerCard: {
    backgroundColor: 'white',
    color: vars.brandDanger
  }
});
