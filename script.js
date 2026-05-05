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
  el.innerHTML = siteData.disciplines.map(d => `<li>${escapeHtml(d)}</li>`).join("");
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
      `<a href="${escapeHtml(it.src)}" target="_blank" rel="noopener">
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
    `<a class="partner" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" />
      <div>
        <strong>${escapeHtml(p.title)}</strong>
        <div><span>${escapeHtml(p.text)}</span></div>
      </div>
    </a>`
  )).join("");
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
  }
  renderPartners();
}

document.addEventListener("DOMContentLoaded", init);
