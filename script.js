// Typing effect function
function typeMessage(element, text, delay = 0, speed = 50) {
    let i = 0;
    element.style.opacity = 1;
    setTimeout(() => {
        const interval = setInterval(() => {
            element.innerHTML += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);
    }, delay);
}

// Collect all messages
const messages = document.querySelectorAll(".message");
const title = document.querySelector(".title");
const signature = document.querySelector(".signature");
const buttons = document.querySelector(".buttons");
const easterEgg = document.getElementById("easterEgg");
const overlay = document.getElementById("startOverlay");
const music = document.getElementById("bgMusic");

// Attempt autoplay music on load
window.addEventListener("load", () => {
    music.volume = 0.5;
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay prevented; show overlay
            overlay.style.display = "flex";
            overlay.addEventListener("click", () => {
                music.play();
                overlay.style.display = "none";
                startTypingSequence();
            }, {once:true});
            return;
        }).then(() => {
            startTypingSequence(); // start typing if autoplay works
        });
    }
});

// If autoplay allowed
if (!overlay.style.display || overlay.style.display === "none") {
    startTypingSequence();
}

// Typing sequence
function startTypingSequence() {
    let delay = 1000; // initial delay
    typeMessage(title, title.innerText, delay, 60);
    delay += title.innerText.length * 60 + 500;

    messages.forEach(msg => {
        const text = msg.innerText;
        msg.innerHTML = "";
        typeMessage(msg, text, delay, 50);
        delay += text.length * 50 + 500;
    });

    setTimeout(() => gsap.to(buttons, {opacity:1, duration:1.5}), delay);
    setTimeout(() => gsap.to(signature, {opacity:1, duration:1.5}), delay + 1000);
}

// Floating hearts
const heartsContainer = document.querySelector(".hearts");
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 25 + 15 + "px";
    heart.style.animationDuration = Math.random() * 3 + 5 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 400);

// Button interactions
document.getElementById("yesBtn").addEventListener("click", function () {
    alert("Then let’s begin something beautiful ❤️");
    gsap.to(easterEgg, {opacity:1, duration:1.5});
});

document.getElementById("waitBtn").addEventListener("click", function () {
    alert("Take your time… I’ll be here, patiently.");
});
