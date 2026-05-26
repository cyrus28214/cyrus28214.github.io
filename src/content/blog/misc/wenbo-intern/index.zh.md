---
title: 第一次实习的感悟和收获
description: ""
---

在大二下的那个学期，我开始找实习、投简历、约面试。对于大多数浙江大学计算机学院的同学来说，大二就开始找实习确实很早，但当时我的想法是，**人需要去尝试，才知道我以后想要过怎么样的人生**。这也是我大一暑假就选择去CMU交流，大二就参加科研的原因。我想尽量早接触到业界的项目，通过实习，一方面提升自己的能力，另一方面更早接触到人生的选择支。

### 机缘巧合的Offer

一开始我只投递了杭州的岗位，因为考虑到假如大三开学后要继续实习的话，可能偶尔需要返校，地理位置太远的话不利于往返。

我投递的次数并不多，但是范围却很广，有前端、后端、机器学习、量化开发，甚至还面了我以前没接触过的嵌入式（甚至还拿到Offer了），有阿里、华为、字节等大厂、也有一些小厂和创业公司。

一个很难受的地方是，大厂很多岗只收2026届的实习，2027届可选的岗位很少。还有的联系到HR后，HR了解到我大二不能转正的背景后，根本就不给我面试机会。

有次面完一家杭州的量化私募后，HR在微信上说虽然技术负责人对我的评价很高，但是毕竟才大二，很难保证实习时间，由于HC有限，只考虑能转正的大三和研二，所以收了另外一位候选人。

我的第一反应是惊讶于面试官对我如此赏识，毕竟我对自己的水平还是有点不够自信的，然后是感到有点遗憾，自己由于非技术的原因错失Offer。

后面那个HR表示，要给我内推到另外一家在上海的百亿量化私募，稳博投资，我抓住了这个机会，顺利通过了面试。对比了其他几个Offer的薪资水平和工作内容，决定还是选择了稳博投资。

于是，在大二暑假的时候，我从杭州前往上海，在浦东找了个房子租下，开始了我的第一次实习生活。

### 在稳博投资的这些日子

![](./wenbo.jpg)

公司里带我的mentor是一个很好的领导，为人真诚好沟通，无论是技术上的知识还是在公司里处事的方法，都愿意告诉我。

同事的相处氛围融洽，每次和mentor还有几个同组的同事一起吃午饭的时候，我们会聊投资，聊公司的八卦，聊AI，聊职业发展。

时间过得很快，在last day的那天下午，我办完了离职流程，和mentor道别的时候，他说送我一下，结果跟着我下电梯、过马路，一直送我到地铁站闸机口，路上和我说他了解到的，未来如何在这个行业发展的一些见解。

我一直以为工作上的朋友的交情都会比较淡，但是离别了才发现我的mentor是这样一个让我珍惜的朋友。

### 技术成长

出于保密原因，本部分有些内容经过修饰。

<!-- #### 内部日志库替换

在公司里面做的第一个活是替换公司内部使用的日志库，由于之前的日志库缺少人维护，并且性能不好，因此mentor让我调查一下有哪些低延迟的C++日志库。

这个任务本身并不算困难，但由于刚刚进入公司，我花了大量的时间了解公司的编译构建流程，包括虚拟环境，CMake脚本，monorepo的依赖构建等。

之后我对比了`fmtlog`、`spdlog`、`quill`等日志库在性能、线程安全方面的特点，写了一些benchmark代码，测试了调用延迟和吞吐量。最后决定使用`quill`代替原本的旧日志库。

为了方便公司内遗留代码的快速迁移，我还开发了与公司内部库具有相同接口的`quill`的兼容层，只需要替换头文件，做少量改动即可更换到新的logger。 -->

#### 高频因子parquet存储

公司高频策略在盘中会产生海量的Tick级别因子数据（每日百GB量级）。原有的存储方案将不同类型的数据写入。不仅存储占用巨大，而且不利于后续的读取、分析和回测带来了极大的不便。

我采用Parquet库的流式写入API，避免将整个文件内容在内存中构建，降低了内存占用。

新的Parquet存储方案相比原有的.csv，存储空间减少了90%以上，降低了磁盘存储成本。统一的数据格式和列式存储特性，便于下游的数据分析任务。

引入Parquet读写功能后，又遇到了新的问题，整个动态库（.so）强制依赖libparquet.so。公司部分使用这个模块的环境没有`libparquet.so`，虽然也没有用到这个新增的功能，但是因为动态库依赖问题，导致无法运行。

