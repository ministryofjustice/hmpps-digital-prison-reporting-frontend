const beautifyHTML = require("js-beautify").html;
const fs = require("fs");
const hljs = require("highlight.js");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const matter = require("gray-matter");
const mojFilters = require("@ministryofjustice/frontend/moj/filters/all.js");
const nunjucks = require("nunjucks");
const path = require("path");
const releasePackage = require('./dist-docs/package.json');
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  const nunjucksEnv = nunjucks.configure([
    ".",
    "docs/_includes/",
    "node_modules/govuk-frontend/dist/",
    "node_modules/@ministryofjustice/frontend/",
    "src/",
  ]);

  Object.entries({
    ...eleventyConfig.nunjucksFilters,
    ...mojFilters(),
  }).forEach(([name, callback]) => {
    nunjucksEnv.addFilter(name, callback);
  });

  const setUpNunjucksFilters = require('./dist-docs/dpr/setUpNunjucksFilters').default
  setUpNunjucksFilters(nunjucksEnv)

  eleventyConfig.setLibrary("njk", nunjucksEnv);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: false,
      highlight: (str, language) =>
        language ? hljs.highlight(str, { language }).value : str,
    })
      .disable("code")
      .use(markdownItAnchor, {
        level: [1, 2, 3, 4],
      })
  );

  eleventyConfig.addShortcode("example", function (exampleName, height, id) {
    const { data, content: nunjucksCode } = matter(
      fs
        .readFileSync(
          path.join(__dirname, "docs", "examples", exampleName, "index.njk"),
          "utf8"
        )
        .trim()
    );

    const rawHtmlCode = nunjucksEnv.renderString(nunjucksCode);

    const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
      indent_size: 2,
      end_with_newline: true,
      max_preserve_newlines: 1,
      unformatted: ["code", "pre", "em", "strong"],
    });

    let jsCode = "";
    try {
      jsCode = fs
        .readFileSync(
          path.join(__dirname, "docs", "examples", exampleName, "script.js"),
          "utf8"
        )
        .trim();
    } catch (e) {}

    const renderedExample = nunjucksEnv.render("example.njk", {
      href: "/examples/" + exampleName,
      id: id || exampleName,
      arguments: data.arguments,
      jsArguments: data.jsArguments,
      title: data.title,
      height,
      nunjucksCode,
      htmlCode,
      jsCode,
    });

    // GovUK tabs now add a bunch of whitespace in front of their content.
    // This means Eleventy doesn't spot the markdown tokens unless we remove the whitespace.
    return renderedExample.replace(/ +(```|#|\|)/g, '$1')
  });

  eleventyConfig.addShortcode("version", function () {
    return releasePackage.version;
  });

  eleventyConfig.addShortcode("header", function (level, text) {
    let classSuffix = ""

    switch (Number(level)) {
      case 1:
        classSuffix = "l"
        break;
      case 2:
        classSuffix = "m"
        break;
      case 3:
        classSuffix = "s"
        break;
    }

    return `<h${ level } class="govuk-heading-${ classSuffix }">${ text }</h${ level }>`;
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
};
