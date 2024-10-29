import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.5:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login');
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <View style={styles.rememberMeContainer}>
          <CheckBox
              title="Lembrar-me"
              checked={isSelected}
              onPress={() => setSelection(!isSelected)}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
          />
          <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
            <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF8F1',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignSelf: 'flex-start',
  },
  checkboxText: {
    fontWeight: 'bold',
    color:'#000066' ,
  },
  forgotPasswordText: {
    color: '#000066',
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#000066',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Login;
