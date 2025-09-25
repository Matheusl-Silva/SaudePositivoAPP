import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Header from '../../components/Header';
import Botao from '../../components/Botao';

export default function EditarDados(){
    return (
        <View style={styles.container}>
            <Header />
            <Botao texto="Login" style={{marginHorizontal: 50}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

})