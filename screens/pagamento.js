import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const PaymentScreen = ({ navigation }) => {
  const { cartItems, getTotalPrice } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  console.log(cartItems);


  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} /> 
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>R$ {item.price ? item.price.toFixed(2) : '0.00'}</Text>
      <Text style={styles.cartItemQuantity}>{item.quantity ? item.quantity : '0'}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      {/* Payment Method (Card / Pix) */}
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, selectedPayment === 'card' ? styles.selected : styles.unselected]}
          onPress={() => setSelectedPayment('card')}
        >
          <Text style={[styles.paymentText, { color: selectedPayment === 'card' ? '#FFFFFF' : '#242424' }]}>Cartão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentButton, selectedPayment === 'pix' ? styles.selected : styles.unselected]}
          onPress={() => setSelectedPayment('pix')}
        >
          <Text style={[styles.paymentText, { color: selectedPayment === 'pix' ? '#FFFFFF' : '#242424' }]}>Pix</Text>
        </TouchableOpacity>
      </View>

      {/* Card Details (If Card is selected) */}
      {selectedPayment === 'card' && (
        <View style={styles.cardDetailsContainer}>
          <TextInput style={styles.input} placeholder="Nome impresso no cartão" placeholderTextColor="#8C8C8C" />
          <TextInput style={styles.input} placeholder="Número do cartão" keyboardType="numeric" placeholderTextColor="#8C8C8C" />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Validade (MM/AAAA)"
              keyboardType="numeric"
              placeholderTextColor="#8C8C8C"
            />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="CVC" keyboardType="numeric" placeholderTextColor="#8C8C8C" />
          </View>
        </View>
      )}

      {/* Pix Details (If Pix is selected) */}
      {selectedPayment === 'pix' && (
        <View style={styles.cardDetailsContainer}>
          <TextInput style={styles.input} placeholder="Chave Pix" placeholderTextColor="#8C8C8C" />
        </View>
      )}

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Cart Summary */}
      <View style={styles.cartSummaryContainer}>
        <Text style={styles.cartText}>Resumo do Carrinho</Text>
        
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.scrollView}
        />
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Total Price Section */}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>R$ {getTotalPrice() ? getTotalPrice().toFixed(2) : '0.00'}</Text>
      </View>

      {/* Payment Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('Validação', { produtos: cartItems })} 
      >
        <Text style={styles.payText}>Pagar</Text>
      </TouchableOpacity>

   
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TelaInicial')}>
          <FontAwesome6 name="house" size={20} color={'#A2A2A2'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Carrinho')}>
          <FontAwesome name="shopping-cart" size={30} color={'#A2A2A2'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Pagamento')}>
          <FontAwesome name="credit-card" size={24} color={'#A80000'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Validação')}>
          <Ionicons name="ticket" size={30} color={'#A2A2A2'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  paymentButton: {
    width: '48%',
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#000066',
  },
  unselected: {
    backgroundColor: '#E6E6E6',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDetailsContainer: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    height: 40,
    color: '#242424',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginVertical: 16,
  },
  cartSummaryContainer: {
    marginBottom: 5,
  },
  scrollView: {
    maxHeight: 150,
  },
  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Adicionando alinhamento vertical
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemImage: {
    width: 50, // Largura da imagem
    height: 50, // Altura da imagem
    marginRight: 10, // Espaçamento entre a imagem e o texto
  },
  cartItemName: {
    flex: 1,
    textAlign: 'left',
  },
  cartItemPrice: {
    flex: 1,
    textAlign: 'center',
  },
  cartItemQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#000066',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#000066',
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  payText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  navItem: {
    alignItems: 'center',
  },
});

export default PaymentScreen;
