function toggleSongs(type) {
    console.log(`Toggling songs for type: ${type}`);

    // Update buttons
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(type)) {
            console.log(`Activating button: ${btn.textContent}`);
            btn.classList.add('active');
        }
    });

    // Update song lists
    const songLists = document.querySelectorAll('.song-list');
    songLists.forEach(list => {
        list.classList.remove('active');
    });

    const activeList = document.getElementById(type);
    if (activeList) {
        console.log(`Activating list: ${type}`);
        activeList.classList.add('active');
    } else {
        console.error(`No list found with ID: ${type}`);
    }


}

