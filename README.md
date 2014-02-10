# showable

Mixin for views to add `show` and `hide` methods. Used by things like dialogs and overlays
that need to show and hide, but need to account for transitions too.

Toggles a `.hide` class on the view.

## API

```js
var showable = require('showable');

showable(MyView.prototype);

```

Then you might listen for events to add and remove it from the DOM:

```js
function MyView() {
  this.on('showing', function(){
    document.body.appendChild(obj.el);
  });
  this.on('hide', function(){
    document.body.removeChild(obj.el);
  });
}
```

## Methods

### #show(fn)

Show the view. Emits `showing` immediately, and `show` when the view is fully visible (after transitions). Removes `.hide` class.

Optional callback is fired when it has finished showing.

### #hide(fn)

Hide the view. Emits `hiding` immediately, and `hide` when the view is fully hidden (after transitions). Adds `.hide` class.

Optional callback is fired when it has finished hiding.
