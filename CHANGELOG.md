# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2023-08-19

### UI:

- Use noborder theme of giscus by default
- Post list item and callout styles changed
- Code block styles improved
- Default colors changed

### Add:

- Outline styles @mrtnvgr (#26)
- Support self-host font (#29)
- Copy button for code blocks (#30)
- Support light/dark switch for code blocks (#33)
- Support tags for project page
- Back-to-top button
- A shortcode for code block with file name: `codeblock` (#39)

### Fix:

- Update theme toggle icon on page load @mrtnvgr (#25)
- Layout shift problem on post page (#27)

## [1.1.1] - 2023-08-09

- Allow no tags in front matter @mrtnvgr
- Fix figcaption width issue

## [1.1.0] - 2023-05-27

- Fix theme auto-toggle logic
- A few ui tweaks

## [1.0.0] - 2023-05-24

> **Warning**
> The 1.0.0 version contains many breaking changes.
> If you came from a previous version and want to upgrade, I suggest you start all over again.

### Breaking

- `config.toml` restructured, config items are renamed
- All analytics configs removed, use `_head_extend.html` instead
- All comment-support configs removed, replace with [giscus](https://giscus.app)
- Icons now using svg files
- Callout renamed: `info -> note`, `caution -> warning`, `warning -> alert`
- Callout removed: `good`, `bad`, `happy`, `unhappy`, `check`, `wrong`, `flag`, `star`
- `cc_license` removed
- Reading-progress-bar removed
- Back-to-top button removed
- Many other tweaks

## [0.2.0] - 2022-02-16

### Add:
- KaTeX support
- Mermaid support

### Fix:
- Style issue of table-of-contents
- A few non-critical bugs

## [0.1.0] - 2022-01-14

First release 🎉


[1.2.0]: https://github.com/isunjn/serene/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/isunjn/serene/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/isunjn/serene/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/isunjn/serene/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/isunjn/serene/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/isunjn/serene/releases/tag/v0.1.0