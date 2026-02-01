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

      <div class="final-inner">
        <div class="final-header">
          <h1>OKAYYYYY 👀💘</h1>
          <p>my little collage of you</p>
        </div>

        <div class="collage-grid">
          <div class="collage-item">
            <div class="collage-note">
              <h3>ok soooo…</h3>
              <p>you said yes?? oh.. well.. counting the days until you're back 💗</p>
            </div>
            <div class="collage-cap"><small>contract signed ✅</small></div>
          </div>

          <div class="collage-item">
            <img src="images/chickfila.jpg" alt="Chick-fil-A sandwich">
            <div class="collage-cap">spicy sandwich <small>+ sauce energy 🔥</small></div>
          </div>

          <div class="collage-item">
            <img src="images/cake.jpg" alt="Chocolate mousse cake">
            <div class="collage-cap">mousse cake <small>dangerous 🍫</small></div>
          </div>

          <div class="collage-item">
            <img src="images/noodles.jpg" alt="Noodles">
            <div class="collage-cap">NOODLES <small>mandatory 🍜</small></div>
          </div>

          <div class="collage-item">
            <img src="images/marshmallows.jpg" alt="Marshmallows">
            <div class="collage-cap">marshmallows <small>☁️</small></div>
          </div>

          <div class="collage-item">
            <img src="images/fish_burrito.jpg" alt="Fish burrito">
            <div class="collage-cap">fish burrito <small>🌯🐟</small></div>
          </div>

          <!-- posters: big on desktop, normal on phone -->
          <div class="collage-item span-2">
            <img src="images/oc.jpg" alt="OC poster">
            <div class="collage-cap">poster #1 <small>readable on desktop 👀</small></div>
          </div>

          <div class="collage-item span-2">
            <img src="images/modern1.jpg" alt="Modern poster">
            <div class="collage-cap">poster #2 <small>readable on desktop 😤</small></div>
          </div>

          <div class="collage-item">
            <img src="images/gilmore.jpg" alt="Gilmore">
            <div class="collage-cap">gilmore vibes <small>☕️📚</small></div>
          </div>

          <div class="collage-item">
            <div class="collage-note">
              <h3>final verdict</h3>
              <p>you’re my favorite person every 💞</p>
            </div>
            <div class="collage-cap"><small>no takebacks</small></div>
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

  let dodgeLevel = 0;
  const maxDodgeLevel = 4; // keep it chill for phone
  let noEscapesLeft = 2;   // <-- flies off 2 times

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function moveNoButtonSmall() {
    const rowRect = btnRow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const rangeX = 18 + dodgeLevel * 8;  // smaller than before (phone friendly)
    const rangeY = 8 + dodgeLevel * 5;

    const dx = (Math.random() * 2 - 1) * rangeX;
    const dy = (Math.random() * 2 - 1) * rangeY;

    const m = noBtn.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
    const curX = m ? parseFloat(m[1]) : 0;
    const curY = m ? parseFloat(m[2]) : 0;

    let nextX = curX + dx;
    let nextY = curY + dy;

    const maxX = (rowRect.width / 2) - (btnRect.width / 2) - 6;
    const maxY = 34;

    nextX = clamp(nextX, -maxX, maxX);
    nextY = clamp(nextY, -maxY, maxY);

    noBtn.style.transform = `translate(${nextX}px, ${nextY}px)`;
  }

  function flyOffButtonTwice(btn) {
    const dir = Math.random() < 0.5 ? -1 : 1;

    btn.animate(
      [
        { transform: btn.style.transform || "translate(0px, 0px) rotate(0deg)" },
        { transform: `translate(${dir * 480}px, -260px) rotate(${dir * 28}deg)` }
      ],
      { duration: 420, easing: "cubic-bezier(.2,.9,.2,1)" }
    );

    // Reset after fling so it can be clicked again
    setTimeout(() => {
      btn.style.transform = "translate(0px, 0px)";
    }, 430);
  }

  // Slight dodge on hover (not impossible)
  noBtn.addEventListener("mouseenter", () => {
    if (noEscapesLeft <= 0) return; // once it's "finally clickable", stop dodging
    dodgeLevel = Math.min(maxDodgeLevel, dodgeLevel + 1);
    moveNoButtonSmall();
  });

  noBtn.addEventListener("mousemove", () => {
    if (noEscapesLeft <= 0) return;
    if (Math.random() < 0.12) moveNoButtonSmall();
  });

  // Click behavior: fly off 2 times, then stay
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    warning.textContent = "Do you like hate me????";

    if (noEscapesLeft > 0) {
      noEscapesLeft -= 1;
      flyOffButtonTwice(noBtn);
      return;
    }

    // After 2 escapes, it stays put (still shows warning)
    noBtn.style.transform = "translate(0px, 0px)";
  });

  yesBtn.addEventListener("click", () => {
    // If you're also doing the mailto email, call it here:
    // sendValentineEmail();

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
