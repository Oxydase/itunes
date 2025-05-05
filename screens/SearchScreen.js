import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { fetchTracks } from '../services/itunesAPI';
import TrackItem from '../components/TrackItem';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const data = await fetchTracks(searchTerm);
    setResults(data);
  };

  return (
    <View style={{ padding: 16 }}>
        <Button title="Voir mes favoris" onPress={() => navigation.navigate('Favoris')} />
      <TextInput
        placeholder="Nom artiste ou morceau"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <Button title="Rechercher" onPress={search} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId?.toString()}
        renderItem={({ item }) => (
          <TrackItem track={item} onPress={() => navigation.navigate('Détail', { track: item })} />
        )}
      />
    </View>
  );
}
