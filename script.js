/* =====================================================
   WIIPRINT 2026
   MAIN SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initTheme();
    initMobileMenu();
    initThemeToggleMove();
    initStickyNavbar();
    initRevealAnimations();
    initCounters();
    initWhatsAppModal();
    initSmoothAnchors();
    initActiveMenu();
    initScrollProgress();
    initBackToTop();
    initParallax();
    initServiceTilt();
    initRotator();
    initHeroGlow();
    initCardOverlay();
    initTiltSmooth();

});

/* =====================================================
LOADER
===================================================== */

function initLoader() {

    const loader = document.getElementById("loader");
    if (!loader) return;

    const hide = () => {
        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => loader.remove(), 600);
        }, 500);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);

}

/* =====================================================
DARK MODE
===================================================== */

function initTheme() {

    const themeBtn =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("wiiprint-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        themeBtn.innerHTML = "☀️";

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        if (isDark) {

            localStorage.setItem(
                "wiiprint-theme",
                "dark"
            );

            themeBtn.innerHTML = "☀️";

        } else {

            localStorage.setItem(
                "wiiprint-theme",
                "light"
            );

            themeBtn.innerHTML = "🌙";

        }

    });

}

/* =====================================================
MOBILE MENU
===================================================== */

function initMobileMenu() {

    const burger =
        document.getElementById("hamburger");

    const nav =
        document.getElementById("nav-menu");

    burger.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

    document
        .querySelectorAll("#nav-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

            });

        });

}

/* =====================================================
THEME TOGGLE -> MOBILE MENU (BOTTOM)
===================================================== */

function initThemeToggleMove() {

    const btn = document.getElementById("theme-toggle");
    const nav = document.getElementById("nav-menu");
    const actions = document.querySelector(".nav-actions");
    if (!btn || !nav || !actions) return;

    const holder = document.createElement("div");
    holder.className = "nav-theme";
    holder.innerHTML = "<span>Design wechseln</span>";
    nav.appendChild(holder);

    const mq = window.matchMedia("(max-width: 991px)");

    const place = () => {
        if (mq.matches) holder.appendChild(btn);
        else actions.insertBefore(btn, actions.firstChild);
    };

    place();
    mq.addEventListener("change", place);

}

/* =====================================================
STICKY HEADER
===================================================== */

function initStickyNavbar() {

    const header =
        document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}

/* =====================================================
REVEAL ANIMATION
===================================================== */

function initRevealAnimations() {

    const reveals =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("active");

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    reveals.forEach(el => {

        observer.observe(el);

    });

}

/* =====================================================
COUNTER
===================================================== */

function initCounters() {

    const counters =
        document.querySelectorAll("[data-target]");

    const options = {

        threshold: 0.5

    };

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const element =
                        entry.target;

                    const target =
                        Number(
                            element.dataset.target
                        );

                    let start = 0;

                    const speed =
                        target / 80;

                    const update = () => {

                        start += speed;

                        if (start < target) {

                            element.innerText =
                                Math.floor(start);

                            requestAnimationFrame(update);

                        } else {

                            element.innerText =
                                target;

                        }

                    };

                    update();

                    observer.unobserve(element);

                });

            },

            options

        );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/* =====================================================
WHATSAPP MODAL
===================================================== */

/* !!! HIER DIE WHATSAPP-NUMMER EINTRAGEN !!!
   Format: Landesvorwahl + Nummer, OHNE + und OHNE 0 am Anfang.
   Beispiel: +43 664 1234567  ->  "436641234567" */
const WHATSAPP_NUMBER = "43XXXXXXXXXX";

function initWhatsAppModal() {

    const modal = document.getElementById("whatsapp-modal");
    const form = document.getElementById("whatsapp-form");
    const closeBtn = document.getElementById("close-modal");
    if (!modal || !form) return;

    const open = () => {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        setTimeout(() => form.elements["name"].focus(), 100);
    };

    const close = () => {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".whatsapp-trigger").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            open();
        });
    });

    closeBtn?.addEventListener("click", close);

    modal.addEventListener("click", e => {
        if (e.target === modal) close();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") close();
    });

    form.addEventListener("submit", e => {

        e.preventDefault();

        const d = new FormData(form);

        const lines = [
            "Hallo WiiPrint-Team!",
            "",
            "Name: " + d.get("name"),
            "Leistung: " + d.get("service")
        ];

        const msg = (d.get("message") || "").trim();
        if (msg) lines.push("", msg);

        const url = "https://wa.me/" + WHATSAPP_NUMBER +
            "?text=" + encodeURIComponent(lines.join("\n"));

        window.open(url, "_blank", "noopener");

        form.reset();
        close();

    });

}

