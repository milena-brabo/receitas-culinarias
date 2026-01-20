// /services/favoritos.ts
const favoritos: any[] = [];

/**
 * Adiciona ou remove uma receita dos favoritos
 * Se já estiver na lista, remove; caso contrário, adiciona
 */
export function toggleFavorito(item: any) {
  const index = favoritos.findIndex((fav) => fav.idMeal === item.idMeal);

  if (index >= 0) {
    // Já existe → remove
    favoritos.splice(index, 1);
    console.log("Receita removida dos favoritos:", item.strMeal);
  } else {
    // Não existe → adiciona
    favoritos.push(item);
    console.log("Receita adicionada aos favoritos:", item.strMeal);
  }
}

/** Retorna a lista atual de favoritos */
export function listarFavoritos() {
  return favoritos;
}

/** Checa se a receita já está favoritada */
export function isFavorito(idMeal: string) {
  return favoritos.some((fav) => fav.idMeal === idMeal);
}
