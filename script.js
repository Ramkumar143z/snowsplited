// --- Global State ---
let userId = 'Anonymous';
let isAuthenticated = false;
let currentPortal = 0;
const portalState = { 1: 'pending', 2: 'pending', 3: 'pending' };

// --- DOM Elements ---
const messageBox = document.getElementById('message-box');
const video = document.getElementById('bg-video');
const modal = document.getElementById('modal');

// --- Helper Functions ---
function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
    setTimeout(() => messageBox.classList.add('hidden'), 3000);
}

// --- Parallax & Scroll logic ---
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    video.style.transform = `scale(1.1) translateY(${scroll * 0.2}px)`;
    
    document.querySelectorAll('.portal-card').forEach(p => {
        const rect = p.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.8) p.classList.add('visible');
    });
});

// --- Portal Management ---
window.openPortal = function(id) {
    if (id > 1 && !isAuthenticated) {
        document.getElementById('auth-overlay').classList.remove('hidden');
        return;
    }
    currentPortal = id;
    modal.classList.remove('hidden');
    // Logic for specific portals goes here...
    if(id === 3) startScan();
};

function startScan() {
    const cam = document.getElementById('camera-simulation');
    cam.classList.remove('hidden');
    cam.classList.add('scanning-active');
    setTimeout(() => {
        cam.classList.remove('scanning-active');
        completePortal(3);
    }, 4000);
}

function completePortal(id) {
    portalState[id] = 'completed';
    const card = document.getElementById(`portal-${id}`);
    card.classList.add('completed');
    document.getElementById(`status-${id}`).textContent = "Status: Completed";
    modal.classList.add('hidden');
    currentPortal = 0;
}

// --- Event Listeners ---
document.getElementById('skip-auth-btn').addEventListener('click', () => {
    isAuthenticated = true;
    document.getElementById('auth-overlay').classList.add('hidden');
    showMessage("Continuing as Guest");
});

document.querySelectorAll('.portal-card').forEach((card, index) => {
    card.addEventListener('click', () => openPortal(index + 1));
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    showMessage("Welcome to SNOW AI. Scroll to start.");
});