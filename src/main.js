import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="page">
    <section class="hero">
      <span class="badge">Vite • Dev environment ready</span>
      <h1 class="title">SKL <span class="accent">site</span></h1>
      <p class="subtitle">
        A modern starter, wired up and running in your Cloud Agent environment.
      </p>
      <div class="actions">
        <button id="counter" type="button" class="btn btn-primary">
          Clicked <strong>0</strong> times
        </button>
        <a class="btn btn-ghost" href="https://vite.dev" target="_blank" rel="noreferrer">
          Vite docs
        </a>
      </div>
      <div class="stamp">Rendered at <time id="stamp"></time></div>
    </section>
  </main>
`;

const button = app.querySelector("#counter");
const count = button.querySelector("strong");
let clicks = 0;
button.addEventListener("click", () => {
  clicks += 1;
  count.textContent = String(clicks);
});

app.querySelector("#stamp").textContent = new Date().toLocaleString();