解决方案是引入一个中间层`xxx_parquet.so`，然后让`xxx.so`使用`dlopen`引入`xxx_parquet.so`，通过`xxx_parquet.so`间接依赖`libparquet.so`，这样就可以在安装了parquet的环境下使用新增的parquet因子存储功能，在没有安装parquet的环境也能正常使用原有的功能。

#### 共享内存延迟优化

有多个writer进程和多个reader进程，需要跨进程通信收发因子，这个部分在全链路上的延迟占比较高，因此需要优化。目前来说，因子数据在共享内存里的排列方式是这样的：

```txt
instrument 0：[factor 0] [factor 1] [factor 2] ... [factor N-1]
instrument 1：[factor 0] [factor 1] [factor 2] ... [factor N-1]
instrument 2：[factor 0] [factor 1] [factor 2] ... [factor N-1]
...
```

每个因子包含一个值和一个时间戳，reader采用轮询instrument的方式，检测每个因子是否更新，由于需要完整地扫完所有instrument才能进行下一轮更新，这样延迟很高。

思考这个问题，其本质是一个 MPMC 的消息队列，消息体为 `{ instrumentID, factorID, factorValue }[]`（通常是同一个 instrument 的全部 factor 同时更新。也有部分 factor 更新的但是少。），最理想的做法是，每一个下游 reader 订阅自己关心的 instrument 和因子，用 ZMQ 这样的共享内存消息队列，然后收发消息。和mentor讨论下，这样对现有的架构改造太多，风险太大，而且这样还会引入额外的内存复制和上下文切换，还不一定有简单SHM快。

分析目前实现的瓶颈主要在两个地方：
1. cache miss：现有的二维布局在内存中是分散的，导致大量无效的内存加载。
2. busy wait：Reader 必须完整扫完所有 Instrument 才能知道谁更新了。

后来使用的方案是，在不改变原本因子内存布局的情况下，开一个`writer_num * queue_max`的空间，给每个writer一个 ringbuffer 用来通信，记录更新的 instrument，循环写入 ringbuffer，更新原子变量 `seq`，然后reader进程不直接扫因子，而是本地缓存 `local_seq`，只需要扫每个 writer 的`WriterMetaData`，再去找相应的 instrument，一次性 load 所有 factor，这样虽然依然有轮询，但是延迟大大降低了。

```plantuml
@startuml
skinparam sequenceMessageAlign center
skinparam maxMessageSize 150

participant "Writer Process" as Writer
box "Shared Memory (SHM)" #F0F8FF
participant "Factor Data\n(2D Array)" as Data
participant "Writer RingBuffer\n(Instrument IDs)" as RB
participant "WriterMetaData\n(Atomic Seq)" as Meta
end box
participant "Reader Process" as Reader

== Writer Updates Factor ==

Writer -> Data : 1. Write factor values for Instrument[ID]
Writer -> RB : 2. Write Instrument[ID] to slot (seq % queue_max)

note over Writer, Meta : **Store-Release (Memory Barrier)**\n""std::atomic_store_explicit(&seq, ... , std::memory_order_release)""\nEnsures factor data & ringbuffer writes are globally visible\nbefore the new sequence number is published.

Writer -> Meta : 3. Update atomic seq

== Reader Polls Updates ==

loop For each Writer's MetaData
    Reader -> Meta : 4. Read atomic seq
    
    note over Reader, Meta : **Load-Acquire (Memory Barrier)**\n""std::atomic_load_explicit(&seq, std::memory_order_acquire)""\nEnsures the sequence number is read before\nfetching any data from the ringbuffer or factor layout.
    
    opt if seq > local_seq
        Reader -> RB : 5. Read Instrument[ID] from slot (local_seq % queue_max)
        Reader -> Data : 6. Bulk load all factors for Instrument[ID]
        Reader -> Reader : 7. Process factor data
        Reader -> Reader : 8. Increment local_seq
    end
end

@enduml
```

### 总结

回顾在稳博的这几个月，可以说是我人生中一段极其宝贵和充实的经历。

我不仅仅是学会了如何“写代码”，更是学会了如何“解决问题”。我学会了如何在庞大而复杂的系统中定位瓶颈，如何权衡不同的技术方案，以及如何写出稳定、高效且易于维护的代码。它让我明白了优秀工程师的标准，也让我对自己未来的道路更加笃定。