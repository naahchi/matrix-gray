const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width, height, columns, drops;
const fontSize = 18;

// Light gray / silver Matrix-style characters
// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=<>[]{}アイウエオカキクケコサシスセソ";
const characters = "अआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ०१२३४५६७८९";

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  columns = Math.ceil(width / fontSize);
  drops = Array.from({ length: columns }, () =>
    Math.floor(Math.random() * (height / fontSize))
  );
}

function draw() {
  // Dark translucent layer creates the long fading trails.
  ctx.fillStyle = "rgba(5, 5, 5, 0.085)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textBaseline = "top";

  for (let i = 0; i < columns; i++) {
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Mostly light gray, with occasional brighter leading characters.
    const isLead = Math.random() < 0.07;
    ctx.fillStyle = isLead ? "#f2f2f2" : "#bdbdbd";

    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, x, y);

    // Randomly restart a stream after it reaches the bottom.
    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
