import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Picker, FlatList } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Nhận thông tin sản phẩm từ route.params
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const [size, setSize] = useState('M'); // State to track selected size (default 'M')
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products

  useEffect(() => {
    // Function to fetch related products based on category or brand
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
        const data = await response.json();
        setRelatedProducts(data.filter(item => item.id !== product.id)); // Exclude current product
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product.category, product.id]);

  const handleQuantityChange = (value) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue > 0) {
      setQuantity(newValue);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Quantity Adjuster */}
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Số lượng:</Text>
        <View style={styles.quantityAdjuster}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.adjustButton}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={incrementQuantity} style={styles.adjustButton}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Size Picker */}
      <View style={styles.sizeContainer}>
        <Text style={styles.label}>Kích cỡ:</Text>
        <Picker
          selectedValue={size}
          style={styles.sizePicker}
          onValueChange={(itemValue) => setSize(itemValue)}
        >
          <Picker.Item label="S" value="S" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="L" value="L" />
          <Picker.Item label="XL" value="XL" />
        </Picker>
      </View>

      {/* Buy Now and Add to Cart Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => console.log('Thêm vào giỏ hàng:', product.title, 'Số lượng:', quantity, 'Kích cỡ:', size)}
        >
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => console.log('Mua ngay:', product.title, 'Số lượng:', quantity, 'Kích cỡ:', size)}
        >
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Related Products Section */}
      <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
      <FlatList
        data={relatedProducts}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.relatedProductItem} 
            onPress={() => navigation.navigate('ProductDetail', { product: item })} // Chuyển đến chi tiết sản phẩm
          >
            <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
            <Text style={styles.relatedProductName}>{item.title}</Text>
            <Text style={styles.relatedProductPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
  },
  adjustButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 60,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  sizeContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sizePicker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buyNowButton: {
    backgroundColor: '#00CC33',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF6633',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  relatedProductItem: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  relatedProductName: {
    fontSize: 14,
    textAlign: 'center',
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export { ProductDetailScreen };
