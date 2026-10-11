// ── Firebase Configuration ──────────────────────────────────────────────────
// 1. Go to https://console.firebase.google.com/
// 2. Create a project → Add Web App → Copy your config here
// 3. In Firestore Database → Create database → Start in test mode

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── REPLACE THIS WITH YOUR FIREBASE CONFIG ──────────────────────────────────
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
// ────────────────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Orders API (replaces localStorage for orders) ───────────────────────────
window.FirebaseOrders = {
  async save(order) {
    // Store with Firestore doc id = order.id for easy lookup
    const ref = await addDoc(collection(db, "orders"), order);
    return ref.id;
  },

  async getAll() {
    const q    = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
  },

  async updateStatus(docId, status) {
    await updateDoc(doc(db, "orders", docId), { status });
  },

  // Real-time listener for admin panel
  onOrders(callback) {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      callback(snap.docs.map(d => ({ _docId: d.id, ...d.data() })));
    });
  }
};

console.log("Firebase ready ✅");
