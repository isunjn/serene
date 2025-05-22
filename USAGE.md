This is the detailed guide on how to use zola-theme-serene. You should also check zola's [documentation](https://www.getzola.org/documentation/getting-started/overview/).

## Installation

Create a zola site and add serene theme (assuming your site is called `myblog`):

```sh
zola init myblog
cd myblog
git init
git submodule add -b latest https://github.com/isunjn/serene.git themes/serene
```

Copy the content of `myblog/themes/serene/config.example.toml` to `myblog/config.toml`.

## Sections and Pages

There is a `sections` config option in your `config.toml`, which enumerates the sections your site has. You should have at least one `blog` section.

The name and path can be changed, be noticed that if you changed the blog section path (e.g. from `/posts` to `/blog`), then you should also change `blog_section_path` option.

For home page, create `myblog/content/_index.md`:

```
+++
template = 'home.html'

[extra]
lang = 'en'

# Show footer in home page
footer = false

# If you don't want to display id/bio/avatar, simply comment out that line
name = "Jhon Wick"
id = "jhonwick"
bio = "dog person, killer"
avatar = "img/avatar.webp"
links = [
    { name = "GitHub", icon = "github", url = "https://github.com/<your-username>" },
    { name = "Twitter", icon = "twitter", url = "https://twitter.com/<your-username>" },
    { name = "Email", icon = "email", url = "mailto:<your-email-address>" },
]

# Show a few recent posts in home page
recent = false
recent_max = 15
recent_more_text = "more »"
date_format = "%b %-d, %Y"
+++

Hi, I'm ...
```

For blog section, create `myblog/content/posts/_index.md`:

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
lang = "en"

title = "Posts"
subtitle = "I write about ...."

date_format = "%b %-d, %Y"

categorized = false # posts can be categorized
back_to_top = true # show back-to-top button
toc = true # show table-of-contents
comment = false # enable comment
copy = true # show copy button in code block

outdate_alert = false
outdate_alert_days = 12
outdate_alert_text_before = "This article was last updated "
outdate_alert_text_after = " days ago and may be out of date."
+++
```

Blog section is defined by `blog.html` and `post.html`. Serene also has a special template called `prose.html`, it applies the same styles of blog post page. You can use it as a section template for a custom section page, for example if you want a separate `about` page, you can add a `{ name = "about", path = "/about", is_external = false }` to the `sections` and create a `myblog/content/about/_index.md`:

```
+++
title = "About me"
description = "About page of ..."
template = "prose.html"
insert_anchor_links = "none"

[extra]
lang = 'en'

title = "Posts"
subtitle = "I write about ...."

math = false
mermaid = false
copy = false
comment = false
reaction = false
+++

Hi, My name is ....
```

The default date format is "%b %-d, %Y", e.g. "Dec 13, 2025", check [this page](https://docs.rs/chrono/0.4.40/chrono/format/strftime/index.html) if you want to customize it, for example change to "%Y-%-m-%-d", e.g. "2025-2-13".

Now the myblog directory may looks like this:

```
├── config.toml
├── content/
│   ├── posts/
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

## Favicon

