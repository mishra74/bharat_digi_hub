
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
  