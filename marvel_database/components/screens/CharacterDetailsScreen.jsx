import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchCharacterComics, fetchCharacterSeries, fetchCharacterEvents, fetchCharacterStories } from '../../services/characterService';

const CharacterDetailsScreen = ({ route }) => {
  const { character } = route.params;

  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      setLoading(true);
      const [comicsData, seriesData, eventsData, storiesData] = await Promise.all([
        fetchCharacterComics(character.id),
        fetchCharacterSeries(character.id),
        fetchCharacterEvents(character.id),
        fetchCharacterStories(character.id),
      ]);
      setComics(comicsData);
      setSeries(seriesData);
      setEvents(eventsData);
      setStories(storiesData);
      setLoading(false);
    };

    loadCharacterDetails();
  }, [character.id]);

  const Skeleton = () => (
    <View style={styles.skeleton}>
      <ActivityIndicator size="large" color="#e63946" />
      <Text style={styles.loadingText}>Cargando datos...</Text>
    </View>
  );

  const Carousel = ({ data, type }) => {
    if (data.length === 0) {
      return <Text style={styles.emptyText}>No {type} available.</Text>;
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image
              source={{
                uri: item.thumbnail
                  ? `${item.thumbnail.path}.${item.thumbnail.extension}`
                  : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
              }}
              style={styles.carouselImage}
            />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <View style={styles.characterImageContainer}>
            <Image
              source={{
                uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
              }}
              style={styles.characterImage}
            />
          </View>
          
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.characterDescription}>
            {character.description || 'No description available.'}
          </Text>

          {[
            { title: 'Comics Available:', data: comics },
            { title: 'Series Available:', data: series },
            { title: 'Events Available:', data: events },
            { title: 'Stories Available:', data: stories },
          ].map(({ title, data }) => (
            <View key={title}>
              <Text style={styles.sectionTitle}>{title} {data.length}</Text>
              <Carousel data={data} type={title.toLowerCase().replace(' available:', '')} />
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 16,
  },
  characterImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  characterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#e63946',
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1d3557',
  },
  characterDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#457b9d',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselItem: {
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  carouselImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 5,
    width: 150,
    textAlign: 'center',
    color: '#1d3557',
  },
  skeleton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});

export default CharacterDetailsScreen;
