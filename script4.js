const songs = [
{
    title: "Dreams",
    artist: "Artist A",
    src: "songs/song1.mp3",
    cover: "https://picsum.photos/id/10/300/300"
},
{
    title: "Adventure",
    artist: "Artist B",
    src: "songs/song2.mp3",
    cover: "https://picsum.photos/id/180/300/300"
},
{
    title: "Relax Mood",
    artist: "Artist C",
    src: "songs/song3.mp3",
    cover: "https://picsum.photos/id/433/300/300"
},
{
	title: "Gehra Hua",
	artist: "Arijit Singh",
	src: "C:/mytask/task4/songs/Gehra Hua - Lyrical (Full Version)  Dhurandhar, Ranveer Singh, Sara A,Shashwat Sachdev,Arijit Singh.mp3",
	cover: "C:/mytask/task4/songs/gehara hua.jpg",
	
},
{
	title: "Be Intehaan",
	artist: "Atif Aslam & Sunidhi",
	src: "C:/mytask/task4/songs/Be Intehaan  Atif & Sunidhi  Saif Ali Khan & Deepika Padukone  Race 2.mp3",
	cover: "C:/mytask/task4/songs/be intaah.jpg",
},
{
	title: "DARKHAAST",
	artist: "Arijit Singh",
	src: "C:/mytask/task4/songs/DARKHAAST Full Video Song   SHIVAAY  Arijit Singh & Sunidhi Chauhan  Ajay Devgn  T-Series.mp3",
	cover: "C:/mytask/task4/songs/darkhaast.jpg",
},
{
	title: "Undiporaadhey",
	artist: "Radhan  Sree Harsha Konuganti",
	src: "C:/mytask/task4/songs/Undiporaadhey Full Video Song  Hushaaru Songs  Radhan  Sree Harsha Konuganti.mp3",
	cover: "C:/mytask/task4/songs/Undiporaadhey.jpg",
},
{
	title: "Humsafar",
	artist: "Akhil Sachdeva",
	src: "C:/mytask/task4/songs/Humsafar (Full Video)   Varun & Alia Bhatt  Akhil Sachdeva  Badrinath Ki Dulhania.mp3",
	cover: "C:/mytask/task4/songs/Humsafar.jpg",
},
{
	title: "With You",
	artist: "AP Dhillon",
	src: "C:/mytask/task4/songs/With You - AP Dhillon (Official Music Video).mp3",
	cover: "C:/mytask/task4/songs/With You.jpg",
}
];

let currentSong = 0;
let repeatMode = false;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function loadSong(index){

    const song = songs[index];

    audio.src = song.src;
    cover.src = song.cover;

    title.textContent = song.title;
    artist.textContent = song.artist;
}

loadSong(currentSong);

audio.volume = 0.5;
volume.value = 0.5;

/* Play / Pause */

playBtn.addEventListener("click", () => {

    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "▶";
    }

});

/* Next */

nextBtn.addEventListener("click", () => {

    currentSong =
    (currentSong + 1) % songs.length;

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
});

/* Previous */

prevBtn.addEventListener("click", () => {

    currentSong =
    (currentSong - 1 + songs.length)
    % songs.length;

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
});

/* Shuffle */

shuffleBtn.addEventListener("click", () => {

    currentSong =
    Math.floor(
        Math.random() * songs.length
    );

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
});

/* Repeat */

repeatBtn.addEventListener("click", () => {

    repeatMode = !repeatMode;

    repeatBtn.style.background =
    repeatMode ? "#22c55e" : "#1f2937";
});

/* Progress Bar */

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        progress.value =
        (audio.currentTime /
        audio.duration) * 100;
    }

    let min =
    Math.floor(audio.currentTime / 60);

    let sec =
    Math.floor(audio.currentTime % 60);

    if(sec < 10) sec = "0" + sec;

    currentTimeEl.textContent =
    `${min}:${sec}`;
});

/* Duration */

audio.addEventListener("loadedmetadata", () => {

    let min =
    Math.floor(audio.duration / 60);

    let sec =
    Math.floor(audio.duration % 60);

    if(sec < 10) sec = "0" + sec;

    durationEl.textContent =
    `${min}:${sec}`;
});

/* Seek */

progress.addEventListener("input", () => {

    audio.currentTime =
    (progress.value / 100) *
    audio.duration;
});

/* Volume */

volume.addEventListener("input", () => {

    audio.volume = volume.value;
});

/* Autoplay */

audio.addEventListener("ended", () => {

    if(repeatMode){

        audio.currentTime = 0;
        audio.play();

    }else{

        currentSong =
        (currentSong + 1) %
        songs.length;

        loadSong(currentSong);

        audio.play();
    }
});