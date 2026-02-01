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

function sendValentineEmail() {
  const subject = encodeURIComponent("Legally Binding Valentine Agreement 💘");
  const body = encodeURIComponent(`
  This email serves as OFFICIAL, LEGALLY BINDING, UNDENIABLE proof that you have agreed to be Aaditya's Valentine for February 14th, 2026.
  
  By clicking "Yes" on the website, you have voluntarily and enthusiastically accepted the following duties:
  
  • Accepting Chick-fil-A sauce comparisons without judgment
  • Receiving an unreasonable amount of hearts 💗💖💘
  • Listening to elite music taste and pretending to like it
  • Allowing Aaditya to be mildly annoying in a charming way
  • Agreeing to chocolate mousse cake consumption
  • Accepting noodle-based date activities
  • Permitting random wholesome messages throughout the day
  
  This agreement is permanent for the date listed above and may be renewed annually.
  
  No refunds.
  No take-backs.
  No "I misclicked".
  
  Signed electronically,
  Aaditya Mandal
  (very serious about this)
    `);
  
    window.location.href = `mailto:aadityam29@gmail.com?subject=${subject}&body=${body}`;
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
        <div class="bg-layer clouds" aria-hidden="true"></div>
        <div class="bg-layer houses-far" aria-hidden="true"></div>
        <div class="bg-layer houses-near" aria-hidden="true"></div>
        <div class="bg-layer trees" aria-hidden="true"></div>

        <div class="overlay">
          <div class="card" id="card">
            <p class="question">Will you be the Chick-fil-a sauce to my Chick-fil-a sandwich? (aka valentines)</p>
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
        <div class="duck-wrap" aria-hidden="true">
          <div class="duck-tail"></div>
          <div class="duck-body"></div>
          <div class="duck-head">
            <div class="duck-eye"></div>
            <div class="duck-beak"></div>
          </div>
          <div class="leg left"></div>
          <div class="leg right"></div>
        </div>
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
  return `
    <div class="final">
      <div class="hearts-fall" aria-hidden="true"></div>

      <div class="collage">
        <div class="collage-board">
          <div class="sparkle" style="left: 6%; top: 10%;">💘</div>
          <div class="sparkle" style="left: 90%; top: 18%; animation-delay: 0.4s;">✨</div>
          <div class="sparkle" style="left: 10%; top: 78%; animation-delay: 0.8s;">💖</div>

          <div class="note" style="left: 6%; top: 6%; --w: 280px; --r: -2deg;">
            <h3>ok soooo…</h3>
            <p>you said yes?? oh.. well.. counting the days until you're back 💗</p>
          </div>

          <div class="polaroid" style="left: 10%; top: 32%; --w: 260px; --r: -6deg;">
            <img src="images/chickfila.jpg" alt="Chick-fil-A sandwich">
          </div>

          <div class="polaroid" style="left: 38%; top: 16%; --w: 250px; --r: 4deg;">
            <img src="images/cake.jpg" alt="Chocolate mousse cake">
            <div class="cap">chocolate mousse cake 🍫🍰</div>
          </div>

          <div class="polaroid" style="left: 62%; top: 34%; --w: 260px; --r: 7deg;">
            <img src="images/noodles.jpg" alt="Noodles">
            <div class="cap">NOODLES 🍜🍜🍜</div>
          </div>

          <div class="polaroid" style="left: 44%; top: 56%; --w: 230px; --r: -3deg;">
            <img src="images/marshmallows.jpg" alt="Marshmallows">
            <div class="cap">marshmallows ☁️🍡</div>
          </div>

          <div class="polaroid" style="left: 68%; top: 14%; --w: 260px; --r: 3deg;">
            <img src="images/gilmore.jpg" alt="Gilmore">
            <div class="cap">gilmore vibes ☕️📚</div>
          </div>

          <!-- Fish burrito (bigger) -->
          <div class="polaroid" style="left: 6%; top: 58%; --w: 300px; --r: 4deg;">
            <img src="images/fish_burrito.jpg" alt="Fish burrito">
            <div class="cap">elite fish burrito 🌯🐟</div>
          </div>
          
          <!-- OC poster (BIG) -->
          <div class="polaroid" style="left: 30%; top: 58%; --w: 380px; --r: -3deg;">
            <img src="images/oc.jpg" alt="OC poster">
            <div class="cap">poster energy 🎬</div>
          </div>
          
          <!-- Modern poster (BIG) -->
          <div class="polaroid" style="left: 68%; top: 42%; --w: 380px; --r: 5deg;">
            <img src="images/modern1.jpg" alt="Modern poster">
            <div class="cap">modern vibes 🖼️</div>
          </div>


          
          <div class="note" style="left: 72%; top: 70%; --w: 250px; --r: -2deg;">
            <h3>final verdict</h3>
            <p>you’re my favorite person every 💞</p>
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

  }, 3000);
}

start();
