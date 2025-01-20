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
git submodule add -b latest https://github.com/alexanderacker-com/serene.git themes/serene
```

Copy the content of `myblog/themes/serene/config.example.toml` to `myblog/config.toml`, refer to the comments in the file and Zola's [documentation](https://www.getzola.org/documentation/getting-started/overview/) to modify accordingly

## Sections and pages

There is a `sections` config item in your `config.toml`, which enumerates the sections your website has. You should have at least one `blog` section. The name and path can be changed, be noticed that if you changed the blog section path (e.g. from `/posts` to `/blog`), then you should also change `blog_section_path` config item.

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

Create `myblog/content/_index.md` and `myblog/content/posts/_index.md` with the following content:

`myblog/content/_index.md`:

```
+++
template = 'home.html'

[extra]
lang = 'en'
+++

Words about you
```

`myblog/content/posts/_index.md`:

```
+++
title = "My Blog"
description = "My blog site."
sort_by = "date"
template = "blog.html"
page_template = "post.html"
insert_anchor_links = "right"
generate_feeds = true

[extra]
lang = 'en'
+++
```

The path and the directory should match. If you changed the blog section path to `/blog`, then you create `myblog/content/blog/_index.md`, rather than `myblog/content/posts/_index.md`. The same goes for the others.

If you want to display a projects page (as you see in the demo site), create `myblog/content/projects/_index.md`:

```
+++
title = "My Projects"
description = "My projects page."
template = "projects.html"

[extra]
lang = 'en'
+++
```

The `blog` and `projects` are two sections that serene supports by default, they have specific structures and styles, defined in template `blog.html` and `projects.html`.

Serene also support a special template called `prose.html`, it applies the same styles of blog post page and you can use it as a section template for a custom section page, for example if you want a separate `about` page, you can add a `{ name = "about", path = "/about", is_external = false }` to the `sections` config item and create a `myblog/content/about/_index.md` with the following content:

```
+++
title = "About me"
description = "A about page of ..."
template = "prose.html"
insert_anchor_links = "none"

[extra]
lang = 'en'
copy = false
comment = false
reaction = false
+++

Hi, My name is ....

(more markdown content goes here)

```

Now the myblog directory may looks like this:

```
├── config.toml
├── content/
│   ├── posts/
│   │   └── _index.md
│   ├── projects/
│   │   └── _index.md
│   ├── about/
│   │   └── _index.md
│   └── _index.md
├── sass/
├── static/
├── templates/
└── themes/
    └── serene/
