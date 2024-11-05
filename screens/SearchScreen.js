import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=967cc148&s=${query}`
      );
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search for a movie..."
        value={query}
        onChangeText={setQuery}
        style={{ borderBottomWidth: 1, marginBottom: 8 }}
      />
      <Button title="Search" onPress={searchMovies} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <Text
            onPress={() =>
              navigation.navigate('MovieDetail', { movieId: item.imdbID })
            }
          >
            {item.Title}
          </Text>
        )}
      />
    </View>
  );
}
