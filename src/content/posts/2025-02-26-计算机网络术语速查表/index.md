---
title: 计算机网络术语速查表
published: 2025-02-26 23:26:41
slug: computer-network-terminology-cheat-sheet
tags: ['计算机网络', '速查表']
category: '计算机网络'
draft: true
---

## 前言

在学习“无线网络应用”这门课程时遇到很多需要记忆的术语，在这里进行总结。内容基本上来自思科的网课。

## 速查表

- 网络拓扑
   - 角色
        - **主机（Host）**：连接到网络并直接参与网络通信的所有计算机都属于主机。主机也可以被称为终端设备（End Device）。
        - **客户端（Client）**：主机的一种类型，客户端使用客户端软件请求和显示从服务器获取的信息。Web 浏览器（例如 Chrome 或 FireFox）是典型的客户端软件。
        - **服务器（Server）**：服务器是装有特殊软件，可以为网络上其他终端设备提供信息（例如电子邮件或网页）的计算机。
        - **对等网络 (Peer-to-Peer Network)**：网络中的设备既是客户端又是服务器的网络类型。
        - **中间设备（Intermediate Device）**：中间设备可以将单个终端连接到网络中。它们可以将多个独立的网络连接起来，形成互联网络。这些中间设备提供连接并确保数据在网络中传输。主要包括：
            - **路由器（Router）**
            - **交换机（Switch）**
            - **防火墙（Firewall）**
    - 规模
        - **局域网（Local Area Network, LAN）**：局域网是覆盖较小地理区域的网络基础设施。
        - **无线局域网（Wireless Local Area Network, WLAN）**：无线局域网是覆盖较小地理区域的无线网络基础设施。
        - **广域网（Wide Area Network, WAN）**：广域网是覆盖广泛地理区域的网络基础设施。
        - **互联网（Internet）**：互联网是连接世界各地的网络。

- **内部网（Intranet）**：内部网这个术语用于表示一个组织的私有局域网和广域网连接。内部网的设计旨在仅允许该组织的成员、员工或其他获得授权的人员进行访问。
- **外联网（Extranet）**：使用外联网可以为为在其他组织工作，但需要本组织数据的人提供安全访问。
- **服务质量（Quality of Service, QoS）**
- **自带设备（Bring Your Own Device, BYOD）**：自带设备是指员工使用自己的设备（例如笔记本电脑、智能手机和平板电脑）连接到公司网络。
- **云计算（Cloud Computing）**：云计算是指通过互联网提供计算资源和存储，云类型主要有四种：公有云、私有云、混合云和社区云。
- **电力线网络（Power Line Network）**：电力线网络使用电力线传输数据。
- **无线宽带（Wireless Broadband）**：在许多没有电缆和DSL的地方，可以使用无线连接到互联网。
- **服务提供商（Service Provider）**、**互联网服务提供商（Internet Service Provider, ISP）**、**无线互联网服务提供商（Wireless Internet Service Provider, WISP）**

- 网络接入方式
    - **DSL（Digital Subscriber Line）**：数字用户线也可提供高带宽、高可用性和始终在线的互联网连接。DSL 通过电话线路运行。通常小型办公室和家庭办公室用户会选择使用非对称 DSL (ADSL)，这种方式的特点是下载速度高于上传速度。
    - **蜂窝网络（Cellular Network）**：蜂窝网互联网接入使用手机网络进行连接。只要您能收到蜂窝网信号，就能获得蜂窝网互联网接入。对于根本没有互联网连接的地方来说，获得卫星互联网访问非常有用。
    - **卫星（Satellite）**：对于根本没有互联网连接的地方来说，获得卫星互联网访问非常有用。卫星天线要求有到卫星的清晰视线。
    - **拨号电话（Dial-up）**：使用电话线和调制解调器，费用相对较低。拨号调制解调器连接提供的低带宽不足以用于大型数据传输，但对旅行过程中的移动访问非常有用。
    - **专用租用线路（Dedicated Leased Line）**：租用线路是服务提供商网络内连接地理位置分散的办公室的保留电路，提供个人语音和/或数据网络。电路按月或按年租用。

