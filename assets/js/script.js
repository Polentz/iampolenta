const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight)
documentHeight();

const handleHover = () => {
    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        const projectHover = project.querySelector(".project-overview");
        const projectCover = project.querySelector(".project-preview");
        if (projectHover) {
            projectHover.addEventListener("mouseenter", () => {
                projectCover.classList.add("reveal");
                if (projectCover.id === "wor") {
                    document.body.style.background = "linear-gradient(0deg, #ffffff 0%, #ffc9c9 100%)"
                    document.querySelector("canvas").style.display = "none";
                    document.querySelector(".bio").style.display = "none";
                }
            });
            projectHover.addEventListener("mouseleave", () => {
                projectCover.classList.remove("reveal");
                if (projectCover.id === "wor") {
                    document.body.style.background = "transparent";
                    document.querySelector("canvas").style.display = "block";
                    document.querySelector(".bio").style.display = "block";
                }
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
};

typewriter("text-a", typewriterText, 75);

const handleOpenElement = () => {
    const element = document.querySelector(".bio");
    element.addEventListener("click", () => {
        if (element.classList.contains("close")) {
            element.classList.remove("close");
        } else {
            element.classList.add("close");
        }
    });
    window.addEventListener("scroll", () => {
        element.classList.add("close");
    });
};


const mediaQuery = window.matchMedia("(max-width: 600px)");
const handleMediaQuery = (e) => {
    if (e.matches) {
        handleOpenElement();
    };
};

mediaQuery.addListener(handleMediaQuery);
handleMediaQuery(mediaQuery);