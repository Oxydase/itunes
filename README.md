# iTunes Seeker – Application React Native

Une application mobile développée en **React Native avec Expo** qui utilise l'API publique d'iTunes pour rechercher des morceaux par artiste ou par titre. Les utilisateurs peuvent consulter les détails d’un morceau, l’ajouter à leurs favoris et attribuer une note personnalisée.

---

## Fonctionnalités

-  **Recherche** de morceaux par nom d'artiste ou de chanson via l'API iTunes.
-  **Affichage des résultats** sous forme de liste.
-  **Page de détail** pour chaque morceau sélectionné.
-  **Ajout aux favoris** avec une **note personnalisée** de 1 à 5.
-  **Liste des favoris enregistrés** localement avec AsyncStorage.
-  **Suppression** possible d’un favori.

---

##  Fichiers principaux du projet

**App.js** Point d’entrée principal, configure la navigation
**AppNavigator.js** Définition des routes (stack navigator)
**SearchScreen.js** Écran de recherche avec formulaire et résultats
**DetailScreen.js** Détail d’un morceau avec ajout aux favoris
**FavoritesScreen.js** Liste des morceaux favoris enregistrés
**itunesAPI.js** Service pour interroger l’API iTunes avec Axios

---

## Dépendances principales

- [`react-native`](https://reactnative.dev/)
- [`expo`](https://expo.dev/)
- [`@react-navigation/native`](https://reactnavigation.org/)
- [`@react-native-picker/picker`](https://github.com/react-native-picker/picker)
- [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/)
- [`axios`](https://axios-http.com/)

---