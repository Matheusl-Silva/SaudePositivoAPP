import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Header from '../../components/Header';
import Botao from '../../components/Botao';
import BotaoVoltar from '../../components/BotaoVoltar';

export default function EditarDados(){
    return (
        <View style={styles.container}>
            <Header />
            <Botao texto="Login" style={{marginHorizontal: 50}}/>
            <BotaoVoltar texto="Voltar" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

})