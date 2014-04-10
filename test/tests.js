var assert = require('assert');
var Showable = require('showable');
var Emitter = require('emitter');

describe('Showable', function(){
  var obj;

  beforeEach(function(){
    obj = new Emitter();
    obj.el = document.createElement('div');
    obj.el.classList.add('hidden');

    Showable(obj);

    obj.on('showing', function(){
      document.body.appendChild(obj.el);
    });

    obj.on('hide', function(){
      document.body.removeChild(obj.el);
    });

  });

  it('should not hide if already hidden', function(done){
    obj.on('hide', function(){
      done(false);
    })
    obj.hide();
    done();
  });

  it('should show', function(done){
    obj.on('show', function(){
      assert(document.body.contains(obj.el));
      done();
    })
    obj.show();
  });

  it('should not show if showing', function(done){
    var count = 0;
    obj.on('show', function(){
      count++;
    })
    obj.show();
    obj.show();

    // Push this into the future because
    // 'show' is emitted on the next tick
    setTimeout(function(){
      assert(count === 1, count);
      done();
    }, 30);
  })

  it('should hide', function(done){
    obj.on('hide', function(){
      assert(obj.hidden === true);
      done();
    });
    obj.on('show', function(){
      obj.hide();
    });
    obj.show();
  });

  it('should have a show callback', function(done){
    obj.show(function(){
      done();
    });
  })

  it('should have a hide callback', function(done){
    obj.show(function(){
      obj.hide(function(){
        done();
      });
    });
  })


})