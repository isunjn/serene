# Changelog

All notable changes to this project will be documented in this file.

## [5.3.1] - 2025-05-22

- fix: `extra_syntaxes_and_themes` defaults to theme's, so you don't need to copy that path [@makai410](https://github.com/makai410) ([#80](https://github.com/isunjn/serene/pull/80))

## [5.3.0] - 2025-05-07

- ui: a few tweaks

## [5.2.1] - 2025-04-19

- fix: homepage avatar style

## [5.2.0] - 2025-04-10

- ui: a few tweaks

## [5.1.0] - 2025-04-08

- feat: add support for zola v0.20.0 codeblock [name annotation](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations), previous `codeblock` shortcode is deprecated
- refactor: remove `static/` prefix from icon paths, eliminates the need to copy icon files [@koyokr](https://github.com/koyokr) ([#76](https://github.com/isunjn/serene/pull/76))

## [5.0.1] - 2025-03-31

- fix: external links & recent posts on the homepage [@Hiramiya](https://github.com/Hiramiya) ([#74](https://github.com/isunjn/serene/pull/74))

## [5.0.0] - 2025-03-20

> **Warning**
>
> This version is a big redesign and contains lots of breaking changes.
> If you came from a previous version and want to upgrade, I suggest you start all over again.

- New style: headerless, section title and subtitle, improved typography...
- Collections: special blocks for showcasing your list (a more general form of previous 'projects' page)
- Default icon size changed from 20 to 18
- Some config options are moved from `config.toml` to specific `_index.md`
- Added options: `date_format` `back_link_text`, (section) `title` `subtitle`, (homepage) `footer`
- Removed options: `display_*` `nav_*` `blur_effect` `display_tags` `truncate_summary` `not_found_title`
- Callouts: `question` removed, `alert` renamed to `caution`, attribution `header` renamed to `title`
- Typst math rendering removed
- Added CSS variables: `--primary-decoration-color` `--text-decoration-color` `--highlight-mark-color` `--font-size` `--line-height`
- Removed CSS variables: `--homepage-font-size` `--homepage-line-height` `--paragraph-font-size` `--paragraph-line-height` `--aside-font-size`
- Lots of UI tweaks
- feat: Support subpath `base_url` [@b-d-e](https://github.com/b-d-e) ([#68](https://github.com/isunjn/serene/pull/68))
- fix: `force_theme` option [@teh-banana](https://github.com/teh-banana) ([#71](https://github.com/isunjn/serene/pull/71))
- fix: Add content-type header to reaction fetch [@sorokya](https://github.com/sorokya) ([#72](https://github.com/isunjn/serene/pull/72))

## [4.5.0] - 2024-11-03

### UI:

- A few tweaks

## [4.4.0] - 2024-11-02

### Add:

- New feature: Anonymous emoji reactions
- New options: `display_bio` `display_avatar` `recent`

### Remove:

- Removed options: `homepage_layout` (use `recent` instead), `recent_more`
- Removed css variable: `--icon-size`

### UI:

- A few tweaks

## [4.3.0] - 2024-10-13

### Add:

- Add katex [copy-tex](https://github.com/KaTeX/KaTeX/tree/main/contrib/copy-tex) extension & bump katex version to 0.16.11

## [4.2.0] - 2024-10-04

### Fix:

- Fix anchor link style issue, now `#` should no be present in the RSS file

## [4.1.0] - 2024-09-16

### Add:

- `force_theme` option to only use light or dark theme [@bruceoberg](https://github.com/bruceoberg) ([#62](https://github.com/isunjn/serene/issues/62))
- A few more icons [@bruceoberg](https://github.com/bruceoberg) ([#63](https://github.com/isunjn/serene/issues/63))


## [4.0.0] - 2024-08-11

- Deal with breaking changes of zola 19 config options:
>  - Changed config options named `generate_feed` to `generate_feeds` (both in config.toml and in section front-matter)
>  - Changed config option `feed_filename: String` to `feed_filenames: Vec<String>`

## [3.4.0] - 2024-04-25

### Add:

- Math rending with [Typst](https://typst.app) [@Lambdaris](https://github.com/Lambdaris) ([#57](https://github.com/isunjn/serene/pull/57))

## [3.3.1] - 2024-03-10

### Fix:

- Callout content overflow issue

### UI:

- Change highlight color of `diff` syntax
- A few tweaks

## [3.3.0] - 2024-03-01

### Add:

- New css variables: `--callout-border-radius` `--detail-border-radius`

### Fix:

- Overflow issue on mobile screens

### UI:

- Update quote icon
- A few tweaks

## [3.2.0] - 2024-01-26

### Add:

- Dark mode img/chart brightness option

## [3.1.0] - 2024-01-20

### Add:

- New shortcode: `quote` and `detail`

### Fix:

- Add `word-wrap: break-word` to inline code


## [3.0.0] - 2024-01-14

> **Warning**
>
> This version contains several breaking changes.
> If you came from a previous version and want to upgrade, I suggest you start all over again.

### Add:

- `recent` homepage layout
- `featured` mark
- Add title to ToC when it's too long
- A way to sort categories
- Project item image
- prerender/prefetch when hover, using `speculationrules` or `prefetch`
- RSS mask
- A few more css variables

### Fix:

- Theme init logic
- Mobile sidebar ui

### UI:

- A few tweaks
- Default icon size set to 20 (You should re-copy the `static/icon` folder)


## [2.3.0] - 2024-01-09

### Fix:

- `z-index` of mobile sidebar

### UI:

- Color change and some small tweaks

### Remove:

- Default custom font removed


## [2.2.1] - 2024-01-02

### Fix:

- Use `sessionStorage` for theme init in `_base.html`

## [2.2.0] - 2023-12-29

### Fix:

- Use `sessionStorage` for theme restore
- Fix an issue when initializing giscus theme
- Hide `#` anchor link in feed file

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
>
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

[5.3.1]: https://github.com/isunjn/serene/compare/v5.3.0...v5.3.1
[5.3.0]: https://github.com/isunjn/serene/compare/v5.2.1...v5.3.0
[5.2.1]: https://github.com/isunjn/serene/compare/v5.2.0...v5.2.1
[5.2.0]: https://github.com/isunjn/serene/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/isunjn/serene/compare/v5.0.1...v5.1.0
[5.0.1]: https://github.com/isunjn/serene/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/isunjn/serene/compare/v4.5.0...v5.0.0
[4.5.0]: https://github.com/isunjn/serene/compare/v4.4.0...v4.5.0
[4.4.0]: https://github.com/isunjn/serene/compare/v4.3.0...v4.4.0
[4.3.0]: https://github.com/isunjn/serene/compare/v4.2.0...v4.3.0
[4.2.0]: https://github.com/isunjn/serene/compare/v4.1.0...v4.2.0
[4.1.0]: https://github.com/isunjn/serene/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/isunjn/serene/compare/v3.4.0...v4.0.0
[3.4.0]: https://github.com/isunjn/serene/compare/v3.3.1...v3.4.0
[3.3.1]: https://github.com/isunjn/serene/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/isunjn/serene/compare/v3.2.0...v3.3.0
[3.2.0]: https://github.com/isunjn/serene/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/isunjn/serene/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/isunjn/serene/compare/v2.3.0...v3.0.0
[2.3.0]: https://github.com/isunjn/serene/compare/v2.2.1...v2.3.0
[2.2.1]: https://github.com/isunjn/serene/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/isunjn/serene/compare/v2.1.2...v2.2.0
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
