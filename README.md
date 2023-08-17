English | [中文](https://github.com/isunjn/serene/blob/main/README-cn.md)

![screenshot](https://github.com/isunjn/serene/blob/main/screenshot.png?raw=true)

A blog theme for [zola](https://www.getzola.org), simple and clean.

Demo: <https://serene-demo-site.vercel.app>

## Features

- A spiffy design
- Projects page
- Dark mode
- Image zooming
- Out-of-date alert
- Sticky table-of-contents
- Callouts (note, warning, alert, etc.)
- Comments using [Giscus](https://giscus.app)
- Mathematical notations using [KaTeX](https://katex.org)
- Diagrams and visualizations using [Mermaid](https://github.com/mermaid-js/mermaid)

## Usage

If you haven't created a zola site yet, create a new zola site with the following command (assuming your site is called `myblog`):

```sh
zola init myblog
```

Enter the directory:

```sh
cd myblog
```

Add the serene theme:

```sh
git submodule add -b latest https://github.com/isunjn/serene.git themes/serene
```

The myblog directory now looks like this:

```
├── config.toml
├── content/
├── sass/
├── static/
├── templates/
└── themes/
    └── serene/
```

Create `myblog/content/_index.md` and `myblog/content/blog/_index.md`

If you want to display the projects page, also create `myblog/content/projects/_index.md`

```
├── config.toml
├── content/
│   ├── blog/
│   │   └── _index.md
│   ├── projects/
│   │   └── _index.md
│   └── _index.md
├── sass/
├── static/
├── templates/
└── themes/
    └── serene/
```

Modify the content of these files as follows:

`myblog/content/_index.md`:

```
+++
template = 'home.html'

[extra]
lang = 'en'
+++

Words about you
```

`myblog/content/blog/_index.md`:

```
+++
title = "My Blog"
description = "My blog site."
sort_by = "date"
template = "blog.html"
page_template = "post.html"
insert_anchor_links = "right"
generate_feed = true

[extra]
lang = 'en'
+++
```

`myblog/content/projects/_index.md`:

```
+++
title = "My Projects"
description = "My projects page."
template = "projects.html"

[extra]
lang = 'en'
+++
```

Create a new directory `img` under `myblog/static`, place favicon related files, you can use tools like [favicon.io](https://favicon.io/favicon-converter/) to generate

Also put your avatar picture file `avatar.webp`, webp format is recommended

```
...
├── static/
│   └── img/
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── avatar. webp
...
```

### Configuration

Copy the contents of `myblog/themes/serene/config.example.toml` to `myblog/config.toml`, refer to the comments in the file and Zola's [documentation](https://www.getzola.org/documentation/getting-started/overview/) to modify accordingly

#### Icon

- Copy `myblog/themes/serene/static/icon` directory to `myblog/static/icon`, the icon value in `links` is the file name of the svg file in it, without the `.svg` suffix

- Find the svg file of the icon you want, modify its width and height to 24, and the color to currentColor:

  `... width="24" height="24" ... fill="currentColor" ...`

- The default icons came from [Remix Icon](https://remixicon.com/)

#### Code highlight

- Copy `myblog/themes/serene/static/highlight_themes` directory to `myblog/static/highlight_themes`.

- If you set `highlight_theme` in `config.toml` to one of zola's [built-in highlight themes](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting), you will get that theme used in both light and dark mode.

- By default serene use different themes for light/dark modes, configured by `highlight_theme`, `extra_syntaxes_and_themes` and `highlight_themes_css`. The default highlight theme `serene-light` `serene-dark` is a modified version of [Tomorrow](https://github.com/ChrisKempson/Tomorrow-Theme) theme.

- If you want a different theme, find the `.tmTheme` TextMate file of your theme, put it in `myblog/static/highlight_themes`, and then modify the `theme` value of `highlight_themes_css` to that file's name, without `.tmTheme` extension. This will generate a `hl-light.css` and a `hl-dark.css` file in `myblog/static/`, you may have to delete them first before you change the `theme` value, so zola can re-generate.

- You can find some TextMate themes on [this website](https://tmtheme-editor.glitch.me/).

#### RSS

- You can add rss to your site, Zola's default feed file is located in the root directory of the site, set `generate_feed = true` in `config.toml`, `feed_filename` can be set to `atom.xml` or `rss.xml ` , corresponding to two different rss file standards, set `generate_feed = false` in `myblog/content/blog/_index.md`

- The serene theme looks more like a personal website, the posts are in the `/blog` directory, you may want the feed file to be in the `/blog` directory instead of the root directory, which requires you to set `generate_feed = false ` `feed_filename = "feed.xml"` in `config.toml`, and set `generate_feed = true` in `myblog/content/blog/_index.md`

- `feed.xml` uses `title` and `description` from `myblog/content/blog/_index.md`, the other two use `config.toml`

#### Projects page

- Serene has a projects page where you can showcase your projects, products, etc.

- Set `projects_page = true` in `config.toml`, create a new `data.toml` under `myblog/content/projects`, add projects information in it, the format is as follows:

  ```toml
  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]

  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]
  ```

#### Outdated alert

- If one of your posts has strong timeliness, you can set an outdated alert to be displayed on the page after certain days

- `outdate_alert` and `outdate_alert_days` in `config.toml` set the default whether to be outdated and how many days to be outdated. These two can also be configured on a separate post, you can set `outdate_alert` in `config.toml` to `false`, and then enable it separately in the front matter of time-sensitive posts

- `outdate_alert_text_before` and `outdate_alert_text_after` are the specific content of the alert, before and after the number of days respectively

#### Comments

- Serene supports using [giscus](https://giscus.app) as the comment system

- To enable it, you need to create `myblog/templates/_giscus_script.html` and put the script configured on the giscus website into it, then change the value of `data-theme` to `https://<your-domain-name>/giscus_light.css`, replace `<your-domain-name>` with you domain name, same as `base_url` in `config.toml`

- `comment = true` in `config.toml` sets all posts to enable comments, you can set `comment = false` under `[extra]` in the front matter of the post to control whether a specific post displays comments

#### Analytics

- To place scripts for analytics tools (such as Google Anayltics, Umami, etc.), you can create a new `myblog/templates/_head_extend.html` and put the corresponding content in it. The content of this file will be added to the html head of each page

#### Customization

- Copy `myblog/themes/serene/sass/main.scss` to `myblog/sass/main.scss`, several variable values at the top of the file are used to control styles, such as the theme color `--primary-color`, modify it if you want

- Serene uses the Signika font of [Google Fonts](https://fonts.google.com/) by default. If you want a different font, create a new `myblog/templates/_custom_font.html` and put the font link tags you copied from google fonts website into it, and then modify `--main-font` or `--code-font` in `myblog/sass/main.scss`. For performance reason, you may want to self-host font files (optional): 
  1. Open [google-webfonts-helper](https://gwfh.mranftl.com) and choose your font
  2. Modify `Customize folder prefix` of step 3 to `/font/` and then copy the css
  3. Replace the content of `myblog/templates/_custom_font.html` with a `<style> </style>` tag, with the css you just copied in it.
  4. Download step 4 font files and put them in `myblog/static/font/` folder


- If you want to customize more, you only need to copy the files under the `templates`, `static`, `sass` directory in the corresponding `themes/serene` to the same name directory of myblog, and modify it. Be careful not to directly modify the files under the serene directory, because these modifications may cause conflicts if the theme is updated

### Writing

#### front matter

- The content inside the two `+++` at the top of the post markdown file is called front matter, and the supported configuration items are as follows:

  ```md
  +++
  title = ""
  date = 2022-01-01
  draft = true
  
  [taxonomies]
  categories = ["one"]
  tags = ["one", "two", "three"]
  
  [extra]
  lang = "en"
  toc = true
  comment = true
  copy = true
  math = false
  mermaid = false
  outdate_alert = true
  outdate_alert_days = 120
  +++

  new post about somthing...

  <!-- more -->

  more post content...
  ```

- It is recommended to add a line `<!-- more -->` at the appropriate position in the post (such as after the first paragraph), and the content before it will be used as the description of the page, which is helpful for SEO

- Post files are created under `myblog/content/blog`, after done writing, change `draft` to true

#### Shortcodes

- Zola supports 'shortcodes', which can add some extra styles or templates for in addition to the standard markdown format

- Zola support some [annotations for code blocks](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations). Serene add another one to show the file name by a `codeblock` shortcode, use it like this:

  ```md
  {% codeblock(name="path/to/file") %}
  // a markdown code block ...
  {% end %}
  ```

- In addition to `![img](/path/to/img)` of standard markdown, Serene also supports a `figure` shortcode to add some explanatory text to the image, the format is as follows:

  ```md
  {{ figure(src="/path/to/img", alt="alt text", caption="caption text") }}
  ```

  This will be displayed as `<figure></figure>` in HTML on the web page instead of `<img>`, and the content of the caption will be centered below the image. The alt attribute is optional but recommended to help enhance accessibility

  Adding attribution information to images is very common, you can directly use the `via` attribute, which will display a link named via below the image:

  ```md
  {{ figure(src="/path/to/img", alt="some alt text", via="https://example.com") }}
  ```

#### Callout

- Serene also uses shortcodes to implement callouts, the effect is shown in [this page](https://serene-demo-site.vercel.app/blog/callouts) of the demo site, there are currently 6 types: `note` `important ` `warning` `alert` `question` `tip`, the format is as follows, the header attribute is optional:

  ```md
  {% note(header="Note") %}
  note text
  {% end %}
  ```

- If people read your posts via rss reader, these callouts will appear as normal `<blockquote>`

#### KaTeX

- Set `math = true` in the front matter to enable [KaTeX](https://katex.org/) support

- Inline formula `$...$`, block-level formula `$$...$$`

#### Mermaid

- Set `mermaid = true` in the front matter to enable [Mermaid](https://github.com/mermaid-js/mermaid) support, and then insert a chart in the following format:

  ```md
  {% mermaid() %}
  flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
  {% end %}
  ```

### Build & Deploy

Local preview:

```sh
zola serve
```

Build the site:

```sh
zola build
```

To deploy a static site, please refer to zola's [documentation about deployment](https://www.getzola.org/documentation/deployment/overview/)

### Update

Please check the CHANGELOG on github for breaking changes before updating the theme

```sh
git submodule update --remote themes/serene
```
