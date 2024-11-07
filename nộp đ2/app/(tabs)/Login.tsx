import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === 'beemm@gmail.com' && password === '00000') {
      router.replace("/(tabs)");
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
        <View style={styles.content}>
          {isLoggedIn ? (
            <>
              <Text style={styles.welcome}>Chào mừng, {email}!</Text>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image 
                source={require('@/assets/images/dangnhap.png')} // Replace with your logo path or remote URL
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Đăng Nhập</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
                <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  logo: {
    width: 150, // Adjust the width as necessary
    height: 150, // Adjust the height as necessary
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 30, // Space between logo and title
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    zIndex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  welcome: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    zIndex: 1,
    fontSize: 16,
  },
});

export default Login;
