import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CartScreen = ({ route, navigation }) => {
    const { cartItems } = route.params; // Nhận giỏ hàng từ params
    const [items, setItems] = useState(cartItems); // Tạo trạng thái giỏ hàng

    const removeFromCart = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const increaseQuantity = (id) => {
        const updatedItems = items.map(item => 
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item // Initialize quantity if not set
        );
        setItems(updatedItems);
    };

    const decreaseQuantity = (id) => {
        const updatedItems = items.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setItems(updatedItems);
    };

    // Calculate total quantity and total price
    const totalQuantity = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const totalPrice = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2); // Fixed to 2 decimal places

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>Giá: {item.price} đ</Text>
                <Text style={styles.productQuantity}>Số lượng: {item.quantity || 1}</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()} // Chuyển đổi id thành chuỗi
                />
            ) : (
                <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
            )}
            
            {/* Total Quantity and Price Display */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Tổng số lượng: {totalQuantity}</Text>
                <Text style={styles.totalPriceText}>Tổng tiền: {totalPrice} USD</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => alert('Chức năng thanh toán chưa được cài đặt!')}
            >
                <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    summaryContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cartItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 8,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
        marginVertical: 5,
    },
    productQuantity: {
        fontSize: 16,
        color: '#888',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    controlButton: {
        backgroundColor: '#32CD32', // Changed to green
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    controlButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#33CC33',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    removeButtonText: {
        color: 'white', // Fixed from 'while' to 'white'
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    checkoutButton: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%', // Full width button
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    totalPriceText: {
        fontSize: 24, // Increased font size for total price
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export { CartScreen };
