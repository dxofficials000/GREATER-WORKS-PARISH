// Firebase config — STANDALONE project for Greater Works Parish only.
// This is a separate Firebase project from What's Your Dream (dream-f852d)
// on purpose, so nothing here can ever affect that app.
//
// Get these values from: Firebase Console > (your new project) >
// Project settings (gear icon) > scroll to "Your apps" > the web app
// config block. Paste the real values in below.

const firebaseConfig = {
  apiKey: "AIzaSyBglvYlMVvpyFSzlXfdws9aZIrkHquRZw4",
  authDomain: "greater-works-parish.firebaseapp.com",
  projectId: "greater-works-parish",
  storageBucket: "greater-works-parish.firebasestorage.app",
  messagingSenderId: "528835654292",
  appId: "1:528835654292:web:5bc6aef649a6bccef9ba81",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ---- Cloudinary settings ----
// Same Cloudinary account as What's Your Dream (cloud name mbejz1vu) is fine
// to reuse for storage — Cloudinary just hosts files, it has no login/admin
// concept that could let anyone into the church site. Create a new UNSIGNED
// upload preset in your Cloudinary dashboard called "greaterworksparish"
// (Settings > Upload > Add upload preset > Signing Mode: Unsigned).
const CLOUDINARY_CLOUD_NAME = "mbejz1vu";
const CLOUDINARY_UPLOAD_PRESET = "greaterworksparish";

// isVideo: pass true for video files so Cloudinary uses its video endpoint
// instead of the image endpoint (required for video uploads to work).
async function uploadToCloudinary(file, isVideo) {
  const resourceType = isVideo ? "video" : "image";
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url;
}
