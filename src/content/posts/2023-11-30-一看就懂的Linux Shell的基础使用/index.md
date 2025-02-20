---
title: 一看就懂的Linux Shell的基础使用
published: 2023-11-30 18:53:59
slug: linux-shell-basic-usage
category: 运维
tags: [Shell, MIT Missing Semester, Linux, Bash]
---

## 前言

最近在学习MIT的“计算机科学教育中缺失的一课（The Missing Semester of Your CS Education）”，这篇博客既是shell常用命令的备忘，也是这门课程的学习笔记。

## shell

shell是操作系统为用户提供交互界面的命令行解释器的统称，例如Windows中的cmd就是一种shell。Bash 是其中最流行的一种。Bash 是 Bourne Again shell 的简称，其他的shell还有：zsh、fish、csh等。

你需要使用一个类Unix shell来完成文中所提到的操作。你可以：

- 使用安装了Linux的电脑
- 使用Linux虚拟机
- 使用[WSL(Windows Subsystem for Linux)](https://docs.microsoft.com/zh-cn/windows/wsl/)。

## 使用shell

进入shell，可以看到这样的一行提示：

```txt
cyrus:~$
```

- `cyrus`代表当前用户的用户名，也可以使用`echo $USER`来查看；
- `~`代表当前所在路径，也可以使用`pwd`来查看；
- `$`是命令提示符，提示用户现在可以输入命令了。

`~`是表示用户的家目录，非root用户的`~`代表`/home/$USER/`，而root用户的`~`代表`/root`。

直接输入一个程序的名称就可以运行，例如，Linux中有一个程序叫做`date`，直接输入程序的名字，就可以运行它，这个程序将输出当前的时间：

```txt
cyrus:~$ date
Wed Nov  1 14:07:54 CST 2023
```

程序可以附加参数，例如：

```txt
cyrus:~$ echo hello
hello

```

这里的“hello”，就是传给程序`echo`的参数。`echo`程序的功能就是输出它的参数。参数和程序名、参数与参数之间都要使用空格隔开。如果参数里包含空格，可以用`'`或`"`将参数包裹起来，或者在空格前面加上一个反斜杠转义（如`My\ Photos`会被转义成`My Photos`）

shell怎么知道这些程序在哪里呢？其实shell会在`$PATH`里面的路径寻找。这里的`$PATH`和上面的`$USER`都是shell中的变量，`$`表示引用变量，提示shell把`$变量名`替换成变量的值。`$PATH`储存了多个路径，用“:”隔开，提示了shell去哪里找这个程序。你也可以使用`which`来查找某一个程序的具体位置。输入程序的完整路径，也可以绕过`$PATH`运行程序。

**想要了解更多关于PATH的内容可以查看我的[另一篇博客](/posts/environment-variable-path/)**

```txt
cyrus:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
cyrus:~$ which echo
/bin/echo
cyrus:~$ /bin/echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

## 路径、`pwd`、`cd`

在Linux和MacOS中，路径使用`/`分隔，而在Windows中是`\`。在Linux和MacOS中，路径从`/`开始，代表根目录（包含了所有目录）；在Windows中，路径从盘符开始，如`C:\`。

以`/`开头的路径叫绝对路径，否则就是相对路径。`pwd`（print working directory的缩写）可以显示当前所在的绝对路径，`cd`（change directory的缩写）可以改变当前所在路径。

`.`代表当前所在目录，`..`代表父目录。

```txt
cyrus:~$ pwd
/home/cyrus
cyrus:~$ cd /home
cyrus:/home$ pwd
/home
cyrus:/home$ cd ..
cyrus:/$ pwd
/
cyrus:/$ cd ./home
cyrus:/home$ pwd
/home
```

注意输入cd命令后，“cyrus:”后面的路径改变了。

输入`cd -`可以移动到上次所在的目录，相当于`cd $OLDPWD`，非常方便。

```txt
cyrus:/$ cd ~
cyrus:~$ pwd
/home/cyrus
cyrus:~$ echo $OLDPWD
/
cyrus:~$ cd -
/
cyrus:/$ pwd
/
```

## 常用的快捷键

### 最常用的两个

- 在shell中输入路径时，可以按Tab来自动补全文件名。
- 在shell中按↑/↓方向键，可以浏览历史命令。

### 也很重要的其他

- Ctrl + A 可以跳转到行首（助记：a是第一个字母，所以是行首）
- Ctrl + E 可以跳转到行尾（助记：e -> end）
- Ctrl + R 打开历史命令搜索，可以搜索之前使用过的指令，**非常好用**
- Ctrl + L 清屏，和使用 `clear` 命令效果相同
- Ctrl + C 强行终止当前程序

## `ls`

`ls`（list的缩写）可以列出当前目录下有什么：

```txt
cyrus:/$ ls
bin
boot
dev
etc
home
...
```

绝大多数程序都可以接受以`-`开头的参数来改变程序的行为。例如，`-h`或`--help`一般会输出程序的帮助文本，如：

```txt
cyrus:/$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.
...
```

*显示`ls`的帮助只能使用`--help`而不能使用`-h`，因为`-h`已经被其他功能占用了*

其中有一行

```txt
  -l                         use a long listing format
```

根据这个内容，我们给`ls`命令附加上`-l`参数，有：

```txt
cyrus:/home$ ls -l
drwxr-x--- 20 cyrus cyrus 4096 Oct 26 19:09 cyrus
```

`-l`参数非常有用，可以列出详细信息。

第一列的第一个字符是`d`代表这是一个文件夹，下面列出了可能的类型：

|标识符|类型|英文|
|---|---|---|
|–|常规文件|regular file|
|d|文件目录|directory|
|c|字符设备文件|character device file|
|b|块设备文件|block device file|
|s|本地socket文件|local socket file|
|p|命名管道|named pipe|
|l| [符号链接](/posts/linux-inode-and-soft-and-hard-links/) |symbolic link|

然后是九个字符描述了使用此文件的权限，三个字符为一组分成三组，分别表示文件持有者、文件持有组、和其他用户的权限。每组的三个字符中，`r`、`w`、`x`分别代表read读、write写、execute执行权限，`-`代表没有权限。

例如`rwxr-xr--`代表文件持有者可以读、写、运行此文件，文件持有组可以读、运行此文件，其他用户只能读此文件。

第二列是有多少“ [硬链接](/posts/linux-inode-and-soft-and-hard-links/) ”指向这个文件。

第三列和第四列，分别是文件持有者和文件持有组的名称

第五列是文件大小，默认以byte为单位，如果想要显示成“8M”,“13K”这种形式，只需要为`ls`命令附加上`-h`参数。

第六列就是文件的修改时间，即[mtime](/posts/linux-file-timestamps/)。

最后一列就是文件名

## `man`

`man`可以显示一个命令的详细帮助文档，输入`man ls`，会显示比`ls --help`更加详细的命令使用帮助。

## `<`、`>`、`>>`、`|`

"< 文件"可以使用文件作为程序的输入，"> 文件"可以将程序的输出保存到文件中（不存在就会被创建）

```txt
cyrus:~$ echo hello > hello.txt
cyrus:~$ cat hello.txt
hello
cyrus:~$ cat < hello.txt
hello
cyrus:~$ cat < hello.txt > hello2.txt
cyrus:~$ cat hello2.txt
hello
```

上面`cat`的作用是将文件的内容展示到命令行输出。

“>”会覆盖原来存在的文件，如果文件不存在，会创建一个新文件并写入。

如果不想原来存在的文件被覆盖，而是想将新的内容加在文件末尾，可以使用“>>”

“|”长得像一个管道，它的作用就是像管道一样连接两个程序的输入与输出，它会把前面的程序的输出作为后面的程序的输入。

```txt
cyrus:~$ ls -l / | tail -n1
drwxr-xr-x  13 root root    4096 May  2  2023 var
```

这里的`tail -n1`表示将取输入的最后一行并输出。

## `touch`、`mkdir`、`mv`、`cp`、`rm`

`touch 文件名`有两个作用：

- 若文件不存在，创建这个文件
- 若文件存在，将文件的[atime](/post/cccf6f3d6d50/)和[mtime](/post/cccf6f3d6d50/)设置为现在的时间。

`mkdir 目录名`（make directory）可以创建新的文件夹，例：

```txt
cyrus:~$ mkdir new_dir
cyrus:~$ ls -l
...
drwxr-xr-x 2 cyrus cyrus 4096 Nov  1 15:55 new_dir
...
```

`mv 源 目标`（move），可以用来移动文件/文件夹，也可以用来重命名文件/文件夹。

根据“源”和“目标”的不同，`mv`会做出以下不同的行为：

- 移动：如果目标是一个存在的路径，则源会被移动到此目录下，名称不变。
- 重命名：否则，则源文件名会变为此目标文件名，如果存在同名文件，则会覆盖己存在的同名文件。

`cp`（copy）的使用和`mv`很像，会在目标目录下生成一个副本，如果需要复制一个文件夹，需要附加`-r`参数（recursive 递归的缩写），来递归地拷贝文件夹下所有文件。

`rm 目标`（remove）可以删除文件或目录，如果要删除的是一个目录，也需要附加`-r`参数，来执行递归地删除。默认情况下，`rm`命令需要你逐个确认你是否确定删除这个文件，附加`-f`参数可以无需再次确认， **使用`-f`时请保证你真的要删除，没有再次确定的机会了**

## `#`

`#`表示注释，`#`后的文本会被忽略。

```txt
cyrus:~$ echo hello
hello
cyrus:~$ echo #hello

cyrus:~$ touch hello
cyrus:~$ touch #hello
touch: missing file operand
Try 'touch --help' for more information.
```

## `\`、`'`、`"`

在shell中，有一些字符不能直接作为参数的一部分传递，例如`!`、`$`、空格、`#`、`\`。

使用反斜杠`\`可以转义单个字符，使其正常输出：

```txt
cyrus:~$ echo hello$world
hello
cyrus:~$ echo hello\$world
hello$world
cyrus:~$ echo hello     world
hello world
cyrus:~$ echo hello\ \ \ \ \ world
hello     world
cyrus:~$ echo hello\world
helloworld
cyrus:~$ echo hello\\world
hello\world
```

使用单引号`'`括起来，可以让字符串原样输出，不进行转义和替换

```txt
cyrus:~$ echo 'hello\\world'
hello\\world
```

使用双引号`"`括起来的字符串仍然会被转义，参见[Quoting](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)。

```txt
cyrus:~$ echo '$SHELL'
$SHELL
cyrus:~$ echo "$SHELL"
/bin/bash
cyrus:~$ echo "hello world"
hello world
```

## `sudo`

Linux系统中有一个用户的身份是特殊的，那就是 root 用户，root用户拥有最高的权限，可以做几乎任何事情，直接登录到root用户是很危险的，因为你可能一不小心就利用root权限做出了一些破环性的操作（例如：误删除数据、全局修改了关键系统设置），因此，常常使用`sudo 命令`（意思是 do as superuser），来使用超级用户权限执行命令，这样可以让你能再次确认你的操作无误。

当你输入一个命令，发现命令行输出了“Permission denied”，很可能就是你没有合适的权限执行这个命令，只要在原命令前加上`sudo`就可以解决。

第一次`sudo`时，会输出一段这样的提示：

```txt
We trust you have received the usual lecture from the local System
Administrator. It usually boils down to these three things:

    #1) Respect the privacy of others.
    #2) Think before you type.
    #3) With great power comes great responsibility.
```

翻译如下：

```txt
我们确信您已经收到了本地系统管理员的例行讲解。
通常可以归结为以下三点：

    #1) 尊重他人隐私。
    #2) 打字前先思考。
    #3) 权力越大，责任越大。
```

“With great power comes great responsibility.”，使用root权限时要时刻提醒自己，谨慎对待每一个命令。

下面有一个来自 MIT Missing Semester 的例子，指出了使用`sudo`的一个常见误区：

>例如，您笔记本电脑的屏幕亮度写在 `brightness` 文件中，它位于
>
>```txt
>/sys/class/backlight
>```
>
>通过将数值写入该文件，我们可以改变屏幕的亮度。现在，蹦到您脑袋里的第一个想法可能是：
>
>```txt
>$ sudo find -L /sys/class/backlight -maxdepth 2 -name '*brightness*'
>/sys/class/backlight/thinkpad_screen/brightness
>$ cd /sys/class/backlight/thinkpad_screen
>$ sudo echo 3 > brightness
>An error occurred while redirecting file 'brightness'
>open: Permission denied
>```
>
>出乎意料的是，我们还是得到了一个错误信息。毕竟，我们已经使用了 `sudo` 命令！关于 shell，有件事我们必须要知道。`|`、`>`、和 `<` 是通过 shell 执行的，而不是被各个程序单独执行。 `echo` 等程序并不知道 `|` 的存在，它们只知道从自己的输入输出流中进行读写。 对于上面这种情况， shell (权限为您的当前用户) 在设置 `sudo echo` 前尝试打开 brightness 文件并写入，但是系统拒绝了 shell 的操作因为此时 shell 不是根用户。
>
>明白这一点后，我们可以这样操作：
>
>```txt
>echo 3 | sudo tee brightness
>```
>
>因为打开 /sys 文件的是 tee 这个程序，并且该程序以 root 权限在运行，因此操作可以进行。 这样您就可以在 /sys 中愉快地玩耍了，例如修改系统中各种LED的状态（路径可能会有所不同）：
>
>```txt
>echo 1 | sudo tee /sys/class/leds/input6::scrolllock/brightness
>```

## `chmod`

前面我们提到了文件的三种权限`rwx`，使用`chmod`可以调整这些权限。

chmod可以使用两种语法，字符串语法和数字语法。

### 字符串语法

- 用`ugoa`四个字母表示设置哪些人的权限
- 用`+-=`三个字母表示如何改变权限
- 用`rwx`表示什么权限

|符号|含义|
|---|---|
|u|user，文件的拥有者|
|g|group，文件拥有者所在的组的其他人|
|o|others，除了ug的其他人|
|a|all，所有人|
|+|添加权限|
|-|减少权限|
|=|设置权限|
|r|read，读取|
|w|write，写入|
|x|execute，执行|

例如：

`chmod ug+rw file`表示文件拥有者所在的组的所有人添加读取和写入file的权限。

`chmod a-w file`表示所有人都不能写入file。

`chmod ug=rwx,o=x file`表示文件拥有者所在的组的所有人都可以读、写、运行file，其他人只能运行file

### 八进制数字语法

一共有三种权限`rwx`，$2^3=8$，可以使用8个数字来表示某种人的权限，权限又分为针对三种人`ugo`，于是，一个文件的权限可以用三个0-7的数字表示。

`rwx`三种权限从高位到低位可以组成一个三位二进制数，`0`代表没有这种权限，`1`代表有，再将这个二进制数转化成八进制（或者十进制，在这里结果是一样的），就得到了对应的数字，下面列出了0-7对应的权限：

|八进制|二进制|权限|
|---|---|---|
|0|000|---|
|1|001|--x|
|2|010|-w-|
|3|011|-wx|
|4|100|r--|
|5|101|r-x|
|6|110|rw-|
|7|111|rwx|

例如：

- `chmod 777 file`代表所有人都有file的所有权限

- `chmod 755 file`代表file的权限是`rwxr-xr-x`
755是创建新文件夹的默认权限

- `chmod 644 file`代表file的权限是`rw-r--r--`
644是创建新文件的默认权限

使用数字来设置权限，可以仅仅用三个字符就设置好每一个权限，非常方便快捷。

## 脚本

bash不仅可以直接输入到命令行执行，也可以作为一种脚本语言。作为一种脚本语言，Bash也拥有变量、分支语句、循环语句等。

可以在某个文件里写bash脚本，然后运行它，不必每次都在命令行里输入。将以下代码保存到`hello.sh`里，`.sh`后缀代表这是一个bash脚本，当然，使用其他后缀也不影响脚本正常运行。

```bash
#!/bin/bash
echo "Hello World!"
```

文件的第一行是`#!/bin/bash`，以`#`开始的内容是注释，意味着不会被运行。但是在文件的最开始，以`#!`开头的注释有个特别的名字，它被称作“shebang”，可以提示系统，使用什么程序来解析下面的代码。这里的`#!/bin/bash`，告诉操作系统使用`/bin/bash`解释下面的代码，也可以写作`#!/bin/sh`，因为`/bin/sh`是一个指向`bin/bash`的软链接。

在执行之前，请先向这个文件添加执行的权限，因为Linux默认的新文件权限是`644`，即`rw-r--r--`，任何人都无法执行。使用`chmod +x hello.sh`来添加执行权限。

然后，有两种方式可以运行脚本，第一种是输入`./hello.sh`，这里不能写成`hello.sh`，因为对于这样的命令，Linux会在PATH变量中查找，而不从当前文件夹中查找。这种方式没有指定运行脚本的解释器，因此系统会读取Shebang，然后使用`/bin/bash`解释代码

第二种方式就是指定解释器，将文件作为参数传入，输入`sh hello.sh`，就可以看到一行`Hello World!`。这种情况显式指定了使用`sh`解释运行，因此shebang不会生效

## 变量

在bash中，给变量赋值使用`foo=bar`，**请注意，这里的等号前后不能加上任何空格**，这是因为bash脚本会用空格来分割命令和命令的参数，如果输入`foo = bar`，解释器会调用`foo`命令，并传递`=`和`bar`

在上一节中已经提到过了，bash中的字符串使用`'`或`"`包裹，但这两个记号的含义并不相同，前者会保留原始字符串，而后者会进行转义。

```bash
cyrus:~$ foo=bar
cyrus:~$ echo "$foo"
bar
cyrus:~$ echo '$foo'
$foo
```

这里的`$`代表引用相应的变量，但是在`'`字符串内部并不会生效。

引用变量也可以写成`${foo}`，和`$foo`并无不同，但是`${foo}`的写法可以更精确地界定变量名的范围，防止歧义。

## 数组

bash也支持定义数组，下标和其他大多数编程语言一样是从0开始的

```txt
cyrus:~$ array=(a o e i u)
cyrus:~$ echo ${array[2]}
e
```

## `(())`

bash为了方便作为命令行使用，变量都是字符串类型的，因此命令`foo=1+1`只会将字符串`1+1`赋值给`foo`，而不会计算出`2`，要进行数学运算，应使用`(())`双括号包裹，在双括号里引用变量是不需要加`$`的。

```txt
cyrus:~$ foo=1+1
cyrus:~$ echo $foo
1+1
cyrus:~$ echo $((1+2))
3
cyrus:~$ foo=$((1+2))
cyrus:~$ echo $foo
3
cyrus:~$ ((foo=1+3))
cyrus:~$ echo $foo
4
cyrue:~$ echo $((foo*2))
8
```

可以使用的运算和C语言的语法是一致的：`+`、`-`、`*`、`/`（注意是**整除**，不支持小数）、`%`、`=`（、`==`、`!=`、`<`、`>`、`foo++`、`++foo`、`foo--`、`--foo`、`!`、`||`、`&&`、`~`、`|`、`&`、`<<`、`>>`、

另外还有一个符号`#`，可以用来进制转换

```txt
cyrus:~$ echo $((8#123))
83
cyrus:~$ echo $((16#abc))
2748
```

两条命令分别计算出了 $(123)_8$ 和 $(abc)_{16}$ 的10进制表示。

### `[]`

还有一个语法是`[ 表达式 ]`，但实际上这么说并不准确，因为这其实不是一个语法，`[`是一个程序的名字，可以试着运行`which [`，会发现`[`其实是放在`/usr/bin/[`的一个程序，它的运行效果和命令`test`是一样的，具体使用细节可以输入`man [`查询。

`[`是一个程序，而`]`只不过是传入的最后一个参数罢了（这个参数是必须的，否则会报错）。正因如此，必须写成`[ 表达式 ]`，而不是`[表达式]`。即**表达式前后必须加空格**

|表达式|含义|
|---|---|
|!表达式|逻辑非|
|表达式 -a 表达式|逻辑且 And|
|表达式 -o 表达式|逻辑或 Or|
|-n 字符串|字符串长度非0 Non-zero|
|-z 字符串|字符串长度为0 Zero|
|字符串 = 字符串|字符串相等|
|字符串 != 字符串|字符串不相等|
|字符串 \> 字符串|字符串大于，需要转义，写成`\>`而不是`>`|
|字符串 \< 字符串|字符串小于，同样需要转义，因为`<`、`>`都有特殊含义|
|\( 表达式 \)|就是括号的意思，表达式分组|
|整数 -eq 整数|整数相等 EQual to|
|整数 -ge 整数|整数大于等于 Greater than or Equal to|
|整数 -gt 整数|整数大于 Greater Than|
|整数 -le 整数|整数小于等于 Less than or Equal to|
|整数 -lt 整数|整数小于 Less Than|
|整数 -nq 整数|整数小于 Not Equal to|
|-f 文件|文件存在，并且类型为常规文件|
|-d 文件|文件存在，并且类型为目录|

更多用法请输入`man [`或`man test`查看帮助文档。

还有一个指令是双方括号`[[ 表达式 ]]`，双方括号除了支持以上特性，还支持了更多高级的特性，例如`<`、`>`、`(`、`)`不需要转义等。双方括号表达式不支持所有POSIX系统，但是大多数时候都是可用的，为了避免犯错，建议使用双方括号表达式。

## 定义函数

在bash中定义一个函数，它的作用是创建一个文件夹并进入，可以这样写：

```bash
mcd () {
    mkdir -p "$1"
    cd "$1"
}
```

这里的`$1`是一个特殊的变量，代表传入的第一个参数，例如我们定义以上函数后，输入`mcd example`，就会有以下效果：

```bash
cyrus:~$ mcd () {
    mkdir -p "$1"
    cd "$1"
}
cyrus:~$ mcd example
cyrus:~/example$
```

像这样的特殊变量还有很多，以下是常用的一些：

- `$0`：脚本名
- `$1`到`$9`：脚本的参数。`$1`是第一个参数，依此类推，超过第9个时，应该加上大括号，如`${14}`是第14个参数。
- `$@`：所有参数
- `$#`：参数个数
- `$?`：前一个命令的返回值
- `$$
：当前脚本的[进程ID（Process Identification, PID）](https://zh.wikipedia.org/wiki/%E8%BF%9B%E7%A8%8BID)
- `!!` - 完整的上一条命令，包括参数。常见应用：当你因为权限不足执行命令失败（会出现`Permission denied`）时，可以使用 `sudo !!`再尝试一次。
- `$_` - 上一条命令的最后一个参数。

更多请参见[这里](https://www.tldp.org/LDP/abs/html/special-chars.html)

上面需要特殊解释的是`$?`，它给出上一个命令的返回值，如果为`0`，就意味着程序正常退出，如果非0，就代表程序异常退出。`true`和`false`，也是两个程序，其中`true`永远返回`0`，`false`永远返回`1`

这个返回码可以搭配`&&`、`||`这两个运算符使用，它们都是**短路运算符**。

- `&&`其实是逻辑与运算，也可以用来连接两条命令，当前面的命令执行成功时才执行后面的命令。用`&&`连接多个命令，假如中间发生了错误，就不会继续执行，引发一连串的错误。
- `||`相应的，逻辑或运算是当前面的命令执行失败时才执行后面的命令。可以用于设置一个“Plan B”，当前面的命令执行失败，就执行“Plan B”。
- `;`就是单纯的先后执行两条命令，无论成功与否，两条命令都会执行。

```txt
false || echo "Oops, fail"
# Oops, fail

true || echo "Will not be printed"
#

true && echo "Things went well"
# Things went well

false && echo "Will not be printed"
#

false ; echo "This will always run"
# This will always run
```

## `?`、`*`、`{}`

`?`和`*`分别可以匹配一个任意字符和多个任意字符，而`{}`可以展开一个字符串列表，如：

```txt
rm foo? # 会删除foo1、foo2、foob，不会删除foo、foo12
rm foo* # 会删除foo1、foo2、foob、foo、foo12，不会删除bar

cp *.png folder # 会复制所有.png后缀的文件

mv {dog,cat}.png folder # 会移动dog.png和cat.png
mv dog.png cat.png folder # 上面那句等价于这个

mkdir *.{png,jpg,jpeg,gif} # 将两种语法组合起来使用

touch {foo,bar}/{a..h} # 会创建foo/a, foo/b, ... foo/h, bar/a, bar/b, ... bar/h这些文件
```

## 流程控制语句

### `if`

bash中`if`的格式是这样的：

```txt
if 条件
then
    命令1
    命令2
    ...
    命令n
fi
```

或者写成一行（适用于在命令行界面下使用）

```txt
if 条件; then 命令1; 命令2; ...; 命令n; fi
```

if-else语法，和if-elif-else语法是类似的：

```txt
if 条件
then
    命令1
    命令2
else
    命令3
    命令4
    
fi
```

或

```txt
if 条件; then 命令1; 命令2; else 命令3; 命令4; fi
```

if-elif-else：

```txt
if 条件1
then
    命令1
elif 条件2 
then 
    命令2
else
    命令3
fi
```

或者

```txt
if 条件1; then 命令1; elif 条件2; then 命令2; else 命令3; fi
```

（这么复杂的语句还是写在脚本文件里吧，不建议写成一行了）

具体示例：

```bash
compare() {
    if (($1 > $2)); then
        echo "$1 大于 $2"
    elif (($1 < $2)); then
        echo "$1 小于 $2"
    else
        echo "$1 等于 $2"
    fi
}
compare 282 14
compare 28 214
compare 123 123
```

运行脚本，输出

```txt
282 大于 14
28 小于 214
123 等于 123
```

### `for`

`for`循环语句的语法如下：

```txt
for i in 列表项1 列表项2 ... 列表项n
do
    命令1
    命令2
    ...
    命令n
done
```

写成一行

```txt
for i in 列表项1 列表项2 ... 列表项n; do 命令1; 命令2; ...; 命令n done
```

示例

```txt
foo=bar
for i in 1 "2" '3' apple 5 $foo
do
    echo "i is $i now."
done
```

输出

```txt
i is 1 now.
i is 2 now.
i is 3 now.
i is apple now.
i is 5 now.
i is bar now.
```

### `while`

`while`的语法如下：

```txt
while 条件
do
    命令
done
```

### `case`

`case`其实就是其他编程语言中的`switch`语句,`case`的语法比较奇怪，结束`case`语句要使用`case`这个单词反过来拼写的`esac`，这个和`if`->`fi`是一样的。然后，每个子块里面需要用`匹配式) 命令 ;;`的格式来写。

```bash
echo '请选择 a~e 之间的一个英文字母'
read letter
case $letter in
    a)
        echo ALPHA
    ;;
    b)
        echo BRAVO
    ;;
    c)
        echo CHARLIE
    ;;
    d)
        echo DELTA
    ;;
    e)
        echo ECHO
    ;;
    *) 
        echo 您的输入不是 a~e 之间的一个英文字母
    ;;
