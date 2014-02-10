# showable

Mixin for views to add `show` and `hide` methods. Used by things like dialogs and overlays
that need to show and hide, but need to account for transitions too.

Toggles a `.hide` class on the view.

## API

```js
var showable = require('showable');

showable(MyView.prototype);
```

## Methods

#### `show`

Show the view. Emits `showing` immediately, and `show` when the view is fully visible (after transitions).

Removes `.hide` class.

#### `hide`

Hide the view. Emits `hiding` immediately, and `hide` when the view is fully hidden (after transitions).

Adds `.hide` class.
