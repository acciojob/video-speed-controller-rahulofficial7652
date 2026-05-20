// 1. Saare required DOM elements ko uthana
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');

// 2. Play aur Pause ka basic function
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// 3. Playback state ke mutabik button ka icon badalna (► aur ❚ ❚)
function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

// 4. Skip functionality (-10s aur +25s)
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// 5. Volume aur Playback Speed update karne ke liye
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// 6. Progress bar ko video ke sath live forward fill karna
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// 7. Progress bar par kahin bhi click karke video ko aage-piche (scrub) karna
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// --- Event Listeners Attach Karna ---
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => {
    slider.addEventListener('change', handleRangeUpdate);
    slider.addEventListener('mousemove', handleRangeUpdate);
});

// Progress bar dragging variables aur listeners
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);