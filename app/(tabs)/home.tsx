import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const DATA = [
  { id: '1', title: 'quần jean', image: 'https://sheis.vn/wp-content/uploads/2022/06/tao-dang-voi-quan-ong-rong-6.jpg', price: '350.000 VNĐ', category: 'Quần áo' },
  { id: '1', title: 'Set jean', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgH4sLZiMibvx7KSQso3p3UpH2fVFh7aQ8Q&s', price: '550.000 VNĐ', category: 'Quần áo' },
  { id: '1', title: 'Set Nỉ', image: 'https://static.zara.net/assets/public/93b0/5c24/b24349ff90c6/2e230cf8366b/00039792712-e1/00039792712-e1.jpg?ts=1724232455130&w=824', price: '650.000 VNĐ', category: 'Quần áo' },
  { id: '2', title: 'áo măng tô', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKGpIzVEUbEnPSH1KhqiTcIOq4U3McPVlug&s', price: '900.000 VNĐ', category: 'Áo măng tô' },
  { id: '2', title: 'măng tô nam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYNdtfvjk7jwv2KpuAhxtdgKvoez1pmqTlg&s', price: '850.000 VNĐ', category: 'Áo măng tô' },
  { id: '3', title: 'áo form', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4F_WWePJtKciiAcLiB32Q5m79xAvTvUt4Uw&s', price: '450.000 VNĐ', category: 'Áo' },
  { id: '4', title: 'áo dài', image: 'https://file.hstatic.net/200000503583/file/tao-dang-mac-ao-dai__23_.jpg_284038791d3343afafeea4816e155643.jpg', price: '900.000 VNĐ', category: 'Áo dài' },
  { id: '4', title: 'áo cách tân', image: ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjHNNnyXbEYeX6vpwSO08ASvpKtNu6AfR8Sg&s', price: '1000.000 VNĐ', category: 'Áo dài' },
  { id: '4', title: 'áo dài học sinh', image: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/18/1082280/Ao-Dai2.jpg', price: '750.000 VNĐ', category: 'Áo dài' },
];

const BANNER_IMAGE = 'https://thietkehaithanh.com/wp-content/uploads/2013/08/thietkehaithanh-banner2.jpg';
const CATEGORIES = ['All', 'Quần áo', 'Áo dài', 'Áo măng tô'];

const Item = ({ title, image, price, onAddToCart }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { title, image, price })}>
    <Image source={{ uri: image }} style={styles.image} />
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };
  const navigation = useNavigation(); // Khai báo useNavigation
  const filteredData = DATA.filter(item =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Beem Shop</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("CartScreen")} // Điều hướng sang trang giỏ hàng
        >
          <Icon name="shopping-cart" size={30} color="#000" />
          {cartCount > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="logout" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: BANNER_IMAGE }} style={styles.banner} />

      <View style={styles.categoryContainer}>
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, (category === 'All' || category === 'Áo măng tô' || category === 'Quần áo' || category === 'Áo dài') && styles.boldText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>SẢN PHẨM NỔI BẬT</Text>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
            price={item.price}
            onAddToCart={handleAddToCart}
            navigation={navigation}//thêm
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Beem Shop</Text>
        <Text style={styles.footerText}>Email : hongtham04@gmail.com.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  banner: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  cartButton: {
    marginLeft: 10,
    position: 'relative', // For positioning the count badge
  },
  cartCountContainer: {
    position: 'absolute',
    right: 0,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartCountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryHeader: {
    marginVertical: 10,
    paddingLeft: 15,
  },
  categoryHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    width: '45%',

  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,

  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },
  selectedCategory: {
    backgroundColor: '#4caf50',
    fontWeight: 'bold',
  },
  categoryText: {
    color: '#333',
  },
  headerTitle: {
    backgroundColor: '#008800',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerLink: {
    color: '#4caf50',
    fontSize: 16,
    marginHorizontal: 10,
  },

});

export default App;
