
/* =========================================
   FLOR DE AÇÚCAR - JAVASCRIPT
========================================= */

// COLOQUE AQUI O WHATSAPP DA CONFEITARIA
// Use DDI + DDD + número, somente números.
// Exemplo: 5551999999999

const WHATSAPP = "5551999999999";


/* =========================================
   MENU PARA CELULAR
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("open");

        if (navigation.classList.contains("open")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-label", "Fechar menu");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
    });
}


/* =========================================
   PESQUISA E FILTROS DO CATÁLOGO
========================================= */

const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const catalogCards = document.querySelectorAll(".catalog-card");
const noResults = document.querySelector("#noResults");

let selectedCategory = "todos";

function filterProducts() {
    if (!catalogCards.length) return;

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let visibleProducts = 0;

    catalogCards.forEach(function (card) {
        const category = card.dataset.category;
        const name = card.dataset.name;

        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;

        const matchesSearch = name.includes(searchTerm);

        const shouldShow = matchesCategory && matchesSearch;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleProducts++;
        }
    });

    if (noResults) {
        noResults.hidden = visibleProducts !== 0;
    }
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();
    });
});


/* =========================================
   PREENCHER BOLO ESCOLHIDO NA ENCOMENDA
========================================= */

const flavorSelect = document.querySelector("#flavor");

if (flavorSelect) {
    const params = new URLSearchParams(window.location.search);
    const selectedCake = params.get("bolo");

    if (selectedCake) {
        const cakeOption = Array.from(flavorSelect.options).find(
            option => option.text.toLowerCase() === selectedCake.toLowerCase()
        );

        if (cakeOption) {
            flavorSelect.value = "Outro / Quero sugestões";

            const detailsField = document.querySelector("#details");

            if (detailsField) {
                detailsField.value = "Tenho interesse no bolo: " + selectedCake + ". Gostaria de receber mais informações.";
            }
        }
    }
}


/* =========================================
   DATA MÍNIMA PARA ENCOMENDAS
========================================= */

const dateInput = document.querySelector("#date");

if (dateInput) {
    const today = new Date();

    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localDate;
}


/* =========================================
   FORMULÁRIO DE ENCOMENDAS
========================================= */

const orderForm = document.querySelector("#orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const email = document.querySelector("#email").value.trim();
        const occasion = document.querySelector("#event").value;
        const flavor = document.querySelector("#flavor").value;
        const size = document.querySelector("#size").value;
        const date = document.querySelector("#date").value;
        const color = document.querySelector("#color").value.trim();
        const details = document.querySelector("#details").value.trim();

        const dateParts = date.split("-");
        const formattedDate = dateParts.length === 3
            ? dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0]
            : date;

        const message =
`🌷 *NOVA SOLICITAÇÃO DE ENCOMENDA*
*FLOR DE AÇÚCAR*

👤 Nome: ${name}
📱 WhatsApp: ${phone}
✉️ E-mail: ${email || "Não informado"}

🎉 Ocasião: ${occasion}
🍰 Sabor: ${flavor}
📏 Tamanho: ${size}
📅 Data desejada: ${formattedDate}
🎨 Cores: ${color || "Não informado"}

💗 *DETALHES DO BOLO:*
${details}

Aguardo o retorno!`;

        if (WHATSAPP === "5551999999999") {
            alert("Antes de enviar, configure o número de WhatsApp da confeitaria no arquivo script.js.");
            return;
        }

        const whatsappLink =
            "https://wa.me/" + WHATSAPP + "?text=" +
            encodeURIComponent(message);

        window.open(whatsappLink, "_blank");

        const formMessage = document.querySelector("#formMessage");

        if (formMessage) {
            formMessage.textContent =
                "Sua solicitação foi preparada! Finalize o envio na conversa do WhatsApp.";
        }
    });
}


/* =========================================
   FORMULÁRIO DE CONTATO
========================================= */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#contactName").value.trim();
        const email = document.querySelector("#contactEmail").value.trim();
        const subject = document.querySelector("#subject").value;
        const messageText = document.querySelector("#contactMessage").value.trim();

        const message =
`🌷 *MENSAGEM PELO SITE - FLOR DE AÇÚCAR*

👤 Nome: ${name}
✉️ E-mail: ${email}
📌 Assunto: ${subject}

Mensagem:
${messageText}`;

        if (WHATSAPP === "5551999999999") {
            alert("Configure o número de WhatsApp da confeitaria no arquivo script.js para enviar mensagens.");
            return;
        }

        const whatsappLink =
            "https://wa.me/" + WHATSAPP + "?text=" +
            encodeURIComponent(message);

        window.open(whatsappLink, "_blank");

        const result = document.querySelector("#contactMessageResult");

        if (result) {
            result.textContent =
                "Sua mensagem foi preparada! Finalize o envio pelo WhatsApp.";
        }
    });
}
