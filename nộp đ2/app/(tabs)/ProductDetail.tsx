// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     TouchableOpacity,
//     Picker,
//     ActivityIndicator,
//     Modal,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const ProductScreen = () => {
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('M');
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [modalVisible, setModalVisible] = useState(false);
//     const navigation = useNavigation();
//     const route = useRoute();

//     const productId = route.params?.productId; 

//     useEffect(() => {
//         if (productId) {
//             const fetchProduct = async () => {
//                 try {
//                     const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch product');
//                     }
//                     const data = await response.json();
//                     setProduct(data);
//                 } catch (error) {
//                     console.error('Error fetching product:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchProduct();
//         } else {
//             console.error('Product ID is not defined.');
//             setLoading(false);
//         }
//     }, [productId]);

//     const handleAddToCart = () => {
//         setModalVisible(true); // Hiển thị modal khi thêm vào giỏ hàng
//     };

//     const handleBuyNow = () => {
//         navigation.navigate('PaymentScreen', {
//             product,
//             quantity,
//             selectedSize,
//         });
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!product) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text>Product not found</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <Image source={{ uri: product.image }} style={styles.foodImage} />
//             <Text style={styles.titleText}>{product.title}</Text>
//             <Text style={styles.priceText}>{product.price} USD</Text>
//             <Text style={styles.descriptionText}>{product.description}</Text>

//             <View style={styles.sizePickerContainer}>
//                 <Text style={styles.sizeLabel}>Chọn kích cỡ:</Text>
//                 <Picker
//                     selectedValue={selectedSize}
//                     style={styles.sizePicker}
//                     onValueChange={(itemValue) => setSelectedSize(itemValue)}
//                 >
//                     <Picker.Item label="S" value="S" />
//                     <Picker.Item label="M" value="M" />
//                     <Picker.Item label="L" value="L" />
//                     <Picker.Item label="XL" value="XL" />
//                 </Picker>
//             </View>

//             <View style={styles.cartContainer}>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1, 1))}>
//                         <Text style={styles.cartButton}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantityText}>{quantity}</Text>
//                     <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
//                         <Text style={styles.cartButton}>+</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.buttonRow}>
//                     <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
//                         <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
//                         <Text style={styles.addToCartText}>Mua ngay</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Modal hiển thị khi sản phẩm được thêm vào giỏ hàng */}
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalText}>Sản phẩm đã được thêm vào giỏ hàng!</Text>
//                         <TouchableOpacity
//                             style={styles.viewCartButton}
//                             onPress={() => {
//                                 setModalVisible(false);
//                                 navigation.navigate('CartScreen');
//                             }}
//                         >
//                             <Text style={styles.viewCartText}>Đi đến giỏ hàng</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.closeModalButton}
//                             onPress={() => setModalVisible(false)}
//                         >
//                             <Text style={styles.closeModalText}>Đóng</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#ffffff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     foodImage: {
//         width: '100%',
//         height: 200, 
//         borderRadius: 10,
//         marginBottom: 16,
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     priceText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#ff6347',
//         marginBottom: 8,
//     },
//     titleText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         color: '#333',
//     },
//     descriptionText: {
//         fontSize: 14,
//         marginVertical: 8,
//         color: '#666',
//         lineHeight: 20,
//     },
//     sizePickerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 12,
//     },
//     sizeLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginRight: 10,
//     },
//     sizePicker: {
//         height: 40,
//         width: 120,
//     },
//     cartContainer: {
//         marginTop: 20,
//         width: '100%',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//         backgroundColor: '#f0f0f0',
//         padding: 8,
//         borderRadius: 8,
//     },
//     cartButton: {
//         fontSize: 18,
//         backgroundColor: '#28a745',
//         color: '#fff',
//         padding: 10,
//         borderRadius: 8,
//         width: 40,
//         textAlign: 'center',
//     },
//     quantityText: {
//         fontSize: 18,
//         textAlign: 'center',
//         marginHorizontal: 12,
//         color: '#333',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     addToCartButton: {
//         backgroundColor: '#28a745',
//         padding: 12,
//         borderRadius: 8,
//         flex: 1,
//         marginRight: 10,
//         alignItems: 'center',
//     },
//     buyNowButton: {
//         backgroundColor: '#ff6347',
//         padding: 12,
//         borderRadius: 8,
//         flex: 1,
//         alignItems: 'center',
//     },
//     addToCartText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     viewCartButton: {
//         backgroundColor: '#007bff',
//         padding: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     viewCartText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalView: {
//         width: 300,
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//     },
//     modalText: {
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     closeModalButton: {
//         backgroundColor: '#ff6347',
//         padding: 10,
//         borderRadius: 8,
//         marginTop: 10,
//     },
//     closeModalText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default ProductScreen;