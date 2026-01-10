import AsyncStorage from "@react-native-async-storage/async-storage";

const ARCHIVE_KEY = "ARCHIVED_ARTICLES";

export const saveArchivedArticles = async (articles) => {
  try {
    await AsyncStorage.setItem(ARCHIVE_KEY, JSON.stringify(articles));
  } catch (error) {
    console.log("Error saving archived articles", error);
  }
};

export const getArchivedArticles = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(ARCHIVE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log("Error loading archived articles", error);
    return [];
  }
};
