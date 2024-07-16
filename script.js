function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.left = "-720px";
  }
  

  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous results and error message
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('show');
    errorMessage.textContent = '';

    if (query.trim() === '') {
        errorMessage.textContent = 'Please enter your query to search.';
        return;
    }

    const matchingArticles = articles.filter(article => article.title.toLowerCase().includes(query));

    if (matchingArticles.length > 0) {
        resultsContainer.classList.add('show');
        matchingArticles.forEach(article => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = article.title;
            li.appendChild(link);
            resultsContainer.appendChild(li);

            // Add class to trigger transition
            setTimeout(() => {
                li.classList.add('show');
            }, 10);
        });
    } else {
        resultsContainer.classList.add('show');
        const li = document.createElement('li');
        li.textContent = 'Nothing found, check your search.';
        li.style.color = '#515e7b';
        li.style.backgroundColor = '#e0e2e8';
        li.style.padding = '10px 12px';
        li.style.borderRadius = '6px';
        resultsContainer.appendChild(li);
        
        // Add class to trigger transition
        setTimeout(() => {
            li.classList.add('show');
        }, 10);
    }
});



        document.addEventListener('DOMContentLoaded', function () {
            const tagButtons = document.querySelectorAll('.tag-button');
            const posts = document.querySelectorAll('.post');
            const viewAllBtn = document.getElementById('viewAllPostsBtn');
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            let visiblePosts = 6;

            tagButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tag = button.getAttribute('data-tag');
                    filterPosts(tag);
                    updateURL(tag);
                    setActiveButton(button);
                });
            });

            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value.toLowerCase();
                searchPosts(searchTerm);
            });

            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                loadMorePosts();
            });

            // Filter posts based on the selected tag
            function filterPosts(tag) {
                posts.forEach(post => {
                    post.style.display = 'none';
                    post.style.opacity = '0';
                });
                const filteredPosts = tag === 'all' ? posts : document.querySelectorAll(`.post[data-tag="${tag}"]`);
                for (let i = 0; i < Math.min(filteredPosts.length, visiblePosts); i++) {
                    filteredPosts[i].style.display = 'block';
                    setTimeout(() => {
                        filteredPosts[i].style.opacity = '1';
                    }, 0);
                }
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

            // Load more posts when "View all Posts" button is clicked
            function loadMorePosts() {
                const hiddenPosts = Array.from(posts).filter(post => post.style.display === 'none');
                if (hiddenPosts.length === 0) {
                    showToast('No more posts available');
                    return;
                }
                for (let i = 0; i < Math.min(hiddenPosts.length, 3); i++) {
                    hiddenPosts[i].style.display = 'block';
                    setTimeout(() => {
                        hiddenPosts[i].style.opacity = '1';
                    }, 0);
                }
            }

            // Show toast notification
            function showToast(message) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.className = 'toast show';
                setTimeout(() => {
                    toast.className = toast.className.replace('show', '');
                }, 3000);
            }

            // Search posts based on the search term
            function searchPosts(searchTerm) {
                let found = false;
                posts.forEach(post => {
                    const title = post.querySelector('.post-title a').textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        post.style.display = 'block';
                        post.style.opacity = '1';
                        found = true;
                    } else {
                        post.style.display = 'none';
                        post.style.opacity = '0';
                    }
                });
                if (!found) {
                    showToast('Post not found');
                }
            }

            // Check URL on page load to apply the filter if a tag is present
            function checkURL() {
                const params = new URLSearchParams(window.location.search);
                const tag = params.get('tag');
                if (tag) {
                    filterPosts(tag);
                } else {
                    showInitialPosts();
                }
            }

            // Show initial posts on page load
            function showInitialPosts() {
                for (let i = 0; i < Math.min(posts.length, visiblePosts); i++) {
                    posts[i].style.display = 'block';
                    setTimeout(() => {
                        posts[i].style.opacity = '1';
                    }, 0);
                }
            }

            checkURL();
        });

