import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; 

const FuncionarioScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [matricula, setMatricula] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const handleCheckboxChange = (service) => {
    setSelectedService(service);
  };

  const handleSubmit = () => {
    console.log("Nome Completo:", fullName);
    console.log("Data de Nascimento:", birthDate);
    console.log("Telefone:", phone);
    console.log("Email:", email);
    console.log("CPF:", cpf);
    console.log("Matrícula:", matricula);
    console.log("Serviço Selecionado:", selectedService);
    
    // Navegar para a tela inicial
    navigation.navigate('TelaInicial');
  };

  const [fontsLoaded] = useFonts({
    'Sora': require('../assets/fonts/Sora-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>Formulário do Funcionário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY'
        }}
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '(99) 99999-9999' 
        }}
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '999.999.999-99' 
        }}
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '9999999'
        }}
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <Text style={styles.checkboxLabel}>Serviço:</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title='Serviços Gerais'
          checked={selectedService === 'servicosGerais'}
          onPress={() => handleCheckboxChange('servicosGerais')}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title='Auxiliar Administrativo'
          checked={selectedService === 'auxiliarAdministrativo'}
          onPress={() => handleCheckboxChange('auxiliarAdministrativo')}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title='Coordenação Pedagógica'
          checked={selectedService === 'coordenacaoPedagogica'}
          onPress={() => handleCheckboxChange('coordenacaoPedagogica')}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title='Diretoria Pedagógica'
          checked={selectedService === 'diretoriaPedagogica'}
          onPress={() => handleCheckboxChange('diretoriaPedagogica')}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF8F1',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginVertical: 10,
    fontWeight: 'bold',
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
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: 15,
    color: '#FFFFFF',
  },
});

export default FuncionarioScreen;
