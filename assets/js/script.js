
const data = {
  "Frontend":[["HTML5","#e44d26"],["CSS3","#264de4"],["JavaScript","#c9a700"],["TypeScript","#3178c6"],["React","#149eca"],["Next.js","#111111"],["Vue.js","#3fb27f"],["Angular","#dd0031"],["Svelte","#ff3e00"],["Tailwind","#06b6d4"]],
  "Backend":[["Node.js","#3c873a"],["Python","#3776ab"],["Django","#0c4b33"],["FastAPI","#009688"],["Java","#e76f00"],["Spring Boot","#6db33f"],["PHP","#777bb4"],["Laravel","#ff2d20"],["Go","#00add8"],[".NET","#512bd4"],["Ruby on Rails","#cc0000"]],
  "Mobile":[["Swift","#f05138"],["Kotlin","#7f52ff"],["Flutter","#02569b"],["React Native","#149eca"],["Android","#3ddc84"],["iOS","#555555"]],
  "Cloud & DevOps":[["AWS","#ff9900"],["Azure","#0078d4"],["Google Cloud","#4285f4"],["Docker","#2496ed"],["Kubernetes","#326ce5"],["Terraform","#7b42bc"],["Jenkins","#d24939"],["GitHub Actions","#2088ff"],["Linux","#333333"]],
  "Data & AI":[["TensorFlow","#ff6f00"],["PyTorch","#ee4c2c"],["OpenAI API","#10a37f"],["LangChain","#1c3c3c"],["Pandas","#150458"],["Spark","#e25a1c"],["Power BI","#c79b00"],["Tableau","#e97627"]],
  "Databases":[["PostgreSQL","#336791"],["MySQL","#00758f"],["MongoDB","#47a248"],["Redis","#dc382d"],["Elasticsearch","#00a9e5"],["Firebase","#ca8a04"],["SQL Server","#a91d22"],["Kafka","#231f20"]]
};
const tabs=document.querySelector('.tabs'), grid=document.getElementById('grid');
if (!tabs || !grid) {
  console.error('Technology filters could not initialize: expected .tabs and #grid.');
} else {
  const mk=(t,c)=>{const d=document.createElement('div');d.className='tech';d.innerHTML=`<i style="background:${c}">${t.replace(/[^A-Za-z0-9.#]/g,'').slice(0,2)}</i><span>${t}</span>`;return d};
  function show(cat){
    grid.replaceChildren();
    const list = cat==='All' ? Object.values(data).flat() : data[cat];
    list.forEach(([t,c])=>grid.appendChild(mk(t,c)));
    tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.cat===cat));
  }
  ['All',...Object.keys(data)].forEach(cat=>{
    const b=document.createElement('button');b.textContent=cat;b.dataset.cat=cat;b.setAttribute('role','tab');
    b.onclick=()=>show(cat);tabs.appendChild(b);
  });
  show('All');
}
const navbar = document.querySelector('.navbar');

if (navbar) {
  const updateNavbar = () => {
    navbar.classList.toggle('sticky', window.scrollY > 50);
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

const mobileNavigation = document.querySelector('.mobile-navigation');

if (mobileNavigation) {
  mobileNavigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      mobileNavigation.open = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    function handleScroll() {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Apply the correct state when the page loads
    handleScroll();
});
  // The spotlight stays still while hovering a technology; it shines from
    // the row's left edge and focuses on the card under the pointer.
    document.querySelectorAll(".stack-row").forEach((row) => {
      const beam = row.querySelector(".spotlight-beam");
      const cards = row.querySelectorAll(".tech-card");
      let activeCard = null;

      function focusCard(card) {
        if (!card) return;
        if (activeCard) activeCard.classList.remove("is-focused");
        activeCard = card;
        activeCard.classList.add("is-focused");
        row.classList.add("spotlight-active");

        const rowRect = row.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const targetX = cardRect.left + cardRect.width / 2 - rowRect.left;
        beam.style.width = `${Math.max(0, targetX)}px`;
        beam.style.opacity = "1";
      }

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => focusCard(card));
        card.addEventListener("focus", () => focusCard(card));
      });

      function turnOff() {
        if (activeCard) activeCard.classList.remove("is-focused");
        activeCard = null;
        row.classList.remove("spotlight-active");
        beam.style.opacity = "0";
        beam.style.width = "0";
      }

      row.addEventListener("mouseleave", turnOff);
      row.addEventListener("focusout", (event) => {
        if (!row.contains(event.relatedTarget)) turnOff();
      });
    });
      
window.addEventListener("scroll", function () {
    const hero = document.querySelector(".hero-wave");
    const navbar = document.querySelector(".navbar");
if(window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
    if (window.scrollY > 650) {
        // hero.classList.add("sticky");
    } else {
        hero.classList.remove("sticky");
    }
});

const modalTriggers = new Map([
    ["#services", document.getElementById("servicesModal")],
    ["#stack", document.getElementById("technologyModal")],
    ["#industries", document.getElementById("industriesModal")]
]);

function closeOpenModals() {
    modalTriggers.forEach((modal) => {
        if (modal instanceof HTMLDialogElement && modal.open) {
            modal.close();
        }
    });
}

function openModal(modal, trigger) {
    if (!(modal instanceof HTMLDialogElement) || modal.open) {
        return;
    }

    if (trigger instanceof HTMLElement && trigger.closest(".navbar")) {
        const triggerRect = trigger.getBoundingClientRect();
        const navbarRect = trigger.closest(".navbar").getBoundingClientRect();
        const modalWidth = Math.min(1180, window.innerWidth - 32);
        const left = Math.max(16, Math.min(
            triggerRect.left + triggerRect.width / 2 - modalWidth / 2,
            window.innerWidth - modalWidth - 16
        ));
        const top = Math.min(
            Math.max(triggerRect.bottom + 14, navbarRect.bottom + 12),
            Math.max(12, window.innerHeight - 180)
        );
        const arrowLeft = Math.max(
            24,
            Math.min(triggerRect.left + triggerRect.width / 2 - left, modalWidth - 24)
        );

        modal.style.left = `${left}px`;
        modal.style.top = `${top}px`;
        modal.style.margin = "0";
        modal.style.setProperty("--modal-top", `${top}px`);
        modal.style.setProperty("--modal-arrow-left", `${arrowLeft}px`);
    } else {
        modal.style.removeProperty("left");
        modal.style.removeProperty("top");
        modal.style.removeProperty("margin");
        modal.style.removeProperty("--modal-top");
        modal.style.removeProperty("--modal-arrow-left");
    }
    modal.show();
}

modalTriggers.forEach((modal, hash) => {
    if (!(modal instanceof HTMLDialogElement)) {
        return;
    }

    document.querySelectorAll(`a[href="${hash}"]`).forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            if (modal.open) {
                modal.close();
                return;
            }
            closeOpenModals();
            openModal(modal, link);
        });
    });
});

const initialModal = modalTriggers.get(window.location.hash);
if (initialModal instanceof HTMLDialogElement) {
    openModal(initialModal);
}

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const openModalElement = Array.from(modalTriggers.values()).find(
        (modal) => modal instanceof HTMLDialogElement && modal.open
    );
    if (openModalElement && !openModalElement.contains(event.target) &&
        !Array.from(modalTriggers.keys()).some((hash) => event.target.closest(`a[href="${hash}"]`))) {
        closeOpenModals();
    }
});

document.querySelectorAll(".submenu-item").forEach((item) => {
    item.addEventListener("click", closeOpenModals);
});