```

## Configuration

### Favicon

- Create a new directory `img` under `myblog/static`, put favicon related files here, you can use tools like [favicon.io](https://favicon.io/favicon-converter/) to generate those files

- Also put your avatar picture file `avatar.webp` here, webp format is recommended

  ```
  ...
  ├── static/
  │   └── img/
  │       ├── favicon-16x16.png
  │       ├── favicon-32x32.png
  │       ├── apple-touch-icon.png
  │       └── avatar.webp
  ...
  ```

### Icon

- Copy `myblog/themes/serene/static/icon` directory to `myblog/static/icon`, the icon value in `links` is the file name of the svg file in it, without the `.svg` suffix

- Find the svg file of the icon you want, modify (in case you don't kown, svg is just a plian text files) its width and height to 20, and the color to `currentColor`:

  `... width="20" height="20" ... fill="currentColor" ...`

- The default icons came from [Remix Icon](https://remixicon.com/)

### Code highlight

- Copy `myblog/themes/serene/highlight_themes` directory to `myblog/highlight_themes`.

- If you set `highlight_theme` in `config.toml` to one of zola's [built-in highlight themes](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting), you will get that theme used in both light and dark mode.

- By default serene use different themes for light/dark modes, configured by `highlight_theme`, `extra_syntaxes_and_themes` and `highlight_themes_css`. The default highlight theme `serene-light` `serene-dark` is a modified version of [Tomorrow](https://github.com/ChrisKempson/Tomorrow-Theme) theme.

- If you want a different theme, find the `.tmTheme` TextMate file of your theme, put it in `myblog/static/highlight_themes`, and then modify the `theme` value of `highlight_themes_css` to that file's name, without `.tmTheme` extension. This will generate a `hl-light.css` and a `hl-dark.css` file in `myblog/static/`, you may have to delete them first before you change the `theme` value, so zola can re-generate.

- You can find some TextMate themes on [this website](https://tmtheme-editor.glitch.me/).

### Force light or dark

- By default there is theme toggle button to switch between light and dark theme, you can set `force_theme` in `config.toml` to force a specific theme

### RSS

- You can add rss to your site, Zola's default feed file is located in the root directory of the site, set `generate_feeds = true` in `config.toml`, `feed_filenames` can be set to `["atom.xml"]` or `["rss.xml"] ` , corresponding to two different rss file standards, you should also set `generate_feeds = false` in `myblog/content/posts/_index.md`

- The serene theme looks more like a personal website, the posts are in the `/posts` directory, you may want the feed file to be in the `/posts` directory instead of the root directory, this requires you to set `generate_feeds = false ` `feed_filenames = ["feed.xml"]` in `config.toml`, and set `generate_feeds = true` in `myblog/content/posts/_index.md`

- `feed.xml` uses `title` and `description` from `myblog/content/posts/_index.md`, the other two use `config.toml`'s

### Projects page

- Serene has a projects page where you can showcase your projects, products, etc.

- Create a new `data.toml` under `myblog/content/projects/`, add projects information in it, the format is as follows, `img` is optional:

  ```toml
  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  img = ""
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]

  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  img = ""
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]
  ```

### Outdated alert

- If one of your posts has strong timeliness, you can set an outdated alert to be displayed on the page after certain days

- `outdate_alert` and `outdate_alert_days` in `config.toml` set the default whether to be outdated and how many days to be outdated. These two can also be configured on a separate post, you can set `outdate_alert` in `config.toml` to `false`, and then enable it separately in the front matter of time-sensitive posts

- `outdate_alert_text_before` and `outdate_alert_text_after` are the specific content of the alert, before and after the number of days respectively

### Comments

- Serene supports using [giscus](https://giscus.app) as the comment system

- To enable it, you need to create `myblog/templates/_giscus_script.html` and put the script configured on the giscus website into it, then change the value of `data-theme` to `https://<your-domain-name>/giscus_light.css`, replace `<your-domain-name>` with you domain name, same as `base_url` in `config.toml`, if you set `force_theme` to `dark`, replace `giscus_light.css` with `giscus_dark.css`

- `comment = true` in `config.toml` sets all posts to enable comments, you can set `comment = false` under `[extra]` in the front matter of the post to control whether a specific post displays comments

### Anonymous reactions

- Serene supports a feature called anonymous emoji reactions, visitors of you site can react to your posts with emojis, without the need to log in or register.

- You need to setup a backend api endpoint to enable it. The endpoint should handle both `GET` and `POST`:

    - `Get`

      request query: `slug`, the slug of the post

      response:
      ```jsonc
      {
        "👍": [123, true], // emoji: [count, reacted]
        "👀": [456, false]
      }
      ```

    - `Post`

      request body:
      ```json
      {
        "slug": "post-slug",
        "target": "👍",
        "reacted": true
      }
      ```

      response:
      ```json
      {
        "success": true
      }
      ```

