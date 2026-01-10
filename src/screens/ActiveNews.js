import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import ArticleItem from "../components/ArticleItem";
import { getTopHeadlines } from "../api/newsApi";
import { getArchivedArticles, saveArchivedArticles } from "../storage/archiveStorage";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

const ActiveNews = ({ navigation }) => {
  const [allArticles, setAllArticles] = useState([]);
  const [archivedArticles, setArchivedArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (isFocused) loadArchived();
  }, [isFocused]);

  useEffect(() => {
    const active = allArticles
      .filter((a) => !archivedArticles.some((arch) => arch.title === a.title))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    setActiveArticles(active);
  }, [allArticles, archivedArticles]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getTopHeadlines();
      setAllArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadArchived = async () => {
    const data = await getArchivedArticles();
    setArchivedArticles(data);
  };

  const archiveArticle = async (article) => {
    const newArchived = [article, ...archivedArticles];
    setArchivedArticles(newArchived);
    await saveArchivedArticles(newArchived);
  };

  const filteredArticles = activeArticles.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TextInput
          placeholder="Search by title or author"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.archiveBtn}
          onPress={() => navigation.navigate("ArchivedNews")}
        >
          <Text style={styles.archiveBtnText}>Archived</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center", marginTop: 50 }}>{error}</Text>
      ) : filteredArticles.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          No articles available
        </Text>
      ) : (
       <SwipeListView
  data={filteredArticles}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <ArticleItem article={item} />
  )}
  renderHiddenItem={({ item, index }, rowMap) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.archiveButton}
        onPress={() => {
          const rowKey = index.toString();
          if (rowMap[rowKey]) rowMap[rowKey].closeRow();
          archiveArticle(item);
        }}
      >
        <Icon name="archive" size={22} color="#fff" />
        <Text style={styles.archiveButtonText}>Archive</Text>
      </TouchableOpacity>
    </View>
  )}
  rightOpenValue={-100}
  disableRightSwipe
/>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  headerButtons: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  archiveBtn: {
    marginLeft: 10,
    backgroundColor: "#444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  archiveBtnText: { color: "#fff", fontWeight: "bold" },
 hiddenContainerWrapper: {
  flex: 1,
  marginVertical: 6,
  marginHorizontal: 12,
  borderRadius: 12,
  overflow: "hidden",
},
hiddenContainer: {
  flex: 1,
  backgroundColor: "#2c3e50",
  marginVertical: 6,
  marginHorizontal: 12,
  borderRadius: 12,

  justifyContent: "center",
  alignItems: "flex-end",
},

archiveButton: {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingHorizontal: 20,
},

archiveButtonText: {
  color: "#fff",
  fontWeight: "bold",
  marginLeft: 6,
  
},

});

export default ActiveNews;
