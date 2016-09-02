/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-09-02[09:47:14]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
const Transformer = require('panto-transformer');
const stylus = require('stylus');
const path = require('path');

class StylusTransformer extends Transformer {
    _transform(file) {
        const {
            content,
            filename
        } = file;

        const use = this.options.use || (() => {});

        return new Promise((resolve, reject) => {
            const sty = stylus(content);

            sty.set('filename', filename).use(use);

            const deps = sty.deps().map(dep => {
                return path.relative(panto.getOption('cwd'),dep);
            });

            panto.reportDependencies(filename, ...deps);

            sty.render((err, css) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(panto._.extend(file, {
                        content: css
                    }));
                }

            });
        });
    }
    isTorrential() {
        return false;
    }
}

module.exports = StylusTransformer;