esac
```

### `break`和`continue`

当然，bash也是支持`break`和`continue`的，它们的用法也和大多数编程语言一样。

## 用`$()`组合命令

`$()`可以获得一个命令的输出并用它替换，例如

```bash
for i in $(ls); do
    echo "我有一个文件，它叫做$i"
done
```

输出

```txt
我有一个文件，它叫做Downloads
我有一个文件，它叫做temp
...
```

## `find`

`find`指令可以用来查找文件，示例如下

```bash
# 查找所有名称为src的文件夹
find . -name src -type d
# 查找所有文件夹路径中包含test的python文件
find . -path '*/test/*.py' -type f
# 查找前一天修改的所有文件
find . -mtime -1
# 查找所有大小在500k至10M的tar.gz文件
find . -size +500k -size -10M -name '*.tar.gz'
# 删除全部扩展名为.tmp 的文件
find . -name '*.tmp' -exec rm {} \;
# 查找全部的 PNG 文件并将其转换为 JPG
find . -name '*.png' -exec convert {} {}.jpg \;
```

## `grep`

`grep`命令可以用来从一段文本里面查找想要的字符串，比如

```txt
cyrus:~$ cat poem.txt
Do not go gentle into that good night

Dylan Thomas

Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.
...

cyrus:~$ grep light < poem.txt # 获取所有含有“light”的行
Rage, rage against the dying of the light.
Because their words had forked no lightning they
Rage, rage against the dying of the light.
...

