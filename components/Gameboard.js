import { Text, View, Pressable } from 'react-native';
import style from '../styles/style';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-native-flex-grid'
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scoreboard from './Scoreboard';
import { Button } from 'react-native-paper';
import { horizontalScale, verticalScale, moderateScale } from './Metrics';

let board = []

export default Gameboard = ({ navigation, route }) => {

    const [playerName, setPlayerName] = useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0))
    const [scores, setScores] = useState([])
    const [totalPoints, setTotalPoints] = useState(0)
    const [bonusPoints, setBonusPoints] = useState(0)
    const [bonusMessage, setBonusMessage] = useState('')

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player)
        }
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData()
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        const calculatedTotal = dicePointsTotal.reduce((acc, points) => acc + points, 0)
        
        if (calculatedTotal >= BONUS_POINTS_LIMIT) {
            setBonusPoints(BONUS_POINTS)
            setBonusMessage('Congrats! Bonus points (50) added')
        }
        else {
            setBonusPoints(0)
            const remainingPoints = BONUS_POINTS_LIMIT - calculatedTotal
            setBonusMessage(`You are ${remainingPoints} points away from bonus`)
        }
        setTotalPoints(calculatedTotal + bonusPoints)
    }, [dicePointsTotal, bonusPoints])

    useEffect(() => {
        if (selectedDicePoints.every(point => point)) {
            setNbrOfThrowsLeft(0)
            setGameEndStatus(true)
            setStatus('Game over! All points selected.')
        }
    }, [selectedDicePoints])

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue != null) {
                const tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
                console.log('Gameboard Read successful.')
                console.log('Gameboard: Number of scroes: ' + tmpScores.length)
            }
        }
        catch (e) {
            console.log("Gameboard: Read error: " + e)
        }
    }

    useEffect(() => {
        if (gameEndStatus) {
            savePlayerPoints()
        }
    }, [gameEndStatus])

    const savePlayerPoints = async () => {
        const newKey = scores.length + 1
        const currentDate = new Date()
        const date = currentDate.toLocaleDateString()
        const time = currentDate.toLocaleTimeString()

        const calculatedTotal = dicePointsTotal.reduce((acc, points) => acc + points, 0)
        const finalScore = calculatedTotal + bonusPoints

        const playerPoints = {
            key: newKey,
            name: playerName,
            date: date,
            time: time,
            points: finalScore
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
            console.log('Gameboard: Save successful.' + jsonValue)
        }
        catch (e) {
            console.log('Gameboard: Save error: ' + e)
        }
    }

    const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"row" + dice}
                    onPress={() => chooseDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={"dice" + dice}
                        size={moderateScale(50)}
                        color={getDiceColor(dice)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        );
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const pointsToSelectRow = []
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable key={"buttonsRow" + diceButton}
                    onPress={() => chooseDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={'numeric-' + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={moderateScale(38)}
                        color={getDicePointsColor(diceButton)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const chooseDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
        }
        else {
            setStatus('You have to throw dices first.')
        }
    }

    const chooseDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0 || hasFiveOfAKind()) {
            let selectedPoints = [...selectedDicePoints]
            let points = [...dicePointsTotal]

            if (!selectedPoints[i]) {
                selectedPoints[i] = true
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
                points[i] = nbrOfDices * (i + 1)

                setNbrOfThrowsLeft(NBR_OF_THROWS)
                setSelectedDices(new Array(NBR_OF_DICES).fill(false))
                setStatus('Throw dices')
            }
            else {
                setStatus("You already selected points for " + (i + 1))
                return points[i]
            }
            setDicePointsTotal(points)
            setSelectedDicePoints(selectedPoints)
            return points[i]
        }
        else {
            setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
        }
    }

    const hasFiveOfAKind = () => {
        const count = Array(MAX_SPOT).fill(0)
        diceSpots.forEach((spot) => {
            if (spot >= MIN_SPOT && spot <= MAX_SPOT) {
                count[spot - 1]++
            }
        })
        return count.some(c => c === NBR_OF_DICES)
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "#028476"
    }

    function getDicePointsColor(i) {
        return (selectedDicePoints[i] && !gameEndStatus) ? "black" : "#028476"
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    const newGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setDiceSpots(new Array(NBR_OF_DICES).fill(0))
        setDicePointsTotal(new Array(MAX_SPOT).fill(0))
        setSelectedDicePoints(new Array(MAX_SPOT).fill(0))
        setGameEndStatus(false)
        setStatus('Throw dices')
        setTotalPoints(0)
    }

    const throwDices = () => {
        if (gameEndStatus) {
            newGame()
            return
        }

        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next throw.')
            return
        }

        let spots = [...diceSpots]
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1)
                board[i] = 'dice-' + randomNumber
                spots[i] = randomNumber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
        setDiceSpots(spots)
        setStatus('Select and throw dices again.')
    }

    return (
        <View style={style.container}>
            <Header />
            <View style={style.gameboard}>
                <Container>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={style.text}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={style.text}>{status}</Text>
                <Button
                    style={style.button}
                    mode="contained"
                    onPress={() => throwDices()}>
                    {gameEndStatus ? "NEW GAME" : "THROW DICES"}
                </Button>
                <Text style={style.totalPoints}>Total: {totalPoints}</Text>
                <Text style={style.text}>{bonusMessage}</Text>
                <Container style={style.pointsRow}>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={style.playerName}>Player: {playerName}</Text>
            </View>
            <Footer />
        </View>
    )
}