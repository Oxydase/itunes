import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function DetailScreen({ route }) {
  const { track } = route.params;
  const [rating, setRating] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        const currentFavorites = jsonValue != null ? JSON.parse(jsonValue) : [];

        const found = currentFavorites.find((item) => item.trackId === track.trackId);
        if (found) {
          setRating(found.rating);
          setIsFavorite(true);
        }
      } catch (e) {
        console.error('Erreur lecture favoris :', e);
      }
    };

    checkIfFavorite();
  }, []);

  const saveToFavorites = async () => {
    if (isFavorite) return;

    try {
      const itemWithRating = {
        ...track,
        rating,
      };

      const jsonValue = await AsyncStorage.getItem('favorites');
      const currentFavorites = jsonValue != null ? JSON.parse(jsonValue) : [];

      const updatedFavorites = [...currentFavorites, itemWithRating];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      setIsFavorite(true);
      Alert.alert('Ajouté aux favoris !');
    } catch (e) {
      console.error('Erreur sauvegarde favoris :', e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>{track.artistName}</Text>
      <Text style={styles.album}>{track.collectionName}</Text>

      {isFavorite ? (
        <Text style={{ marginTop: 20, fontSize: 16 }}>
          Déjà ajouté aux favoris – Note donnée : {rating} ⭐
        </Text>
      ) : (
        <>
          <Picker
            selectedValue={rating}
            onValueChange={(itemValue) => setRating(itemValue)}
            style={styles.picker}
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <Picker.Item key={val} label={`${val} ⭐`} value={val} />
            ))}
          </Picker>
          <Button title="Ajouter aux favoris" onPress={saveToFavorites} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 4
  },
  artist: {
    fontSize: 16,
    color: 'gray'
  },
  album: {
    fontSize: 14,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginTop: 20
  },
  picker: {
    height: 50,
    width: 150
  }
});
