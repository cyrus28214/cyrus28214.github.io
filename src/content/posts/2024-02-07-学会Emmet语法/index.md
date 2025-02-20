---
title: 学会Emmet语法，告别手打HTML和CSS
published: 2024-02-07 18:50:44
slug: learn-emmet-syntax
image: ./emmet.gif
category: 开发
tags: [前端, HTML, CSS, Emmet]
---


## 前言

有时候，写前端代码更像是一种体力活。在前端的世界，你经常需要写出重复嵌套的HTML元素，冗长的CSS样式。俗话说：**不会偷懒的程序员不是好程序员**，如果你还在手写HTML和CSS代码，那你必须要知道Emmet，这个可以显著加快你的代码速度的插件。

## 介绍

Emmet是一个可以极大加速web开发工作流的工具。Emmet为HTML/XML和CSS设计了一套便于记忆和使用的缩写，你只需要键入这些缩写，就可以自动展开成相应的代码。

![用Emmet展开缩写示例](./emmet.gif)

## 安装

Emmet支持几乎所有的编辑器。包括VSCode、Sublime、Atom、WebStorm、Vim、Emacs等等。

如果你是用的是宇宙第一编辑器——VSCode，那么你不需要做任何事，因为VSCode默认集成了Emmet，不需要安装任何VSCode扩展。Emmet功能会在`html`、`xml`、`css`、`sass`、`php`等类型的文件中启用。详见[https://code.visualstudio.com/docs/editor/emmet#_how-to-expand-emmet-abbreviations-and-snippets](https://code.visualstudio.com/docs/editor/emmet#_how-to-expand-emmet-abbreviations-and-snippets)

如果你是其他编辑器的用户，这里可以查看完整的支持列表，以及他们的安装方式[https://emmet.io/download/](https://emmet.io/download/)

## HTML

## HTML框架

只需输入一个`!`，就可以生成完整的HTML页面框架：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

可以根据需要修改和添加内容。

### 标签

键入标签名，按下<kbd>Tab</kbd>就可以生成闭合的一对标签。

例如`div`->`<div></div>`、`button`->`<button></button>`

除此之外，有一些元素有自己的缩写，比如说`ifr`->`iframe`、`src`->`source`等

### `>`元素嵌套

使用`>`可以进行元素嵌套。

```txt
div>ul>li
```

按下<kbd>Tab</kbd>会展开成

```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

### `+`创造兄弟节点

`+`可以创造兄弟节点，如

```txt
nav>em+div>span+button
```

会展开成

```html
<nav>
    <em></em>
    <div><span></span><button></button></div>
</nav>
```

### `^`回到上一层级

`^`可以回到上一层，如

```txt
nav>em+div>span+div>div^^button
```txt

会展开成

```html
<nav>
    <em></em>
    <div>
        <span></span>
        <div>
            <div></div>
        </div>
    </div>
    <button></button>
</nav>
```

### `*`重复元素

如`ol>li*5`会生成

```html
<ol>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ol>
```

### `()`分组

用括号可以给元素分组，搭配`+`和`*`很好用

```txt
div>(header>ul>li*2>a)+footer>p
```

会变成

```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

而`(div>img)*5`会变成

```html
<div><img src="" alt=""></div>
<div><img src="" alt=""></div>
<div><img src="" alt=""></div>
<div><img src="" alt=""></div>
<div><img src="" alt=""></div>
```

### 添加ID、class和属性

添加ID、class和属性的语法和CSS选择器类似

```txt
div#header+div.page+td[title="Hello world!" colspan=3]
```

将展开成

```html
<div id="header"></div>
<div class="page"></div>
<td title="Hello world!" colspan="3"></td>
```

### `$`自动标注序号

代码中插入`$`的部分将自动编号，如

```txt
ul>li.item$*5
```

将生成

```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

如果使用多个`$`，编号就会有前导零

```html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

使用`@N`可以指定编号从`N`开始，

```txt
ul>li.item$$
7*5
```

```html
<ul>
    <li class="item07"></li>
    <li class="item08"></li>
    <li class="item09"></li>
    <li class="item10"></li>
    <li class="item11"></li>
</ul>
```

使用`@-`可以指定编号为倒序

```txt
ul>li.item$$
-*5
```

```html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

二者也可以结合使用

```txt
ul>li.item$@-7*5
```

```html
<ul>
    <li class="item11"></li>
    <li class="item10"></li>
    <li class="item9"></li>
    <li class="item8"></li>
    <li class="item7"></li>
</ul>
```

### `{}`标签内容

用`{}`可以添加标签内容

```txt
a[href=https://cyrus28214.top]{点我}
```

将生成

```html
<a href="https://cyrus28214.top">点我</a>
```

### 省略标签名

如果打的字还想再少一点，可以使用隐式的标签名，Emmet会根据当前环境（如在什么元素内）来智能选择标签名，如下表

|上下文|自动选择|例子|相当于|
|---|---|---|---|
|行内环境|`span`|`em>.info`|`em>span.info`|
|`ul`、`ol`|`li`|`ul>.item*5`|`ul>li.item*5`|
|`table`、`tbody`、`tfoot`|`tr`|`table>`|`ul>li.item*5`|
|`tr`|`td`|`tr>[colspan=2]`|`tr>td[colspan=2]`|
|`select`、`optgrouop`|`option`|`select>#opt$*5`|`select>option#opt$*5`|
|其他|`div`|`.content`|`div.content`|

### 生成“Lorem Ipsum”

学习前端的朋友们应该都很熟悉“Lorem Ipsum”，这段文本被大量用于各种示例网站的文本填充中。

在Emmet里，可以用`lorem`生成一段示例文本，如`p*4>lorem`会展开成

```html
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos unde neque placeat ipsam sed, vero officiis nobis ratione atque possimus quidem laudantium, quia impedit quas maiores maxime reprehenderit esse ut.</p>
<p>Nesciunt, distinctio ab nisi quidem quibusdam quaerat quam fuga corporis excepturi asperiores velit, aspernatur voluptatum, aliquid debitis quo veniam ducimus ut inventore deserunt saepe incidunt laborum dolore iusto. Asperiores, atque!</p>
<p>Ullam porro excepturi dolorum doloribus. Ea vero odit aliquid pariatur veniam ipsam obcaecati accusamus doloribus eum suscipit quos autem aperiam omnis, ducimus cum, alias molestiae nisi voluptatum harum, cumque illo?</p>
<p>Dolores ipsa repellat voluptates porro inventore praesentium cupiditate soluta sed amet, voluptate sequi iste sint eveniet vitae explicabo et ut nesciunt nam placeat harum officiis nulla ducimus excepturi? Debitis, minima.</p>
```

## CSS

Emmet使用模糊搜索来确定CSS缩写，所以你可以自己摸索一个常用写法的缩写怎么写合适。

一些常见的属性缩写例子：`m1`->`margin: 1px;`、`p2r`->`padding: 2rem;`

因为是模糊搜索，所以语法很灵活，想要写成`m:1`和`p-2r`也可以达到一样的效果。甚至，想要写`overflow: hidden;`只需要打`oh`，真是解放程序员的救星hhh。

`px`是默认的单位，这里，`m1`会变成`1px`，要指定其他单位，至少要加一个字母上去。

但是也有一些属性是没有单位的，比如说`z-index`，Emmet很智能，`z1`会展开成`z-index: 1;`

### 多个值的属性

多个值的属性可以用`-`隔开，`m1-1`->`maargin: 1px 1px;`

如果属性有负数，就再加一个`-`，如`m-10--20`->`margin: -10px -20px;`

### 颜色值

长度不够的颜色值会自动重复，如：

- `#1` → `#111111`
- `#e0` → `#e0e0e0`
- `#fc0` → `#ffcc00`

### !important

只要打`!`就够了，`p!+m10e!`将生成

```css
padding:  !important;
margin: 10em !important;
```

## 行为（Action）

Emmet除了缩写的展开，还支持一些行为（Action），比如转到匹配的标签、将数字增加1、计算数学表达式等等，可以在官网查看详细地使用说明。如果你使用VSCode，按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>并输入“Emmet”就可以查看所有action。

### 注意事项

请注意，任何Emmet语法都不能加空格，因为Emmet把空格作为结束符

## 参考链接

[https://docs.emmet.io/](https://docs.emmet.io/)
[https://docs.emmet.io/cheat-sheet/](https://docs.emmet.io/cheat-sheet/)
