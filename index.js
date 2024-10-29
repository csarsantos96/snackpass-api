import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import logo from './assets/logo.png'; 
import ellipse2 from './assets/ellipse2.png'; 

const Index = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={ellipse2} style={styles.ellipse2} />
      <LinearGradient
        colors={['rgba(202, 146, 123, 0)', 'rgba(4, 0, 51, 0.14)']}
        style={styles.shadowContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Aluno')}>
          <Text style={styles.buttonText}>Aluno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Funcionário')}>
          <Text style={styles.buttonText}>Funcionário</Text>
        </TouchableOpacity>
      </View>
      <Image source={logo} style={styles.logo} />
      <StatusBar style="auto" />
    </View>
  );
};

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

export default Index;
