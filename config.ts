const envConfig = {
  db: {
    firebaseConfig: {
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID
    }
  },
  unsplash: {
    apiKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY
  },
  pixabay: {
    apiKey: process.env.NEXT_PUBLIC_PIXABAY_API_KEY
  }
};

export default envConfig;
