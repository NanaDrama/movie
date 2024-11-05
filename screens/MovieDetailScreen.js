import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=967cc148&i=${movieId}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>{movie.Title}</Text>
      <Text>{movie.Plot}</Text>
      <Text>Released: {movie.Released}</Text>
      <Text>Genre: {movie.Genre}</Text>
    </View>
  );
}
