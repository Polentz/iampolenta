const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight)
documentHeight();

// const init = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         const canvas = document.getElementById("canvas");
//         const ctx = canvas.getContext("2d");
//         const docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
//         const docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
//         canvas.width = docWidth;
//         canvas.height = docHeight;
//         const thickness = 8;
//         let points = []
//         const drawLine = (p1, p2, width, ctx) => {
//             ctx.beginPath()
//             ctx.lineWidth = width;
//             ctx.strokeStyle = "#E5BEEC";
//             ctx.moveTo(p1[0], p1[1]);
//             const a = p1[0] - p2[0];
//             const b = p1[1] - p2[1];
//             if (Math.sqrt(a * a + b * b) > 100) {
//                 ctx.moveTo(p2[0], p2[1]);
//             };
//             ctx.lineTo(p2[0], p2[1]);
//             ctx.stroke();
//             ctx.closePath();
//         };
//         const drawTrail = (e) => {
//             if (canvas.getContext) {
//                 ctx.clearRect(0, 0, docWidth, docHeight);
//                 points.push([e.pageX, e.pageY]);
//                 for (let i = 1; i < points.length - 2; i++) {
//                     drawLine(points[i], points[i + 1], i * (1 / thickness), ctx);
//                 };
//                 if (points.length > 100) {
//                     points.shift();
//                 };
//             };
//         };
//         window.addEventListener("mousemove", drawTrail, { passive: true });
//     });
// };
// document.addEventListener("resize", init);
// init();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener("click", () => {
    clearCanvas();
    init();
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
});

window.addEventListener("touchmove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
});

function drawCircle() {
    var grd = ctx.createLinearGradient(0, 0, 0, 600);
    grd.addColorStop(0, "#f4dffd");
    grd.addColorStop(1, "white");
    ctx.fillStyle = "#F0F0F020";
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 90 + 10;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(this.x, this.y, 150, 45, Math.PI * 2)
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
}
init();

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    handleParticles();
}
animate();


const handleHover = () => {
    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        const projectHover = project.querySelector(".project-overview");
        const projectCover = project.querySelector(".project-preview");
        if (projectHover) {
            projectHover.addEventListener("mouseenter", () => {
                projectCover.classList.add("reveal");
            });
            projectHover.addEventListener("mouseleave", () => {
                projectCover.classList.remove("reveal");
            });
        };
    });
};

handleHover();

const typewriterText = "Roland Hammel tells us how wolves rather hunt sheep than deers and keep attacking until everything around is quiet again.                    ";
const typewriter = (target, text, speed) => {
    textArea = document.getElementById(target);
    let pointer = -1;
    setInterval(() => {
        if (pointer <= text.length) {
            textArea.innerHTML = text.substring(0, pointer);
        } else {
            pointer = -1;
        }
        pointer++;
    }, speed);
}

typewriter("text-a", typewriterText, 75);