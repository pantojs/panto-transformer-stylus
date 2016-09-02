/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-09-02[09:47:14]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
const assert = require('assert');
const panto = require('panto');
const StylusTransformer = require('../');

describe('panto-transformer-stylus', () => {
    describe('#transform', () => {
        it('basic transpiler', done => {
            new StylusTransformer().transform({
                filename: 'a.styl',
                content: `
body
    color: red
`
            }).then(file => {
                assert.deepEqual(file.content, 'body {\n  color: #f00;\n}\n');
            }).then(() => done()).catch(e => console.error(e));
        });
        it('"use" option', done => {

            panto.setOptions({
                cwd: __dirname,
                src: '.'
            });
            const ddeps = [];
            panto.reportDependencies = (filename, ...deps) => {
                ddeps.push(...deps);
            };

            new StylusTransformer({
                use: style => {
                    style.set('paths', [__dirname + '/fixtures']);
                }
            }).transform({
                filename: 'a.styl',
                content: `
@import "b"
body
    color: $blue
`
            }).then(file => {
                assert.deepEqual(file.content, 'body {\n  color: #00f;\n}\n');
                assert.deepEqual(ddeps, ['fixtures/b.styl']);
            }).then(() => done()).catch(e => console.error(e));
        });
    });
});
