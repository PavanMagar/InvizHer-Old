//Navbar functionality
function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.left = "-720px";
  }

  // display sticky header when scroll
  document.addEventListener('DOMContentLoaded', function() {
    const greetingMessage = document.getElementById('greeting-message');

    const now = new Date();
    const hours = now.getHours();

    let greetingText = '';

    if (hours >= 5 && hours < 12) {
        greetingText = 'Good Morning,';
    } else if (hours >= 12 && hours < 17) {
        greetingText = 'Good Afternoon,';
    } else if (hours >= 17 && hours < 20) {
        greetingText = 'Good Evening,';
    } else {
        greetingText = 'Good Night,';
    }

    greetingMessage.textContent = greetingText;
});


  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Share buttons and copy button

document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.href;
    document.querySelectorAll('.share-buttons a').forEach(btn => {
        const href = btn.getAttribute('href');
        btn.setAttribute('href', href.replace('[URL]', encodeURIComponent(url)));
    });
});

function copyToClipboard() {
    const dummy = document.createElement('input');
    const text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('Link copied to clipboard. Now paste it anywhere you want.');
}


// Tags and Search Feature

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
        updateSearchURL(query);
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
            let filteredPosts;
            if (tag === 'all') {
                filteredPosts = posts;
            } else {
                filteredPosts = Array.from(posts).filter(post => {
                    const tags = post.getAttribute('data-tags').split(',');
                    return tags.includes(tag);
                });
            }

            if (filteredPosts.length === 0) {
                showToast('No posts found');
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

    // Update the URL to reflect the search query
    function updateSearchURL(query) {
        const newURL = query ? `${window.location.pathname}?search=${query}` : window.location.pathname;
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
        let filteredPosts;
        if (currentTag === 'all') {
            filteredPosts = posts;
        } else {
            filteredPosts = Array.from(posts).filter(post => {
                const tags = post.getAttribute('data-tags').split(',');
                return tags.includes(currentTag);
            });
        }
        const hiddenPosts = Array.from(filteredPosts).filter(post => post.style.display === 'none');
        if (hiddenPosts.length > 0) {
            for (let i = 0; i < Math.min(hiddenPosts.length, 3); i++) {
                hiddenPosts[i].style.display = 'block';
                setTimeout(() => {
                    hiddenPosts[i].classList.add('show');
                }, 10);
            }
        } else {
            showToast('No more posts available');
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
            showToast('No posts found');
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

    // Check URL on page load to apply the filter if a tag or search query is present
    function checkURL() {
        const params = new URLSearchParams(window.location.search);
        const tag = params.get('tag') || 'all';
        const searchQuery = params.get('search') || '';
        const activeButton = document.querySelector(`.tag-button[data-tag="${tag}"]`);
        if (activeButton) {
            setActiveButton(activeButton);
            filterPosts(tag);
        } else {
            filterPosts('all');
        }
        if (searchQuery) {
            searchInput.value = searchQuery;
            searchPosts(searchQuery);
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


  document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.inz-fade');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});


// languages show more
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.language');
    const showMoreBtn = document.querySelector('.show-more');
    const mobileBreakpoint = 768;
    let currentVisible = 6;
    let showMoreClicked = false;

    const updateVisibility = () => {
        items.forEach((item, index) => {
            if (index < currentVisible) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    const showMore = () => {
        showMoreClicked = true;
        currentVisible += window.innerWidth <= mobileBreakpoint ? 4 : 3;
        updateVisibility();
        if (currentVisible >= items.length) {
            showMoreBtn.textContent = 'No more items';
            showMoreBtn.disabled = true;
        }
    };

    showMoreBtn.addEventListener('click', showMore);
    updateVisibility();

    window.addEventListener('resize', () => {
        if (!showMoreClicked) {
            currentVisible = 6;
            updateVisibility();
        }
    });
});


// typing.. animation for home header

const textElement = document.getElementById('text');
const phrases = ["Easier..", "Faster.."];
let currentPhraseIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    const currentText = currentPhrase.slice(0, currentLetterIndex);

    textElement.textContent = currentText;

    if (isDeleting) {
        currentLetterIndex--;
        if (currentLetterIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
    } else {
        currentLetterIndex++;
        if (currentLetterIndex === currentPhrase.length) {
            isDeleting = true;
        }
    }

    const delay = isDeleting ? 100 : 150;
    setTimeout(type, delay);
}

type();
