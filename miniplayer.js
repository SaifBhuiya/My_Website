var currentSongId=null; 
var volume = document.getElementById("slider");
var number = document.getElementById("number");
var totaldur;
document.querySelectorAll(".song iframe").forEach(iframe => {
    const widget = SC.Widget(iframe); // Initialize the SoundCloud widget for each iframe

    // Bind the PLAY event
    widget.bind(SC.Widget.Events.PLAY, () => {
        // Update the currently playing song ID
        currentSongId = iframe.id;
        console.log("Now playing:", currentSongId);


        //update total duration of song
        widget.getDuration((duration) => {
            totaldur = duration;
            const seconds = Math.floor(duration / 1000); // Convert milliseconds to seconds
            const minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;

            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }

            const progressBar = document.getElementById('duration');
            progressBar.innerHTML = minutes + ":" + remainingSeconds

        });


        

    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, (event) => {
        // Update the currently playing song ID
        widget.setVolume(volume.value);
        
        document.querySelector(".progress").style.width = ((107.25 / totaldur) * event.currentPosition) + "%";
        console.log(document.querySelector(".progress").style.width);
        widget.getPosition((duration) => {

            const seconds = Math.floor(duration / 1000); // Convert milliseconds to seconds
            const minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;

            //second (n) less than 10 converted to 0n: e.g, 1 (second) => 01 (second)
            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }

            const progressBar = document.getElementById('elapsed');
            progressBar.innerHTML = minutes + ":" + remainingSeconds + " /"
        });


        console.log("volume:", volume.value);
    });


});


PlaySongs.addEventListener('click', () => {
    console.log("clicked");

    // Get the SoundCloud widget instance
    const widget = SC.Widget(document.getElementById(currentSongId));

    // Check if the player is paused
    widget.isPaused((paused) => {
        if (paused) {
            // Play the track if paused
            widget.play();
            widget.setVolume(volume.value);

           
        } else {
            // Pause the track if playing
            widget.pause();
        }
    })
});


slider.oninput = function () {
    number.innerHTML = volume.value;
}




