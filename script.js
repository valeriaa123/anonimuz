
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsSection = document.getElementById('posts');

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('anonimuz_posts')) || [];
        postsSection.innerHTML = '';
        posts.reverse().forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            const author = post.author || 'Anónimo';
            postElement.innerHTML = `<div class="author">${author}</div><div class="text">${post.content}</div>`;
            postsSection.appendChild(postElement);
        });
    }

    postForm.addEventListener('submit', e => {
        e.preventDefault();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('content').value.trim();
        if (!content) return;
        const post = { author, content, timestamp: new Date().toISOString() };
        const posts = JSON.parse(localStorage.getItem('anonimuz_posts')) || [];
        posts.push(post);
        localStorage.setItem('anonimuz_posts', JSON.stringify(posts));
        postForm.reset();
        loadPosts();
    });

    loadPosts();
});
