const ANNIVERSARY_DATE = "2024-12-11";

class MusicPlayer {
  constructor() {
    this.musicContainer = document.querySelector(".music-container");
    this.togglePlayerBtn = document.querySelector(".toggle-player");
    this.trackInfo = document.querySelector(".track-info");
    this.trackName = document.querySelector(".trackname");
    this.trackArtist = document.querySelector(".trackartist");
    this.trackNav = document.querySelector(".track-nav");
    this.playPauseBtn = document.querySelector(".playpause-track");
    this.nextBtn = document.querySelector(".next-track");
    this.prevBtn = document.querySelector(".prev-track");
    this.soundBars = document.querySelector(".sound-bars");

    this.currentTrack = new Audio();
    this.trackIndex = 0;
    this.isPlaying = false;
    this.isHidden = false; // Initially visible

    this.trackList = [
      { name: "Please don't change", artist: "Jungkook", path: "./music/please don't change.mp3" },
      { name: "Only", artist: "Lee Hi", path: "./music/only.mp3" },
      { name: "Day & Night", artist: "Jung Seung Hwan", path: "./music/day and night.mp3" },
      { name: "Your Song", artist: "Elton John", path: "./music/your song.mp3" },
      { name: "Personajes", artist: "Los Claxons", path: "./music/personajes.mp3" }
    ];

    this.soundBarsLottie = window.bodymovin?.loadAnimation({
      container: this.soundBars,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
    });

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadTrack(this.trackIndex);
  }

  bindEvents() {
    this.togglePlayerBtn.addEventListener("click", () => this.togglePlayer());
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.nextBtn.addEventListener("click", () => this.nextTrack());
    this.prevBtn.addEventListener("click", () => this.prevTrack());
    this.currentTrack.addEventListener("ended", () => this.nextTrack());
  }

  togglePlayer() {
    this.isHidden = !this.isHidden;
    if (this.isHidden) {
      this.musicContainer.classList.add("hide");
      this.togglePlayerBtn.innerHTML = '<img class="w-[98%]" src="icons/plus.svg" alt="Expand">';
      this.trackInfo.style.transitionDelay = "0s";
      this.trackNav.style.transitionDelay = "0s";
    } else {
      this.musicContainer.classList.remove("hide");
      this.togglePlayerBtn.innerHTML = '<img class="w-[98%]" src="icons/close.svg" alt="Close">';
      this.trackInfo.style.transitionDelay = "0.4s";
      this.trackNav.style.transitionDelay = "0.4s";
    }
  }

  loadTrack(index) {
    const track = this.trackList[index];
    this.currentTrack.src = track.path;
    this.trackName.textContent = track.name;
    this.trackArtist.textContent = track.artist;
    this.currentTrack.load();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseTrack();
    } else {
      this.playTrack();
    }
  }

  playTrack() {
    this.currentTrack.play();
    this.isPlaying = true;
    this.playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg" alt="Pause">';
    if (this.soundBarsLottie) this.soundBarsLottie.play();
  }

  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg" alt="Play">';
    if (this.soundBarsLottie) this.soundBarsLottie.stop();
  }

  nextTrack() {
    this.trackIndex = (this.trackIndex + 1) % this.trackList.length;
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  prevTrack() {
    this.trackIndex = (this.trackIndex - 1 + this.trackList.length) % this.trackList.length;
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }
}

class AnniversaryCounter {
  constructor(anniversaryDateString) {
    this.anniversaryDate = new Date(anniversaryDateString);
    this.daysEl = document.getElementById("days");
    this.monthsEl = document.getElementById("months");
    this.yearsEl = document.getElementById("years");

    this.init();
  }

  init() {
    this.updateCounter();
    setInterval(() => this.updateCounter(), 1000 * 60 * 60 * 24);
  }

  updateCounter() {
    const today = new Date();

    let years = today.getFullYear() - this.anniversaryDate.getFullYear();
    let months = today.getMonth() - this.anniversaryDate.getMonth();
    let days = today.getDate() - this.anniversaryDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (this.daysEl) this.daysEl.textContent = days;
    if (this.monthsEl) this.monthsEl.textContent = months;
    if (this.yearsEl) this.yearsEl.textContent = years;
  }
}

class EnvelopeAnimation {
  constructor() {
    this.envelopeWrapper = document.querySelector(".envelope-wrapper");
    this.envelope = document.querySelector(".envelope");
    this.init();
  }

  init() {
    if (this.envelopeWrapper && this.envelope) {
      this.envelope.addEventListener("click", () => {
        this.envelopeWrapper.classList.toggle("flap");
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AnniversaryCounter(ANNIVERSARY_DATE);
  new MusicPlayer();
  new EnvelopeAnimation();
});
