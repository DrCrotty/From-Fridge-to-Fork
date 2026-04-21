import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteRecipe = {
  id: string;
  name: string;
  thumb?: string;
};

const KEY = "fff_favorites_v1";

export async function getFavorites(): Promise<FavoriteRecipe[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as FavoriteRecipe[];
  } catch {
    return [];
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  const favs = await getFavorites();
  return favs.some((f) => f.id === id);
}

export async function addFavorite(item: FavoriteRecipe): Promise<void> {
  const favs = await getFavorites();
  if (favs.some((f) => f.id === item.id)) return;
  const next = [item, ...favs];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function removeFavorite(id: string): Promise<void> {
  const favs = await getFavorites();
  const next = favs.filter((f) => f.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function toggleFavorite(item: FavoriteRecipe): Promise<boolean> {
  const favs = await getFavorites();
  const exists = favs.some((f) => f.id === item.id);
  if (exists) {
    await removeFavorite(item.id);
    return false;
  } else {
    await addFavorite(item);
    return true;
  }
}