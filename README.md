statiq-tags
===========

Small plugin to add simple taxonomies to statiq websites.

## Install

    npm install statiq-tags

## Usage

Put your tags in your documents' context:

    title: My post
    tags: javascript, node, statiq
    ---
    Post body...

Might be an array of strings, or a comma-separated string (ie `"tag,tag,tag"`).

Then, in your statiqfile.js:

    const tagsPlugin = require('statiq-tags');
    
    module.exports = function(statiq) {
      statiq.config({
        ... // Your configs

        plugins: [
          ... // Other plugins
          tagsPlugin(options),
        ]
      });
    };

Now, the `index` var in your templates now has a `tag` key with a structure like:

    {
      untagged: [{document context}],
      javascript: [{document context}, {document context}],
      node: [{document context}, {document context}],
      statiq: [{document context}]
    }

All contexts have a plus `path` key with a relative path to that file.

## Options

`key` (string) the context key used to extract tags from documents and populate the index. Default: `tags`.
`untagged` (bool) whether it should list untagged posts or not. Default: `true`.
`lowercase` (bool) make all tags lowercase. Default: `true`.
`skip` (string|func) what documents should be skipped. String values can be `'index'` (default, skips only the index file) or `'root'` (skips all documents in the root of the content folder). If a function is passed, it'll be called with each `document` object as argument and `this` pointing to the statiq site object. It should return `true` to skip the passed document.
