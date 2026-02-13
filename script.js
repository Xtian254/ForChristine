// Typing effect — slow, love-letter style
function typeMessage(element, text, delay = 0, speed = 120) {
    element.innerHTML = "";
    element.style.opacity = 1;
    setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            element.innerHTML += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
    }, delay);
}

// Elements
const messages = document.querySelectorAll(".message");
const title = document.querySelector(".title");
const signature = document.querySelector(".signature");
const buttons = document.querySelector(".buttons");
const easterEgg = document.getElementById("easterEgg");
const overlay = document.getElementById("startOverlay");
const music = document.getElementById("bgMusic");
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Autoplay music
window.addEventListener("load", () => {
    music.volume = 0.5;
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            overlay.style.display = "flex";
            overlay.addEventListener("click", () => {
                music.play();
                overlay.style.display = "none";
                startTypingSequence();
            }, {once:true});
        }).then(() => startTypingSequence());
    } else {
        startTypingSequence();
    }
});

// Typing sequence — bottom-up
function startTypingSequence() {
    let delay = 500;
    const allMessages = [...messages, signature, easterEgg];

    allMessages.forEach(msg => {
        typeMessage(msg, msg.innerText, delay, 120);
        delay += msg.innerText.length * 120 + 1000;
    });

    setTimeout(() => gsap.to(buttons, {opacity:1, duration:1.5}), delay);
}

// Floating hearts
const heartsContainer = document.querySelector(".hearts");
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 12 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 500);

// Button interactions
document.getElementById("yesBtn").addEventListener("click", () => {
    alert("Then let’s begin something beautiful ❤️");
    gsap.fromTo(easterEgg, {opacity:0, y:10}, {opacity:1, y:0, duration:1.5});
});

document.getElementById("waitBtn").addEventListener("click", () => {
    alert("Take your time… I’ll be here, patiently.");
});

// -----------------------------
// Sparkle particles
// -----------------------------
let sparkles = [];
function Sparkle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 1.5) * 2;
    this.opacity = 1;
}

Sparkle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
};

Sparkle.prototype.draw = function() {
    ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
};

function animateSparkles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<sparkles.length;i++){
        sparkles[i].update();
        sparkles[i].draw();
        if(sparkles[i].opacity<=0) sparkles.splice(i,1);
    }
    requestAnimationFrame(animateSparkles);
}
animateSparkles();

window.addEventListener("pointermove", (e) => sparkles.push(new Sparkle(e.clientX, e.clientY)));
window.addEventListener("click", (e) => sparkles.push(new Sparkle(e.clientX, e.clientY)));
