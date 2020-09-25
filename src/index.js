import "bootstrap";
import "./css/app.scss";
// import sideBar from './components/sideBar';
import {createTaskBtn, head, quickLinks, projectList, modalElement, projectCards, projectModal} from './components/domElements';

const content = document.querySelector("#content");

const mainPage = () => {
  const page = document.createElement("div");
  const side = document.createElement("div");
  const main = document.createElement("main");

  page.classList.add("row");
  side.classList.add("col-2", "p-5", "side-bar");
  main.classList.add(
    "col-10",
    "bg-light",
    "p-5",
    "main",
    "d-flex",
    "flex-wrap"
  );

  side.appendChild(head);
  side.appendChild(createTaskBtn);
  side.appendChild(quickLinks);
  side.appendChild(projectList);
  main.appendChild(projectCards)
  page.appendChild(side);
  page.appendChild(main);
  content.insertAdjacentElement("beforeend", modalElement);
  content.insertAdjacentElement("beforeend", projectModal);

  return page;
};

const displayPage = () => {
  content.appendChild(mainPage());
};

window.addEventListener("load", () => {
  displayPage();
});
