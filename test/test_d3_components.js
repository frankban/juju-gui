'use strict';

describe('d3-components', function() {
  var Y, NS, TestModule, modA, state,
      container, comp;

  before(function(done) {
    Y = YUI(GlobalConfig).use(['d3-components',
                              'node',
                              'node-event-simulate'],
      function(Y) {
        NS = Y.namespace('d3');

       TestModule = Y.Base.create('TestModule', NS.Module, [], {
          events: {
            scene: { '.thing': {click: 'decorateThing'}},
            d3: {'.target': {click: 'targetTarget'}},
            yui: {
              cancel: 'cancelHandler'
            }
          },

          decorateThing: function(evt) {
            state.thing = 'decorated';
          },

          targetTarget: function(evt) {
              state.targeted = true;
          },

          cancelHandler: function(evt) {
            state.cancelled = true;
          }
        });

        done();
      });
  });

  beforeEach(function() {
    container = Y.Node.create('<div id="test" style="visibility: hidden">' +
                              '<button class="thing"></button>' +
                              '<button class="target"></button>' +
                              '</div>');
    state = {};
  });

  afterEach(function() {
    container.remove();
    container.destroy();
    if (comp)
      comp.unbind();
  });


  it('should be able to create a component and add a module', function() {
    comp = new NS.Component();
    comp.should.be.ok;
  });

  it('should be able to add and remove a module', function() {
    comp = new NS.Component();
    comp.setAttrs({container: container});
    comp.addModule(TestModule);
  });

  it('should be able to (un)bind module event subscriptions', function() {
    comp = new NS.Component();
    comp.setAttrs({container: container});
    comp.addModule(TestModule);

    // Test that default bindings work by simulating
    Y.fire('cancel');
    state.cancelled.should.equal(true);

    // XXX: While on the plane I determined that things like
    // 'events' are sharing state with other runs/modules.
    // This must be fixed before this can work again.

    // Manually set state, remove the module and test again
    state.cancelled = false;
    comp.removeModule('TestModule');

    Y.fire('cancel');
    state.cancelled.should.equal(false);

    // Adding the module back again doesn't create any issues.
    comp.addModule(TestModule);
    Y.fire('cancel');
    state.cancelled.should.equal(true);

    // Simulated events on DOM handlers better work.
    // These require a bound DOM element however
    comp.render();
    Y.one('.thing').simulate('click');
    state.thing.should.equal('decorated');
  });

  it('should allow event bindings through the use of a declartive object',
     function() {
    comp = new NS.Component();
    comp.setAttrs({container: container});

    // Change test module to use rich captures on some events.
    // This defines a phase for click (before, after, on (default))
    // and also shows an inline callback (which is discouraged but allowed)
    modA = new TestModule();
    modA.events.scene['.thing'] = {
      click: {phase: 'after',
              callback: 'afterThing'},
      dblclick: {phase: 'on',
                 callback: function(evt) {
                   state.dbldbl = true;
                 }}};
    modA.afterThing = function(evt) {
      state.clicked = true;
    };
    comp.addModule(modA);
    comp.render();

    Y.one('.thing').simulate('click');
    state.clicked.should.equal(true);

    Y.one('.thing').simulate('dblclick');
    state.dbldbl.should.equal(true);

  });

  it('should support basic rendering from all modules',
     function() {
       var modA = new TestModule(),
           modB = new TestModule();

       comp = new NS.Component();
       // Give each of these a render method that adds to container
       modA.name = 'moda';
       modA.render = function() {
         this.get('container').append(Y.Node.create('<div id="fromA"></div>'));
       };

       modB.name = 'modb';
       modB.render = function() {
         this.get('container').append(Y.Node.create('<div id="fromB"></div>'));
       };

       comp.setAttrs({container: container});
       comp.addModule(modA)
        .addModule(modB);

       comp.render();
       Y.Lang.isValue(Y.one('#fromA')).should.equal(true);
       Y.Lang.isValue(Y.one('#fromB')).should.equal(true);
     });

  it('should support d3 event bindings post render', function() {
    comp = new NS.Component();
    comp.setAttrs({container: container});

    comp.addModule(TestModule);

    comp.render();

    // This is a d3 bound handler that occurs only after render.
    container.one('.target').simulate('click');
    state.targeted.should.equal(true);
  });

});


