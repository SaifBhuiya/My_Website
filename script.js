document.addEventListener('DOMContentLoaded', () => {
    // Show the first page by default
    showPage('page1');

    // Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = e.target.dataset.page;
            showPage(pageId);

            // Update URL without page reload
            history.pushState({ pageId }, '', `#${pageId}`);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.pageId) {
            showPage(e.state.pageId);
        }
    });

    // Handle initial load with hash
    if (window.location.hash) {
        const pageId = window.location.hash.slice(1);
        showPage(pageId);
    }
});

// Function to show the selected page and hide others
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}