/* =====================================================
SMOOTH SCROLL
===================================================== */

function initSmoothAnchors() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (href === "#") {
                if (this.classList.contains("whatsapp-trigger")) return;
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });

        });

    });

}

/* =====================================================
ACTIVE MENU
===================================================== */

function initActiveMenu() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "#nav-menu a"
        );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 120;

            const height =
                section.offsetHeight;

            if (
                pageYOffset >= top &&
                pageYOffset <
                top + height
            ) {

                current =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    });

}

/* =====================================================
PROGRESS BAR
===================================================== */

function initScrollProgress() {

    const progress =
        document.createElement("div");

    progress.id = "progress-bar";

    document.body.appendChild(
        progress
    );

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement
                .scrollTop;

        const height =
            document.documentElement
                .scrollHeight -
            document.documentElement
                .clientHeight;

        const percent =
            (scrollTop / height) * 100;

        progress.style.width =
            percent + "%";

    });

}

/* =====================================================
BACK TO TOP
===================================================== */

function initBackToTop() {

    const btn =
        document.createElement("button");

    btn.id = "backToTop";

    btn.innerHTML = "↑";

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            btn.classList.add("show");

        } else {

            btn.classList.remove("show");

        }

    });

}

/* =====================================================
PARALLAX HERO
===================================================== */

function initParallax() {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    window.addEventListener("scroll", () => {

        let scroll =
            window.pageYOffset;

        hero.style.backgroundPositionY =
            scroll * 0.4 + "px";

    });

}

/* =====================================================
3D TILT
===================================================== */

function initServiceTilt() {

    const cards =
        document.querySelectorAll(
            ".service-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                let rect =
                    card.getBoundingClientRect();

                let x =
                    e.clientX -
                    rect.left;

                let y =
                    e.clientY -
                    rect.top;

                let rotateX =
                    ((y / rect.height)
                        - 0.5) * -8;

                let rotateY =
                    ((x / rect.width)
                        - 0.5) * 8;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

            }
        );

    });

}

/* =====================================================
CARD OVERLAY (HOVER / TAP)
===================================================== */

function initCardOverlay() {

    const cards = document.querySelectorAll(".service-card, .portfolio-item");
    const touch = window.matchMedia("(hover: none)");

    cards.forEach(card => {

        card.addEventListener("click", e => {

            if (!touch.matches) return;
            if (e.target.closest(".overlay-btn")) return;

            const wasOpen = card.classList.contains("is-open");

            cards.forEach(c => c.classList.remove("is-open"));

            if (!wasOpen) card.classList.add("is-open");

            e.stopPropagation();

        });

    });

    document.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("is-open"));
    });

}

/* =====================================================
SMOOTH TILT (kein Ruckeln mit Overlay)
===================================================== */

function initTiltSmooth() {

    document.querySelectorAll(".service-card").forEach(card => {

        card.addEventListener("mousemove", () => {
            card.style.transition = "transform .15s ease-out";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform .6s cubic-bezier(.22,.9,.28,1)";
        });

    });

}

/* =====================================================
ROTATING WORD (HERO)
===================================================== */

function initRotator() {

    const el = document.getElementById("rotator");
    if (!el) return;

    const words = ["Offsetdruck", "Digitaldruck", "Werbetechnik", "Textildruck"];
    let i = 0;

    setInterval(() => {
        el.classList.add("out");
        setTimeout(() => {
            i = (i + 1) % words.length;
            el.textContent = words[i];
            el.classList.remove("out");
        }, 350);
    }, 2600);

}

/* =====================================================
HERO LIGHT FOLLOWS MOUSE
===================================================== */

function initHeroGlow() {

    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.addEventListener("mousemove", e => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
        hero.style.setProperty("--my", (e.clientY - r.top) + "px");
    });

}

/* =====================================================
COPYRIGHT YEAR
===================================================== */

const year =
    new Date().getFullYear();

const yearContainer =
    document.getElementById(
        "copyrightYear"
    );

if (yearContainer) {

    yearContainer.innerText =
        year;

}