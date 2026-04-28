const firebaseConfig = {
  apiKey: "AIzaSyChqu5iIVRP23VP-ufZw0glv_8fU6gP7s4",
  authDomain: "financas-14a3b.firebaseapp.com",
  databaseURL: "https://financas-14a3b-default-rtdb.firebaseio.com",
  projectId: "financas-14a3b",
  storageBucket: "financas-14a3b.firebasestorage.app",
  messagingSenderId: "41461378465",
  appId: "1:41461378465:web:58cde4a6ee1c8dcddcefe0"
};

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}
