// LoginPage.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter
  const navigation = useNavigation(); // Initialize useNavigation

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Lỗi xác thực', 'Vui lòng nhập cả email và mật khẩu.');
      return;
    }

    // Handle login logic here (e.g., API call)
    Alert.alert('Thành công', 'Đăng nhập thành công!');
    
    // Navigate to the Home page
    navigation.navigate('Home'); // Use the appropriate route name for your Home page
    // Alternatively, you can use router.push('/home'); if using expo-router
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: '/assets/images/dangnhap.png' }} // Adjust the path to your logo image
          style={styles.logo}
        />
        <Text style={styles.header}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
        />

        <Button
          title="Đăng nhập"
          onPress={handleLogin}
          color="#007BFF"
        />

        <TouchableOpacity onPress={() => router.push('/Register')} style={styles.registerLink}>
          <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Center items inside the container
  },
  logo: {
    width: 100, // Adjust the width of the logo
    height: 100, // Adjust the height of the logo
    marginBottom: 24, // Space between logo and header
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 45,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 4,
    width: '100%', // Ensure input takes full width of its container
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default LoginPage;
