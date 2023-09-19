# Changelog

All notable changes to this project will be documented in this file.

## [2.1.2] - 2023-09-19

### Fix:

- Outdate alert not 'hidden' ([#49](https://github.com/isunjn/serene/issues/49))

## [2.1.1] - 2023-09-16

### Add:

- Custom 404 page

## [2.0.1] - 2023-09-13

### Fix:

- Min height of prose page & post page

## [2.0.0] - 2023-09-01

> **Warning**
> This version contains several breaking changes.
> If you came from a previous version and want to upgrade, I suggest you start all over again.

### UI:

- Text selction now is styled
- Other minor tweaks
- Change defalut bg color of codeblock to transparent

### Add:

- Option `dispaly_tags` and `truncate_summary` [@woojiq](https://github.com/woojiq) ([#40](https://github.com/isunjn/serene/issues/40))
- Support for footnote and backlink
- Active TOC indicator
- Generay `prose` section/page
- Config option `sections`, now you can rename `blog` to somthing else, e.g. `posts`
- Support for header nav fold/unfold
- Option for homepage layout, can be `about` or `list`
- A separate `_custom_css.html` for css customization

### Fix:

- Codeblock distance calculation
- Codeblock highlight style
- Add description tag only when it's available
- Post 3 column layout issue
- Inline code style in list item
- Link text-decoration style on mobile


## [1.2.0] - 2023-08-19

### UI:

- Use noborder theme of giscus by default
- Post list item and callout styles changed
- Code block styles improved
- Default colors changed

### Add:

- Outline styles [@mrtnvgr](https://github.com/mrtnvgr) ([#26](https://github.com/isunjn/serene/pull/26))
- Support self-host font ([#29](https://github.com/isunjn/serene/pull/29))
- Copy button for code blocks ([#30](https://github.com/isunjn/serene/pull/30))
- Support light/dark switch for code blocks ([#33](https://github.com/isunjn/serene/pull/33))
- Support tags for project page
- Back-to-top button
- A shortcode for code block with file name: `codeblock` ([#39](https://github.com/isunjn/serene/pull/39))

### Fix:

- Update theme toggle icon on page load [@mrtnvgr](https://github.com/mrtnvgr) ([#25](https://github.com/isunjn/serene/pull/25))
- Layout shift problem on post page ([#27](https://github.com/isunjn/serene/pull/27))

## [1.1.1] - 2023-08-09

- Allow no tags in front matter [@mrtnvgr](https://github.com/mrtnvgr)
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


[2.1.2]: https://github.com/isunjn/serene/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/isunjn/serene/compare/v2.0.1...v2.1.1
[2.0.1]: https://github.com/isunjn/serene/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/isunjn/serene/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/isunjn/serene/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/isunjn/serene/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/isunjn/serene/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/isunjn/serene/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/isunjn/serene/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/isunjn/serene/releases/tag/v0.1.0