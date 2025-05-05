import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function TrackItem({ track, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', marginVertical: 8 }}>
      <Image source={{ uri: track.artworkUrl60 }} style={{ width: 60, height: 60 }} />
      <View style={{ marginLeft: 10 }}>
        <Text>{track.trackName}</Text>
        <Text>{track.artistName}</Text>
      </View>
    </TouchableOpacity>
  );
}
