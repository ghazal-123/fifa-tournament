let winSound = new Audio("./sounds/preview.mp3");
let qfWinners = [];
let sfWinners = [];
let groupWinners = [];
console.log("main js loadrd")
/* ================= GROUPS ================= */
let groupsDone = 0;

function calculateGroup(group) {
  let teams = {};
  let matches = [];
  let outputId = "";

  if (group === "A") {
    teams = { Germany: 0, Brazil: 0, France: 0, Spain: 0 };
    matches = [
      ["Germany", "Brazil", g1, b1],
      ["France", "Spain", f1, s1],
      ["Germany", "France", g2, f2],
      ["Brazil", "Spain", b2, s2],
      ["Germany", "Spain", g3, s3],
      ["Brazil", "France", b3, f3],
    ];
    outputId = "groupAOut";
  }
  if (group === "B") {
    teams = { Argentina: 0, Portugal: 0, Italy: 0, Netherlands: 0 };
    matches = [
      ["Argentina", "Portugal", a1, p1],
      ["Italy", "Netherlands", i1, n1],
      ["Argentina", "Italy", a2, i2],
      ["Portugal", "Netherlands", p2, n2],
      ["Argentina", "Netherlands", a3, n3],
      ["Portugal", "Italy", p3, i3],
    ];
    outputId = "groupBOut";
  }
  if (group === "C") {
    teams = { England: 0, Belgium: 0, Croatia: 0, Denmark: 0 };
    matches = [
      ["England", "Belgium", e1, be1],
      ["Croatia", "Denmark", c1, d1],
      ["England", "Croatia", e2, c2],
      ["Belgium", "Denmark", be2, d2],
      ["England", "Denmark", e3, d3],
      ["Belgium", "Croatia", be3, c3],
    ];
    outputId = "groupCOut";
  }
  if (group === "D") {
    teams = { Portugal: 0, Uruguay: 0, Mexico: 0, USA: 0 };
    matches = [
      ["Portugal", "Uruguay", p4, u1],
      ["Mexico", "USA", m1, us1],
      ["Portugal", "Mexico", p5, m2],
      ["Uruguay", "USA", u2, us2],
      ["Portugal", "USA", p6, us3],
      ["Uruguay", "Mexico", u3, m3],
    ];
    outputId = "groupDOut";
  }

  // check for inputs
  for (let m of matches) {
    if (!m[2].value || !m[3].value) {
      alert(" Fill in all group results  ");
      return;
    }
  }

  //  calc points
  for (let m of matches) {
    let score1 = parseInt(m[2].value);
    let score2 = parseInt(m[3].value);
    if (score1 > score2) {
      teams[m[0]] += 3;
    } else if (score2 > score1) {
      teams[m[1]] += 3;
    } else {
      teams[m[0]] += 1;
      teams[m[1]] += 1;
    }
  }

  // ترتيب الفرق واختيار أول فريقين
  let sorted = Object.keys(teams).sort((a, b) => teams[b] - teams[a]);
  document.getElementById(outputId).innerText =
    "Top 1: " + sorted[0] + ", top2: " + sorted[1];
  groupsDone++;
  groupWinners.push(sorted[0], sorted[1]);
  if (groupsDone === 4) {
    document.getElementById("btnQF").disabled = false;
    setLockOpen("iconQF");
    let qfEl = document.getElementById("qf");
    let qfCollapse = bootstrap.Collapse.getOrCreateInstance(qfEl);

    qfCollapse.show();

    document.getElementById("qf1Teams").innerText =
      groupWinners[0] + " vs " + groupWinners[1];
    document.getElementById("qf2Teams").innerText =
      groupWinners[2] + " vs " + groupWinners[3];
    document.getElementById("qf3Teams").innerText =
      groupWinners[4] + " vs " + groupWinners[5];
    document.getElementById("qf4Teams").innerText =
      groupWinners[6] + " vs " + groupWinners[7];
  }
}
/* ================= QF ================= */

