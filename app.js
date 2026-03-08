// --- CONSTANTS & CONFIGURATION ---
const ANNIVERSARY_DATE = "2024-12-11";
const TRACK_LIST = [
    { name: "Please don't change", artist: "Jungkook", path: "./music/please don't change.mp3" },
    { name: "Only", artist: "Lee Hi", path: "./music/only.mp3" },
    { name: "Day & Night", artist: "Jung Seung Hwan", path: "./music/day and night.mp3" },
    { name: "Your Song", artist: "Elton John", path: "./music/your song.mp3" },
    { name: "Personajes", artist: "Los Claxons", path: "./music/personajes.mp3" }
];

// --- DOM ELEMENTS ---
const dom = {
    days: document.getElementById("days"),
    months: document.getElementById("months"),
    years: document.getElementById("years"),

    musicPlayer: document.querySelector(".music-container"),
    togglePlayer: document.querySelector(".toggle-player"),

    trackInfo: document.querySelector(".track-info"),
    trackName: document.querySelector(".trackname"),
    trackArtist: document.querySelector(".trackartist"),
    trackNav: document.querySelector(".track-nav"),

    playPauseBtn: document.querySelector(".playpause-track"),
    nextBtn: document.querySelector(".next-track"),
    prevBtn: document.querySelector(".prev-track"),

    soundBars: document.querySelector(".sound-bars")
};

// --- STATE VARIABLES ---
let currentTrack = document.createElement("audio");
let trackIndex = 0;
let isPlaying = false;
let isHidden = true; // Player hidden by default

// --- INITIALIZE LOTTIE ANIMATION ---
const soundBarsLottie = bodymovin.loadAnimation({
    container: dom.soundBars,
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json"
});

// --- COUNTER LOGIC ---
function updateAnniversaryCounter() {
    const anniversary = new Date(ANNIVERSARY_DATE);
    const today = new Date();

    let years = today.getFullYear() - anniversary.getFullYear();
    let months = today.getMonth() - anniversary.getMonth();
    let days = today.getDate() - anniversary.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    dom.days.textContent = days;
    dom.months.textContent = months;
    dom.years.textContent = years;
}

// Update counter immediately and set interval for daily update
updateAnniversaryCounter();
setInterval(updateAnniversaryCounter, 1000 * 60 * 60 * 24); // Every 24 hours

// --- MUSIC PLAYER LOGIC ---
function toggleMusicPlayer() {
    isHidden = !isHidden;

    if (isHidden) {
        dom.musicPlayer.classList.add("hide");
        dom.togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg" alt="Open">';
        dom.trackInfo.style.transitionDelay = "0s";
        dom.trackNav.style.transitionDelay = "0s";
    } else {
        dom.musicPlayer.classList.remove("hide");
        dom.togglePlayer.innerHTML = '<img class="w-3/4" src="icons/close.svg" alt="Close">';
        dom.trackInfo.style.transitionDelay = "0.4s";
        dom.trackNav.style.transitionDelay = "0.4s";
    }
}

function loadTrack(index) {
    const track = TRACK_LIST[index];
    currentTrack.src = track.path;
    dom.trackName.textContent = track.name;
    dom.trackArtist.textContent = track.artist;
    currentTrack.load();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    dom.playPauseBtn.innerHTML = '<img class="w-6 md:w-8" src="icons/pause.svg" alt="Pause">';
    soundBarsLottie.play();
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    dom.playPauseBtn.innerHTML = '<img class="w-6 md:w-8" src="icons/play.svg" alt="Play">';
    soundBarsLottie.stop();
}

function togglePlayPause() {
    isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % TRACK_LIST.length;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    loadTrack(trackIndex);
    playTrack();
}

// --- EVENT LISTENERS ---
dom.togglePlayer.addEventListener("click", toggleMusicPlayer);
dom.playPauseBtn.addEventListener("click", togglePlayPause);
dom.nextBtn.addEventListener("click", nextTrack);
dom.prevBtn.addEventListener("click", prevTrack);
currentTrack.addEventListener("ended", nextTrack);

// Initialize first track and set initial UI state
loadTrack(trackIndex);
// Trigger to hide initially on load according to isHidden state
if (isHidden) {
    dom.musicPlayer.classList.add("hide");
    dom.togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg" alt="Open">';
}
