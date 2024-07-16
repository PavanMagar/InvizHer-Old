function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.left = "-720px";
  }

  
document.addEventListener('DOMContentLoaded', function () {
    const tagButtons = document.querySelectorAll('.tag-button');
    const posts = document.querySelectorAll('.post');
    const viewAllBtn = document.getElementById('viewAllPostsBtn');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const toast = document.getElementById('toast');
    let visiblePosts = 6;

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.getAttribute('data-tag');
            filterPosts(tag);
            updateURL(tag);
            setActiveButton(button);
        });
    });

    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loadMorePosts();
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        searchPosts(query);
    });

    // Filter posts based on the selected tag
    function filterPosts(tag) {
        posts.forEach(post => {
            post.classList.remove('show');
            setTimeout(() => {
                post.style.display = 'none';
            }, 500);
        });

        setTimeout(() => {
            const filteredPosts = tag === 'all' ? posts : document.querySelectorAll(`.post[data-tag="${tag}"]`);
            if (filteredPosts.length === 0) {
                showToast('Nothing found here.');
            } else {
                for (let i = 0; i < Math.min(filteredPosts.length, visiblePosts); i++) {
                    filteredPosts[i].style.display = 'block';
                    setTimeout(() => {
                        filteredPosts[i].classList.add('show');
                    }, 10);
                }
            }
        }, 500);
    }

    // Update the URL to reflect the selected tag
    function updateURL(tag) {
        const newURL = tag === 'all' ? window.location.pathname : `${window.location.pathname}?tag=${tag}`;
        history.pushState(null, '', newURL);
    }

    // Set active button
    function setActiveButton(activeButton) {
        tagButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Load more posts
    function loadMorePosts() {
        const currentTag = document.querySelector('.tag-button.active').getAttribute('data-tag');
        const filteredPosts = currentTag === 'all' ? posts : document.querySelectorAll(`.post[data-tag="${currentTag}"]`);
        const hiddenPosts = Array.from(filteredPosts).filter(post => post.style.display === 'none');
        if (hiddenPosts.length > 0) {
            for (let i = 0; i < Math.min(hiddenPosts.length, 3); i++) {
                hiddenPosts[i].style.display = 'block';
                setTimeout(() => {
                    hiddenPosts[i].classList.add('show');
                }, 10);
            }
        } else {
            showToast('No more posts available.');
        }
    }

    // Search posts
    function searchPosts(query) {
        let found = false;
        posts.forEach(post => {
            const title = post.querySelector('.post-title a').textContent.toLowerCase();
            if (title.includes(query)) {
                post.style.display = 'block';
                setTimeout(() => {
                    post.classList.add('show');
                }, 10);
                found = true;
            } else {
                post.classList.remove('show');
                setTimeout(() => {
                    post.style.display = 'none';
                }, 500);
            }
        });

        if (!found) {
            showToast('Post not found, try another.');
        }
    }

    // Show toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    // Check URL on page load to apply the filter if a tag is present
    function checkURL() {
        const params = new URLSearchParams(window.location.search);
        const tag = params.get('tag') || 'all';
        const activeButton = document.querySelector(`.tag-button[data-tag="${tag}"]`);
        if (activeButton) {
            setActiveButton(activeButton);
            filterPosts(tag);
        } else {
            filterPosts('all');
        }
    }

    // Initially show the first 6 posts
    function showInitialPosts() {
        for (let i = 0; i < Math.min(posts.length, visiblePosts); i++) {
            posts[i].style.display = 'block';
            setTimeout(() => {
                posts[i].classList.add('show');
            }, 10);
        }
    }

    checkURL();
    showInitialPosts();
});
