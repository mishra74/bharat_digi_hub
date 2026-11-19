(() => {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!canHover.matches || reducedMotion.matches) return;

  let lastX = 0;
  let lastY = 0;
  let lastRippleTime = 0;
  let hasPointer = false;

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || reducedMotion.matches) return;

    if (!hasPointer) {
      lastX = event.clientX;
      lastY = event.clientY;
      hasPointer = true;
      return;
    }

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const distance = Math.hypot(dx, dy);
    const now = performance.now();
    if (distance < 12 || now - lastRippleTime < 55) return;

    const ripple = document.createElement("span");
    ripple.className = "water-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    ripple.style.setProperty("--wake-angle", `${Math.atan2(dy, dx) * 180 / Math.PI}deg`);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    document.body.append(ripple);

    const ripples = document.querySelectorAll(".water-ripple");
    if (ripples.length > 12) ripples[0].remove();

    lastX = event.clientX;
    lastY = event.clientY;
    lastRippleTime = now;
  }, { passive: true });
})();
