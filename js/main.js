import {renderCards} from './draw-thumbnail.js';

import {showFiltersContainer, selectFilter} from './photo-list.js';

import {getData} from './server-interaction.js';

import {setUserFormSubmit} from './load-fhoto-form.js';
import {showAlert} from './util.js';

getData()
  .then((arrCards) => {
    renderCards(arrCards);
    showFiltersContainer();
    selectFilter(arrCards);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
