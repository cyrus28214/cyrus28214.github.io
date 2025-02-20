---
title: XPath语法参考
published: 2023-10-09 13:51:34
slug: xpath-syntax-reference
category: 开发
tags: [XPath, 参考, 爬虫, 前端, 开发]
---

## 简介

XPath代表XML路径语言（XML path language），当然，XPath也是可以用于HTML的。

XPath可以用类似路径的写法，识别和导航XML中的元素。

比如写爬虫的时候，需要解析HTML，就可以用XPath方便的导航到你想找到的元素。

*另外，我发现 Chrome 的 Dev Tools 有很方便的功能，就是你可以在“Elements”一栏里右键某个元素，并选择“Copy > Copy XPath”就可以很方便地获得元素的XPath*

下面是一些XPath常用的语法，记录在这里用作参考。

## 选择元素

|表达式|说明|
|---|---|
|name|选择所有名字为“name”的元素|
|/|从根节点开始选择，类似Linux中的绝对路径|
|//|选择所有后代（孩子、孩子的孩子等等）|
|.|相当于Linux中的相对路径，从当前元素开始选择|
|..|和Linux中的路径相同，选择父元素|
|@|选择属性|
|[n]|选择第n个元素，注意下标从1开始|
|[last()]|选择最后一个元素|
|[last()-n]|选择最后n个元素|
|[position()<=n]|选择前n个元素|
|[@name]|选择拥有名为“name”的属性的元素|
|[@name='value']|选择“name”属性为'value'的元素|
|[@name>n]|选择“name”属性大于n的元素|
|*|通配符，匹配任何元素|
|@*|匹配任何属性|
|node()|匹配元素和属性|
|A\|B|选择两个XPath的并|

## 运算符

XPath还支持很多运算符，这些运算符都和我们常见的用法一样，有：

`+`、`-`、`*`、`=`、`!=`、`<`、`>`、`<=`、`>=`、`or`、`and`、`mod`。

但是要注意除法是用`div`表示，因为`/`已经用来表示路径了。

## XPath轴（XPath axes）

XPath轴用来选取和匹配节点在树上满足某种关系的节点，使用的时候需要以这种格式使用：

`axisname::nodetest[predicate]`

轴有以下几种：

|轴名称|说明|
|---|---|
|ancestor|选择所有祖先|
|ancestor-or-self|选择祖先和自身|
|attribute|选择所有属性|
|child|选择所有孩子|
|descendant|选择所有后代（孩子、孩子的孩子等等）|
|descendant-or-self|选择所有后代和自身|
|following|选择所有在自身之后的节点|
|following-sibling|选择所有在自身之后的兄弟|
|namespace|选择当前节点的所有命名空间|
|parent|选择父节点|
|preceding|选择所有在自身之前的节点|
|preceding-sibling|选择所有在自身之前的兄弟|
|self|选择自身|

比如 `parent::script[@class="footer"]` 会选择所有 `class` 为 `footer` 的 `<script>` 标签的父元素

本参考取自[https://www.w3schools.com/xml/xpath_intro.asp](https://www.w3schools.com/xml/xpath_intro.asp)（有修改）
