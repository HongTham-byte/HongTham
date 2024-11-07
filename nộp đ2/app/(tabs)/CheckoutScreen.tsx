// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// const CheckoutScreen = ({ route, navigation }) => {
//   const { cartItems, totalAmount } = route.params; // Nhận thông tin giỏ hàng từ route.params

//   const handlePayment = () => {
//     // Xử lý thanh toán
//     console.log('Thanh toán thành công');
//     navigation.navigate('Home'); // Ví dụ: quay về màn hình chính sau khi thanh toán
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Thông tin thanh toán</Text>

//       {/* Danh sách sản phẩm trong giỏ hàng */}
//       <View style={styles.cartList}>
//         {cartItems.map((item) => (
//           <View key={item.id} style={styles.cartItem}>
//             <Image source={{ uri: item.image }} style={styles.cartItemImage} />
//             <View style={styles.cartItemDetails}>
//               <Text style={styles.cartItemName}>{item.title}</Text>
//               <Text style={styles.cartItemPrice}>${item.price} x {item.quantity}</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Tổng tiền */}
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>Tổng cộng:</Text>
//         <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
//       </View>

//       {/* Thông tin người dùng */}
//       <View style={styles.userInfoContainer}>
//         <Text style={styles.userInfoTitle}>Thông tin người nhận</Text>
//         <Text style={styles.userInfoText}>Họ và tên: John Doe</Text>
//         <Text style={styles.userInfoText}>Địa chỉ: 123 Đường ABC, Thành phố XYZ</Text>
//         <Text style={styles.userInfoText}>Số điện thoại: 0123456789</Text>
//       </View>

//       {/* Nút thanh toán */}
//       <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
//         <Text style={styles.payButtonText}>Thanh toán</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cartList: {
//     marginBottom: 20,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cartItemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   cartItemDetails: {
//     flex: 1,
//   },
//   cartItemName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cartItemPrice: {
//     fontSize: 14,
//     color: '#888',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   totalAmount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00CC33',
//   },
//   userInfoContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   userInfoTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   userInfoText: {
//     fontSize: 16,
//     color: '#444',
//   },
//   payButton: {
//     backgroundColor: '#00CC33',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   payButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export { CheckoutScreen };
