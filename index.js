const path = require('path');

module.exports = function(statiq, options) {
    const { contextHandler, indexHandler } = statiq._config;
    const { key } = Object.assign({ key: 'tags' }, options);
    const tags = {};

    statiq.config({
        contextHandler: function(context, source, target) {
            const ctx = contextHandler(context, source, target);
            const ctxTags = Array.isArray(ctx[key]) ? ctx[key] : (ctx[key] || 'untagged').split(',');

            ctxTags.forEach(tag => {
                if (!tags[tag]) tags[tag] = [];
                tags[tag].push(Object.assign({}, context, { path: target }));
            });

            return ctx;
        },

        indexHandler: function(index, source, target) {
            const idx = indexHandler(index, source, target);
            idx[key] = {};

            Object.keys(tags).forEach(tag => {
                idx[key][tag] = tags[tag].map(ctx => {
                    return Object.assign({}, ctx, { path: path.relative(path.dirname(target), ctx.path) });
                });
            });

            return idx;
        }
    });
}
