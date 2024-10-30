import { useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import style from '../styles/style';
import Header from './Header';
import Footer from './Footer';
import { horizontalScale, verticalScale, moderateScale } from './Metrics';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game';

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return (
        <View style={style.container}>
            <Header />
            <View style={style.gameinfo}>
                <MaterialCommunityIcons
                    name="information"
                    size={moderateScale(90)}
                    color="#107869" />
                {!hasPlayerName ?
                    <View style={style.nameInputContainer}>
                        <Text style={style.text}>For scoreboard enter your name</Text>
                        <TextInput
                            style={style.textInput}
                            placeholder='Type your name here'
                            onChangeText={setPlayerName}
                            autoFocus={true} />
                        <Pressable onPress={() => handlePlayerName(playerName)}>
                            <Button style={style.button} mode='contained'>OK</Button>
                        </Pressable>
                    </View>
                    :
                    <>
                        <Text style={style.rulesTitle}>Rules of the game</Text>
                        <View>
                            <Text style={style.rules}>
                                THE GAME: Upper section of the classic Yahtzee
                                dice game. You have {NBR_OF_DICES} dices and
                                for the every dice you have {NBR_OF_THROWS} throws.
                                After each throw you can keep dices in
                                order to get same dice spot counts as many as
                                possible. In the end of the turn you must select
                                your points from {MIN_SPOT} to {MAX_SPOT}.
                                Game ends when all points have been selected.
                                The order for selecting those is free.
                            </Text>
                            <Text style={style.rules}>
                                POINTS: After each turn game calculates the sum
                                for the dices you selected. Only the dices having
                                the same spot count are calculated. Inside the
                                game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
                            </Text>
                            <Text style={style.rules}>
                                GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points
                                is the limit of getting bonus which gives you {BONUS_POINTS} points more.
                            </Text>
                        </View>
                        <Text style={style.playerName}>Good luck, {playerName}</Text>
                        <Pressable onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                            <Button style={style.button} mode='contained'>PLAY</Button>
                        </Pressable>
                    </>
                }
            </View>
            <Footer />
        </View>
    )
}