#let title = "Softmax和交叉熵"
#let author = "cyrus28214"

#set text(font: ("New Computer Modern", "Source Han Serif SC"), size: 12pt)
#show raw: set text(font: ("Fira Code", "Source Han Sans SC"), size: 12pt)

#set page(
  header: context {
    if counter(page).get().first() > 1 [
      #set text(size: 10pt)
      #h(1fr) #author
    ]
  }
)
#set page(numbering: "1 / 1")

#show link: it => underline[#text(fill: blue)[#it.body]]

#set raw(lang: "python")
#show raw.where(block: true): block.with(
  fill: luma(240, 40%),
  inset: 10pt,
  radius: 4pt,
  width: 100%
)

#show raw.where(block: false): box.with(
  fill: luma(240),
  inset: (x: 3pt, y: 0pt),
  outset: (y: 3pt),
  radius: 2pt,
)

#align(center)[
  #text(size: 18pt)[
  *#title*\
  #author
  ]
]

#set math.equation(numbering: "(1)", supplement: "式")

= Softmax函数

== 介绍

Softmax是一种机器学习中常用的归一化函数．我们可以从它的名字来理解其含义．Softmax和普通的max函数不同，它更加“软”，max函数给出一组数据中唯一的最大值，而Softmax则会将向量归一化，归一化后的向量就可以视作一组*概率分布*，具有实际意义．Softmax中的指数的性质使输入中越大的数值对应越大的概率，并拉开差距，让最大值显得更加突出．

#figure(
  image("./softmax.drawio.png", width: 60%),
  caption: "max与Softmax",
  supplement: "图"
)

== 定义

#let x = $arrow(x)$

Softmax函数的公式如下：

