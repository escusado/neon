'use strict';

class HTMLTestWidget extends MiniWidget {

  _getHTML () {
    return `
      <div>
        Custom HTML Content
      </div>
    `;
  }

  init () {
    this._bindEvents();
  }

  _bindEvents () {

  }

};
