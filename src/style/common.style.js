import {StyleSheet} from 'react-native';
import theme from './theme.style.js'

export default StyleSheet.create({
  btn: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: theme.PRIMARY_COLOR,
    borderColor: theme.PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnDisabled: {
    backgroundColor: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  colorPurple: {
    color: theme.PRIMARY_COLOR
  },
  input: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
    borderRadius: 8,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center'
  }
});
