import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const productsData = [
    {
        id: '1',
        name: 'Aó Dài',
        price: 750000,
        sold: 120,
        imageUrl: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/18/1082280/Ao-Dai2.jpg',
    },
    {
        id: '2',
        name: 'Quần áo',
        price: 550000,
        sold: 150,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgH4sLZiMibvx7KSQso3p3UpH2fVFh7aQ8Q&s',
    },
    {
        id: '3',
        name: 'Aó măng tô',
        price: 300000,
        sold: 150,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrMtLU9SorfBOJbMaJ2onyYdg3DQDKO-6YPg&s',
    },
];

const CartSceen = () => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, change) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) + change, 0),
        }));
    };

    const totalAmount = Object.keys(quantities).reduce((total, id) => {
        const product = productsData.find((item) => item.id === id);
        return total + (product?.price || 0) * (quantities[id] || 0);
    }, 0);

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                <Text style={styles.productSold}>{item.sold} đã bán</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                        <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                        <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.header}>Trang chủ</Text> */}
            <Text style={styles.header}>Giỏ hàng của bạn</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm..."
            />
            <FlatList
                data={productsData}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng tiền: {totalAmount.toLocaleString()} VND</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    list: {
        marginBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        paddingLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
    },
    productSold: {
        fontSize: 12,
        color: '#888',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        fontSize: 24,
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: 5,
        borderRadius: 4,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    totalContainer: {
        alignItems: 'center', // Căn giữa nội dung theo chiều ngang
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Căn giữa văn bản "Tổng tiền"
        marginBottom: 10,    // Khoảng cách giữa "Tổng tiền" và nút "Thanh toán"
    },
    checkoutButton: {
        backgroundColor: '#ff5733',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center', // Căn giữa nút "Thanh toán"
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // Căn giữa văn bản trong nút "Thanh toán"
    },
});

export default CartSceen;