Create a new directory `img` under `myblog/static`, put favicon related files here, you can use tools like [favicon.io](https://favicon.io/favicon-converter/) to generate those files. If you want to display avatar in home page, also put your avatar picture file `avatar.webp` here, webp format is recommended.

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

## Icon

The default icons are placed in `myblog/themes/serene/static/icon`, the `icon` value in `links` of home section is the file name of the svg file.

To customize, find the svg file you want, modify (in case you don't kown, a svg file is just a plian text file) its width and height to `18`, and the color to `currentColor`:

`... width="18" height="18" ... fill="currentColor" ...`

and then put it in `myblog/static/icon`, file in this folder with the same name will override the default one.

The default icons mostly came from [Remix Icon](https://remixicon.com/).

## Theme

By default there is theme toggle button to switch between light and dark mode, you can set `force_theme` in `config.toml` to force a specific mode only.

## Code Highlighting

By default serene use different code highlight themes for light/dark mode, configured by `highlight_theme`, `extra_syntaxes_and_themes` and `highlight_themes_css`. The default highlight theme `serene-light` `serene-dark` is a modified version of [Tomorrow](https://github.com/ChrisKempson/Tomorrow-Theme) theme.

If you set `highlight_theme` in `config.toml` to one of zola's [built-in highlight themes](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting), you will get that theme used in both light and dark mode.

If you want a different theme, create `myblog/highlight_themes`, set `extra_syntaxes_and_themes` to `["highlight_themes"]`, find the `.tmTheme` TextMate file of your theme, put it there, and then modify the `theme` value of `highlight_themes_css` to that file's name. This will generate a `hl-light.css` and a `hl-dark.css` file in `myblog/static/`, you may have to delete them first before you change the `theme` value, so zola can re-generate. You can find some TextMate themes on [this website](https://tmtheme-editor.glitch.me/).

## RSS

Zola's default feed file is located in the root directory of the site, set `generate_feeds = true` in `config.toml`, `feed_filenames` can be set to `["atom.xml"]` or `["rss.xml"] ` , corresponding to two different rss file standards, you should also set `generate_feeds = false` in `myblog/content/posts/_index.md`

The serene theme looks more like a personal website, the posts are in the `/posts` directory, you may want the feed file to be in the `/posts` directory instead of the root directory, this requires you to set `generate_feeds = false ` `feed_filenames = ["feed.xml"]` in `config.toml`, and set `generate_feeds = true` in `myblog/content/posts/_index.md`.

`feed.xml` uses `title` and `description` from `myblog/content/posts/_index.md`, the other two use `config.toml`'s.

## Analytics

To add scripts for analytics tools (such as Google Analytics, Umami, etc.), you can create  `myblog/templates/_head_extend.html`. The content of this file will be added to the html head of each page.

## Custom CSS

Copy `myblog/themes/serene/templates/_custom_css.html` to `myblog/templates/_custom_css.html`, variables in this file are used to control styles, such as the theme color `--primary-color`, modify them as you want.

If you want to customize more, you need to copy that file under the `templates`, `static`, `sass` directory in the corresponding `themes/serene` to the same name directory of `myblog`, and modify it. Be careful not to directly modify the files under the serene directory, because these modifications may cause conflicts if the theme is updated.

If you want to use a custom font, create a new `myblog/templates/_custom_font.html` and put the font link tags (for eample, from [google fonts](https://fonts.google.com/)) into it, and then modify `--main-font` or `--code-font` in `myblog/sass/templates/_custom_css.html`. For performance reason, you may want to self-host font files, but it's optional:

1. Open [google-webfonts-helper](https://gwfh.mranftl.com) and choose your font.
2. Modify `Customize folder prefix` of step 3 to `/font/` and then copy the css.
3. Replace the content of `myblog/templates/_custom_font.html` with a `<style> </style>` tag, with the css you just copied.
4. Download step 4 font files and put them in `myblog/static/font/` folder.

## Front Matter

The content inside the two `+++` at the top of the post markdown file is called front matter, used to provide metadata and config options of that post. Supported options:

```md
+++
title = ""
description = ""
date = 2022-01-01
updated = 2025-01-01
draft = true

[taxonomies]
categories = ["one"]
tags = ["one", "two", "three"]

[extra]
lang = "en"
toc = true
comment = false
copy = true
outdate_alert = true
outdate_alert_days = 120
math = false
mermaid = false
featured = false
reaction = false
+++

new post about something...
```

Some of these options can also be configured in `myblog/content/posts/_index.md`, as the default value for all posts.

If you set `blog_categorized = true`, posts will be sorted alphabetically by default, you can manually set the order by adding a prefix  `__[0-9]{2}__` in front of the category name, for example, `categories = ["__01__CatXXX"]`

## Table of Contents

Set `toc = true` to display of table-of-contents.

## Math & Chart

Set `math = true` to enable formula rendering with KaTeX.

Set `mermaid = true` to enable chart rendering with Mermaid.

## Featured Mark

Set `featured = true` to display an asterisk(*) mark in front of the title.

## Outdate Alert

If one of your posts has strong timeliness, you can display an outdate alert after certain days.

Set `outdate_alert` and `outdate_alert_days` to enable the alert.

In `myblog/content/posts/_index.md`, options `outdate_alert_text_before` and `outdate_alert_text_after` are the text content of the alert.

## Comment

You can use [giscus](https://giscus.app) as the comment system.

To enable it, you need to create `myblog/templates/_giscus_script.html` and put the script configured on the giscus website into it, then change the value of `data-theme` to `https://<your-domain-name>/giscus_light.css`, replace `<your-domain-name>` with you domain name, same as `base_url` in `config.toml`, if you set `force_theme` to `dark`, replace `giscus_light.css` with `giscus_dark.css`.

Then set `comment = true` to enable comment.

## Reaction

This theme supports a feature called anonymous emoji reaction, visitors of you site can react to your post with emojis, without the need to log in or register.

You need to setup a backend api endpoint to enable it. Your endpoint should handle both `GET` and `POST` request:

- `GET`

    Request query:

     `slug`: the slug of the post

    Response:

    ```jsonc
    {
      "👍": [123, true], // emoji: [count, reacted]
      "👀": [456, false]
    }
    ```

- `POST`

    Request body:

    ```json
    {
      "slug": "post-slug",
      "target": "👍",
      "reacted": true
    }
    ```

    Response:

    ```json
    {
      "success": true
    }
    ```

For conivence, you can use one template repo to to setup your own endpoint:

-  [isunjn/reaction](https://github.com/isunjn/reaction): All you need is a [Cloudflare](https://cloudflare.com) account. The free tier is good enough for a low-traffic personal blog.

- [mildronize/reaction](https://github.com/mildronize/reaction): Specific to [Azure](https://azure.microsoft.com/) platform.
- [sorokya/reaction](https://github.com/sorokya/reaction): A self-contained one, you can run it with docker.

After you setup your endpoint, set `reaction_endpoint = "<your-endpoint>"` and `reaction = true` to enable it.

Giscus also support a reaction feature, but it requires visitors to log in to GitHub, you can disable it in giscus's settings.

## Codeblock

Zola supports some [annotations for code blocks](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations).

## Shortcodes

[Shortcodes](https://www.getzola.org/documentation/content/shortcodes/) are some special templates.

- Use `figure` to add caption to the image:

  ```md
  {{ figure(src="/path/to/img", alt="alt text", caption="caption text") }}
  ```

  Adding attribution information to an image is very common, you can directly use the `via` attribute, which will display a link named 'via' below the image:

  ```md
  {{ figure(src="/path/to/img", alt="some alt text", via="https://example.com") }}
  ```

- Use `quote` to display a special quote block, `cite` is optional:

  ```md
  {% quote(cite="") %}
  // content...
  {% end %}
  ```

- Use `detail` to add an expandable detail block, `default_open` is optional:

  ```md
  {% detail(title="", default_open=false) %}
  // content...
  {% end %}
  ```

- As you can see in [this page](https://serene-demo.pages.dev/posts/callouts) of the demo site, callouts are special blockquote blocks, just like [github's](https://github.com/orgs/community/discussions/16925). There are currently 5 types: `note` `tip` `important` `warning`  `caution`.

   `title` is optional:

  ```md
  {% note(title="Note") %}
  note text
  {% end %}
  ```

- Use `mermaid` to add a mermaid chart:

  ```md
  {% mermaid() %}
  flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
  {% end %}
  ```

## Collection

This theme has several special shortcodes for creating a collection of items. These collections can be used to showcase various types of your list, such as projects, publications, blogroll, bookmarks, etc. Check [this page](http://serene-demo.pages.dev/collections) on demo site to see some examples.

Currently, there are 7 types of collection item:

- `card`

    ```toml
    [[collection]]
    type = "card"
    title = "Title"
    subtitle = "Subtitle" # optional
    date = "Date" # optional
    link = "https://example.com" # optional
    icon = "https://example.com/image.png" # optional
    content = "Content"
    tags = ["tag1", "tag2"] # optional
    featured = false  # optional
    ```

- `card_simple`

    ```toml
    [[collection]]
    type = "card_simple"
    title = "Title"
    date = "Date" # optional
    link = "https://example.com" # optional
    icon = "https://example.com/image.png" # optional
    content = "Content"
    featured = false  # optional
    ```

- `entry`

    ```toml
    [[collection]]
    type = "entry"
    title = "Title" # optional
    subtitle = "Subtitle" # optional
    link = "https://example.com" # optional
    icon = "https://example.com/image.png" # optional
    ```

- `box`

    ```toml
    [[collection]]
    type = "box"
    title = "Title"
    subtitle = "Subtitle" # optional
    link = "https://example.com" # optional
    img = "https://example.com/image.png" # optional
    ```

- `art`

    ```toml
    [[collection]]
    type = "art"
    title = "Title"
    subtitle = "Subtitle" # optional
    link = "https://example.com" # optional
    img = "https://example.com/image.png"
    content = "Content" # optional
    footer = "Footer" # optional
    ```

- `art_simple`

    ```toml
    [[collection]]
    type = "art_simple"
    title = "Title"
    subtitle = "Subtitle" # optional
    link = "https://example.com" # optional
    img = "https://example.com/image.png"
    ```


List your items in a toml file and then use a `collection` shortcode to render them.

For example, to create a "projects" section page:

1. Create `myblog/content/projects/projects.toml`:

    ```toml
    [[collection]]
    type = "card"
    title = "Tokio"
    link = "https://example.com"
    content = "Tokio is an asynchronous runtime for the Rust programming language. It provides the building blocks needed for writing network applications. It gives the flexibility to target a wide range of systems, from large servers with dozens of cores to small embedded devices."
    tags = ["rust", "async", "runtime"]

    [[collection]]
    type = "card"
    title = "Kubernetes"
    link = "https://example.com"
    content = "Kubernetes, also known as K8s, is an open source system for managing containerized applications across multiple hosts. It provides basic mechanisms for the deployment, maintenance, and scaling of applications."
    tags = ["k8s", "golang"]

    [[collection]]
    type = "card"
    title = "Next.js"
    link = "https://example.com"
    content = "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations."
    tags = ["typescript", "react", "frontend"]

    ```

2. Create `myblog/content/projects/_index.md`:

    ```
    +++
    title = "My projects"
    description = "Projects page of ..."
    template = "prose.html"

    [extra]
    title = "Projects"
    subtitle = "Some cool projects I made"
    +++

    {{ collection(file="projects.toml") }}
    ```

3. Add projects section in `sections` of `config.toml`

    ```toml
    sections = [
      # ...
      { name = "projects", path = "/projects", is_external = false },
    ]
    ```

## Build & Deploy

Local preview:

```sh
zola serve
```

Build the site:

```sh
zola build
```

To deploy a static site, refer to zola's [documentation about deployment](https://www.getzola.org/documentation/deployment/overview/).

## Update

Check the [CHANGELOG.md](https://github.com/isunjn/serene/blob/main/CHANGELOG.md) on github for breaking changes before you update.

If you copied some files from `myblog/themes/serene` to `myblog/` for customization, such as `_custom_css.html` or `main.scss`, then you should record what you have modified before you update, re-copy those files and re-apply your modification after updating. The `config.toml` should be re-copied too.

You can watch (`watch > custom > releases > apply`) this project on github to be reminded of a new release.

```sh
git submodule update --remote themes/serene
```
