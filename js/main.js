import {renderCards} from './draw-thumbnail.js';

import {showFiltersContainer, sortsRandomly, sortsByRating, selectedByRating, selectedRandomly, selectedDefolt, debounce} from './photo-list.js';

import {getData} from './server-interaction.js';

import {setUserFormSubmit} from './load-fhoto-form.js';
import {showAlert} from './util.js';

getData()
  .then((arrCards) => {
    renderCards(arrCards);
    showFiltersContainer();
    selectedDefolt(debounce(()=> renderCards(arrCards)));
    selectedRandomly(debounce(() => renderCards(sortsRandomly(arrCards))));
    selectedByRating(debounce(() => renderCards(sortsByRating(arrCards))));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
