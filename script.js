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

/* ---- Screens ---- */

function screen0LoadingError() {
  // Blank page vibe + tiny error in top-left
  return `<div><div class="error-top-left">Error: retrieving page</div></div>`;
}

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
        <div class="neighborhood" aria-hidden="true">
          <div class="clouds"></div>
          <div class="houses"></div>
          <div class="trees"></div>
        </div>

        <div class="overlay">
          <div class="card" id="card">
            <p class="question">Will you be my Valentine? 💘</p>
            <p class="subtext">(choose wisely)</p>

            <div class="btn-row" id="btnRow">
              <button class="btn-yes" id="yesBtn">Yes</button>
              <button class="btn-no" id="noBtn">No</button>
            </div>

            <div class="warning" id="warning"></div>
          </div>
        </div>
      </div>

      <div class="street">
        <div class="footsteps" aria-hidden="true"></div>
        <div class="duck" aria-hidden="true">🦆</div>
      </div>
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

function screenFinalFavorites() {
  // A cute collage of favorite-things (icons + labels)
  const heartsLine = "💗 💖 💘 💝 💞 💓 ❤️‍🔥 💟 💕 ".repeat(40);

  return `
    <div class="final">
      <div class="hearts-bg">${heartsLine}</div>

      <div class="final-wrap">
        <div class="final-title">
          <h1>OKAYYYYY 👀💘</h1>
          <p>A little collection of your favorites (as a preview of my effort 😤)</p>
        </div>

        <div class="grid">
          <div class="tile">
            <div class="big-emoji">🍔🔥</div>
            <h3>Spicy chicken sandwich + sauce</h3>
            <p>With that legendary “dip it in sauce” vibe.</p>
          </div>

          <div class="tile">
            <div class="big-emoji">🍫🍰</div>
            <h3>Chocolate mousse cake</h3>
            <p>Soft. Chocolatey. Zero regrets.</p>
          </div>

          <div class="tile">
            <div class="big-emoji">🍜🍜🍜</div>
            <h3>Noodles (a lot)</h3>
            <p>Enough noodles to end all sadness.</p>
          </div>

          <div class="tile">
            <div class="big-emoji">☁️🍡</div>
            <h3>Marshmallows</h3>
            <p>Sweet, fluffy, and elite.</p>
          </div>

          <div class="tile">
            <div class="big-emoji">🎤✨</div>
            <h3>Ariana Grande</h3>
            <p>Pop star energy: activated.</p>
          </div>

          <div class="tile">
            <div class="big-emoji">🎧🌙</div>
            <h3>Mac Miller</h3>
            <p>Chill playlists. Late-night vibes.</p>
          </div>

          <div class="tile" style="grid-column: span 12;">
            <div class="big-emoji">💘💘💘</div>
            <h3>And… hearts. Everywhere.</h3>
            <p>If you scroll and don’t feel loved, it’s a bug.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---- Button behavior (No runs around but still catchable) ---- */

function wireDuckButtons() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const warning = document.getElementById("warning");
  const btnRow = document.getElementById("btnRow");

  let noClickedOnce = false;
  let dodgeLevel = 0; // increases slightly, but capped
  const maxDodgeLevel = 6;

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function moveNoButton() {
    // Keep movement modest & bounded so it's not impossible
    const rowRect = btnRow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // movement range grows slightly but caps
    const rangeX = 22 + dodgeLevel * 10; // up to ~82px
    const rangeY = 10 + dodgeLevel * 6;  // up to ~46px

    // random shift
    const dx = (Math.random() * 2 - 1) * rangeX;
    const dy = (Math.random() * 2 - 1) * rangeY;

    // current transform offset (if any)
    const m = noBtn.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
    const curX = m ? parseFloat(m[1]) : 0;
    const curY = m ? parseFloat(m[2]) : 0;

    // try new offset
    let nextX = curX + dx;
    let nextY = curY + dy;

    // Boundaries: ensure button stays within row area (roughly)
    // We approximate by limiting translate so button doesn't leave the btnRow width.
    const maxX = (rowRect.width / 2) - (btnRect.width / 2) - 6;
    const maxY = 40;

    nextX = clamp(nextX, -maxX, maxX);
    nextY = clamp(nextY, -maxY, maxY);

    noBtn.style.transform = `translate(${nextX}px, ${nextY}px)`;
  }

  // Make it scoot a bit when you hover/approach
  noBtn.addEventListener("mouseenter", () => {
    if (noClickedOnce) return;
    dodgeLevel = Math.min(maxDodgeLevel, dodgeLevel + 1);
    moveNoButton();
  });

  // Small chance it wiggles even if they chase it
  noBtn.addEventListener("mousemove", () => {
    if (noClickedOnce) return;
    if (Math.random() < 0.18) moveNoButton();
  });

  // IMPORTANT: No is now clickable
  noBtn.addEventListener("click", () => {
    if (noClickedOnce) return;
    noClickedOnce = true;
    warning.textContent = "Do you like hate me????";
    // stop moving + reset to normal spot
    noBtn.style.transform = "translate(0px, 0px)";
  });

  yesBtn.addEventListener("click", () => {
    fadeTo(screenYesHold());
    setTimeout(() => {
      fadeTo(screenFinalFavorites());
    }, 3000);
  });
}

/* ---- Flow ---- */

function start() {
  // Screen 0: blank page vibe + tiny error text
  setView(screen0LoadingError());

  // After 5 seconds -> intro text
  setTimeout(() => {
    setView(screenIntroText());
    app.firstElementChild?.classList.add("fade-in");

    // Intro lasts 4 seconds
    setTimeout(() => {
      fadeTo(screenDuckScene());
      setTimeout(() => wireDuckButtons(), 500);
    }, 4000);

  }, 5000);
}

start();
