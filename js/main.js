import { PROFILE, PROJECTS, EXPERIENCE, COMPETENCIES } from "./data.js";

function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (project) => `
      <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View case study for ${project.title}">
        <div class="project-visual-wrap">
          ${
            project.image
              ? `<img src="${project.image}" alt="${project.title} architecture diagram" loading="lazy" />`
              : `<div class="project-visual-fallback">
                  <span>MONOGRAPH DIAGRAM // ${project.index}</span>
                  <span>${project.stack.join(" · ")}</span>
                </div>`
          }
        </div>
        <div class="project-body">
          <div class="project-meta-top">
            <span class="project-cat">${project.categoryLabel}</span>
            <span class="project-year">ARCHIVE // ${project.index} · ${project.year}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-benchmark">${project.benchmark}</div>
          <div class="project-footer">
            <div class="stack-pills">
              ${project.stack
                .map((tech) => `<span class="stack-pill">${tech}</span>`)
                .join("")}
            </div>
            <span class="case-study-trigger">Read Case Study →</span>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openDrawer(card.dataset.projectId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDrawer(card.dataset.projectId);
      }
    });
  });
}

function renderExperience() {
  const container = document.getElementById("timeline-list");
  if (!container) return;

  container.innerHTML = EXPERIENCE.map(
    (item, idx) => `
      <div class="timeline-item" data-exp-idx="${idx}">
        <div class="timeline-header" role="button" tabindex="0" aria-expanded="${item.expanded}">
          <span class="timeline-period">${item.period}</span>
          <div>
            <h3 class="timeline-role">${item.role}</h3>
            <span class="timeline-company">${item.company}</span>
          </div>
          <span class="timeline-toggle">${item.expanded ? "Collapse −" : "Expand +"}</span>
        </div>
        <div class="timeline-details" ${item.expanded ? "" : "hidden"}>
          <ul class="timeline-bullets">
            ${item.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
          <div class="stack-pills">
            ${item.stack.map((s) => `<span class="stack-pill">${s}</span>`).join("")}
          </div>
        </div>
      </div>
    `
  ).join("");

  container.querySelectorAll(".timeline-item").forEach((el) => {
    const header = el.querySelector(".timeline-header");
    const details = el.querySelector(".timeline-details");
    const toggle = el.querySelector(".timeline-toggle");

    const handleToggle = () => {
      const isHidden = details.hasAttribute("hidden");
      if (isHidden) {
        details.removeAttribute("hidden");
        header.setAttribute("aria-expanded", "true");
        toggle.textContent = "Collapse −";
      } else {
        details.setAttribute("hidden", "");
        header.setAttribute("aria-expanded", "false");
        toggle.textContent = "Expand +";
      }
    };

    header.addEventListener("click", handleToggle);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    });
  });
}

function renderCompetencies() {
  const grid = document.getElementById("competencies-grid");
  if (!grid) return;

  grid.innerHTML = COMPETENCIES.map(
    (comp) => `
      <div class="competency-card">
        <span class="competency-idx">${comp.index}</span>
        <h3 class="competency-title">${comp.title}</h3>
        <p class="competency-desc">${comp.description}</p>
        <div class="stack-pills">
          ${comp.tags.map((t) => `<span class="stack-pill">${t}</span>`).join("")}
        </div>
      </div>
    `
  ).join("");
}

function openDrawer(projectId) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return;

  const drawer = document.getElementById("case-study-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  const content = document.getElementById("drawer-content");
  const indexEl = document.getElementById("drawer-index");

  indexEl.textContent = `CASE STUDY // ${project.index} · ${project.categoryLabel}`;
  content.innerHTML = `
    <h3 id="drawer-title" class="drawer-title">${project.title}</h3>
    <p class="drawer-subtitle">${project.summary}</p>
    <div class="drawer-metrics">
      ${project.metrics
        .map(
          (m) => `
          <div class="drawer-metric-box">
            <span class="drawer-metric-val">${m.value}</span>
            <span class="drawer-metric-lbl">${m.label}</span>
          </div>
        `
        )
        .join("")}
    </div>
    <div class="drawer-section">
      <h4>01 // Problem &amp; Operational Constraints</h4>
      <p>${project.problem}</p>
    </div>
    <div class="drawer-section">
      <h4>02 // System Architecture</h4>
      <p>${project.architecture}</p>
    </div>
    <div class="drawer-section">
      <h4>03 // Engineering Trade-offs</h4>
      <p>${project.tradeoffs}</p>
    </div>
    <div class="drawer-section">
      <h4>04 // Technology Stack</h4>
      <div class="stack-pills">
        ${project.stack.map((s) => `<span class="stack-pill">${s}</span>`).join("")}
      </div>
    </div>
  `;

  backdrop.removeAttribute("hidden");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  const drawer = document.getElementById("case-study-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (!drawer || !backdrop) return;

  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

function copyEmailToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PROFILE.email).catch(() => {});
  }
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.removeAttribute("hidden");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.setAttribute("hidden", "");
  }, 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");
  renderExperience();
  renderCompetencies();

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderProjects(btn.dataset.filter);
    });
  });

  document.getElementById("drawer-close-btn")?.addEventListener("click", closeDrawer);
  document.getElementById("drawer-backdrop")?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  ["header-copy-email", "hero-copy-email", "footer-copy-email"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", copyEmailToClipboard);
  });

  ["print-resume-btn", "experience-print-btn"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => window.print());
  });
});
