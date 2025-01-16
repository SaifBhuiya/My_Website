var currentSongId = null;
var volume = document.getElementById("slider");
var number = document.getElementById("number");
var totaldur;
var isPlaying = false;

document.querySelectorAll(".song iframe").forEach(iframe => {
    const widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.PLAY, () => {
        currentSongId = iframe.id;
        isPlaying = true;
        
        document.querySelector('.audio_player').style.display = "flex";
        updatePlayPauseButton();


        widget.getDuration((duration) => {
            totaldur = duration;
            const seconds = Math.floor(duration / 1000);
            const minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;

            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }

            const progressBar = document.getElementById('duration');
            progressBar.innerHTML = minutes + ":" + remainingSeconds;
        });
    });

    widget.bind(SC.Widget.Events.PAUSE, () => {
        isPlaying = false;
        updatePlayPauseButton();
    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, (event) => {
        widget.setVolume(volume.value);

        document.querySelector(".progress").style.width = ((107.25 / totaldur) * event.currentPosition) + "%";

        widget.getPosition((duration) => {
            const seconds = Math.floor(duration / 1000);
            const minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;

            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }

            const progressBar = document.getElementById('elapsed');
            progressBar.innerHTML = minutes + ":" + remainingSeconds + " / ";
        });
    });
});

function updatePlayPauseButton() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

PlaySongs.addEventListener('click', () => {
    if (currentSongId) {
        const widget = SC.Widget(document.getElementById(currentSongId));

        widget.isPaused((paused) => {
            if (paused) {
                widget.play();
                widget.setVolume(volume.value);
                isPlaying = true;
            } else {
                widget.pause();
                isPlaying = false;
            }
            updatePlayPauseButton();
        });
    }
});

slider.oninput = function () {
    number.innerHTML = volume.value;
}