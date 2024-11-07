import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProductDetailScreen } from './detail';
import { CartScreen } from './cart';

const BANNER_IMAGE = 'https://thietkehaithanh.com/wp-content/uploads/2013/08/thietkehaithanh-banner2.jpg';
const CATEGORIES = ['All', 'Men\'s Clothing', 'Women\'s Clothing', 'Electronics', 'Jewelry'];

const ProductListScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = query
            ? products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            )
            : products;
        setFilteredProducts(filtered);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const filtered = category === 'All'
            ? products
            : products.filter(product => product.category === category.toLowerCase());
        setFilteredProducts(filtered);
    };

    const handleProductPress = (item) => {
        navigation.navigate('ProductDetail', { product: item });
    };

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Function to format the price in USD
    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`; // Format as USD
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productWrapper}>
            <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productText}>{item.title}</Text>
                <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                
                {/* Buttons container */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                    
                    {/* New Buy Now button */}
                    <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.buyNowButton}>
                        <Text style={styles.buyNowText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategorySelect(item)}>
            <View style={[styles.categoryItem, selectedCategory === item && styles.selectedCategory]}>
                <Text style={styles.categoryText}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Beem Shop</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
                    <Icon name="search" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cartItems })}>
                    <Icon name="shopping-cart" size={30} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Image source={{ uri: BANNER_IMAGE }} style={styles.banner} />
            </View>

            {/* Categories */}
            <FlatList
                data={CATEGORIES}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryList}
            />

            <Text style={styles.featuredTitle}>SẢN PHẨM NỔI BẬT</Text>

            {/* Products List */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={styles.row}
                style={styles.productList}
            />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Beem Shop</Text>
                <Text style={styles.footerText}>Email : hongtham04@gmail.com.</Text>
                <View style={styles.footerLinks}>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Stack Navigator for navigation
const Stack = createStackNavigator();

const App = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: 'Danh sách sản phẩm' }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: 'Chi tiết sản phẩm' }}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Giỏ hàng' }}
            />
        </Stack.Navigator>
    );
};

// Styles for the application
const styles = StyleSheet.create({
    headerTitle: {
        backgroundColor: '#008800', // Green background for the header
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        color: '#fff',
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#006600', // Darker green for bottom border
    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5', // Light background color
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    searchBar: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    cartButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    bannerContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    productList: {
        marginTop: 20,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productWrapper: {
        flex: 1,
        margin: 5,
    },
    productItem: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 230,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    productText: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold', // Bold for product titles
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
    },
    categoryList: {
        marginBottom: -200,
    },
    categoryItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginRight: 12, // Increased margin for spacing
        elevation: 1, // Shadow effect
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
    selectedCategory: {
        backgroundColor: '#008000', // Green for selected category
    },
    categoryText: {
        fontSize: 19,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, // Add some space between the product details and buttons
        width: '100%', // Ensure buttons stretch across full width
    },
    addToCartButton: {
        backgroundColor: '#008800', // Green button for adding to cart
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1, // Allow the button to take full width within its space
        marginRight: 10, // Add some space between the buttons
    },
    buyNowButton: {
        backgroundColor: '#ff5722', // Orange button for "Buy Now"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1, // Allow the button to take full width within its space
    },
    addToCartText: {
        color: '#fff', // White text for the button
        textAlign: 'center',
    },
    buyNowText: {
        color: '#fff', // White text for the button
        textAlign: 'center',
    },
    featuredTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 20,  // Thêm marginTop để đẩy xuống
        textAlign: 'left',
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 10,
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
