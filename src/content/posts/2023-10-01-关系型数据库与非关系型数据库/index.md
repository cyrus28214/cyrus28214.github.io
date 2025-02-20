---
title: 关系型数据库与非关系型数据库
published: 2023-10-01 21:31:42
slug: relation-database-and-nosql-database
category: 数据库
tags: [数据库]
---

关系型数据库（Relational Database）与非关系型数据库（NoSQL Database）有什么区别呢？请看下面的表格。

||关系型数据库|非关系型数据库|
|---|---|---|
|数据结构|数据库表|不固定，如键值对（Key-Value）等|
|可扩展性|横向扩展较为困难，需要增加外部关联数据表|具有高度可扩展性|
|查询语言|SQL|通常具有自己的查询语言，没有SQL那样标准化|
| *ACID* |支持恢复、回滚、并发控制等|难以保证数据的完整性和安全性|

*ACID: 原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）*

简单来说，关系型数据库就像Excel表格，非关系型数据库就像.json文件（当使用键值对数据结构时）。

关系型数据库更成熟稳定，非关系型数据库更灵活易扩展。
