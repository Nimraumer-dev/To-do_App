
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASFtgtzdbEA-FYAmLeZROdxcGlbfFGcqo",
    authDomain: "todo-app-24cf8.firebaseapp.com",
    projectId: "todo-app-24cf8",
    storageBucket: "todo-app-24cf8.firebasestorage.app",
    messagingSenderId: "1070242445196",
    appId: "1:1070242445196:web:8b27cca8fa2efe7b0c08a9",
    measurementId: "G-KYNTGZWHR0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
