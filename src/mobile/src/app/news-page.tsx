import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NewsCard from '@/components/newsCard';
import NewsModal from '@/components/newsModal';
import { Loading } from '@/components/loading';
import NavBarCEO from "@/components/NavBarCEO";


const NewsScreen: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState<null | typeof articles[0]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/News/top-headlines', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleCardPress = (article: typeof articles[0]) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notícias</Text>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              title={item.title}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
      )}
      {selectedArticle && (
        <NewsModal
          visible={!!selectedArticle}
          onClose={handleCloseModal}
          title={selectedArticle.title}
          url={selectedArticle.url}
          publisher={selectedArticle.publisher.name}
          publishedDate={selectedArticle.published_date}
        />
      )}
     <NavBarCEO />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NewsScreen;
