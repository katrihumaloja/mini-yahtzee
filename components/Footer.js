import { Text, View } from 'react-native';
import style from '../styles/style';

export default function Footer() {
    return (
        <View style={style.footer}>
            <Text style={style.author}>Author: Katri Humaloja</Text>
        </View>
    )
}