---
title: 环境变量path是什么
published: 2023-10-01
slug: environment-variable-path
category: 操作系统
tags: [命令行, 操作系统, 环境配置]
---

## 有什么用

当你想要在命令行启动某个程序，通常你要cd进入到这个程序所在的目录，或者键入程序的完整路径。如果经常使用它，这样太繁琐了。环境变量path可以告诉命令行去哪里找程序的位置，这样，只需要键入程序名称，无需键入完整路径，就可以打开程序。

具体来说，搜索程序的顺序一般是这样的：

1. 先在当前的工作路径寻找
2. 如果未找到，在环境变量的path中寻找
3. 如果仍未找到，报错

## 举个例子

假如我们用C语言写了一个简单的加法计算器

```c
// /root/myCommands/calculator.cpp
#include<stdio.h>

int main(int argc, char *argv[]) {
    int ans = 0, tmp, i;
    for (i = 1; i < argc; ++i) {
        sscanf(argv[i], "%d", &tmp);
        ans += tmp;
    }
    printf("%d\n", ans);
    return 0;
}
```

编译运行它

```bash
gcc calculator.c -o calculator
./calculator 114 514
# 628
```

很好，但是如果我们换个路径呢

```bash
cd /
./calculator 114 514
# ./calculator: No such file or directory
```

这是当然的，因为根目录下并没有calculator

如果要调用它，而不改变工作目录，必须写出完整路径。

```bash
/root/myCommands/calculator 114 514
# 628
```

每次都要键入这么长的路径，确实不太方便，因此还是使用环境变量path简化操作吧！

## 怎么修改

### linux系统

linux系统下使用`echo $PATH`即可输出环境变量path。

修改path分为临时、用户级、系统级三种：

1. `export PATH=$PATH:/root/myCommands/`这样可以临时地改变`$PATH`，这里是添加了新的路径在原本那些路径的后面，如果要覆盖旧的路径（不建议这么做），就使用`export PATH=/root/myCommands/`
2. 把上面临时输入的命令写到“~/.profile”就可以为当前用户修改`$PATH`
3. 把上面临时输入的命令写到“/etc/profile”就可以为所有用户修改`$PATH`

### windows系统

Windows系统下按Win+R，输入“sysdm.cpl”，在弹出的窗口选择“高级”，点击右下角的“环境变量”，在上方的“用户变量”（对当前用户起作用）或者下方的“系统变量”（对所有用户起作用）里找到“path”，点击编辑，就可以看到所有的环境变量，并且可以编辑已有的路径，或者添加新的路径。

## 让我们回到刚刚的例子

```bash
pwd
# /
export PATH=$PATH:/root/myCommands/
calculator 114 514
# 628
```

不仅不用输入前面的路径，现在连`./`也不用输入了
