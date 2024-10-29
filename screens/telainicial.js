import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

// Mapeamento das imagens dos produtos
const imageMapping = {
  'Coxinha de Frango': require('../assets/coxinha.png'),
  'Pastel de Frango': require('../assets/pastel_frango.png'),
  'Pastel de Carne': require('../assets/pastel_carne.png'),
  'Pastel de Queijo': require('../assets/pastel_queijo.png'),
  'Hambúrguer': require('../assets/hamburguer.png'),
  'KitKat': require('../assets/kitkat.png'),
  'Halls Menta': require('../assets/halls.png'),
  'Bolo de Chocolate': require('../assets/bolo.png'),
  'Snickers': require('../assets/snickres.png'),
  'Coca Cola': require('../assets/coca.png'),
  'Coca Cola Zero': require('../assets/coca-zero.png'),
  'Fanta Uva': require('../assets/fanta-uva.png'),
  'Fanta Laranja': require('../assets/fanta-laranja.png'),
  'Pepsi': require('../assets/pepsi.png'),
  'Suco Natural de Laranja': require('../assets/suco-laranja.png'),
  'Suco Natural de Acerola': require('../assets/suco-acerola.png'),
  'Suco Natural de Maracuja': require('../assets/suco-maracuja.png'),
  'Guaraná Antarctica': require('../assets/guarana.png'),
  'Gatorade': require('../assets/gatorade.png'),
};

const TelaInicial = ({ navigation, userType }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { cartItems, addToCart } = useCart();
  const [activePage, setActivePage] = useState('TelaInicial');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:5000/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'Todos'
      ? products
      : products.filter(product => product.id_categoria === selectedCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  useFocusEffect(() => {
    setActivePage('TelaInicial');
  });

  return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={24} color="#FFFFFF" />
            <Text style={styles.cartText}> Carrinho ({totalItemsInCart})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {['Todos', 'Combos', 'Comidas', 'Bebidas', 'Outros'].map((category) => (
                <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.filterButton, { backgroundColor: selectedCategory === category ? '#000066' : '#DEDEDE' }]}
                >
                  <Text style={[styles.filterText, { color: selectedCategory === category ? '#FFFFFF' : '#050505' }]}>
                    {category}
                  </Text>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <FlatList
              data={filteredProducts}
              numColumns={2}
              renderItem={({ item }) => (
                  <View style={styles.productBox}>
                    <Image source={imageMapping[item.nome] || require('../assets/default.png')} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.nome}</Text>
                      <View style={styles.addToCartRow}>
                        <Text style={styles.productPrice}>
                          R$ {(
                            (userType === 'aluno' && item.preco_aluno != null ? parseFloat(item.preco_aluno) :
                                    userType === 'funcionario' && item.preco_funcionario != null ? parseFloat(item.preco_funcionario) :
                                        item.preco_base != null ? parseFloat(item.preco_base) : 0
                            ).toFixed(2).replace('.', ',')
                        )}
                        </Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => handleAddToCart(item)}
                        >
                          <FontAwesome name="plus" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ marginTop: 10, alignItems: 'center' }}
          />
        </View>

        {/* Nav Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActivePage('TelaInicial');
                navigation.navigate('TelaInicial');
              }}
          >
            <View style={styles.navItemContainer}>
              <FontAwesome6 name="house" size={20} color={activePage === 'TelaInicial' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'TelaInicial' && <View style={styles.elipse} />}
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActivePage('Carrinho');
                navigation.navigate('Carrinho');
              }}
          >
            <View style={styles.navItemContainer}>
              <FontAwesome name="shopping-cart" size={30} color={activePage === 'Carrinho' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'Carrinho' && <View style={styles.elipse} />}
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActivePage('Pagamento');
                navigation.navigate('Pagamento');
              }}
          >
            <View style={styles.navItemContainer}>
              <FontAwesome name="credit-card" size={24} color={activePage === 'Pagamento' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'Pagamento' && <View style={styles.elipse} />}
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActivePage('Validação');
                navigation.navigate('Validação');
              }}
          >
            <View style={styles.navItemContainer}>
              <Ionicons name="ticket" size={30} color={activePage === 'Validação' ? '#A80000' : '#A2A2A2'} />
            </View>
            {activePage === 'Validação' && <View style={styles.elipse} />}
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  // Top Section
  topSection: {
    flex: 0.5,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cartText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },

  // Filters Section
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  filterText: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '600',
  },

  // Bottom Section
  bottomSection: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingBottom: 1,
  },
  productBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 8,
    backgroundColor: '#E9E4DE',
    borderRadius: 8,
    padding: 10,
    width: '47%',
    height: 200, // Ajuste a altura para garantir que todos fiquem alinhados
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain', // Ajuste para manter a proporção da imagem
  },
  productDetails: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00005C',
  },
  addToCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#000066',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: 40,
    height: 35,
    alignItems: 'center',
  },

  // Nav Bar
  navBar: {
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
    position: 'relative',
    width: 60,
    marginBottom: 10,
  },
  navItemContainer: {
    alignItems: 'center',
  },
  elipse: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#A80000',
    left: '50%',
    marginLeft: -10,
  },
});


export default TelaInicial;
