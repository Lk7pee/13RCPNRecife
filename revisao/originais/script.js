const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#ano-atual");
const form = document.querySelector("#form-contato");
const statusMessage = document.querySelector("#form-status");
const gmailLinks = document.querySelectorAll(".gmail-compose-link");
const cartorioEmail = "rcpn13arrudarecife@gmail.com";

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
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
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

    statusMessage.textContent = "Encaminhando para o seu email...";
    openGmailCompose({
      subject: String(assunto),
      body
    });

    form.reset();
  });
}
