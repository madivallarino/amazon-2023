import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnlWR6CCMBsw84fMYFaG3EJg_9hqNmhFc",
    authDomain: "amazn-2023.firebaseapp.com",
    projectId: "amazn-2023",
    storageBucket: "amazn-2023.appspot.com",
    messagingSenderId: "420279292105",
    appId: "1:420279292105:web:db271e0596467281773d18"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export default db;