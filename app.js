let anniversary = "2024-12-11";
let date = new Date(anniversary);
let dateVal = date.getTime();
let today = new Date();
let now = today.getTime();
let value = now - dateVal;
let day = Math.floor(value / (1000 * 60 * 60 * 24));
let month = Math.floor(value / (1000 * 60 * 60 * 24 * 30.4375));
let year = Math.floor(value / (1000 * 60 * 60 * 24 * 365.25));

console.log(value);

document.getElementById("days").textContent = '0';
document.getElementById("months").textContent = '3';
document.getElementById("years").textContent = '0';


let musicPlayer = document.querySelector(".music-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".trackname");
let trackArtist = document.querySelector(".trackartist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function() {
    isHidden = !isHidden;
    if(isHidden){
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<img class="w-[98%]" src="icons/close.svg">';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg">';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPLay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});


let trackList = [
    {
        name: "Please don't change",
        artist: "Jungkook",
        path: "./music/please don't change.mp3",
    },
    {
        name: "Only",
        artist: "Lee Hi",
        path: "./music/only.mp3",
    },
    {
        name: "Day & Night",
        artist: "Jung Seung Hwan",
        path: "./music/day and night.mp3",
    },
    {
        name: "Your Song",
        artist: "Elton John",
        path: "./music/your song.mp3",
    },
    {
        name: "Personajes",
        artist: "Los Claxons",
        path: "./music/personajes.mp3",
    },
];

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

function loadTrack(trackIndex){
    currentTrack.src = trackList[trackIndex].path;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
    currentTrack.load();
}

loadTrack(trackIndex);

function updateAnniversaryCounter() {
    const anniversary = new Date("2024-12-11");
    const today = new Date();

    // Calcular diferencia en milisegundos
    const diffTime = today.getTime() - anniversary.getTime();

    // Calcular diferencia exacta en días
    const diffDate = new Date(diffTime);

    // Cálculo más preciso de años, meses, días
    let years = today.getFullYear() - anniversary.getFullYear();
    let months = today.getMonth() - anniversary.getMonth();
    let days = today.getDate() - anniversary.getDate();

    if (days < 0) {
        months--;
        let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Actualizar el contenido del DOM
    document.getElementById("days").textContent = days;
    document.getElementById("months").textContent = months;
    document.getElementById("years").textContent = years;
}


updateAnniversaryCounter();


setInterval(updateAnniversaryCounter, 1000 * 60 * 60 * 24); // Cada 24h


function playPauseTrack(){
    if(isPlaying == false){
        playTrack();
    }else{
        pauseTrack();
    }
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

function nextTrack(){
    if(trackIndex < trackList.length - 1){
        trackIndex += 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = 0;
        loadTrack(trackIndex);
        playTrack();
    } 
}

function prevTrack(){
    if(trackIndex > 0){
        trackIndex -= 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = trackList.length - 1;
        loadTrack(trackIndex);
        playTrack();
    }
}
