---
title: ZJU校巴::calculator writeup
published: 2023-11-02
slug: zju-school-bus-calculator-writeup
category: CTF
tags: [CTF, socket, Python, ZJU校巴, writeup]
---

## 题目

给了一个IP和端口，提示使用netcat连接：

```bash
nc 10.214.160.13 11002
```

连接后显示以下文本

```txt
================================================
Mom: finish these 10 super simple calculations,
     and you will get a flag
Melody: that's easy...
Mom: yep, in 10 seconds
================================================

1941304599 + 1278737850 + 446307018 + 197487298 + 305703907 + 1425271161 - 806389023 + 1991017585 - 490014616 + 1353220023 = 
```

## 分析

只有10秒的时间要完成10题，显然要编程来完成。但是先尝试一下手动输入答案，把上面的式子拷到Python REPL里，再把答案拷回去，显示“Good, next:”，并展示了下一道题目。10秒时间到，显示“Ah oh, timeout! bye now”。

```
1941304599 + 1278737850 + 446307018 + 197487298 + 305703907 + 1425271161 - 806389023 + 1991017585 - 490014616 + 1353220023 = 7642645802

Good, next:

1260408124 + 767415738 + 280455885 - 1070077818 - 646925359 - 1211049829 + 103524629 - 840188120 - 1202673923 + 1399044781 = Ah oh, timeout! bye now
```

## 实现

根据题目给的hint，使用Python socket编程完成。

```python
from socket import *
import re

with socket(AF_INET, SOCK_STREAM) as s: 
    # 创建一个socket对象，AF_INET设置使用IPv4连接，SOCK_STREAM设置使用TCP连接
    s.connect(('10.214.160.13', 11002))
    while True:
        data = s.recv(1024).decode() # 接收信息，最多1024字节
        if not data: # 若没有信息，代表连接已关闭
            break
        print(data, end='')
        if re.match(r'^[^A-z]*$', data): # 用正则表达式匹配，如果没有字母，就判断是题目部分
            res = str(eval(data.split('=')[0])) + '\n' # 使用eval计算结果，加上'\n'才能模拟手动输入的回车
            s.sendall(res.encode()) # 发送结果
            print(res)
```

写出这段代码并不难，但是我调试了很久，原因就在那个`'\n'`，多次尝试手动输入答案，服务端会给出下一题的题面，但是在脚本中使用sendall之后，并没有任何反馈，排查了各种原因，发现是因为没有回车，所以服务端视作输入还未结束，继续等待输入。

