import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Botao({texto, style}){
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <Text style={styles.text}>{texto}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#999',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15
    },
    text: {
        color: '#999',
        fontSize: 18
    }
})