$
&"Softmax" : RR^n -> RR^n \
&"Softmax"(#x)_j = (e^ (#x _j)) / (sum_i e^(#x _i))
$

== 与Sigmoid函数的关系

我们都知道$"Sigmoid"(x) = 1 / (1 + e^(-x))$，实际上Sigmoid函数可以看作是二元版本的Softmax：

$
"Sigmoid"(x) = "Softmax"(vec(x, 1, delim:"["))_1
$

正确性可自行验证．反过来，Softmax函数可以看作是扩展版本的Sigmoid．

*二元logistic回归*用到了Sigmoid函数，相应地，*多元logistic回归*用到了Softmax函数．Softmax函数在多分类任务中很重要．

== 计算

由于Softmax函数包含指数运算，因此分子和分母的数值可能很大，降低了数值稳定性．为了解决这个问题，可以将分子和分母同时除以$e^D$，其中$D$可以是$max(#x)$．

$
"Softmax"(#x)_j = (e^ (#x _j - D)) / (sum_i e^(#x _i - D))
$

在PyTorch中，可以用`torch.softmax`计算Softmax函数．

机器学习中也经常用到对数的Softmax函数，可以使用`torch.log_softmax`来计算．

== 梯度

Softmax函数的梯度为：

$
nabla"Softmax"(#x) &= "diag"("Softmax"(#x)) - "Softmax"(#x) dot "Softmax"^T (#x)\
$

推导，由于：

$
#let de = $sum_k e^(#x _k)$
(partial "Softmax"(#x)_j) / (partial #x _i) 
&= ((partial e^(#x _j)) / (partial #x _i)) / #de - (e ^ (#x _i)) / #de (e ^ (#x _j)) / #de \
&= (e^(#x _i)[i = j]) / #de - "Softmax"(#x)_i dot "Softmax"(#x)_j $

可得原式．

= 信息熵

== 公式

要理解交叉熵，首先需要理解信息熵．信息熵，也叫香农熵，其公式如下：

$
I(x_i) &= - log_b P(x_i) \
H(X) &= sum_i P(x_i) I(x_i) =  - sum_i  P(x_i) log P(x_i)
$

其中：
- $P(x_i)$是事件$x_i$发生的概率；
- $I(x_i)$称作事件$x_i$的信息量；
- 底数$b$常取$b=2$．

== 理解

信息熵可以通过多个角度理解：

+ 平均编码长度：信息熵是任何编码的平均编码长度的理论极限．任何二进制编码的平均编码长度都至少为$H(X)$．当我们用长度$log_2 x_i$的编码来表示事件$x_i$时，就可以取得这个极限．例如，$H (1/2, 1/4, 1/4) = 1.5$，当我们取三种事件的编码为$(0, 10, 11)$时，平均编码长度恰为$1/2 times 1 + 1/4 times 2 + 1/4 times 2 = 1.5$．（此处可以联系*哈夫曼编码*理解）

+ 衡量不确定性：信息熵越大，不确定性越大．$H (0, 1) = 0$，这个概率分布是确定的，不包含任何信息．当所有事件概率均匀分布时，信息熵最大$H (1/n, 1/n, ..., 1/n)$，因为此时不确定性最大．

= 交叉熵

== 定义与理解

当我们观察$P$，预测得到了一个可能错误的分布$Q$，我们根据$Q$来估计每一个事件的编码长度$log_2 Q(x_i)$，此时的平均编码长度就是：

$
H(P|Q) = - sum_i P(x_i) log_2 Q(x_i)
$

这个编码长度一定满足$H(P|Q) >= H(P)$．当我们的预测与真实分布$P$完全一致时，这个$H(P|Q)$才能取得最小值．

== 应用

在机器学习中，交叉熵常用来作为损失函数，因为它满足当我们的输出与期望越接近，则$H(P|Q)$越小．我们只需要求$H(P|Q)$的梯度，就可以优化我们的模型．

== 梯度

为方便计算，此处取$e$而不是$2$为底．

#let p = $arrow(p)$
#let q = $arrow(q)$

$
(partial H(#p|#q)) / (partial #q _i) &= - (partial sum_j #p _j log #q _j) / (partial #q _i) \
&= - (#p _i) / (#q _i)
$

则：

$
nabla H(#p|#q) &= - #p ⊘ #q
$

其中Hadamard division “$⊘$”表示对应元素相除．

= 交叉熵损失函数

#let y = $arrow(y)$

使用交叉熵函数需要满足$#q$是一个概率分布，也就是$sum_i #q _i = 1$．我们的机器学习模型的输出并不一定满足这一点，这时候就可以结合我们前面提到的Softmax函数进行归一化．结合二者，得出交叉熵损失函数$L(#x\; #y)$．

$
L(#x) &= - sum_i #y _i log "Softmax"(#x)_i \
&= sum_i #y _i ("LSE"(#x) - #x _i) \
&= "LSE"(#x) (sum_i #y _i) - sum_i #x _i #y _i\
&= "LSE"(#x) - #x dot #y
$

其中$"LSE"(#x) = log (sum_i e^(#x _i))$．这个函数叫做LogSumExp函数，比起直接计算指数和再求对数，很多地方提供了优化的LSE函数，拥有更快的速度、更高的数值稳定性等，如PyTorch提供的`torch.logsumexp`．

== 梯度

计算LSE的梯度，发现刚好就是Softmax函数．

$
nabla "LSE"(#x) &= "Softmax"(#x)
$

有了这个，再来计算交叉损失函数的梯度就很简单了：

$
nabla L(#x) &= nabla"LSE"(#x) - #y\
 &= "Softmax"(#x) - #y
$

== 计算

在PyTorch中，可以使用`torch.nn.functional.cross_entropy`或`torch.nn.CrossEntropyLoss`来计算

除了和我们的$L$函数一致，用预测值$#x$和期望分布$#y$作为输入，也支持使用值为$[0, C)$的整数标签作为$#y$的输入．

== 验证

可以用PyTorch来验证我们的计算是否正确：

```python
import torch
from torch.autograd import gradcheck
import torch.nn.functional as F

# 定义输入和目标
x = torch.randn(3, dtype=torch.float64, requires_grad=True)  # 假设有3个样本，5个类别
y = torch.randn(3, dtype=torch.float64).softmax(dim=0) # 确保和为 0
loss = F.cross_entropy(x, y)
loss.backward()
print(x.grad)
print(x.softmax(dim=0) - y)
```

结果：

```txt
In [46]: %run ./typst/gradcheck.py
tensor([-0.0677, -0.3029,  0.3706], dtype=torch.float64)
tensor([-0.0677, -0.3029,  0.3706], dtype=torch.float64,
       grad_fn=<SubBackward0>)
```

= 参考链接

#link("https://zhuanlan.zhihu.com/p/105722023")