function playQF() {
  if (
    !qf1a.value ||
    !qf1b.value ||
    !qf2a.value ||
    !qf2b.value ||
    !qf3a.value ||
    !qf3b.value ||
    !qf4a.value ||
    !qf4b.value
  ) {
    alert(" Fill in the quarter-final results ");
    return;
  }

  qfWinners = [
    qf1a.value > qf1b.value ? groupWinners[0] : groupWinners[1],
    qf2a.value > qf2b.value ? groupWinners[2] : groupWinners[3],
    qf3a.value > qf3b.value ? groupWinners[4] : groupWinners[5],
    qf4a.value > qf4b.value ? groupWinners[6] : groupWinners[7],
  ];

  document.getElementById("qfOut").innerText = qfWinners.join("\n");

  document.getElementById("btnSF").disabled = false;
  setLockOpen("iconSF");
  new bootstrap.Collapse(document.getElementById("sf"), {
    show: true,
  });

  document.getElementById("sf1Teams").innerText =
    qfWinners[0] + " vs " + qfWinners[1];
  document.getElementById("sf2Teams").innerText =
    qfWinners[2] + " vs " + qfWinners[3];
}

/* ================= SF ================= */

function playSF() {
  // Check QF results
  if (qfWinners.length < 4) {
    alert("Finish QF first");
    return;
  }

  // 🔴 Check the entered values
  if (!sf1a.value || !sf1b.value || !sf2a.value || !sf2b.value) {
    alert("Fill all Semi Final results");
    return;
  }

  //Winners account
  sfWinners = [
    sf1a.value > sf1b.value ? qfWinners[0] : qfWinners[1],
    sf2a.value > sf2b.value ? qfWinners[2] : qfWinners[3],
  ];

  // Show results
  document.getElementById("sfOut").innerText = sfWinners.join("\n");

// Activate the final  
  document.getElementById("btnFinal").disabled = false;
  setLockOpen("iconFinal");
  new bootstrap.Collapse(document.getElementById("final"), {
    show: true,
  });

  document.getElementById("finalTeams").innerText =
    sfWinners[0] + " vs " + sfWinners[1];
}
/* ================= FINAL ================= */

function playFinal() {
// 🔴 Check the entries

  if (!fa1.value || !fa2.value) {
    alert("Fill final results");
    return;
  }

// Hero's Account  
  let champ = fa1.value > fa2.value ? sfWinners[0] : sfWinners[1];

  document.getElementById("finalOut").innerText = "🏆 CHAMPION: " + champ;

// 🎵 Play audio  
  winSound.currentTime = 0;
  winSound.play();

// 🎊 Confetti  
  let duration = 3000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      spread: 80,
      origin: { y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
//local storage
function saveInputs() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      localStorage.setItem(input.id, input.value);
    });
  });
}

saveInputs();

function loadInputs() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    let saved = localStorage.getItem(input.id);
    if (saved !== null) {
      input.value = saved;
    }
  });
}

loadInputs();

function setLockOpen(iconId) {
  let icon = document.getElementById(iconId);
  if (!icon) return;

  icon.className = "bi bi-unlock me-2";
}

function setLockClosed(iconId) {
  let icon = document.getElementById(iconId);
  if (!icon) return;

  icon.className = "bi bi-lock me-2";
}

//reset 

function resetAll() {
  console.log("RESET FIRED 🔥");

  localStorage.clear();

  document.querySelectorAll("input").forEach((i) => (i.value = ""));

  qfWinners = [];
  sfWinners = [];
  groupWinners = [];
  groupsDone = 0;

  document.querySelectorAll("pre").forEach((p) => (p.innerText = ""));

  document.getElementById("btnQF").disabled = true;
  document.getElementById("btnSF").disabled = true;
  document.getElementById("btnFinal").disabled = true;

  setLockClosed("iconQF");
  setLockClosed("iconSF");
  setLockClosed("iconFinal");
}

window.resetAll = resetAll;
