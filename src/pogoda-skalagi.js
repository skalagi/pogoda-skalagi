import template from './template.jade';
import style from './pogoda-skalagi.styl';
const $template = document.createElement('template');
$template.innerHTML = `<style>${style}</style>${template()}`;

const WebFontConfig = {
  google: { families: [ 'Arimo:400,700:latin,latin-ext' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})()

import Basic from '@pogoda/basic-api';

class PogodaSkalagi extends HTMLElement {
  createdCallback() {
    this.createShadowRoot()
      .appendChild(document.importNode($template.content, true));

    this.temp = this.shadowRoot.querySelector('.temp_val');

    new Basic('https://cached.skalagi.pl').on('updated', ::this.update);
  }

  update(api) {
    this.temp.textContent = `${api.temperature.current.value}°C`;
  }
}

export default PogodaSkalagi;
