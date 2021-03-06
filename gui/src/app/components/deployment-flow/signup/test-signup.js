/* Copyright (C) 2017 Canonical Ltd. */
'use strict';

const React = require('react');
const enzyme = require('enzyme');

const DeploymentSignup = require('./signup');
const {Button} = require('@canonical/juju-react-components');
const {SvgIcon} = require('@canonical/juju-react-components');

describe('DeploymentSignup', function() {

  const renderComponent = (options = {}) => enzyme.shallow(
    <DeploymentSignup
      changeState={options.changeState || sinon.stub()}
      exportEnvironmentFile={options.exportEnvironmentFile || sinon.stub()}
      modelName={options.modelName || 'Prawns on the barbie'}>
      {options.children || (<span>content</span>)}
    </DeploymentSignup>
  );

  it('can render', function() {
    const wrapper = renderComponent();
    const expected = (
      <div className="deployment-signup">
        <div className="row border-bottom">
          <h2>Install Juju to deploy locally</h2>
          <div className="six-col">
            <p className="intro">
              Local deployment uses LXD containers, allowing you to
              recreate your production environment on your own machine.
              This minimises portability issues when deploying to a public
              cloud, OpenStack or bare metal.
            </p>
            <p className="intro">To deploy locally:</p>
            <ol className="deployment-signup__numbered-list">
              <li className="deployment-signup__numbered-list-item">
                Download your model
              </li>
              <li className="deployment-signup__numbered-list-item">
                <a href="https://jujucharms.com/docs">
                  Install Juju&nbsp;&rsaquo;
                </a>
              </li>
              <li className="deployment-signup__numbered-list-item">
                Add your model to deploy
              </li>
            </ol>
            <p className="v1">
              Continue to the&nbsp;
              <Button
                action={wrapper.find('Button').prop('action')}
                extraClasses="is-inline"
                modifier="neutral">
                Deployment demo of Juju
              </Button>
            </p>
          </div>
          <div className="prepend-one four-col last-col">
            <SvgIcon
              className="juju-logo"
              name="juju-logo"
              size="100%" />
          </div>
        </div>
        <div className="row">
          <h2>A new way to deploy</h2>
          <div className="six-col">
            <p>
              Coming soon: deploy from hosted Juju direct to public clouds.
              For early access to this feature, sign up for the beta.
            </p>
            <ul>
              <li>
                Deploy to all major public clouds directly from your browser
              </li>
              <li>
                Hosted and managed Juju controllers
              </li>
              <li>
                Identity management across all models
              </li>
              <li>
                Reusable shareable models with unlimited users
              </li>
            </ul>
            <p className="v1">
              <a
                className="p-button--positive is-inline"
                href="https://jujucharms.com/beta"
                onClick={wrapper.find('.p-button--positive').prop('onClick')}
                target="_blank">
                  Sign up for early access
              </a>
            </p>
          </div>
          <div className="six-col last-col">
            <ul className="inline-logos no-bullets">
              <li className="inline-logos__item">
                <SvgIcon
                  className="inline-logos__image"
                  name="aws"
                  size="100%" />
              </li>
              <li className="inline-logos__item">
                <SvgIcon
                  className="inline-logos__image"
                  name="google"
                  size="100%" />
              </li>
              <li className="inline-logos__item">
                <SvgIcon
                  className="inline-logos__image"
                  name="azure"
                  size="100%" />
              </li>
            </ul>
          </div>
        </div>
      </div>);
    assert.compareJSX(wrapper.find('.deployment-signup'), expected);
  });

  it('can navigate to the flow view', function() {
    const changeState = sinon.stub();
    const wrapper = renderComponent({changeState});
    wrapper.find('Button').props().action();
    assert.equal(changeState.callCount, 1);
    assert.deepEqual(changeState.args[0][0], {
      gui: {
        deploy: 'flow'
      }
    });
  });

});
