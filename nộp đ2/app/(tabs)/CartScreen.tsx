// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { TextInput } from "react-native-gesture-handler";

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [cardNumber, setCardNumber] = useState(""); // Trạng thái cho số thẻ
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/carts");
//         const data = await response.json();
//         setCartItems(data);
//         const initialQuantities = data.reduce((acc, item) => {
//           item.products.forEach((product) => {
//             acc[product.productId] = product.quantity || 1;
//           });
//           return acc;
//         }, {});
//         setQuantities(initialQuantities);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchCart();
//     fetchProducts();
//   }, []);

//   const handleQuantityChange = (id, change) => {
//     setQuantities((prev) => {
//       const newQuantity = Math.max((prev[id] || 0) + change, 0);
//       if (newQuantity === 0) {
//         const { [id]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [id]: newQuantity };
//     });
//   };

//   const handleCheckout = () => {
//     if (!paymentMethod) {
//       Alert.alert("Thông báo", "Vui lòng chọn phương thức thanh toán!");
//     } else if (totalAmount === 0) {
//       Alert.alert(
//         "Thông báo",
//         "Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ hàng!"
//       );
//     } else {
//       setModalVisible(true);
//     }
//   };

//   const handlePayment = () => {
//     if (paymentMethod === "qr") {
//       navigation.navigate("PaymentScreen", { totalAmount }); // Điều hướng sang PaymentScreen
//     } else if (paymentMethod === "cash") {
//       Alert.alert("Thông báo", "Bạn đã chọn thanh toán bằng tiền mặt");
//     } else if (paymentMethod === "card") {
//       if (!cardNumber) {
//         Alert.alert("Thông báo", "Vui lòng nhập số thẻ");
//         return;
//       }
//       Alert.alert("Thông báo", "Bạn đã chọn thanh toán qua thẻ");
//     }
//     setModalVisible(false); // Đóng modal sau khi thanh toán
//     setCardNumber(""); // Xóa số thẻ
//     setPaymentMethod(""); // Đặt lại phương thức thanh toán
//   };
//   const totalAmount =
//     cartItems.reduce((total, cartItem) => {
//       const productsInCart = cartItem.products || [];
//       return (
//         total +
//         productsInCart.reduce((innerTotal, product) => {
//           const productDetails = products.find(
//             (p) => p.id === product.productId
//           );
//           const quantity = quantities[product.productId] || 0;
//           return innerTotal + productDetails.price * quantity;
//         }, 0)
//       );
//     }, 0) || 0;

//   const renderProduct = ({ item }) => {
//     const productsInCart = item.products || [];

//     return (
//       <>
//         {productsInCart.map((product) => {
//           const productDetails = products.find(
//             (p) => p.id === product.productId
//           );
//           const quantity = quantities[product.productId] || 0;

//           return (
//             <View style={styles.productContainer} key={product.productId}>
//               <Image
//                 source={{ uri: productDetails.image }}
//                 style={styles.productImage}
//               />
//               <View style={styles.productInfo}>
//                 <Text style={styles.productName}>{productDetails.title}</Text>
//                 <Text style={styles.totalText}>
//                   Tổng tiền:{" "}
//                   {(productDetails.price * quantity).toLocaleString()} VND
//                 </Text>
//                 <View style={styles.quantityContainer}>
//                   <TouchableOpacity
//                     onPress={() => handleQuantityChange(product.productId, -1)}
//                   >
//                     <Text style={styles.quantityButton}>-</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.quantityText}>{quantity}</Text>
//                   <TouchableOpacity
//                     onPress={() => handleQuantityChange(product.productId, 1)}
//                   >
//                     <Text style={styles.quantityButton}>+</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           );
//         })}
//       </>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Giỏ Hàng</Text>
//       <FlatList
//         data={cartItems}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         style={styles.list}
//       />
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>
//           Tổng tiền: {totalAmount.toLocaleString()} VND
//         </Text>
//         <Text style={styles.paymentHeader}>Chọn phương thức thanh toán:</Text>
//         <View style={styles.paymentOptions}>
//           <TouchableOpacity
//             style={[
//               styles.paymentButton,
//               paymentMethod === "cash" && styles.paymentButtonSelected,
//             ]}
//             onPress={() => setPaymentMethod("cash")}
//           >
//             <Text style={styles.paymentText}>Tiền mặt</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//           style={[
//             styles.paymentButton,
//             paymentMethod === "qr" && styles.paymentButtonSelected,
//           ]}
//           onPress={() => setPaymentMethod("qr")}
//         >
//           <Text style={styles.paymentText}>Mã QRCode</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         style={styles.checkoutButton}
//         onPress={handleCheckout}
//       >
//         <Text style={styles.checkoutText}>Thanh toán</Text>
//       </TouchableOpacity>
//     </View>
//     <TouchableOpacity
//       style={styles.exitButton}
//       onPress={() => navigation.navigate("Home")}
//     >
//       <Text style={styles.exitText}>Thoát</Text>
//     </TouchableOpacity>

