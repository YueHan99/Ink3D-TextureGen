const galleryItems = [
  {
    name: "Basalt Guardian",
    type: "Character",
    tags: ["Character", "Detailed"],
    note: "Stone armor with layered roughness and mild emissive seams.",
    gradient: "linear-gradient(135deg, #7c3aed, #1a1035 60%, #d4af37)"
  },
  {
    name: "Atrium Drone",
    type: "Hard Surface",
    tags: ["Hard Surface", "Metal"],
    note: "Panel breaks tuned for clean bake output and UV continuity.",
    gradient: "linear-gradient(135deg, #6d28d9, #1e1145 55%, #f5d780)"
  },
  {
    name: "Glass Reliquary",
    type: "Transparent",
    tags: ["Transparent", "Rich Material"],
    note: "Separate translucent layers for easier turntable rendering.",
    gradient: "linear-gradient(135deg, #c084fc, #2a1a50 50%, #e8c547)"
  },
  {
    name: "Mycelium Cart",
    type: "Organic",
    tags: ["Organic", "Thin Geometry"],
    note: "Thin-strand geometry protected through topology hints.",
    gradient: "linear-gradient(135deg, #9333ea, #1a0f30 50%, #c9a227)"
  },
  {
    name: "Temple Interior",
    type: "Scene",
    tags: ["Scene", "Detailed"],
    note: "Multi-material test scene with baked directional accents.",
    gradient: "linear-gradient(135deg, #8b5cf6, #1f1040 50%, #dbb84d)"
  },
  {
    name: "Ceramic Mask",
    type: "Hard Surface",
    tags: ["Hard Surface", "Rich Material"],
    note: "High micro-contrast in roughness without noisy normals.",
    gradient: "linear-gradient(135deg, #a78bfa, #221450 55%, #f0d060)"
  }
];

const tags = ["All", ...new Set(galleryItems.flatMap((item) => item.tags))];
const tagGroup = document.getElementById("tagGroup");
const cardGrid = document.getElementById("cardGrid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

let activeTag = "All";

function renderTags() {
  tagGroup.innerHTML = "";
  tags.forEach((tag) => {
    const button = document.createElement("button");
    button.className = `tag ${tag === activeTag ? "active" : ""}`;
    button.textContent = tag;
    button.addEventListener("click", () => {
      activeTag = tag;
      renderTags();
      renderCards();
    });
    tagGroup.appendChild(button);
  });
}

function renderCards() {
  cardGrid.innerHTML = "";
  const items =
    activeTag === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.tags.includes(activeTag));

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="swatch" style="background: ${item.gradient};"></div>
      <div class="card-meta">
        <h3>${item.name}</h3>
        <p>${item.type}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    cardGrid.appendChild(card);
  });
}

function openModal(item) {
  modalContent.innerHTML = `
    <h3>${item.name}</h3>
    <p style="color:var(--muted); margin-top:6px;">${item.note}</p>
    <p style="color:var(--muted);">Category: ${item.type}</p>
    <div style="height:240px;border-radius:12px;background:${item.gradient};border:1px solid var(--border);"></div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

renderTags();
renderCards();
