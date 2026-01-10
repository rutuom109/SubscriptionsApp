import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ArticleItem from "../components/ArticleItem";
import { getArchivedArticles, saveArchivedArticles } from "../storage/archiveStorage";

const ArchivedNews = () => {
  const [archivedArticles, setArchivedArticles] = useState([]);

  useEffect(() => {
    loadArchived();
  }, []);

  const loadArchived = async () => {
    const data = await getArchivedArticles();
    setArchivedArticles(data);
  };

  const restoreArticle = async (article) => {
    const newArchived = archivedArticles.filter((a) => a.title !== article.title);
    setArchivedArticles(newArchived);
    await saveArchivedArticles(newArchived);
  };

  return (
    <View style={styles.container}>
      {archivedArticles.length === 0 ? (
        <Text style={styles.emptyText}>No archived articles.</Text>
      ) : (
        <FlatList
          data={archivedArticles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ArticleItem article={item} onRestore={restoreArticle} showRestore />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  emptyText: { color: "#fff", textAlign: "center", marginTop: 50, fontSize: 16 },
});

export default ArchivedNews;
