// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   Image,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const BANNER_IMAGE = 'https://thietkehaithanh.com/wp-content/uploads/2013/08/thietkehaithanh-banner2.jpg';
// const CATEGORIES = ['All', 'electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

// const Item = ({ title, image, price, onAddToCart, navigation }) => (
//   <View style={styles.item}>
//     <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { title, image, price })}>
//       <Image source={{ uri: image }} style={styles.image} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.price}>{price} USD</Text>
//         <TouchableOpacity style={styles.button} onPress={onAddToCart}>
//           <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   </View>
// );

// const App = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://fakestoreapi.com/products');
//         const data = await response.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch products');
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = () => {
//     setCartCount(prevCount => prevCount + 1);
//   };

//   const filteredData = products.filter(item =>
//     (selectedCategory === 'All' || item.category === selectedCategory) &&
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4caf50" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.headerTitle}>Beem Shop</Text>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search products..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity
//           style={styles.cartButton}
//           onPress={() => navigation.navigate("CartScreen")}
//         >
//           <Icon name="shopping-cart" size={30} color="#000" />
//           {cartCount > 0 && (
//             <View style={styles.cartCountContainer}>
//               <Text style={styles.cartCountText}>{cartCount}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="logout" size={30} color="#000" />
//         </TouchableOpacity>
//       </View>

//       <Image source={{ uri: BANNER_IMAGE }} style={styles.banner} />

//       <View style={styles.categoryContainer}>
//         {CATEGORIES.map(category => (
//           <TouchableOpacity
//             key={category}
//             style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
//             onPress={() => setSelectedCategory(category)}
//           >
//             <Text style={[styles.categoryText, styles.boldText]}>
//               {category}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.categoryHeader}>
//         <Text style={styles.categoryHeaderText}>SẢN PHẨM NỔI BẬT</Text>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={({ item }) => (
//           <Item
//             title={item.title}
//             image={item.image}
//             price={item.price}
//             onAddToCart={handleAddToCart}
//             navigation={navigation}
//           />
//         )}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.listContainer}
//         numColumns={2} // Specify the number of columns
//       />

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Beem Shop</Text>
//         <Text style={styles.footerText}>Email : hongtham04@gmail.com.</Text>
//         <View style={styles.footerLinks}>
//           <TouchableOpacity>
//             <Text style={styles.footerLink}>About Us</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={styles.footerLink}>Contact</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={styles.footerLink}>Privacy Policy</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   banner: {
//     width: '100%',
//     height: 250,
//     resizeMode: 'cover',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 5,
//     paddingHorizontal: 10,
//   },
//   searchInput: {
//     height: 60,
//     borderColor: 'black',
//     borderWidth: 1,
//     flex: 1,
//     borderRadius: 7,
//     paddingHorizontal: 10,
//   },
//   cartButton: {
//     marginLeft: 10,
//     position: 'relative',
//   },
//   cartCountContainer: {
//     position: 'absolute',
//     right: 0,
//     top: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//   },
//   cartCountText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   categoryHeader: {
//     marginVertical: 10,
//     paddingLeft: 15,
//   },
//   categoryHeaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'left',
//   },
//   listContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 20,
//   },
//   item: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginVertical: 8,
//     marginHorizontal: 8,
//     alignItems: 'center',
//     width: '45%',  // Chiếm 45% chiều rộng màn hình để vừa với hai cột
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',   // Chiều rộng hình ảnh chiếm hết phần tử cha
//     height: 120,     // Chiều cao cố định cho tất cả hình ảnh
//     resizeMode: 'contain',
//     borderRadius: 5,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//     height: 40,    // Đảm bảo chiều cao nhất định để tránh các title bị lệch
//   },
//   price: {
//     fontSize: 16,
//     color: '#4caf50',
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: '#4caf50',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   categoryButton: {
//     padding: 10,
//     marginHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: '#e0e0e0',
//     fontWeight: 'bold',
//   },
//   selectedCategory: {
//     backgroundColor: '#4caf50',
//     fontWeight: 'bold',
//   },
//   categoryText: {
//     color: '#333',
//   },
//   headerTitle: {
//     backgroundColor: '#008800',
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#fff',
//   },
//   boldText: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   footer: {
//     padding: 20,
//     backgroundColor: '#f1f1f1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   footerText: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   footerLinks: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   footerLink: {
//     color: '#4caf50',
//     fontSize: 16,
//     marginHorizontal: 10,
//   },
// });


// export default App;
