var assert = require('assert');
var Showable = require('showable');
var Emitter = require('emitter');

describe('Showable', function(){
  var obj;

  beforeEach(function(){
    obj = new Emitter();
    obj.el = document.createElement('div');
    obj.el.classList.add('hide');

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

  it('should show in the next tick', function(){
    obj.show();
    assert(obj.el.classList.contains('hide'));
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
      assert(count === 1);
      done();
    }, 20);
  })

  it('should hide', function(done){
    obj.on('hide', function(){
      assert(obj.hiding === true);
      done();
    });
    obj.on('show', function(){
      obj.hide();
    });
    obj.show();
  });


})