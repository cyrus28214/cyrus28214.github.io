---
title: CTF Pwn初探：PLT表和GOT表
published: 2024-10-17 16:40:02
slug: ctf-pwn-plt-got
image: ./pwndbg.png
tags: [CTF, 信息安全, 逆向, 汇编, Linux, 动态链接, PLT表, GOT表]
category: 信安
---

在 pwn中，理解 ELF 文件的 `PLT`（Procedure Linkage Table，过程链接表）和 `GOT`（Global Offset Table，全局偏移表）是非常重要的。这些表格用于解决函数调用时的延迟绑定（Lazy Binding），并且与动态链接库加载和 ASLR（Address Space Layout Randomization）防御机制有密切的关系。

## ELF 文件的延迟绑定机制

ELF 文件中，函数的调用通过 `PLT` 表和 `GOT` 表进行管理。延迟绑定意味着程序在第一次调用一个函数时，不直接解析其地址，而是通过一套机制将解析过程推迟到运行时。具体来说，ELF 文件利用 `PLT` 表与 `GOT` 表实现了这一机制。

- **PLT 表**：每次调用动态链接库中的函数时，程序并不会直接跳转到目标函数的地址，而是先跳转到 `PLT` 表中相应的入口。`PLT` 表中的代码会跳转到 `GOT` 表对应项，若这是该函数第一次调用，则会通过动态链接器解析该函数的实际地址。
- **GOT 表**：`GOT` 表中的每一项用于存储函数的实际地址。在函数第一次调用之前，该项保存的是指向 `PLT` 表的某个偏移量；在函数解析之后，`GOT` 表中该函数的地址会被替换为实际的目标函数地址，以便后续直接调用。

### 延迟绑定流程

当一个函数第一次被调用时：

1. **PLT 表跳转**：程序首先跳转到 `PLT` 表中的函数入口，这个入口中的指令会进一步跳转到 `GOT` 表中相应的项。
2. **GOT 表未解析状态**：如果这是第一次调用该函数，`GOT` 表中的内容仍然是 `PLT` 表中的某个偏移值（即 `func@plt+6`），程序会再次跳转到 `PLT` 中预定义的处理函数地址。
3. **动态解析**：通过动态链接器（`_dl_runtime_resolve`），程序会解析出该函数的实际地址，并将其存储在 `GOT` 表中，后续的函数调用将直接使用该地址。

### 实例解析

以下是一个包含 `PLT` 表和 `GOT` 表的例子。我们可以通过调试工具 `pwndbg` 来查看程序的 `PLT` 和 `GOT` 表的内容。

```bash
pwndbg> plt
Section .plt 0x670-0x6c0:
0x680: setbuf@plt
0x690: printf@plt
0x6a0: read@plt
0x6b0: memcmp@plt
```

通过 `x/4i` 查看 `printf@plt` 的汇编指令：

```bash
pwndbg> x/4i 0x690
   0x690 <printf@plt>:  jmp    QWORD PTR [rip+0x20092a]        # 0x200fc0 <printf@got.plt>
   0x696 <printf@plt+6>:        push   0x1
   0x69b <printf@plt+11>:       jmp    0x670
```

当程序调用 `printf@plt` 时，首先会跳转到 `GOT` 表中的 `printf@got.plt` 项。我们可以进一步查看 `GOT` 表的内容：

```bash
pwndbg> x/a 0x200fc0
0x200fc0 <printf@got.plt>:      0x696 <printf@plt+6>
```

这里可以看到，`got.plt` 中 `printf` 的初始值是 `printf@plt+6`，意味着函数的第一次调用会回到 `PLT` 表。此时，`PLT` 表会通过 `push` 和 `jmp` 指令处理动态解析过程。

```bash
pwndbg> x/10i 0x690
   0x690 <printf@plt>:  jmp    QWORD PTR [rip+0x20092a]        # 0x200fc0 <printf@got.plt>
   0x696 <printf@plt+6>:        push   0x1
   0x69b <printf@plt+11>:       jmp    0x670
   0x6a0 <read@plt>:    jmp    QWORD PTR [rip+0x200922]        # 0x200fc8 <read@got.plt>
   0x6a6 <read@plt+6>:  push   0x2
   0x6ab <read@plt+11>: jmp    0x670
   0x6b0 <memcmp@plt>:  jmp    QWORD PTR [rip+0x20091a]        # 0x200fd0 <memcmp@got.plt>
   0x6b6 <memcmp@plt+6>:        push   0x3
   0x6bb <memcmp@plt+11>:       jmp    0x670
   0x6c0 <__cxa_finalize@plt>:  jmp    QWORD PTR [rip+0x200932]        # 0x200ff8
```

### 进一步分析

在第一次调用函数时，`PLT` 会执行一个类似如下的流程：

```asm
func@plt:
    jmp *(func@got.plt)  ; 如果函数已经初始化，跳转到函数地址
    push reloc_index     ; 将函数在 `GOT` 表中的索引压栈
    push link_map_obj    ; 模块的 `link_map` 对象地址
    jmp _dl_runtime_resolve ; 动态链接解析函数
```

`_dl_runtime_resolve(link_map_obj, reloc_index)` 负责解析函数的真实地址，并将其写入 `GOT` 表。解析完成后，程序跳转到函数的实际地址。该过程仅在第一次调用时执行，后续调用将直接使用 `GOT` 表中的已解析地址。

## 结语

理解 `PLT` 和 `GOT` 表的工作机制是理解现代二进制漏洞利用的重要一步。通过掌握延迟绑定流程、动态解析机制以及如何绕过保护机制（如 PIE、NX 和 ASLR），我们可以深入探索漏洞利用的更多技巧。

由于我还是pwn的初学者，因此以上内容可能存在错误，如有发现，欢迎指正，将不胜感激。

## 参考链接

- [https://www.cnblogs.com/falling-dusk/p/17856141.html](https://www.cnblogs.com/falling-dusk/p/17856141.html)
- [https://www.appknox.com/blog/bypassing-pie-nx-and-aslr](https://www.appknox.com/blog/bypassing-pie-nx-and-aslr)
- [https://blog.csdn.net/u014377094/article/details/124391914](https://blog.csdn.net/u014377094/article/details/124391914)
