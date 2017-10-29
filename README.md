statiq-tags
===========

Small plugin to add simple taxonomies to statiq websites.

## Install

    npm install statiq-tags

## Usage

Put your tags in your documents' context:

    title: My post
    tags: [javascript, node, statiq]
    ---
    Post body...

Might be an array of strings, or a comma-separated string (ie `"tag,tag,tag"`).

Then, in your statiqfile.js:

    const tags = require('statiq-tags');
    
    module.exports = function(statiq) {
      statiq.config({
        ... // Your configs
      });
    
      tags(statiq, options); // There
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
