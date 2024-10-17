import { initializeApp } from "firebase/app";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

// extract firebase config from query string
const serializedFirebaseConfig = new URLSearchParams(self.location.search).get(
  "firebaseConfig"
);
if (!serializedFirebaseConfig) {
  throw new Error(
    "Firebase Config object not found in service worker query string."
  );
}

const firebaseConfig = JSON.parse(serializedFirebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
async function getAuthIdToken() {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}

/**
 * Returns a promise that resolves with an the current auth state in the Service Worker
 * @return {!Promise<?string>} The promise that resolves with a user if
 *     available. Otherwise, the promise resolves with null.
 */
async function awaitSWAuthStateChange(uid) {
  await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Client matches the sw so we can resolve this promise
      if (uid === user?.uid) {
        unsubscribe();
        resolve(user);
      }
    });
  });
  return new Response(undefined, {
    status: 200,
    headers: { "cache-control": "no-store" },
  });
}

self.addEventListener('fetch', async (event) => {
  let req = event.request;
  const { origin, pathname } = new URL(event.request.url);


  // Special case which is used to ensure that auth state is in sync between the client and the service worker
  // This path can be called before router changes to ensure that the auth state in the service worker matches the client
  if (pathname.startsWith('/__/auth/waitforsw/')) {
    return event.respondWith(awaitSWAuthStateChange(pathname.split("/").at(-1) || undefined));
  }

  //exclude non html page requests (like css, images, etc)
  if (((event.request.method === "GET" || event.request.method === "HEAD" || event.request.method === "POST") && pathname.includes("."))) {
    return;
  }

  //exclude non same-origin requests or non https requests
  if (self.location.origin !== origin || (self.location.protocol !== 'https:' && self.location.hostname !== 'localhost')) {
    return;
  }
  
  const idToken = await getAuthIdToken();

  // console.log(self.location.origin, origin, self.location.protocol, self.location.hostname, idToken)
  
  // For same origin https requests, append idToken to header.
  if (idToken) {
    // Clone headers as request headers are immutable.
    const headers = new Headers(req.headers);
    // Add ID token to header.
    headers.append('Authorization', 'Bearer ' + idToken);
    const request = new Request(req, { headers });
    event.respondWith(fetch(request));
  }
});