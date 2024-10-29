import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';
import logo from './assets/logo.png'; 
import ellipse2 from './assets/ellipse2.png'; 
import alunos from './assets/alunos.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsqueciSenha from './screens/EsqueciSenha';
import AlunoScreen from './screens/aluno'; 
import FuncionarioScreen from './screens/func'; 
import TelaInicial from './screens/telainicial'; 
import Carrinho from './screens/carrinho'; 
import Pagamento from './screens/pagamento'; 
import LoadingScreen from './screens/LoadingScreen';
import Validacao from './screens/validacao'; 
import Ticket from './screens/ticket';
import Login from './login'; 
import Index from './index'; 
import { CartProvider } from './context/CartContext';
import { useFonts } from 'expo-font';
import CadastroScreen from "./screens/aluno";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={alunos} style={styles.alunosImage} />
      <Image source={ellipse2} style={styles.ellipse2} />
      <LinearGradient
        colors={['rgba(202, 146, 123, 0)', 'rgba(4, 0, 51, 0.14)']}
        style={styles.shadowContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Aluno')}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
      <Image source={logo} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sora': require('./assets/fonts/Sora-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#000066" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <CartProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ headerShown: false }} />
          <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
          <Stack.Screen name="Aluno" component={CadastroScreen} />
          <Stack.Screen name="Funcionário" component={FuncionarioScreen} />
          <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ headerShown: false }}/>
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Pagamento" component={Pagamento} /> 
          <Stack.Screen name="Validação" component={Validacao} />
          <Stack.Screen name="Ticket" component={Ticket} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFF8F1',
    justifyContent: 'space-between', 
  },
  shadowContainer: {
    position: 'absolute',
    width: '100%', 
    height: '50%',
    left: 0,
    bottom: 0,
  },
  ellipse2: {
    flex: 0,
    justifyContent: 'flex-end',
    marginTop: '95%', 
    alignSelf: 'center',
    width: '100%',
  },
  alunosImage: {
    marginBottom: '10%', 
    width: 387, 
    height: 412, 
    alignSelf: 'center',
    position: 'absolute', 
    bottom: 250, 
    zIndex: 1, 
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    marginTop: '45%', 
    marginBottom: '10%', 
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13.86,
    paddingHorizontal: 17.33,
    width: '80%', 
    height: 50, 
    backgroundColor: '#000066',
    borderRadius: 13.86,
    marginBottom: 20, 
  },
  buttonText: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 15,
    color: '#FFFFFF',
  },
  logo: {
    width: 232,
    height: 63,
    alignSelf: 'center', 
    marginBottom: '10%', 
  },
});
