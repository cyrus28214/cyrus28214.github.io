---
title: 基于FPGA的魔塔游戏
description: 浙江大学2024春夏数字逻辑设计课程设计
published: 2024-06-20 21:38:25
slug: FPGA-mota
image: ./FPGA-mota.png
category: 嵌入式
tags: [数字逻辑, FPGA, Verilog, 心得, 魔塔]
---

![demo](./FPGA-mota.png)

这是浙江大学2024春夏数字逻辑设计的课程设计，我们小组基于FPGA制作了一个魔塔游戏。视频演示：

[B站链接](https://www.bilibili.com/video/BV1i9gkeAEEk/)

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1i9gkeAEEk&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

其中，本人主要负责代码的编写，包括时钟控制模块、VGA模块、地图渲染、数字渲染、地图交互、COE文件生成脚本、地图编辑器、Vivado TCL脚本等。

开发环境使用Vivado，利用Vivado TCL脚本 + git来管理和协作开发。

VGA模块我编写的时候使用了一个RAM映射到VGA输出，这样其他模块可以通过写RAM来渲染，实现解耦合和其他的一些好处。没有采用给的参考代码里输出`x, y`输入`color`的方法。

主要的逻辑并不复杂，当相应的移动按键被按下之后，会生成一个预移动信号，检测移动目标位置是否符合特定规则（如目标为门且钥匙足够，目标为怪物且生命值足够等），如果符合规则，则会生成一个移动信号，更新人物坐标，否则保持原地不动。

开发过程中发现自己对时序逻辑的理解还不够深，经常出现仿真/下板结果和预期不符合，需要反复下板验证，由于项目到后期之后生成比特流的速度变得非常慢，制约了开发的速度。（该死的Vivado还经常闪退）

一开始写Verilog代码把RTL级描述和行为级描述混在一起写，思路非常混乱。

随着开发的深入，以及看了一些资料，对Verilog语法和实际的电路之间的映射也有了更深的理解：

- `assign`将综合成组合逻辑
- `always @*`通常情况下会综合成组合逻辑，但是如果出现某个分支未覆盖，则会生成latch（Vivado会有警告的，虽然大多数时候会被忽略），需要避免latch的出现。
- `always @(posedge clk)`会综合成时序逻辑。

总结经验就是设计复杂的时序逻辑的时候应该先画出波形图和状态图，然后设计状态、转移和输出。

基本上开发到了后期之后，都使用三段或二段状态机的思路来编写代码，这样之后写的代码下板之后基本都符合预期，开发效率大大提高。甚至重构`number.v`的时候，我还是边复习微积分边写的代码，下板也是立马过（

结果就是前期和后期写的代码风格完全不同，形成了一座壮观的shi山。

感觉Verilog不是很有利于设计良好的API，经常输入输出一大堆，下次希望可以试一试SystemVerilog，据说有很多高级的功能，如面向对象等。

最后要感谢memset0同学负责编写文档等工作，514同学负责编写蜂鸣器、键盘输入、数字显示、MIDI文件处理等代码。
