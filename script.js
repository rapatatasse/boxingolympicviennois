function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function setText(id, value){
  const el = document.getElementById(id);
  if(!el) return;
  el.textContent = value;
}

function setHref(id, value){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute("href", value);
}

function renderPricing(){
  const el = document.getElementById("pricing");
  if(!el || !window.siteData) return;
  el.innerHTML = siteData.pricing.map(p => (
    `<div class="pill"><strong>${escapeHtml(p.label)}</strong><span>${escapeHtml(p.value)}</span></div>`
  )).join("");
}

function renderDisciplines(){
  const el = document.getElementById("disciplines");
  if(!el || !window.siteData) return;
  el.innerHTML = siteData.disciplines.map(d => `<span class="disc-tag">${escapeHtml(d)}</span>`).join("");
}

function renderDisciplineCards(){
  const root = document.getElementById("disciplinesCards");
  if(!root || !window.siteData) return;
  const cards = Array.isArray(siteData.disciplineCards) ? siteData.disciplineCards : [];
  root.innerHTML = cards.map((d) => (
    `<div class="card">
      <h3>${escapeHtml(d.title)}</h3>
      <p>${escapeHtml(d.text)}</p>
    </div>`
  )).join("");
}

function renderHighlights(){
  const root = document.getElementById("highlights");
  if(!root || !window.siteData) return;
  root.innerHTML = siteData.highlights.map(h => (
    `<div class="card">
      <h3>${escapeHtml(h.title)}</h3>
      <p>${escapeHtml(h.text)}</p>
    </div>`
  )).join("");
}

function renderGallery(targetId, items){
  const root = document.getElementById(targetId);
  if(!root) return;
  root.innerHTML = items.map((it) => {
    const alt = it.alt || "Photo";
    const caption = it.caption || "";
    return (
      `<a href="${escapeHtml(it.src)}" data-image="${escapeHtml(it.src)}" data-title="${escapeHtml(caption || alt)}">
        <img src="${escapeHtml(it.src)}" alt="${escapeHtml(alt)}" loading="lazy" />
        <div class="caption">${escapeHtml(caption || alt)}</div>
      </a>`
    );
  }).join("");
}

function renderPartners(){
  const root = document.getElementById("partners");
  if(!root || !window.siteData) return;
  root.innerHTML = siteData.partners.map((p) => (
    `<a class="partner" href="${escapeHtml(p.url)}" target="_blank" rel="noopener" data-image="${escapeHtml(p.image)}" data-title="${escapeHtml(p.title)}" data-url="${escapeHtml(p.url)}">
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
      <div>
        <strong>${escapeHtml(p.title)}</strong>
        <div><span>${escapeHtml(p.text)}</span></div>
      </div>
    </a>`
  )).join("");
}

function ensurePartnerModal(){
  let modal = document.getElementById("partnerModal");
  if(modal) return modal;

  modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "partnerModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal__dialog" role="document">
      <div class="modal__top">
        <div class="modal__title" id="partnerModalTitle">Partenaire</div>
        <button class="modal__close" type="button" id="partnerModalClose">Fermer</button>
      </div>
      <div class="modal__body">
        <img class="modal__img" id="partnerModalImg" alt="" />
      </div>
      <div class="modal__actions" id="partnerModalActions"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = document.getElementById("partnerModalClose");
  closeBtn.addEventListener("click", closePartnerModal);
  modal.addEventListener("click", (e) => {
    if(e.target === modal) closePartnerModal();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closePartnerModal();
  });

  return modal;
}

function openPartnerModal({ image, title, url }){
  const modal = ensurePartnerModal();

  const titleEl = document.getElementById("partnerModalTitle");
  const imgEl = document.getElementById("partnerModalImg");
  const actions = document.getElementById("partnerModalActions");

  titleEl.textContent = title || "Partenaire";
  imgEl.src = image;
  imgEl.alt = title || "Partenaire";

  actions.innerHTML = "";
  if(url && url !== "#"){
    actions.innerHTML = `<a class="btn" href="${escapeHtml(url)}" target="_blank" rel="noopener">Visiter le site</a>`;
  }

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const closeBtn = document.getElementById("partnerModalClose");
  closeBtn.focus();
}

function closePartnerModal(){
  const modal = document.getElementById("partnerModal");
  if(!modal) return;
  if(modal.getAttribute("aria-hidden") === "true") return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function attachImageModalHandlers(){
  document.addEventListener("click", (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a[data-image]") : null;
    if(!a) return;
    const image = a.getAttribute("data-image");
    const title = a.getAttribute("data-title") || "";
    const url = a.getAttribute("data-url") || "";
    if(!image) return;
    e.preventDefault();
    openPartnerModal({ image, title, url });
  });

  document.addEventListener("keydown", (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a[data-image]") : null;
    if(!a) return;
    if(e.key !== "Enter" && e.key !== " ") return;
    const image = a.getAttribute("data-image");
    const title = a.getAttribute("data-title") || "";
    const url = a.getAttribute("data-url") || "";
    if(!image) return;
    e.preventDefault();
    openPartnerModal({ image, title, url });
  });
}

function renderContact(){
  if(!window.siteData) return;
  setText("clubName", siteData.clubName);
  setText("clubNameFooter", siteData.clubName);
  setText("tagline", siteData.tagline);
  setText("locationShort", siteData.locationShort);

  setText("contactName", siteData.contact.name);
  setText("contactPhone", siteData.contact.phone);
  setHref("contactPhone", siteData.contact.phoneHref);
  setText("contactEmail", siteData.contact.email);
  setHref("contactEmail", siteData.contact.emailHref);
  setHref("contactFacebook", siteData.contact.facebookUrl);
  setHref("contactInstagram", siteData.contact.instagramUrl);

  const addr = document.getElementById("contactAddress");
  if(addr){
    addr.innerHTML = siteData.contact.addressLines.map(l => `<div>${escapeHtml(l)}</div>`).join("");
  }

  const video = document.getElementById("videoLink");
  if(video){
    video.setAttribute("href", siteData.videoUrl);
  }
}

function init(){
  renderContact();
  renderPricing();
  renderDisciplines();
  renderDisciplineCards();
  renderHighlights();
  if(window.siteData){
    if(siteData.galleries?.cours) renderGallery("galleryCours", siteData.galleries.cours);
    if(siteData.galleries?.evenements) renderGallery("galleryEvenements", siteData.galleries.evenements);
    if(siteData.galleries?.actualites) renderGallery("galleryActualites", siteData.galleries.actualites);
  }
  renderPartners();
  attachImageModalHandlers();
}

document.addEventListener("DOMContentLoaded", init);