cyrus:~$ grep eye -C 1 < poem.txt # 获取含有“eye”的行，并同时打印出上下文（Context），往上往下各一行
Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.

cyrus:~$ grep the -v < poem.txt # -v代表反选，获得所有不含“the”的行
Do not go gentle into that good night

Dylan Thomas

Do not go gentle into that good night,
Old age should burn and rave at close of day;
...
```

## alias

`alias`命令可以创建别名

```txt
# 创建常用命令的缩写
alias ll="ls -lh"

# 能够少输入很多
alias gs="git status"
alias gc="git commit"
alias v="vim"

# 手误打错命令也没关系
alias sl=ls

# 重新定义一些命令行的默认行为
alias mv="mv -i"           # -i prompts before overwrite
alias mkdir="mkdir -p"     # -p make parent dirs as needed
alias df="df -h"           # -h prints human readable format

# 别名可以组合使用
alias la="ls -A"
alias lla="la -l"

# 在忽略某个别名
\ls
# 或者禁用别名
unalias la

# 获取别名的定义
alias ll
# 会打印 ll='ls -lh'
```

这些别名并不会持续生效，如果想要保存他们，需要在`~/.bashrc`里面添加对应的配置，就可以每次启动bash的时候都加载这些配置。

## 参考链接

[MIT The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)
[GNU manual documents](https://www.gnu.org/software/coreutils/manual/html_node/General-output-formatting.html)
