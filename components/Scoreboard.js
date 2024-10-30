import { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import style from '../styles/style';
import Header from './Header';
import Footer from './Footer';
import { horizontalScale, verticalScale, moderateScale } from './Metrics';
import { SCOREBOARD_KEY } from '../constants/Game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, DataTable } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData()
        })
        return unsubscribe
    }, [navigation])

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue != null) {
                const tmpScores = JSON.parse(jsonValue)

                const sortedScores = tmpScores.sort((a, b) => b.points - a.points)
                const top5Scores = sortedScores.slice(0, 5)

                setScores(top5Scores)
                console.log('Scoreboard: Read successful.')
                console.log('Scoreboard: Number of scroes: ' + tmpScores.length)
            }
        }
        catch (e) {
            console.log("Scoreboard: Read error: " + e)
        }
    }

    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY)
            setScores([])
        }
        catch (e) {
            console.log('Clear error: ' + e)
        }
    }

    return (
        <View style={style.container}>
            <Header />
            <View style={style.scoreboard}>
                <MaterialCommunityIcons
                    name='view-list'
                    size={moderateScale(90)}
                    color='#107869'>
                </MaterialCommunityIcons>
                <Text style={style.scoreboardTitle}>Top 5</Text>
                {scores.length === 0 ? (
                    <Text style={style.emptyScoreboardText}>Scoreboard is empty</Text>
                )
                    :
                    (
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Player</DataTable.Title>
                                <DataTable.Title>Date</DataTable.Title>
                                <DataTable.Title>Time</DataTable.Title>
                                <DataTable.Title numeric>Points</DataTable.Title>
                            </DataTable.Header>
                            {scores.map((item, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                    <DataTable.Cell>{item.date}</DataTable.Cell>
                                    <DataTable.Cell>{item.time}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.points}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    )}
                <Button
                    mode="contained"
                    onPress={() => clearScoreboard()}
                    style={style.clearScoreboard}>
                    CLEAR SCOREBOARD
                </Button>
            </View>
            <Footer />
        </View>
    )
}