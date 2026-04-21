import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IngredientInputScreen from "./screens/IngredientInputScreen";
import ResultsScreen from "./screens/ResultsScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

export type RootStackParamList = {
  IngredientInput: undefined;
  Results: { ingredients: string; isGlutenFree: boolean };
  RecipeDetail: { id: string; name: string; userIngredients: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IngredientInput">
        <Stack.Screen
          name="IngredientInput"
          component={IngredientInputScreen}
          options={{ title: "From Fridge to Fork" }}
        />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Results" }} />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favorites" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}