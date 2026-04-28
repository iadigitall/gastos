// Preencha com os dados do seu projeto Firebase:
// https://console.firebase.google.com → Configurações do projeto → Seus apps → SDK

const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:000000000000000000000000"
};

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}
