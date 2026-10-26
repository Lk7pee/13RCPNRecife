const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#ano-atual");
const form = document.querySelector("#form-contato");
const statusMessage = document.querySelector("#form-status");
const gmailLinks = document.querySelectorAll(".gmail-compose-link");
const cartorioEmail = "rcpn13arrudarecife@gmail.com";
document.documentElement.classList.add("js");

function openGmailCompose({ subject = "", body = "" } = {}) {
  const gmailWeb = new URL("https://mail.google.com/mail/");
  gmailWeb.searchParams.set("view", "cm");
  gmailWeb.searchParams.set("fs", "1");
  gmailWeb.searchParams.set("to", cartorioEmail);

  if (subject) {
    gmailWeb.searchParams.set("su", subject);
  }

  if (body) {
    gmailWeb.searchParams.set("body", body);
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    const gmailApp = new URL("googlegmail://co");
    gmailApp.searchParams.set("to", cartorioEmail);

    if (subject) {
      gmailApp.searchParams.set("subject", subject);
    }

    if (body) {
      gmailApp.searchParams.set("body", body);
    }

    window.location.href = gmailApp.toString();

    window.setTimeout(() => {
      window.location.href = gmailWeb.toString();
    }, 900);

    return;
  }

  window.open(gmailWeb.toString(), "_blank", "noopener");
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  function closeMenu(returnFocus = false) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.querySelector(".sr-only").textContent = "Abrir menu";
    if (returnFocus) navToggle.focus();
  }
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen ? "Fechar menu" : "Abrir menu";
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      closeMenu();
      if (link.getAttribute("href").startsWith("#")) {
        const destination = document.getElementById(link.hash.slice(1));
        if (destination) {
          destination.setAttribute("tabindex", "-1");
          destination.focus({ preventScroll: true });
        }
      }
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
  });
  window.matchMedia("(min-width: 1200px)").addEventListener("change", () => closeMenu());
}

gmailLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openGmailCompose();
  });
});

if (form && statusMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (String(data.get("site") || "").trim()) return;
    const nome = data.get("nome");
    const email = data.get("email");
    const assunto = data.get("assunto");
    const mensagem = data.get("mensagem");

    const body = [
      `Nome: ${nome}`,
      `Email: ${email}`,
      "",
      "Mensagem:",
      mensagem
    ].join("\n");

    statusMessage.textContent = "O Gmail será aberto para revisão. Conclua o envio por lá. Se ele não abrir, use o link de e-mail ou os telefones informados nesta página.";
    openGmailCompose({
      subject: String(assunto),
      body
    });

  });
  // Sem JavaScript, use os canais diretos; o formulário não envia dados pessoais por GET.
  form.querySelector('button[type="submit"]').disabled = false;
}

// O atalho flutuante cede espaço quando poderia cobrir texto ou controles.
// Os links de contato permanecem disponíveis no conteúdo e no rodapé.
const floatingWhatsApp = document.querySelector(".whatsapp-float");
if (floatingWhatsApp) {
  const contentElements = document.querySelectorAll("main p, main h1, main h2, main h3, main a, main dl, main li, main input, main textarea, main button, main label, main summary, footer a, footer p, footer strong");
  let pending = false;
  function protectContent() {
    pending = false;
    const button = floatingWhatsApp.getBoundingClientRect();
    const overlaps = Array.from(contentElements).some((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.left < button.right + 8 && rect.right > button.left - 8 && rect.top < button.bottom + 8 && rect.bottom > button.top - 8;
    });
    floatingWhatsApp.classList.toggle("is-obscuring", overlaps);
  }
  function scheduleProtection() {
    if (!pending) { pending = true; requestAnimationFrame(protectContent); }
  }
  window.addEventListener("scroll", scheduleProtection, { passive: true });
  window.addEventListener("resize", scheduleProtection);
  document.addEventListener("toggle", scheduleProtection, true);
  document.fonts.ready.then(scheduleProtection);
  scheduleProtection();
}

