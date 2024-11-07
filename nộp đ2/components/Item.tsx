import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';

type ItemProps = {title: string; image: string};

const Item = ({title, image}: ItemProps) => (
  <View style={styles.item}>
    <Image source={{uri: image}} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} image={item.image} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center', // Center the content
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 100, // Width of the image
    height: 100, // Height of the image
    marginBottom: 10, // Space between image and title
  },
});

export default App;