//     <Modal
//       transparent={true}
//       animationType="slide"
//       visible={modalVisible}
//       onRequestClose={() => setModalVisible(false)}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Thông tin thanh toán</Text>
//           {paymentMethod === "cash" ? (
//             <Text style={styles.modalText}>Thanh toán bằng Tiền mặt</Text>
//           ) : paymentMethod === "qr" ? (
//             <Text style={styles.modalText}>Quét mã QR để thanh toán</Text>
//           ) : paymentMethod === "card" ? (
//             <TextInput
//               placeholder="Số thẻ"
//               style={styles.input}
//               value={cardNumber}
//               onChangeText={setCardNumber}
//             />
//           ) : null}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={handlePayment}
//           >
//             <Text style={styles.modalButtonText}>Xác nhận</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => setModalVisible(false)}
//           >
//             <Text style={styles.modalButtonText}>Hủy</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   </SafeAreaView>
// );
// };

// // Styles remain unchanged...
// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   padding: 16,
//   backgroundColor: "#ffffff",
// },
// header: {
//   fontSize: 28,
//   fontWeight: "bold",
//   color: "#333",
//   marginBottom: 16,
// },
// list: {
//   marginBottom: 20,
// },
// productContainer: {
//   flexDirection: "row",
//   backgroundColor: "#f9f9f9",
//   borderRadius: 10,
//   padding: 12,
//   marginBottom: 15,
//   shadowColor: "#000",
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: 2 },
//   shadowRadius: 5,
//   elevation: 3,
// },
// productImage: {
//   width: 80,
//   height: 80,
//   borderRadius: 10,
// },
// productInfo: {
//   flex: 1,
//   marginLeft: 12,
// },
// productName: {
//   fontSize: 16,
//   fontWeight: "bold",
//   marginBottom: 4,
// },
// totalText: {
//   fontSize: 14,
//   marginBottom: 8,
// },
// quantityContainer: {
//   flexDirection: "row",
//   alignItems: "center",
// },
// quantityButton: {
//   fontSize: 20,
//   color: "#007BFF",
//   paddingHorizontal: 10,
// },
// quantityText: {
//   fontSize: 16,
//   marginHorizontal: 10,
// },
// totalContainer: {
//   padding: 16,
//   backgroundColor: "#f0f0f0",
//   borderRadius: 10,
//   marginTop: 16,
// },
// paymentHeader: {
//   fontSize: 18,
//   marginBottom: 8,
//   fontWeight: "bold",
// },
// paymentOptions: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginBottom: 16,
// },
// paymentButton: {
//   flex: 1,
//   padding: 10,
//   backgroundColor: "#007BFF",
//   borderRadius: 5,
//   marginHorizontal: 5,
//   alignItems: "center",
// },
// paymentButtonSelected: {
//   backgroundColor: "#0056b3",
// },
// paymentText: {
//   color: "#fff",
//   fontWeight: "bold",
// },
// checkoutButton: {
//   backgroundColor: "#28a745",
//   padding: 15,
//   borderRadius: 5,
//   alignItems: "center",
// },
// checkoutText: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 16,
// },
// exitButton: {
//   backgroundColor: "#dc3545",
//   padding: 15,
//   borderRadius: 5,
//   alignItems: "center",
//   marginTop: 10,
// },
// exitText: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 16,
// },
// modalContainer: {
//   flex: 1,
//   justifyContent: "center",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
// },
// modalContent: {
//   backgroundColor: "#fff",
//   padding: 20,
//   marginHorizontal: 20,
//   borderRadius: 10,
//   alignItems: "center",
// },
// modalTitle: {
//   fontSize: 20,
//   fontWeight: "bold",
//   marginBottom: 15,
// },
// modalText: {
//   fontSize: 16,
//   marginBottom: 15,
// },
// input: {
//   borderWidth: 1,
//   borderColor: "#ccc",
//   borderRadius: 5,
//   padding: 10,
//   width: "100%",
//   marginBottom: 15,
// },
// modalButton: {
//   backgroundColor: "#007BFF",
//   padding: 10,
//   borderRadius: 5,
//   marginVertical: 5,
//   width: "100%",
//   alignItems: "center",
// },
// modalButtonText: {
//   color: "#fff",
//   fontWeight: "bold",
// },
// });

// export default CartScreen;