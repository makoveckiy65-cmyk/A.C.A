const RELEASE_ISO = "2026-02-06T00:00:00+02:00";

const BIO_PAGES = [
  `A.C.A is not a loud statement, but rather an atmosphere. An invitation to a<br>
   personal sound space, where the main thing is not words, but feeling.`,

  `A.C.A is not a collection of beats, but a musical space where emotions and states<br>
   are hidden. There are no words, only sound<br>
   overloaded, gloomy, but at the same time andr_teum tried to preserve the quality<br>
   and thoughtfulness of the idea`,

  `A.C.A album doesn't even need words. You want to listen to this music<br>
   without words. You're completely immersed in the atmosphere and world<br>
   that andr_teum invented.`,

  `andr_teum tried to mix all genres of new electronic music in this<br>
   album, so the album cant be boring.`
];

const intro = document.getElementById("intro");
const introACA = document.getElementById("introACA");
const app = document.getElementById("app");
const content = document.getElementById("content");

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runIntro(){
  await sleep(650);
  introACA.classList.add("isShow");
  await sleep(3600);
  introACA.classList.remove("isShow");
  await sleep(2600);

  intro.style.display = "none";
  app.classList.remove("isHidden");
  renderHome();
}

function countdownParts(){
  const t = new Date(RELEASE_ISO).getTime();
  let diff = t - Date.now();
  if (diff < 0) diff = 0;

  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return { d, h, m, s };
}
function pad2(n){ return String(n).padStart(2,"0"); }

function timeHtml({d,h,m,s}){
  return `
    <div class="timeBig" id="timeBig">
      <div class="timePart"><span data-k="d">${d}</span><span class="timeLbl">D</span></div>
      <div class="timePart"><span data-k="h">${pad2(h)}</span><span class="timeLbl">H</span></div>
      <div class="timePart"><span data-k="m">${pad2(m)}</span><span class="timeLbl">M</span></div>
      <div class="timePart"><span data-k="s">${pad2(s)}</span><span class="timeLbl">S</span></div>
    </div>
  `;
}

function renderHome(){
  content.innerHTML = `
    <div class="block">
      <div><span class="wideLogo">A.C.A</span></div>
      <div><span class="dateLine">06.02.2026</span></div>

      <div style="display:grid;gap:18px;justify-items:center;margin-top:10px">
        <button class="actionBtn" onclick="renderBio()"><span>BIOGRAPHY</span></button>
        <button class="actionBtn" onclick="renderTime()"><span>TIME LEFT</span></button>
        <button class="actionBtn" onclick="renderSocials()"><span>SOCIAL</span></button>
      </div>
    </div>
  `;
}

let bioIndex = 0;

window.renderBio = function(){
  bioIndex = 0;
  renderBioPage();
};

function renderBioPage(){
  content.innerHTML = `
    <div class="block">
      <div class="bioText">${BIO_PAGES[bioIndex]}</div>
      <button class="actionBtn" onclick="bioNext()"><span>NEXT</span></button>
    </div>
  `;
}

window.bioNext = function(){
  bioIndex++;
  if (bioIndex >= BIO_PAGES.length){
    renderHome();
    return;
  }
  renderBioPage();
};

window.renderTime = function(){
  const parts = countdownParts();
  content.innerHTML = `
    <div class="block">
      ${timeHtml(parts)}
      <button class="actionBtn timeClose" onclick="renderHome()"><span>CLOSE</span></button>
    </div>
  `;
};

setInterval(() => {
  const root = document.getElementById("timeBig");
  if (!root) return;

  const { d, h, m, s } = countdownParts();
  root.querySelector('[data-k="d"]').textContent = d;
  root.querySelector('[data-k="h"]').textContent = pad2(h);
  root.querySelector('[data-k="m"]').textContent = pad2(m);
  root.querySelector('[data-k="s"]').textContent = pad2(s);
}, 1000);

window.renderSocials = function(){
  content.innerHTML = `
    <div class="block">
      <a class="linkBtn" href="https://instagram.com/andr_teum" target="_blank" rel="noopener">
        <span>INSTAGRAM</span>
      </a>

      <a class="linkBtn" href="https://www.tiktok.com/@andr_teum" target="_blank" rel="noopener">
        <span>TIKTOK</span>
      </a>

      <button class="actionBtn" onclick="renderHome()"><span>CLOSE</span></button>
    </div>
  `;
};

runIntro();