- 网络安全
    - **病毒/蠕虫/木马（Virus/Worm/Trojan）**：在用户设备上运行的恶意软件或代码。
    - **间谍软件（Spyware）**：间谍软件秘密收集用户数据。
    - **零日攻击（Zero-Day Attack）**：在出现漏洞的第一天发起的攻击。
    - **拒绝服务攻击（Denial of Service Attack, DoS）**：拒绝服务攻击是指攻击者通过发送大量请求来使目标系统崩溃或无法正常工作。
    - **防火墙（Firewall）**：防火墙过滤阻止未经授权的进出网络访问。
    - **访问控制列表（Access Control List, ACL）**：基于IP地址和应用程序，进一步过滤访问和流量转发。
    - **入侵防御系统（Intrusion Prevention System, IPS）**：识别快速扩散的威胁，例如零日攻击或零小时攻击。
    - **虚拟专用网络（Virtual Private Network, VPN）**：为远程工作人员提供对组织机构的安全访问。

- **开放式系统互联（Open Systems Interconnection, OSI）模型**：OSI 参考模型详细罗列了每一层可以实现的功能和服务，还描述了各层与其上、下层之间的交互。
    - **协议数据单元（Protocol Data Unit, PDU）**：一段数据在任意协议层的表示形式称为协议数据单元。
        - **数据（Data）**：一般术语，泛指应用层使用的PDU。
        - **段（Data Segment）**：传输层的PDU。
        - **包（Data Packet）**：网络层的PDU。
        - **帧（Data Frame）**：数据链路层的PDU。
        - **位（Data Bit）**：物理层的PDU。
    - **应用层**：应用层包含用于进程间通信的协议。
        - 域名系统
            - **DNS（Domain Name System）**：将域名（例如 cisco.com）转换为 IP 地址。
        - 主机配置
            - **DHCPv4（Dynamic Host Configuration Protocol version 4）**：IPv4动态主机配置协议。DHCPv4 服务器在启动时动态地将 IPv4 编址信息分配给 DHCPv4 客户端，并允许在不再需要时重新使用这些地址。
            - **DHCPv6（Dynamic Host Configuration Protocol version 6）**：IPv6动态主机配置协议。DHCPv6类似于DHCPv4。DHCPv6服务器在启动时动态地将IPv6编址信息分配给DHCPv6客户端。
            - **SLAAC（Stateless Address Autoconfiguration）**：无状态地址自动配置。一种允许设备在不使用DHCPv6服务器的情况下获得其IPv6编址信息的方法。
        - 邮件
            - **SMTP（Simple Mail Transfer Protocol）**：简单邮件传输协议。使客户端能够将邮件发送到邮件服务器，并使服务器能够将邮件发送到其他服务器。
            - **POP3（Post Office Protocol version 3）**：邮局协议第 3 版。使客户端能够从邮件服务器检索电子邮件并将电子邮件下载到客户端本地邮件应用程序。
            - **IMAP（Internet Message Access Protocol）**：互联网消息访问协议。使客户端能够访问存储在邮件服务器上的电子邮件，并在服务器上维护电子邮件。
        - 文件传输
            - **FTP（File Transfer Protocol）**：文件传输协议。它设置规则，使得一台主机上的用户能够通过网络访问另一台主机或向其传输文件。FTP是一种可靠、面向连接且进行确认的文件传输协议。
            - **SFTP（SSH File Transfer Protocol）**：SSH文件传输协议。作为安全外壳 (SSH)协议的扩展，SFTP可用于建立安全的文件传输会话，在该会话中对文件传输进行加密。SSH 是一种安全远程登录的方法，通常用于访问设备的命令行。
            - **TFTP（Trivial File Transfer Protocol）**：简单文件传输协议。这是一个简单的，无连接的文件传输协议，使用尽最大努力、无需确认的文件传输方式。它使用的开销比FTP少。
        - Web和Web服务
            - **HTTP（Hypertext Transfer Protocol）**：超文本传输协议。这是有关在万维网上交换文本、图形图像、音频、视频以及其他多媒体文件的一组规则集。
            - **HTTPS（Hypertext Transfer Protocol Secure）**：安全 HTTP。这是一种安全的HTTP形式，它对在万维网上交换的数据进行加密。
            - **REST（Representational State Transfer）**：具象状态传输协议。它使用应用程序编程接口 (API) 和 HTTP 请求创建 Web 应用程序的 Web 服务。
    - **表示层**：表示层用常用方式表示数据在应用层服务之间的传输。
    - **会话层**：会话层向表示层提供服务，组织对话并管理数据交换。
    - **传输层**：传输层定义服务以对数据进行分段，传输和重组，以进行终端设备之间的单独通信。
        - **TCP（Transmission Control Protocol）**：传输控制协议。TCP 是一种面向连接的、可靠的、基于字节流的传输层通信协议。
        - **UDP（User Datagram Protocol）**：用户数据报协议。UDP 是一种无连接的传输层协议，提供了一种不可靠的服务。
    - **网络层**：网络层为所标识的终端设备之间通过网络交换独立的数据的片段提供服务。
        - 地址：
            - 网络层使用的地址是IP地址，IP数据包包含源IP地址和目的IP地址。
            - 网络部分(IPv4)或前缀(IPv6)：地址最左边的部分，表示 IP 地址是哪个网络的成员。同一网络中所有设备的地址都有相同的网络部分。
            - 主机部分(IPv4)或接口ID(IPv6)：地址的其余部分，用于识别网络上的特定设备。这部分对于网络中的每个设备或接口都是唯一的。
            - 子网掩码(IPv4)或前缀长度(IPv6)：用于将IP地址的网络部分与主机部分区分开来。
        - Internet 协议
            - **IPv4（Internet Protocol version 4）**：互联网协议第 4 版。它接收来自传输层的消息段，将消息打包成数据包，并为通过网络进行端到端传递的数据包进行地址分配。IPv4 使用 32 位地址。
            - **IPv6（Internet Protocol version 6）**：互联网协议第 6 版。与 IPv4 类似，但使用 128 位地址。
            - **NAT（Network Address Translation）**：网络地址转换。将私有网络 IPv4 地址转换为全球唯一的公有 IPv4 地址。
        - 消息传送
            - **ICMPv4（Internet Control Message Protocol version 4）**：IPv4 互联网控制消息协议。目的主机针对数据包传输中出现的错误，向源主机提供反馈。
            - **ICMPv6（Internet Control Message Protocol version 6）**：用于 IPv6 的ICMP。与 ICMPv4 类似的功能，但用于 IPv6 数据包。
            - **ICMPv6 ND（IPv6 Neighbor Discovery）**：IPv6 邻居发现。包括用于地址解析和重复地址检测的四个协议消息。
        - 路由协议
            - **OSPF（Open Shortest Path First）**：开放最短路径优先协议。它使用基于区域的分层设计的链路状态路由协议。OSPF是一种开放式标准内部路由协议。
            - **EIGRP（Enhanced Interior Gateway Routing Protocol）**：增强型内部网关路由协议。这是一种思科开发的开放标准路由协议，使用基于带宽、延迟、负载和可靠性的复合度量。
            - **BGP（Border Gateway Protocol）**：边界网关协议。这是一种开放标准的外部网关路由协议，用于互联网服务提供商(ISP)之间。BGP 还通常用于 ISP 与其大型私有客户端之间来交换路由信息。
    - **数据链路层**：数据链路层协议描述了设备之间通过公共介质交换数据帧的方法。
        - 设备
            - **网卡（Network Interface Card, NIC）**：网卡是连接计算机和网络的硬件设备。
        - 地址
            - 数据链路层使用的地址是MAC地址，MAC地址是48位地址，用于识别网络上的特定设备。
            - 源MAC地址：发送封装有 IP 数据包的数据链路帧的设备的数据链路地址，或以太网 MAC 地址。
            - 目的MAC地址：当接收设备与发送设备在同一网络中时，这就是接收设备的数据链路层地址。
        - **ARP（Address Resolution Protocol）**：地址解析协议。提供 IPv4 地址与硬件地址之间的动态地址映射。
        - **以太网（Ethernet）**：为网络接入层的布线和信令标准定义规则。
        - **WLAN（Wireless Local Area Network）**：无线局域网。定义 2.4 GHz 和 5 GHz 无线电频率的无线信号规则。
    - **物理层**：物理层协议描述了机械的、电气的、功能的和程序化的方法，以激活，维护和解除物理连接，实现与网络设备之间的位传输。
        - **网络介质（Network Media）**：通信通过介质在网络上传输。介质为消息从源设备传送到目的设备提供了通道。主要包括：
            - **铜缆（Copper Wire）**：在铜缆中，通过电脉冲传输数据。
                - 干扰源
                    - **电磁干扰 (EMI) 或射频干扰 (RFI)**：EMI 和 RFI 干扰信号会扭曲和损坏通过铜介质承载的数据信号。EMI 和 RFI 的潜在来源包括无线电波和电磁设备（如荧光灯或电动机）。
                    - **串扰**：串扰是一根电线中信号的电场或磁场对邻近电线中的信号造成的干扰。在电话线上，串扰会由相邻电路中另一语音会话的接听部分引起。具体而言，当电流流经电线时，会在电线周围产生一个较小的环形磁场，而相邻电线可能接收到该磁场。
                - 布线类型
                    - **屏蔽双绞线（Shielded Twisted Pair, STP）**：非屏蔽双绞线 (UTP) 布线是最常用的网络介质。电线的扭绞有助于防止电线之间的串扰。
                    - **非屏蔽双绞线（Unshielded Twisted Pair, UTP）**：屏蔽双绞线 (STP) 比 UTP 布线提供更好的噪声防护。但是，与 UTP 电缆相比，STP 电缆更加昂贵而且不易安装。
                    - **同轴电缆（Coaxial Cable）**：同轴电缆是具有单根导线（中心导体）和屏蔽层（外部导体）的电缆。同轴电缆的中心导体和屏蔽层之间有一个绝缘层。使用场景：
                        - 无线安装：用同轴电缆将天线连接到无线设备。同轴电缆可传送天线和无线电设备之间的射频 (RF) 能量。
                        - 有线电视互联网安装：有线电视服务提供商为其客户提供互联网连接，他们会使用光缆替换同轴电缆和支撑放大元件部分。但是，客户所在地的布线仍采用同轴电缆。
            - **光纤（Fiber Optic Cable）**：在光纤中，通过光脉冲传输数据。
            - **无线介质（Wireless Media）**
        - **带宽（Bandwidth）**：带宽是介质承载数据的能力。
        - **延迟（Delay）**：延迟是指数据从一个给定点传送到另一给定点所用的时间，包括时延、传播时延和处理时延。
        - **吞吐量（Throughput）**：吞吐量是给定时段内通过介质传输的位的量度。

