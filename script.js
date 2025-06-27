
// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyAGj-vFlnHa...XUy-7A",
  authDomain: "my-secret-diary-98b01.firebaseapp.com",
  databaseURL: "https://my-secret-diary-98b01-default-rtdb.firebaseio.com",
  projectId: "my-secret-diary-98b01",
  storageBucket: "my-secret-diary-98b01.appspot.com",
  messagingSenderId: "800988572946",
  appId: "1:800988572946:web:71aceee084cc7b0dc557cb",
  measurementId: "G-HHSD6FBSP6"
};

};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const author = document.getElementById('author').value.trim() || "Anónimo";
    const content = document.getElementById('content').value.trim();

    if (content) {
        const newPostRef = database.ref('posts').push();
        newPostRef.set({
            author: author,
            content: content,
            timestamp: Date.now()
        });
        document.getElementById('postForm').reset();
    }
});

const postsSection = document.getElementById('posts');
firebase.database().ref('posts').on('value', (snapshot) => {
    postsSection.innerHTML = '';
    const posts = snapshot.val();
    const keys = posts ? Object.keys(posts).sort((a, b) => posts[b].timestamp - posts[a].timestamp) : [];
    keys.forEach(key => {
        const post = posts[key];
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const authorElem = document.createElement('div');
        authorElem.className = 'author';
        authorElem.textContent = post.author;

        const contentElem = document.createElement('div');
        contentElem.className = 'content';
        contentElem.textContent = post.content;

        postDiv.appendChild(authorElem);
        postDiv.appendChild(contentElem);
        postsSection.appendChild(postDiv);
    });
});
