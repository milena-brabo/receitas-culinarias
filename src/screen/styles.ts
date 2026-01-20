import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ===== CONTAINER PADRÃO ===== */
  container: {
    flex: 1,
    backgroundColor: "#204E20", // verde solicitado
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===== SPLASH / LOGO ===== */
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFA500", // laranja do protótipo
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#FFFFFF",
  },

  /* ===== HEADER REUTILIZÁVEL ===== */
  header: {
    height: 80,
    width: "100%",
    backgroundColor: "#1F4D2B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* ===== HOME ===== */
  homeScroll: {
    backgroundColor: "#FB6D01", // laranja da home
    paddingBottom: 30,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "#000",
  },

  recipeCard: {
    height: 180,
    marginHorizontal: 20,
    marginBottom: 15,
    justifyContent: "flex-end",
  },

  recipeImage: {
    borderRadius: 15,
  },

  recipeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