- 组织
    - **互联网协会（Internet Society, ISOC）**：负责在全世界推进互联网的开放式开发、发展和使用。
        - **互联网架构委员会（Internet Architecture Board, IAB）**：负责互联网标准的整体管理和发展。
           - **互联网工程任务组（Internet Engineering Task Force, IETF）**：负责开发、更新和维护互联网和 TCP/IP 技术。包括用于开发新协议和更新现有协议的流程和文档，称为征求意见 (RFC) 文档。
           - **互联网研究任务组（Internet Research Task Force, IRTF）**：负责互联网和 TCP/IP 协议相关的长期研究，包括反垃圾电子邮件研究组（Anti-Spam Research Group，ASRG）、密码技术研究组（Crypto Forum Research Group，CFRG）和对等网络研究组（Peer-to-Peer Research Group，P2PRG）等。
    - **互联网名称与数字地址分配机构（Internet Corporation for Assigned Names and Numbers, ICANN）**：负责协调 IP 地址分配、域名的管理和 TCP/IP 协议中使用的其他信息的分配。
        - **互联网编号指派机构（Internet Assigned Numbers Authority, IANA）**：负责监督和管理 ICANN 中的 IP 地址分配、域名管理和协议标识符。
    - **电气电子工程师协会（Institute of Electrical and Electronics Engineers, IEEE）**：是为致力于推动诸多行业领域的技术创新和标准创建的工程师设立的组织，涉及的领域包括电力与能源、医疗保健、电信和网络。重要的 IEEE 网络标准包括 802.3 以太网和 802.11 无线局域网标准。可在互联网上搜索其他 IEEE 网络标准。
    - **美国电子工业协会（Electronic Industries Association, EIA）**：该组织因其在用于安装网络设备的电线、连接器和 19 英寸机架方面的标准而知名。
    - **电信工业协会（Telecommunications Industry Association, TIA）**：该组织负责开发各种领域的通信标准，包括无线电设备、手机信号塔、IP 语音 (VoIP) 设备和卫星通信等。该图显示了一个经认证的以太网电缆的示例，它是由TIA和EIA合作开发的。
    - **国际电信联盟电信标准局（International Telecommunication Union Telecommunication Standardization Sector, ITU-T）**：是最大最早的通信标准组织之一。ITU-T 定义视频压缩、Internet 协议电视 (IPTV) 和宽带通信的标准，例如数字用户线路 (DSL)。

