const app = document.getElementById("app");

function setView(html) {
  app.innerHTML = html;
}

function fadeTo(nextHtml, afterMs = 450) {
  app.firstElementChild?.classList.add("fade-out");
  setTimeout(() => {
    setView(nextHtml);
    app.firstElementChild?.classList.add("fade-in");
  }, afterMs);
}

/* ---- Screen templates ---- */

function screenIntroText() {
  return `
    <div class="center">
      <div class="intro-text">oh you thought I can't code???</div>
    </div>
  `;
}

function screenDuckScene() {
  return `
    <div class="scene">
      <div class="sky">
        <div class="duck" aria-hidden="true">🦆</div>

        <div class="overlay">
          <div class="card">
            <p class="question">Will you be my Valentine? 💘</p>
            <p class="subtext">(choose wisely)</p>

            <div class="btn-row">
              <button class="btn-yes" id="yesBtn">Yes</button>
              <button class="btn-no" id="noBtn">No</button>
            </div>

            <div class="warning" id="warning"></div>
          </div>
        </div>
      </div>

      <div class="street"></div>
    </div>
  `;
}

function screenYesHold() {
  return `
    <div class="center">
      <div class="intro-text">Do I even know you like that</div>
    </div>
  `;
}

function screenFinalPlaceholder() {
  return `
    <div class="final">
      <div>
        <h1>OKAYYYY 👀</h1>
        <p>This is Screen 3. Tell me what you want here and we’ll build it.</p>
      </div>
    </div>
  `;
}

/* ---- Flow ---- */

function wireDuckButtons() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const warning = document.getElementById("warning");

  let warned = false;

  function showWarning() {
    warning.textContent = "Do you like hate me????";
    warned = true;

    // little shake effect (cheap + funny)
    noBtn.animate(
      [
        { transform: "translateX(0px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0px)" }
      ],
      { duration: 250, iterations: 1 }
    );
  }

  // "Try to click no" -> warn
  noBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    showWarning();
  });

  // Also makes it harder to click (optional but funny)
  noBtn.addEventListener("mouseenter", () => {
    if (!warned) showWarning();

    // Move the button somewhere else inside the card area
    const dx = (Math.random() * 160) - 80;
    const dy = (Math.random() * 60) - 30;
    noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  yesBtn.addEventListener("click", () => {
    // Go to the "Do I even know you like that" screen for 3 seconds
    fadeTo(screenYesHold());
    setTimeout(() => {
      fadeTo(screenFinalPlaceholder());
    }, 3000);
  });
}

function start() {
  // Screen 0: EMPTY WHITE PAGE for 5 seconds (we do nothing)
  setView(""); // keep empty

  setTimeout(() => {
    // Screen 1: intro text
    setView(screenIntroText());
    app.firstElementChild?.classList.add("fade-in");

    // After a short moment, transition to duck scene
    setTimeout(() => {
      fadeTo(screenDuckScene());
      setTimeout(() => {
        wireDuckButtons();
      }, 500);
    }, 1400);
  }, 5000);
}

start();
