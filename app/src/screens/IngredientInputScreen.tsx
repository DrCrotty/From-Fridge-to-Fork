import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Switch, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "IngredientInput">;

export default function IngredientInputScreen({ navigation }: Props) {
  const [ingredients, setIngredients] = useState("");
  const [isGlutenFree, setIsGlutenFree] = useState(true);

  // 💚 in the top-right header opens Favorites
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Favorites")} style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 22 }}>💚</Text>
        </Pressable>
      ),
      headerStyle: { backgroundColor: "#6EE7B7" }, // pastel mint
      headerTitleStyle: { color: "white", fontWeight: "800" },
      headerTintColor: "white",
    });
  }, [navigation]);

  const onFindRecipes = () => {
    navigation.navigate("Results", { ingredients, isGlutenFree });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>From Fridge to Fork</Text>
        <Text style={styles.subtitle}>turn what you have into dinner 💚</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Enter ingredients (comma separated)</Text>

        <TextInput
          style={styles.input}
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="chicken, rice, garlic, onion"
          placeholderTextColor="rgba(255,255,255,0.78)"
          autoCapitalize="none"
        />

        <View style={styles.row}>
          <Text style={styles.label}>Gluten-Free</Text>
          <Switch
            value={isGlutenFree}
            onValueChange={setIsGlutenFree}
            trackColor={{ false: "rgba(255,255,255,0.35)", true: "rgba(255,255,255,0.6)" }}
            thumbColor="white"
          />
        </View>

        <Pressable style={styles.buttonPrimary} onPress={onFindRecipes}>
          <Text style={styles.buttonText}>Find Recipes</Text>
        </Pressable>

        <Text style={styles.helper}>Tip: Try 2–4 ingredients for best results.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6EE7B7", // lighter mint
    padding: 20,
    justifyContent: "center",
  },

  headerBlock: {
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: "white",
    letterSpacing: 0.6,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.96)",
  },

  card: {
    backgroundColor: "rgba(16, 185, 129, 0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },

  helper: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.96)",
    textAlign: "center",
    marginTop: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  buttonPrimary: {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 6,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "900",
  },
});