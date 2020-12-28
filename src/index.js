import UI from './ui';
import Logic from './logic';

const form = document.getElementById('location-form');

Logic.getLocation();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  UI.showSpinner();
  const vars = UI.getVars(e);

  if (Logic.checkVars(vars)) {
    Logic.getRes(vars)
      .then((obj) => {
        UI.hideSpinner();
        UI.showRes(obj.data);
      })
      .catch((error) => {
        UI.hideSpinner();
        UI.showMsg(error, 'error');
      });
  } else {
    UI.hideSpinner();
    UI.showMsg('City cannot be blank !', 'error');
  }
});
