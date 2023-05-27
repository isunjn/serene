# Changelog

All notable changes to this project will be documented in this file.

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

### Added
- KaTeX support
- Mermaid support

### Fixed
- Style issue of table-of-contents
- A few non-critical bugs

## [0.1.0] - 2022-01-14

First release 🎉


[1.1.0]: https://github.com/isunjn/serene/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/isunjn/serene/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/isunjn/serene/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/isunjn/serene/releases/tag/v0.1.0