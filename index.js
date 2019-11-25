const path = require('path');

const skippers = {
  index(document) {
    const { contentExtension } = this.config();
    return path.basename(document.contentPath, contentExtension) === 'index';
  },

  root(document) {
    const { cwd, contentPath } = this.config();
    return path.dirname(document.contentPath) === path.join(cwd, contentPath);
  },
};

module.exports = (options = {}) => {
  const {
    key = 'tags',
    untagged = true,
    lowercase = true,
    skip = 'index',
  } = options;

  const skipFunc = typeof skip === 'string' ? skippers[skip] : skip;
  const tags = {};

  return {
    afterRead(document) {
      const { context, publishPath } = document;
      const docTags = Array.isArray(context[key]) ? context[key] : (context[key] || 'untagged').split(',');

      docTags.forEach(tag => {
        let t = tag.trim();

        if (lowercase) t = t.toLowerCase();
        if (!untagged && t === 'untagged') return;
        if (skipFunc.call(this, document)) return;
        if (!tags[t]) tags[t] = [];

        tags[t].push({ ...context, path: publishPath });
      });
    },

    beforeBuild(document) {
      const { context, publishPath } = document;
      const { index } = context;

      index[key] = {};

      Object.entries(tags).forEach(([tag, documents]) => {
        index[key][tag] = documents.map(ctx => ({
          ...ctx,
          path: path.relative(path.dirname(publishPath), ctx.path),
        }));
      });

      return document;
    },
  };
};
