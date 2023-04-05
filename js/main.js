import {renderCards} from './draw-thumbnail.js';

import {getData} from './server-interaction.js';

import {setUserFormSubmit} from './load-fhoto-form.js';
import {showAlert} from './util.js';

getData()
  .then((arrCards) => {
    renderCards(arrCards);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
