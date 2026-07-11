const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const backToTopButton = document.querySelector(".back-to-top");
const currentYear = document.querySelector("#current-year");
const sections = document.querySelectorAll("section[id]");


/* Mobile Menu */

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


/* Close Mobile Menu After Clicking Link */

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});


/* Back To Top Button */

window.addEventListener("scroll", function () {
    if (!backToTopButton) {
        return;
    }

    if (window.scrollY > 500) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});


/* Automatic Current Year */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* Scroll Reveal Animation */

const revealItems = document.querySelectorAll(
    ".section-heading, .about-text, .stat-card, .service-card, .skill-card, .why-card, .portfolio-card, .contact-box"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(function (item, index) {
        item.classList.add("reveal-ready");

        if (index % 3 === 1) {
            item.classList.add("reveal-delay-1");
        }

        if (index % 3 === 2) {
            item.classList.add("reveal-delay-2");
        }

        revealObserver.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("reveal-visible");
    });
}


/* Active Navbar Link */

function updateActiveNavbarLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 140;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(function (link) {
        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active-link");
        }
    });
}

window.addEventListener("scroll", updateActiveNavbarLink);
window.addEventListener("load", updateActiveNavbarLink);


/* Animated Statistics Counter */

const counters = document.querySelectorAll(".stat-card h3");

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;
                const originalText = counter.textContent.trim();
                const targetNumber = parseInt(originalText, 10);
                const suffix = originalText.replace(/[0-9]/g, "");

                if (Number.isNaN(targetNumber)) {
                    observer.unobserve(counter);
                    return;
                }

                let currentNumber = 0;
                const duration = 1200;
                const frameRate = 30;
                const totalSteps = duration / frameRate;
                const increment = targetNumber / totalSteps;

                const timer = setInterval(function () {
                    currentNumber += increment;

                    if (currentNumber >= targetNumber) {
                        counter.textContent = targetNumber + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent =
                            Math.floor(currentNumber) + suffix;
                    }
                }, frameRate);

                observer.unobserve(counter);
            });
        },
        {
            threshold: 0.65
        }
    );

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });
}