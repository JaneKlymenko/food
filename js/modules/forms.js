import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "./img/form/spinner.svg",
    success: "Thank you!",
    failure: "Somthing went wrong",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;`;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThankDialog(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThankDialog(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThankDialog(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thaksModal = document.createElement("div");
    thaksModal.classList.add("modal__dialog");
    thaksModal.innerHTML = `
          <div class="modal__content">
              <div data-close class="modal__close">&times;</div>
              <div class="modal_title">${message}</div>
          </div>
          `;
    document.querySelector(".modal").append(thaksModal);

    setTimeout(() => {
      thaksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
