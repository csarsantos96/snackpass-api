import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, handleProductValidation } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const Validacao = ({ navigation, route }) => {
  const { produtos } = route.params || {};
  

  const [produtosComValidacao, setProdutosComValidacao] = useState(produtos);


  const handleProductValidation = (productId, quantity) => {
    console.log(`Produto ${productId} validado com quantidade ${quantity}`);

    setProdutosComValidacao((prevProdutos) => 
      prevProdutos.map((produto) => {
        if (produto.id === productId) {
          const updatedQuantity = produto.quantity - quantity; // Definindo updatedQuantity aqui
          return {
            ...produto,
            validated: true, 
            quantity: updatedQuantity > 0 ? updatedQuantity : 0, 
          };
        }
        return produto;
      })
    );
  };

  const produtosPendentes = produtosComValidacao.filter((item) => !item.validated);
  const produtosValidados = produtosComValidacao.filter((item) => item.validated);


  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} /> 
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>R$ {item.price ? item.price.toFixed(2) : '0.00'}</Text>
      <Text style={styles.cartItemQuantity}>{item.quantity ? item.quantity : '0'}</Text>
      <TouchableOpacity 
        style={styles.arrowButton} 
        onPress={() => 
          navigation.navigate('Ticket', { item: item, handleProductValidation })
        }
      > 
        <Ionicons name="arrow-forward" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Produtos Pendentes</Text>
      <FlatList 
        data={produtosPendentes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.scrollView}
      />

      <Text style={styles.sectionTitle}>Produtos Validados</Text>
      <FlatList 
        data={produtosValidados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.scrollView}
      />

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('TelaInicial')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome6 name="house" size={20} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Carrinho')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="shopping-cart" size={30} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Pagamento')}
        >
          <View style={styles.navItemContainer}>
            <FontAwesome name="credit-card" size={24} color={'#A2A2A2'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Validação')}
        >
          <View style={styles.navItemContainer}>
            <Ionicons name="ticket" size={30} color={'#A80000'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  scrollView: {
    maxHeight: 350,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  cartItemName: {
    fontSize: 16,
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  cartItemQuantity: {
    fontSize: 16,
    color: '#888',
  },
  arrowButton: {
    padding: 10,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 2,
  },
  navItem: {
    alignItems: 'center',
    width: 60,
  },
});

export default Validacao;
