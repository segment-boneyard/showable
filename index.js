var after = require('after-transition').once;
var nextTick = require('next-tick');

/**
 * Hide the view
 */
function hide(){
  var self = this;
  if(this.hiding) return;
  this.hiding = true;

  after(self.el, function(){
    self.emit('hide');
  });

  nextTick(function(){
    self.el.classList.add('hide');
  });

  this.emit('hiding');
  return this;
}

/**
 * Show the view. This waits until after any transitions
 * are finished. It also removed the hide class on the next
 * tick so that the transition actually paints.
 */
function show(){
  var self = this;
  if(!this.hiding) return;
  this.hiding = false;
  this.emit('showing');

  after(self.el, function(){
    self.emit('show');
  });

  nextTick(function(){
    self.el.classList.remove('hide');
  });

  return this;
}

/**
 * Mixin methods into the view
 *
 * @param {Emitter} obj
 */
module.exports = function(obj) {
  obj.hide = hide;
  obj.show = show;
  obj.hiding = obj.el.classList.contains('hide');
  return obj;
};