- For conivence, you can use [this template repo](https://github.com/isunjn/reaction) to setup your own endpoint. All you need is a [Cloudflare](https://cloudflare.com) account. The free tier is good enough for a low-traffic personal blog.

    - Another template repo is [mildronize/reaction](https://github.com/mildronize/reaction), specific to [Azure](https://azure.microsoft.com/) platform, thanks to [@mildronize](https://github.com/mildronize).

- After you setup your endpoint, set `reaction_endpoint = "<your-endpoint>"` and `reaction = true` in `config.toml` to enable it.

- Giscus also support a reaction feature, but it requires visitors to log in to GitHub, you can also disable it in giscus's settings.

### Analytics

- To place scripts for analytics tools (such as Google Analytics, Umami, etc.), you can create a new `myblog/templates/_head_extend.html` and put the corresponding content in it. The content of this file will be added to the html head of each page

### Fonts

- <del>Serene uses the Signika font of [Google Fonts](https://fonts.google.com/) by default.</del> If you want a different font, create a new `myblog/templates/_custom_font.html` and put the font link tags you copied from google fonts website into it, and then modify `--main-font` or `--code-font` in `myblog/sass/main.scss`.

- For performance reason, you may want to self-host font files (optional):
  1. Open [google-webfonts-helper](https://gwfh.mranftl.com) and choose your font
  2. Modify `Customize folder prefix` of step 3 to `/font/` and then copy the css
  3. Replace the content of `myblog/templates/_custom_font.html` with a `<style> </style>` tag, with the css you just copied in it.
  4. Download step 4 font files and put them in `myblog/static/font/` folder


### Custom CSS

- Copy `myblog/themes/serene/templates/_custom_css.html` to `myblog/templates/_custom_css.html`, variables in this file are used to control styles, such as the theme color `--primary-color`, you can modify them as you want

- If you want to customize more, you only need to copy that file under the `templates`, `static`, `sass` directory in the corresponding `themes/serene` to the same name directory of `myblog`, and modify it. Be careful not to directly modify the files under the serene directory, because these modifications may cause conflicts if the theme is updated

### Show recent posts on homepage

- Show a few recent posts on homepage by settng `recent = true` in `config.toml`


## Writing

### front matter

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
  outdate_alert = true
  outdate_alert_days = 120
  display_tags = true
  truncate_summary = false
  featured = false
  reaction = false
  +++

  new post about something...

  <!-- more -->

  more post content...
  ```

- You can add a `<!-- more -->` line, the content before it will become the summary/description of the post. You can set `truncate_summary = true` to remove the summary from the post webpage.

- A post marked `featured = true` will display a `*` mark in front of it in list, you can use this to mark a post as "most worthy to read"

- If you set `blog_categorized = true`, posts will be sorted alphabetically by default, you can manually set the order by adding the prefix of `__[0-9]{2}__` in front of the category name, for example, `categories = ["__01__Balabala"]`

- Post files are created under `myblog/content/posts`, after done writing, change `draft` to false

### Shortcodes

- Zola supports 'shortcodes', which can be used to add some extra styles or templates in addition to the standard markdown format

- Zola support some [annotations for code blocks](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations). Serene add another one to display the file name: `codeblock`, use it like this:

  ```md
  {% codeblock(name="path/to/file") %}
  // a markdown code block ...
  {% end %}
  ```

- In addition to `![img](/path/to/img)` of standard markdown, serene also supports a `figure` shortcode to add some explanatory text to the image:

  ```md
  {{ figure(src="/path/to/img", alt="alt text", caption="caption text") }}
  ```

  This will be displayed as `<figure></figure>` in HTML on the web page instead of `<img>`, and the content of the caption will be centered below the image. The alt attribute is optional but recommended to help enhance accessibility

  Adding attribution information to a image is very common, you can directly use the `via` attribute, which will display a link named via below the image:

  ```md
  {{ figure(src="/path/to/img", alt="some alt text", via="https://example.com") }}
  ```

- Special quote, `cite` is optional:

  ```md
  {% quote(cite="") %}
  // content...
  {% end %}
  ```

- Expandable detail, `default_open` is optional:

  ```md
  {% detail(title="", default_open=false) %}
  // content...
  {% end %}
  ```

### Callout

- Serene also uses shortcodes to implement callouts, the effect is shown in [this page](https://serene-demo.pages.dev/posts/callouts) of the demo site, there are currently 6 types: `note` `important ` `warning` `alert` `question` `tip`, the format is as follows, the header attribute is optional:

  ```md
  {% note(header="Note") %}
  note text
  {% end %}
  ```

- If people read your posts via rss reader, these callouts will appear as normal `<blockquote>`


## Build & Deploy

Local preview:

```sh
zola serve
```

Build the site:

```sh
zola build
```

To deploy a static site, please refer to zola's [documentation about deployment](https://www.getzola.org/documentation/deployment/overview/)

## Update

- Please check the [CHANGELOG.md](https://github.com/alexanderacker-com/serene/blob/main/CHANGELOG.md) on github for breaking changes before updating the theme

- If you copied some files from `myblog/themes/serene` to `myblog/` for customization, such as `_custom_css.html` or `main.scss`, then you should record what you have modified before you update, re-copy those files and re-apply your modification after updating. The `config.toml` should be re-copied too.

- You can watch (`watch > custom > releases > apply`) this project on github to be reminded of a new release

```sh
git submodule update --remote themes/serene
```

<br />

If you like this theme, you may [give it a star](https://github.com/alexanderacker-com/serene)

*Happy blogging :)*

<br />
