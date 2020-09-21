import 'bootstrap';
import './css/app.scss';
import sideBar from './components/sideBar';


const mainPage = () => (
  `<div class="row">
    <div class="col-2 p-5 side-bar">
      ${sideBar()}
    </div>
    <div class="col-10 bg-light p-5 main">

    </div>
  </div>`
);

const displayPage = () => {
  document.querySelector('#content').insertAdjacentHTML('beforeend', mainPage());
};

displayPage();
