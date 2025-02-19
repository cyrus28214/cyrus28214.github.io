---
title: Linux中的三种时间戳：atime、mtime、ctime
published: 2023-11-07
slug: linux-file-timestamps
category: 操作系统
tags: [Linux, 时间戳, 文件系统]
---

标准的 POSIX 文件有三个时间戳：

|简称|全称|含义|
|---|---|---|
|atime|access timestamp|最后一次读取的时间|
|mtime|modification timestamp|最后一次写入的时间戳|
|ctime|status change timestamp|最后一次更改文件元信息的时间戳|

这里面的atime和mtime很好理解，分别对应了读取和写入文件，但是ctime就比较不好理解了。

文件元信息是关于文件本身的信息，比如文件的大小、权限许可、所有者这些，不在文件的内容里的信息。比如修改文件的访问权限的时候，atime和mtime都不会改变，但是ctime会改变。

要查看文件的元信息，包括（atime、mtime、ctime）可以使用`stat`。

```txt
cyrus:~$ touch new_file
cyrus:~$ stat new_file
  File: new_file
  Size: 0               Blocks: 0          IO Block: 4096   regular empty file
Device: 820h/2080d      Inode: 67376       Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/   cyrus)   Gid: ( 1000/   cyrus)
Access: 2023-11-02 20:57:28.696325828 +0800
Modify: 2023-11-02 20:57:28.696325828 +0800
Change: 2023-11-02 20:57:28.696325828 +0800
 Birth: 2023-11-02 20:57:28.696325828 +0800
```

## 参考链接

[https://www.gnu.org/software/coreutils/manual/html_node/File-timestamps.html](https://www.gnu.org/software/coreutils/manual/html_node/File-timestamps.html)