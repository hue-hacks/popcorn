import Application from 'ember-popcorn-app/app';
import config from 'ember-popcorn-app/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
