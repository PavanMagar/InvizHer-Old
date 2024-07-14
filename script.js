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
