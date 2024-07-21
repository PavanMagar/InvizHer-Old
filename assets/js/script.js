
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
    alert('Link copied to clipboard. Now you share this link anywhere you want.');
}


// Tags and Search Feature

document.addEventListener('DOMContentLoaded', function () {
            const tagButtons = document.querySelectorAll('.tag-button');
            const posts = document.querySelectorAll('.post');
            const viewAllBtn = document.getElementById('viewAllPostsBtn');
            const toast = document.getElementById('toast');
            const searchInput = document.getElementById('searchInput');
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

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                searchPosts(query);
            });

            // Filter posts based on the selected tag
            function filterPosts(tag) {
                let postCount = 0;
                posts.forEach(post => {
                    const tags = post.getAttribute('data-tags').split(',');
                    if (tag === 'all' || tags.includes(tag)) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                        }, 0);
                        postCount++;
                    } else {
                        post.style.display = 'none';
                        post.style.opacity = '0';
                    }
                });
                visiblePosts = postCount;
            }

            // Search posts based on the input
            function searchPosts(query) {
                let found = false;
                posts.forEach(post => {
                    const title = post.querySelector('.post-title a').textContent.toLowerCase();
                    if (title.includes(query)) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                        }, 0);
                        found = true;
                    } else {
                        post.style.display = 'none';
                        post.style.opacity = '0';
                    }
                });
                if (!found) {
                    showToast('No posts found');
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
                toast.textContent = message;
                toast.className = 'toast show';
                setTimeout(() => {
                    toast.className = toast.className.replace('show', '');
                }, 3000);
            }

            // Check URL on page load to apply the filter if a tag is present
            function checkURL() {
                const params = new URLSearchParams(window.location.search);
                const tag = params.get('tag');
                if (tag) {
                    filterPosts(tag);
                    setActiveButton(document.querySelector(`.tag-button[data-tag="${tag}"]`));
                } else {
                    loadInitialPosts();
                }
            }

            // Load initial posts on page load
            function loadInitialPosts() {
                for (let i = 0; i < visiblePosts; i++) {
                    posts[i].style.display = 'block';
                    setTimeout(() => {
                        posts[i].style.opacity = '1';
                    }, 0);
                }
            }

            checkURL();
        });

/*=============== SCROLL REVEAL ANIMATION ===============*/
AOS.init({
    duration: 1200, // Animation duration in milliseconds
    offset: 200, // Offset from the original trigger point
    easing: 'ease-in-out-sine', // Easing function
    delay: 100, // Delay in milliseconds
  });
