import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Picker,
} from 'react-native';

const App = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M'); // State for size

    const handleAddToCart = () => {
        // Logic to add the item to cart
        alert(`Added ${quantity} item(s) of size ${selectedSize} to cart`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Hình ảnh sản phẩm */}
            <Image
                source={{ uri: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/18/1082280/Ao-Dai2.jpg' }} // Thay đổi URL hình ảnh tại đây
                style={styles.foodImage}
            />

            {/* Thông tin sản phẩm */}
            <Text style={styles.titleText}>Áo Dài Học Sinh</Text>
            <Text style={styles.priceText}>750.000đ</Text>

            {/* Mô tả sản phẩm */}
            <Text style={styles.descriptionText}>
                Áo dài trơn trắng nữ học sinh, dáng dài, sang trọng.
            </Text>
            <Text style={styles.descriptionText}>
                Chất liệu vải mềm mịn, thoải mái khi mặc. Phù hợp với nhiều dịp lễ và sự kiện trang trọng.
            </Text>

            {/* Chọn kích cỡ */}
            <View style={styles.sizePickerContainer}>
                <Text style={styles.sizeLabel}>Chọn kích cỡ:</Text>
                <Picker
                    selectedValue={selectedSize}
                    style={styles.sizePicker}
                    onValueChange={(itemValue) => setSelectedSize(itemValue)}
                >
                    <Picker.Item label="S" value="S" />
                    <Picker.Item label="M" value="M" />
                    <Picker.Item label="L" value="L" />
                    <Picker.Item label="XL" value="XL" />
                </Picker>
            </View>

            {/* Số lượng sản phẩm trong kho */}
            <Text style={styles.stockText}>Số lượng sản phẩm có sẵn: 15</Text>

            {/* Khung điều chỉnh số lượng và nút thêm vào giỏ hàng */}
            <View style={styles.cartContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1, 1))}>
                        <Text style={styles.cartButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Text style={styles.cartButton}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Sắp xếp nút "Thêm vào giỏ hàng" và "Mua ngay" theo hàng ngang */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyNowButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#fff',
    },
    foodImage: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginVertical: 10,
    },
    priceText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6C757D',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'left',
    },
    descriptionText: {
        fontSize: 16,
        marginVertical: 10,
        color: '#555',
        textAlign: 'left',
    },
    sizePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    sizeLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    sizePicker: {
        height: 50,
        width: 150,
    },
    stockText: {
        fontSize: 16,
        color: 'green',
        marginBottom: 20,
    },
    cartContainer: {
        marginTop: 20,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    cartButton: {
        fontSize: 24,
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    quantityText: {
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row', // Sắp xếp các nút theo hàng ngang
        justifyContent: 'space-between',
        width: '100%', // Chiếm toàn bộ chiều ngang của container
    },
    addToCartButton: {
        backgroundColor: '#009933',
        padding: 10,
        borderRadius: 8,
        flex: 1, // Chia đều không gian với nút "Mua ngay"
        marginRight: 10, // Khoảng cách giữa hai nút
        alignItems: 'center',
    },
    buyNowButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 8,
        flex: 1, // Chia đều không gian với nút "Thêm vào giỏ hàng"
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default App;
