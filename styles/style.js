import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../components/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: verticalScale(70),
    width: horizontalScale(380)
  },
  header: {
    marginBottom: verticalScale(15),
    backgroundColor: '#87ACA3',
    flexDirection: 'row',
    height: verticalScale(55),
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#87ACA3',
    flexDirection: 'row',
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(25),
    textAlign: 'center',
    margin: moderateScale(10),
    fontFamily: 'HeaderFont',
    letterSpacing: 3
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(16),
    textAlign: 'center',
    margin: moderateScale(5),
  },
  gameboard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameInputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  gameinfo: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(15),
    fontSize: moderateScale(14)
  },
  rules: {
    marginBottom: verticalScale(5),
    padding: moderateScale(5),
    fontFamily: 'TextFont',
    fontSize: moderateScale(16)
  },
  pointsRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(28),
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(10)
  },
  button: {
    margin: moderateScale(10),
    padding: moderateScale(5),
    backgroundColor: '#31352E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearScoreboard: {
    margin: moderateScale(10),
    padding: moderateScale(5),
    backgroundColor: '#DB1D08',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerName: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    fontFamily: 'TextFont'
  },
  textInput: {
    textAlign: 'center',
    width: horizontalScale(200),
    margin: moderateScale(10),
    padding: moderateScale(10),
  },
  rulesTitle: {
    fontSize: moderateScale(18),
    margin: moderateScale(5),
    fontFamily: 'BoldTextFont'
  },
  text: {
    fontSize: moderateScale(18),
    margin: moderateScale(10),
    fontFamily: 'TextFont'
  },
  totalPoints: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(5),
    marginTop: verticalScale(10),
    fontFamily: 'TextFont'
  },
  scoreboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(10)
  },
  scoreboardTitle: {
    fontSize: moderateScale(30),
    fontFamily: 'BoldTextFont'
  },
  emptyScoreboardText: {
    fontFamily: 'TextFont',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(20),
    fontSize:moderateScale(20)
  }
});