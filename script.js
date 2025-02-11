// 缓存 DOM 元素
const videoItems = document.querySelectorAll(".video-item");
const imageItems = document.querySelectorAll(".image-item");
const mediaCards = document.querySelectorAll(".media-card");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".fullscreen-overlay");
const fullscreenVideo = overlay.querySelector(".fullscreen-video");
const fullscreenImage = overlay.querySelector(".fullscreen-image");

// 初始化媒体元素
function initMedia() {
  // 视频初始化
  videoItems.forEach((item) => {
    const video = item.querySelector("video");
    video.src = item.dataset.video;
    video.muted = true;
  });

  // 图片点击事件
  imageItems.forEach((item) => {
    item.querySelector("img").loading = "lazy"; // 延迟加载
  });
}

// 打开全屏媒体
function openFullscreenMedia(element) {
  overlay.classList.add("active");

  if (element.classList.contains("video-item")) {
    // 处理视频
    fullscreenVideo.style.display = "block";
    fullscreenImage.style.display = "none";

    fullscreenVideo.src = element.querySelector("video").src;
    fullscreenVideo.muted = false;
    fullscreenVideo.controls = true;

    fullscreenVideo.play().catch(() => {
      fullscreenVideo.controls = true;
    });
  } else {
    // 处理图片
    fullscreenVideo.style.display = "none";
    fullscreenImage.style.display = "block";

    const imgSrc = element.querySelector("img").src;
    fullscreenImage.src = imgSrc; // 假设没有大图版本

    // 为全屏图片添加点击事件监听器
    fullscreenImage.addEventListener("click", function (event) {
      if (event.target === fullscreenImage) {
        closeFullscreen();
      }
    });
  }
}

// 关闭全屏
function closeFullscreen() {
  overlay.classList.remove("active");
  fullscreenVideo.pause();
  fullscreenVideo.currentTime = 0;
}

// 事件监听
mediaCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    if (!e.target.classList.contains("close-btn")) {
      openFullscreenMedia(this);
    }
  });
});

closeBtn.addEventListener("click", closeFullscreen);
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && closeFullscreen()
);

// 初始化
initMedia();
