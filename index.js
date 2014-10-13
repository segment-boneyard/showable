var after = require('after-transition').once;

/**
 * Hide the view
 */
function hide(fn){
  var self = this;

  if(this.hidden == null) {
    this.hidden = this.el.classList.contains('hidden');
  }

  if(this.hidden) return;

  this.hidden = true;

  after(self.el, function(){
    self.emit('hide');
    if(fn) fn();
  });

  this.el.offsetHeight;
  this.el.classList.add('hidden');
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
    this.hidden = this.el.classList.contains('hidden');
  }

  if(this.hidden === false) return;

  this.hidden = false;

  this.emit('showing');

  after(self.el, function(){
    self.emit('show');
    if(fn) fn();
  });

  this.el.offsetHeight;
  this.el.classList.remove('hidden');
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