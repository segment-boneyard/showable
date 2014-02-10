var after = require('after-transition').once;
var nextTick = require('next-tick');

/**
 * Hide the view
 */
function hide(fn){
  var self = this;

  if(this.hidden == null) {
    this.hidden = this.el.classList.contains('hide');
  }

  if(this.hidden || this.animating) return;

  this.hidden = true;
  this.animating = true;

  after(self.el, function(){
    self.animating = false;
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
  var self = this;

  if(this.hidden == null) {
    this.hidden = this.el.classList.contains('hide');
  }

  if(this.hidden === false || this.animating) return;

  this.hidden = false;
  this.animating = true;

  this.emit('showing');

  after(self.el, function(){
    self.animating = false;
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