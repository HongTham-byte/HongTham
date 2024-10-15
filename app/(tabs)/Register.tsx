import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    // Handle successful registration
    Alert.alert('Success', 'Registration successful!');
    // Navigate to the login page after successful registration
    router.push('/Login'); // Use router.push with the correct route
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('@/assets/images/dangki.png')} // Đảm bảo đường dẫn đúng tới logo
          style={styles.logo}
        />
        <Text style={styles.header}>Đăng ký</Text>
        <Text style={styles.subHeader}>Tạo tài khoản mới</Text>

        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Tên đăng nhập"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />

        <Button
          title="Đăng ký"
          onPress={handleRegister}
          color="#007BFF"
        />

        <TouchableOpacity onPress={() => router.push('/Login')} style={styles.loginLink}>
          <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
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
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    alignSelf: 'center',
    marginBottom: 20, // Space between logo and the form
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 18,
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
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default RegistrationPage;
