import 'bootstrap';
import './css/app.scss';
import sideBar from './components/sideBar';


const mainPage = () => (
  `<div class="row">
    <div class="col-1 bg-dark p-5 side-bar">
      ${sideBar()}
    </div>
    <div class="col-11 bg-light p-5 main">

    </div>
  </div>`
);

const displayPage = () => {
  document.querySelector('#content').insertAdjacentHTML('beforeend', mainPage());
};

displayPage();
