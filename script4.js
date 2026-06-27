const songs = [
{
title:"With You",
artist:"AP Dhillon",
src:"C:/mytask/task4/songs/With You - AP Dhillon (Official Music Video).mp3",
cover:"C:/mytask/task4/songs/With You.jpg"
},
{
title:"Undiporaadhey",
artist:"Sree Harsha Konuganti",
src:"C:/mytask/task4/songs/Undiporaadhey Full Video Song  Hushaaru Songs  Radhan  Sree Harsha Konuganti.mp3",
cover:"C:/mytask/task4/songs/Undiporaadhey.jpg"
},
{
title:"Humsafar",
artist:"Akhil Sachdev",
src:"C:/mytask/task4/songs/Humsafar (Full Video)   Varun & Alia Bhatt  Akhil Sachdeva  Badrinath Ki Dulhania.mp3",
cover:"C:/mytask/task4/songs/Humsafar.jpg"
},
{
title:"Gehara Hua",
artist:"Arijit Singh",
src:"C:/mytask/task4/songs/Gehra Hua - Lyrical (Full Version)  Dhurandhar, Ranveer Singh, Sara A,Shashwat Sachdev,Arijit Singh.mp3",
cover:"C:/mytask/task4/songs/gehara hua.jpg"
}
];

let index = 0;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songList = document.getElementById("songList");

function loadSong(i){
let song = songs[i];
audio.src = song.src;
cover.src = song.cover;
title.textContent = song.title;
artist.textContent = song.artist;
}

function playSong(){
audio.play();
playBtn.textContent = "⏸";
}

function pauseSong(){
audio.pause();
playBtn.textContent = "▶";
}

playBtn.onclick = ()=>{
audio.paused ? playSong() : pauseSong();
};

nextBtn.onclick = ()=>{
index = (index+1)%songs.length;
loadSong(index);
playSong();
};

prevBtn.onclick = ()=>{
index = (index-1 + songs.length)%songs.length;
loadSong(index);
playSong();
};

audio.ontimeupdate = ()=>{
progress.value = (audio.currentTime/audio.duration)*100;

let m = Math.floor(audio.currentTime/60);
let s = Math.floor(audio.currentTime%60);
if(s<10)s="0"+s;

currentTime.textContent = m+":"+s;
};

progress.oninput = ()=>{
audio.currentTime = (progress.value/100)*audio.duration;
};

volume.oninput = ()=>{
audio.volume = volume.value;
};

audio.onloadedmetadata = ()=>{
let m = Math.floor(audio.duration/60);
let s = Math.floor(audio.duration%60);
if(s<10)s="0"+s;
duration.textContent = m+":"+s;
};

songs.forEach((s,i)=>{
let div = document.createElement("div");
div.className="song";
div.textContent = s.title;

div.onclick = ()=>{
index=i;
loadSong(i);
playSong();
};

songList.appendChild(div);
});

loadSong(0);
audio.volume = 0.5;