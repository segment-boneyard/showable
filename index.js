var after = require('after-transition').once;
var nextTick = require('next-tick');

/**
 * Hide the view
 */
function hide(fn){

  if(this.hiding == null) {
    this.hiding = this.el.classList.contains('hide');
  }

  var self = this;
  if(this.hiding) return;
  this.hiding = true;

  after(self.el, function(){
    self.emit('hide');
    if(fn) fn();
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
function show(fn){

  if(this.hiding == null) {
    this.hiding = this.el.classList.contains('hide');
  }

  var self = this;
  if(!this.hiding) return;
  this.hiding = false;
  this.emit('showing');

  after(self.el, function(){
    this.isShowing = false;
    self.emit('show');
    if(fn) fn();
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
  return obj;
};