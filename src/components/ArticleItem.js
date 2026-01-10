import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ArticleItem = ({ article, onRestore, showRestore }) => {
  return (
    <View style={styles.container}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>{article.author || "Unknown Author"}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {article.content || ""}
        </Text>
        <Text style={styles.date}>
          {new Date(article.publishedAt).toLocaleString()}
        </Text>

        {showRestore && onRestore && (
          <TouchableOpacity style={styles.button} onPress={() => onRestore(article)}>
            <Icon name="arrow-undo" size={16} color="#fff" />
            <Text style={styles.buttonText}> Restore</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
     minHeight: 170,
  },
  image: { width: 100, height: 150,marginVertical:15,marginLeft:5 },
  textContainer: { flex: 1, padding: 12 },
  title: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  author: { color: "#ccc", fontSize: 12, marginTop: 2 },
  content: { color: "#aaa", fontSize: 14, marginTop: 4 },
  date: { color: "#888", fontSize: 10, marginTop: 4 },
  button: {
    flexDirection: "row",
    backgroundColor: "#444",
    padding: 6,
    alignSelf: "flex-start",
    marginTop: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default ArticleItem;
