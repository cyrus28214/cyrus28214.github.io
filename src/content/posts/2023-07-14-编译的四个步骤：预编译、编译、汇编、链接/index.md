---
title: 编译的四个步骤：预编译、编译、汇编、链接
published: 2023-07-14 12:23:25
slug: preprocessing-compilation-assembling-and-linking
draft: false
category: 编译原理
tags: [编译, C/C++]
---

假设我们有以下文件：

main.cpp

```cpp
#include<iostream>

int main(){
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
```

当我们执行一条命令`g++ main.cpp -o main`时，实际上g++共完成了四个步骤：

## 1. 预处理（Preprocessing）

`g++ -E main.cpp -o main.i`

或许你会注意到，C++程序中有很多以`#`开头的行，例如`#include`、`#define`、`#undef`、`#ifdef`等。它们明显与我们通常写的语句不同，如它们无需以分号结尾，它们不可以直接折行。这些被称作**预处理指令（Preprocessor Directive）**。预处理指令就是在预处理这一步生效的。预处理具体做的工作包括引入头文件、宏的展开、注释的删除等。

## 2. 编译(Compiling)

`g++ -S main.i -o main.s`

编译阶段将C/C++代码翻译成汇编指令，这是编译器所做的最核心、最重要的工作。编译通常包括词法分析、语法分析、语义分析几个步骤。

打开main.s，可以发现里面是汇编指令，以下是截取的一个片段。

```asm
main:
.LFB2211:
    pushq   %rbp
    .seh_pushreg  %rbp
    movq    %rsp, %rbp
    .seh_setframe %rbp, 0
    subq    $32,  %rsp
    .seh_stackalloc    32
    .seh_endprologue
    call    __main
    leaq    .LC0(%rip), %rax
    movq    %rax, %rdx
    movq    .refptr._ZSt4cout(%rip), %rax
    movq    %rax, %rcx
    call    _ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
    movq    %rax, %rcx
    movq    .refptr._ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_(%rip), %rax
    movq    %rax, %rdx
    call    _ZNSolsEPFRSoS_E
    movl    $0,   %eax
    addq    $32,  %rsp
    popq    %rbp
    ret
```

## 3. 汇编(Assembling)

`g++ -c main.s -o main.o`

汇编阶段将汇编指令转化成二进制文件，也就是机器码。

现在若要打开main.o文件需要使用查看二进制文件的工具，而非文本编辑器。

## 4. 链接(Linking)

`g++ main.o -o main`

链接阶段的工作是寻找程序用到的外部文件，拼接每个模块，生成最终的可执行文件。

链接分为两种：静态链接和动态链接

静态链接就是将所需要的二进制代码全部并入最终的文件，静态链接生成的文件体积较大，但是不需要外部库的依赖。

动态链接就是在运行时再加载所需要的动态库文件，动态链接生成的文件体积小，但是需要与库文件一起发布。
