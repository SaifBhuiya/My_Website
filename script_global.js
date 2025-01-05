document.addEventListener('DOMContentLoaded', () => {
    // Function to update stylesheet based on page
    function updateStylesheet(pageId) {
        const stylesheets = {
            'about': 'styles.css',
            'projects': 'styles_projects.css',
            'games': 'styles_games.css',
            'music': 'styles_music.css'
        };

        const dynamicStylesheet = document.getElementById('dynamic-stylesheet');
        if (dynamicStylesheet) {
            dynamicStylesheet.href = stylesheets[pageId] || 'styles.css';
            console.log('Updated stylesheet to:', stylesheets[pageId]);
        }
    }

    // Show the selected page and update stylesheet
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            updateStylesheet(pageId);
            history.pushState({ pageId }, '', `#${pageId}`);
        }
    }

    // Add click handlers to navigation links
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            showPage(pageId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.pageId) {
            showPage(e.state.pageId);
        }
    });

    // Music page toggle functionality
    window.toggleSongs = function (listId) {
        document.querySelectorAll('.song-list').forEach(list => {
            list.classList.remove('active');
        });
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.classList.remove('active');
        });

        document.getElementById(listId).classList.add('active');
        document.querySelector(`button[onclick="toggleSongs('${listId}')"]`).classList.add('active');
    }

    // Show initial page
    const initialPage = window.location.hash.slice(1) || 'about';
    showPage(initialPage);
});