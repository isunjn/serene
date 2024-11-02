如果你还没有创建 Zola 站点，使用以下命令创建新的 Zola 站点（假设你的网站名为 myblog）:

```sh
zola init myblog
```

进入 myblog 目录:

```sh
cd myblog
```

添加 serene 主题：

```sh
git submodule add -b latest https://github.com/isunjn/serene.git themes/serene
```

将 `myblog/themes/serene/config.example.toml` 的内容复制到 `myblog/config.toml`，参考文件中的注释和 Zola 的[文档](https://www.getzola.org/documentation/getting-started/overview/)进行相应的修改

## 区块和页面

`config.toml` 中有一个 `sections` 配置项，它列举了网站都有哪几部分, 你应该至少有一个“博客”部分。名称和路径可以更改，注意如果你更改了博客 section 的路径（例如从 `/posts` 到 `/blog`），那么你还应该同步更改 `blog_section_path` 配置项

myblog 目录此时像这样：

```
├── config.toml
├── content/
├── sass/
├── static/
├── templates/
└── themes/
    └── serene/
```

创建 `myblog/content/_index.md` 和 `myblog/content/posts/_index.md`, 文件内容如下:

`myblog/content/_index.md`：

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

路径和目录应该匹配。如果你将博客 section 的 path 更改为 `/blog`，那么你创建的是 `myblog/content/blog/_index.md`，而不是 `myblog/content/posts/_index.md` 别的 section 也一样

如果你还想要 Projects 页面，创建 `myblog/content/projects/_index.md`

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

`blog` 和 `projects` 是 serene 默认支持的两个 section，它们具有特定的结构和样式，在模板 `blog.html` 和 `projects.html` 中定义

Serene 还支持一个名为 `prose.html` 的特殊模板，它应用了与博客文章页面相同的样式，你可以将其用作自定义 section 页面的模板，例如，如果你想要一个单独的 `about` 页面，可以在 `sections` 配置项中添加一个 `{ name = "about", path = "/about", is_external = false }` 并创建一个 `myblog/content/about/_index.md` ，内容如下：

```
+++
title = "About me"
description = "A about page of ..."
template = "prose.html"

[extra]
lang = 'en'
math = false
mermaid = false
copy = false
comment = false
reaction = false
+++

Hi, My name is ....

(more markdown content goes here)

```

现在目录可能长这样:

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

## 配置

### Favicon

在 `myblog/static` 下新建目录 `img` ，放置 favicon 相关图片，你可以使用类似 [favicon.io](https://favicon.io/favicon-converter/) 这样的工具在线生成

另外放入你的头像图片文件 `avatar.webp`, 推荐 webp 格式

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

### 图标

- 将 `myblog/themes/serene/static/icon` 复制到 `myblog/static/icon`，links 中的 icon 值为其中的 svg 文件的文件名，不包含 `.svg` 后缀

- 找到你想要的 icon 的 svg 文件，修改其宽高为 20，颜色为 `currentColor`: `... width="20" height="20" ... fill="currentColor" ...`

- 默认图标来自 [Remix Icon](https://remixicon.com/)

### 代码高亮

- 将 `myblog/themes/serene/highlight_themes` 目录复制到 `myblog/highlight_themes`

- 如果你将 `config.toml` 中的 `highlight_theme` 设置为 zola 的 [内置高亮主题](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting) 之一，浅色和深色模式都将使用该主题

- 默认情况下，serene 对亮/暗模式使用不同的主题，由 `highlight_theme`、`extra_syntaxes_and_themes` 和 `highlight_themes_css` 配置。 默认高亮主题 `serene-light` `serene-dark` 是 [Tomorrow](https://github.com/ChrisKempson/Tomorrow-Theme) 主题的一个修改版本

- 如果你想要不同的主题，找到你的主题的 `.tmTheme` TextMate文件，将其放在 `myblog/static/highlight_themes` 中，然后将 `highlight_themes_css` 的 `theme` 值修改为该文件的名称，不带` .tmTheme` 扩展名。 这将在 `myblog/static/` 中生成 `hl-light.css` 和 `hl-dark.css` 文件，你需要在修改 `theme` 值之前先删除它们，以便 zola 可以重新生成

- 你可以在[这个网站](https://tmtheme-editor.glitch.me/)上找到一些 TextMate 主题

### 强制亮色或暗色

- 默认情况下有一个主题切换按钮，你可以在 `config.toml` 中设置 `force_theme` 来强制只使用亮色或暗色模式

### RSS

- 你可以为你的站点添加 RSS，Zola 默认的 feed 文件位于站点的根目录，在 `config.toml` 设置 `generate_feeds = true` ，`feed_filenames` 可以设置为 `["atom.xml"]` 或 `["rss.xml"]` ，对应两种不同的 rss 文件标准， `myblog/content/posts/_index.md` 中设置 `generate_feeds = false`

- Serene 主题风格更像个人网站，文章在 `/posts` 目录下，你可能希望 feed 文件在 `/posts` 目录下而不是根目录下，这需要你在 `config.toml` 中设置 `generate_feeds = false`、 `feed_filenames = ["feed.xml"]` 并在 `myblog/content/posts/_index.md` 中设置 `generate_feeds = true`

- `feed.xml` 使用 `myblog/content/posts/_index.md` 中的 `title` 和 `description`，其他两个则是使用 `config.toml` 中的

### Projects 页面

- Serene 有一个 projects 页面，可以在其上展示你的项目、产品等信息

- 在 `config.toml` 中设置 `projects_page = true` ，在 `myblog/content/projects/` 下新建一个 `data.toml` ，在其中添加项目信息，格式如下, 其中 `img` 是可选项：

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

### 文章过时提示

- 如果你的某篇文章具有较强的时效性，可以设置若干天后在页面上显示一个过时提示

- `config.toml` 中的 `outdate_alert` 和 `outdate_alert_days` 设置默认的是否过时和多少天过时。是否显示过时提示以及过时天数可以在单独的一篇文章上配置，你可以将`config.toml`中的 `outdate_alert` 设置为 `false`，然后在有时效性的文章的 front matter 中单独开启

- `outdate_alert_text_before` 和 `outdate_alert_text_after` 是提示的具体内容，分别是在天数之前和之后

### 文章评论

- Serene 支持使用 [Giscus](https://giscus.app) 作为文章评论系统

- 开启此功能需要新建 `myblog/templates/_giscus_script.html` 并将在 Giscus 网站上配置好的 script 放入其中，然后将其中 `data-theme` 的值改为 `https://<your-domain-name>/giscus_light.css`, 将 `<your-domain-name>` 改为你自己的域名，和 `config.toml` 中的 `base_url` 一致，如果你设置了 `force_theme` 为 `dark`，那需要把 `giscus_light.css` 改为 `giscus_dark.css`

- `config.toml` 中的 `comment = true` 设置所有文章开启评论，可以在文章的 front matter 中 `[extra]` 下设置 `comment = false` 控制单篇文章是否显示评论

### 匿名 Reactions

- 主题支持一个叫匿名 emoji reactions 的功能，你的站点访客可以使用 emoji 对你的文章表达反馈，无需登录或注册

- 你需要设置一个后端 api 端点来启用它。端点应该处理 `GET` 和 `POST` 两种请求：

    - `Get`

      request query: `slug`，文章的 slug

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

- 方便起见，你可以使用[这个模版仓库](https://github.com/isunjn/reaction)来设置你自己的端点。你只需要一个 [Cloudflare](https://cloudflare.com) 账号，免费套餐对于低流量的个人博客来说足够了

- 设置好端点后，在 `config.toml` 将 `reaction_endpoint = "<your-endpoint>"` 和 `reaction = true` 来开启

- Giscus 也支持一个 reaction 功能，但需要访客登录 GitHub，你也可以在 giscus 的设置中关闭它

### Analytics

- 如需放置 Analytics 工具（如 Google Analytics、Umami 等）的脚本，可以新建 `myblog/templates/_head_extend.html` 并将相应内容放入其中，该文件的内容将被添加到每个页面的 html head 中

### 字体

- <del>Serene 默认使用 [Google Fonts](https://fonts.google.com/) 的 Signika 字体，</del>如需自定义字体，新建 `myblog/templates/_custom_font.html` 并将从 Google Fonts 复制的字体样式表 link 标签放入其中，然后修改 `myblog/sass/main.scss` 中的 `--main-font` 或者 `--code-font`.

- 为了进一步提高网站速度, 你也可以选择自己托管字体文件(可选):
  1. 打开 [google-webfonts-helper](https://gwfh.mranftl.com) 并选择一个字体
  2. 将步骤 3 中的 `Customize folder prefix` 改为 `/font/`, 然后复制该 css
  3. 将 `myblog/templates/_custom_font.html` 替换为一个 `<style> </style>` 标签, 把你刚复制的 css 放在里面
  4. 下载步骤 4 的字体文件, 放在 `myblog/static/font/` 目录


### 自定义 CSS

- 将 `myblog/themes/serene/templates/_custom_css.html` 复制到 `myblog/templates/_custom_css.html`, 该文件里的若干变量值用于控制样式，例如主题色 `--primary-color`，可以自行修改

- 如果你想修改更多的内容，你只需要将相应的 `themes/serene` 中 `templates`、`static`、`sass` 目录下的文件复制到 myblog 同名目录下，并进行修改。注意不要直接修改 serene 目录下的文件，因为如果更新主题，这些修改可能导致冲突

### 首页显示最近文章

- 在 `config.toml` 中设置 `recent = true`，首页将显示最近的几篇文章


## 写作

### front matter

- 文章 Markdown 文件顶部两个 `+++` 内部的内容称为 front matter，支持的配置项如下：

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
  display_tags = true
  truncate_summary = false
  featured = false
  reaction = false
  +++

  new post about something...

  <!-- more -->

  more post content...
  ```

- 你可以添加一行`<!-- more -->`, 在其前面的内容会成为文章的总结/描述, 可以设置 `truncate_summary = true` 来让其在最终的文章网页上不显示

- 设置了 `featured = true` 的文章在列表中标题前方会显示一个 `*`, 可以用来标记你“最希望读者阅读”/“最有价值”的文章

- 如果设置了文章列表按分类展示, 默认会按字母序排序, 可以在分类名前方加上 `__[0-9]{2}__` 这种形式的前缀来手动设置顺序, 例如 `categories = ["__01__Balabala"]`

- 文章文件在 `myblog/content/posts` 下创建，写完后将 draft 改为 false 即可

### Shortcodes

- Zola 支持 Shortcodes，可以在标准 Markdown 格式之外增加一些额外的样式或方便进行输入的模板

- Zola 支持一些[代码块注解](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations), Serene 通过一个 `codeblock` shortcode 额外支持了显示代码块文件名, 用法如下:

  ```md
  {% codeblock(name="path/to/file") %}
  // a markdown code block ...
  {% end %}
  ```


- 除了标准 Markdown 的 `![img](/path/to/img)` , Serene 还支持 figure shortcode，以便为图片添加一些说明性的文字，格式如下：

  ```md
  {{ figure(src="/path/to/img", alt="alt text", caption="caption text") }}
  ```

  这将在网页上显示为 HTML 中的 `<figure></figure>` ，而非 `<img>`，caption 的内容将居中显示在图像下方。alt 属性是可选的，但推荐加上，有助于增强可访问性

  为图片添加出处信息是很常见的情况，你可以直接使用 `via` 属性，这将在图片下方显示一个名为 via 的链接：

  ```md
  {{ figure(src="/path/to/img", alt="some alt text", via="https://example.com") }}
  ```

- 特殊引用，`cite` 可选：

  ```md
  {% quote(cite="") %}
  // content...
  {% end %}
  ```

- 可折叠 detail，`default_open` 可选：

  ```md
  {% detail(title="", default_open=false) %}
  // content...
  {% end %}
  ```


### Callout

- Serene 还使用 Shortcodes 实现了 Callout, 效果如示例站点的 [这个页面](https://serene-demo.pages.dev/posts/callouts) 所示，目前共有 6 种：`note` `important` `warning` `alert` `question` `tip`，格式如下，header 属性是可选的：

  ```md
  {% note(header="Note") %}
  note text
  {% end %}
  ```

- 如果读者通过 RSS 阅读你的文章，这些 Callouts 将会显示为普通的 `<blockquote>`

### 数学公式

- 在文章 front matter 中设置 `math = true` 或 `math = "katex"` 开启 [KaTeX](https://katex.org/) 公式渲染。使用 `$...$` 标记行内公式，`$$...$$` 标记块级公式。

- 设置`math = "typst"` 开启 [Typst](https://typst.app/) 公式渲染. 使用 `$...$` 标记行内公式，`$ ... $` ($内侧两端加空格)标记块级公式。

### Mermaid

- 在文章 front matter 中设置 `mermaid = true` 开启 [Mermaid](https://github.com/mermaid-js/mermaid) 支持，然后用如下格式插入图表：

  ```md
  {% mermaid() %}
  flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
  {% end %}
  ```

## 构建部署

本地预览：

```sh
zola serve
```

构建站点：

```sh
zola build
```

部署静态站点请参考 Zola [关于部署的文档](https://www.getzola.org/documentation/deployment/overview/)

## 更新

- 更新主题前请在 GitHub 上查看 [CHANGELOG.md](https://github.com/isunjn/serene/blob/main/CHANGELOG.md)  以确认是否有 breaking changes

- 如果你从 `myblog/themes/serene` 复制了一些文件到 `myblog/` 进行自定义，例如 `_custom_css.html` 或 `main.scss`，那么你应该在更新之前记录下你修改的内容，在更新后重新复制这些文件, 然后重新修改这些文件. `config.toml` 也要重新复制

- 你可以在 GitHub 上 watch（`watch > custom >releases > apply`）此项目，在有新版本时会收到提醒

```sh
git submodule update --remote themes/serene
```

<br />

如果你喜欢这个主题，欢迎 [star](https://github.com/isunjn/serene)

*Happy blogging :)*

<br />
