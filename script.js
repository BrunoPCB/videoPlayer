const model = document.querySelector(".model-paused");
const playBtns = document.querySelectorAll(".playBtn");
const videoPlayer = document.querySelector(".videoPlayer");

const skipVideoBtn = document.querySelector(".skipVideo");
const returnVideoBtn = document.querySelector(".returnVideo");

const volumeSlider = document.querySelector(".volume-slider");
const volumeBtn = document.querySelector(".volume-btn");

const qualityChange = document.querySelector(".quality-change");
const qualityOptions = document.querySelector(".quality-options");
const qualityBtn = document.querySelector(".qualityBtn");

const sliderRange = document.querySelector(".slider");
const volumeRange = document.querySelector(".volume");

let volumeSliderBackgroundColor;
let qualityItens = [];

const videoQualities = ["./videos/1080.mp4", "./videos/1920.mp4"];

function hideModelPaused(show = false) {
  if (!model.classList.contains("hide") && !show) {
    model.classList.add("hide");
  } else {
    model.classList.remove("hide");
  }
}

function hideVolume(show = false) {
  if (!volumeSlider.classList.contains("hide")) {
    volumeSlider.classList.add("hide");
  } else if (show && volumeSlider.classList.contains("hide")) {
    volumeSlider.classList.remove("hide");
  }
}

function hideQualityChanger(show) {
  if (!qualityChange.classList.contains("hide")) {
    qualityChange.classList.add("hide");
  } else if (show && qualityChange.classList.contains("hide")) {
    qualityChange.classList.remove("hide");
  }
}

function playPauseVideo() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function skipVideo() {
  videoPlayer.currentTime += 10;
}

function returnVideo() {
  if (videoPlayer.currentTime - 10 < 0) {
    videoPlayer.currentTime = 0;
  } else {
    videoPlayer.currentTime -= 10;
  }
}

function rangeUpdate(
  rangeElement,
  updatedPosition,
  angle,
  firstColor,
  lastColor
) {
  let linearGradient = `linear-gradient(${angle}deg, ${firstColor} ${updatedPosition}%, ${lastColor} ${updatedPosition}%)`;

  rangeElement.style.background = linearGradient;
}

function changeVideoPositon() {
  let updatedTime =
    (videoPlayer.duration * sliderRange.value) / sliderRange.max;

  videoPlayer.currentTime = updatedTime;
}

function changeVolume(updatedVolume) {
  let setVolumeValue = updatedVolume / 100;

  videoPlayer.volume = setVolumeValue;
}

function checkClickOutsideVolume(e) {
  let isVolumeElement =
    e.target === volumeSlider ||
    e.target === volumeRange ||
    e.target === volumeBtn;

  if (!volumeSlider.classList.contains("hide") && !isVolumeElement) {
    volumeSlider.classList.add("hide");
  }
}

function checkClickOutsideQuality(e) {
  let isQualityElement =
    e.target === qualityChange ||
    e.target === qualityOptions ||
    e.target === qualityBtn;

  if (!qualityChange.classList.contains("hide") && !isQualityElement) {
    qualityChange.classList.add("hide");
  }
}

function createQualityItensArray() {
  for (let index = 0; index < qualityOptions.children.length; index++) {
    qualityItens.push(qualityOptions.children.item(index));
  }
}

function checkChangeQuality() {
  createQualityItensArray();

  qualityItens.forEach((item) => {
    item.addEventListener("click", function (e) {
      let isItemClicked = e.target === item;

      if (isItemClicked && item.classList.contains("1080")) {
        videoPlayer.src = videoQualities[0];
      } else if (isItemClicked && item.classList.contains("1920")) {
        videoPlayer.src = videoQualities[1];
      }
      videoPlayer.load();
      restartVideoTime();

      hideModelPaused(true);
    });
  });
}

function updateSliderRange() {
  let updatedTimePosition =
    (sliderRange.max * videoPlayer.currentTime) / videoPlayer.duration;

  sliderRange.value = updatedTimePosition;
}

function restartVideoTime() {
  sliderRange.value = 0;
  videoPlayer.currentTime = sliderRange.value;

  console.log(sliderRange.value);
}

function changeIconPause(item) {
  if (!item.classList.contains("fa-pause")) {
    item.classList.remove("fa-play");
    item.classList.add("fa-pause");
  } else {
    item.classList.add("fa-play");
    item.classList.remove("fa-pause");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  volumeSliderBackgroundColor =
    window.getComputedStyle(volumeRange).backgroundColor;

  rangeUpdate(
    volumeRange,
    volumeRange.value,
    "90",
    "red",
    volumeSliderBackgroundColor
  );

  checkChangeQuality();
});

window.addEventListener("click", function (e) {
  checkClickOutsideVolume(e);
  checkClickOutsideQuality(e);
  // checkChangeQuality(e);
});

model.addEventListener("click", function () {
  if (videoPlayer.paused) {
    hideModelPaused();
    playPauseVideo();
  }
});

videoPlayer.addEventListener("click", function () {
  hideModelPaused();
  playPauseVideo();
});

videoPlayer.addEventListener("timeupdate", function () {
  updateSliderRange();
  rangeUpdate(sliderRange, sliderRange.value, 90, "red", "black");

  if (videoPlayer.currentTime === videoPlayer.duration) {
    restartVideoTime();
    hideModelPaused();
  }
});

videoPlayer.addEventListener("pause", function () {
  playBtns.forEach(function (item) {
    changeIconPause(item);
  });
});

videoPlayer.addEventListener("play", function () {
  playBtns.forEach(function (item) {
    changeIconPause(item);
  });
});

playBtns.forEach(function (item) {
  item.addEventListener("click", function () {
    hideModelPaused();
    playPauseVideo();
    changeIconPause(item);
  });
});

volumeBtn.addEventListener("click", function () {
  hideVolume(true);
});

skipVideoBtn.addEventListener("click", function () {
  skipVideo();
});

returnVideoBtn.addEventListener("click", function () {
  returnVideo();
});

sliderRange.addEventListener("input", function () {
  rangeUpdate(sliderRange, sliderRange.value, 90, "red", "black");
  changeVideoPositon();
});

volumeRange.addEventListener("input", function () {
  rangeUpdate(
    volumeRange,
    volumeRange.value,
    "90",
    "red",
    volumeSliderBackgroundColor
  );

  changeVolume(volumeRange.value);
});

qualityBtn.addEventListener("click", function () {
  hideQualityChanger(true);
});
