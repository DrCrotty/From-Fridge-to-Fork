import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigator";
import { getFavorites, FavoriteRecipe } from "../services/favorites";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

export default function FavoritesScreen({ navigation }: Props) {
  const [items, setItems] = useState<FavoriteRecipe[]>([]);

  async function load() {
    const favs = await getFavorites();
    setItems(favs);
  }

  useEffect(() => {
    // reload whenever you return to this screen
    const unsub = navigation.addListener("focus", load);
    load();
    return unsub;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("RecipeDetail", {
                id: item.id,
                name: item.name,
                userIngredients: "",
              })
            }
          >
            {item.thumb ? <Image source={{ uri: item.thumb }} style={styles.image} /> : null}
            <Text style={styles.cardTitle}>{item.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.small}>No favorites yet. Open a recipe and tap ⭐.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  small: { color: "#444" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: "white",
  },
  image: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#f3f4f6" },
  cardTitle: { fontSize: 16, fontWeight: "700", flex: 1 },
});