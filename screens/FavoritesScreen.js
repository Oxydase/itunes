import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const jsonValue = await AsyncStorage.getItem('favorites');
      setFavorites(jsonValue != null ? JSON.parse(jsonValue) : []);
    };

    const unsubscribe = loadFavorites();

    return () => unsubscribe;
  }, []);

  const removeFavorite = async (trackId) => {
    const filtered = favorites.filter((item) => item.trackId !== trackId);
    setFavorites(filtered);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));
    Alert.alert('Supprimé des favoris');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.artworkUrl60 }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.trackName}</Text>
        <Text style={styles.artist}>{item.artistName}</Text>
        <Text style={styles.rating}>Note : {item.rating} ⭐</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.trackId)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Aucun favori enregistré.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  image: { width: 60, height: 60, marginRight: 10 },
  title: { fontWeight: 'bold' },
  artist: { color: 'gray' },
  rating: { marginTop: 4 },
  delete: { fontSize: 24, color: 'red', marginLeft: 10 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});
