'use strict';
let eventHandler, myMiniWidget, myOtherMiniWidget, myHTMLWidget;

console.log('Testing MiniWidget');

eventHandler = function (ev) {
  console.log('Event Catched!', this.name);
};

myMiniWidget = new MiniWidget({
  name : 'my First MiniWidget'
});

myOtherMiniWidget = new MiniWidget({
  name : 'my Second MiniWidget'
});

myMiniWidget.bind('my-custom-event', eventHandler);
myOtherMiniWidget.bind('my-custom-event', eventHandler);

myMiniWidget.dispatch('my-custom-event');
myMiniWidget.unbind('my-custom-event');
myMiniWidget.dispatch('my-custom-event');
console.log('Event unbound');
console.log('beforeDestroy', myMiniWidget, myOtherMiniWidget);
myMiniWidget.destroy();
myOtherMiniWidget.destroy();
console.log('afterDestroy', myMiniWidget, myOtherMiniWidget);

myHTMLWidget = new HTMLTestWidget();
myHTMLWidget.render(document.body);
