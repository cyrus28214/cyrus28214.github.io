#let sans = "Source Han Sans SC"
#let serif = "Source Han Serif SC"
#let title = [微分形式不变性以及$dif y, Delta y, f'(x)$的区别和联系]
#let author = "cyrus28214"

#set math.equation(numbering: "(1)", supplement: "式")
#set text(font: serif, size: 12pt)

#set page(numbering: "1 / 1")

#align(center)[
  #text(font: sans, size: 18pt, weight: "medium")[
    #title
  ]
  
  #author
]

初学微积分的时候，看到课本上证明所谓的“一阶微分形式不变性”看得云里雾里，想着“$dif y = f'(x) dif x$ 竟然也需要证？”．但当我仔细看了看微积分中导数$f'(x)$，微分$dif x$的定义，明晰了以前一直混淆的概念，发现这确实需要证明．不禁又一次感叹微积分的严谨（上一次是理解$epsilon-delta$语言时）．

= 导数

在现代的微积分里，是先有导数再有微分的．定义导数为

$ f'(x) := lim_(Delta x->0) (f(x+Delta x)-f(x)) / (Delta x) $

= 微分

若$y=f(x)$，则对于自变量的增量$Delta x$，因变量的增量为

$ Delta y := f(x+Delta x) - f(Delta x) = f'(x)Delta x + o(Delta x) $

定义$y$的微分为

$ dif y := f'(x) Delta x $ <dif-y>

这便是课本上所谓的“$dif y$是$Delta y$的线性主部”．

= 一阶微分形式不变性

当$x$是*自变量*时，显然$Delta x = dif x$，@dif-y 可以写成

$ dif y &= f'(x) dif x $ <fxdx>

自然就有我们熟悉的

$ (dif y) / (dif x) &= f'(x) $

假如对一个*可微函数*积分，而不是一个自变量呢？当$y=f(u), u=g(x)$时

$ dif y &= f'(g(x))g'(x) dif x\ $

又因为 $dif u = g'(x) dif x$，

$ dif y &= f'(u)dif u $ <fudu>

把 @fxdx 和 @fudu 结合起来，就是*一阶微分形式不变性*，也就是说无论是对于可微函数还是自变量，我们总是可以把微分写成这种形式．

= 高阶微分

== 对自变量做微分

对自变量$x$做微分时，无论多少阶都可以写成

$ dif^n y = f^((n))(x) dif x^n $ <eq8>

证明：以二阶为例

$ d^2 y &= dif(dif y) &= dif(f'(x)dif x) $

由定义

$ dif (f'(x)dif x) = (f'(x)dif x)' dif x $

由于$dif x = Delta x$只是一个*常数*，而非函数，有

$ dif^2 y = (f'(x)dif x)' dif x = f''(x) dif x^2 $

#align(right)[$square.stroked.medium$]

也就是说我们熟悉的 $ f''(x) = (dif^2 y) / (dif x^2)$ 是正确的．

== 对可微函数做微分

然而，对可微函数做微分时，情况就不是这样了，若 $y = f(u), u = g(x)$，对于这种复合函数，可以采用最简单粗暴的方法，全部用$x$表示

$ dif^2 y = dif(dif y) &= dif(f'(g(x))g'(x)dif x)\
&=  (f'(g(x))g'(x) dif x)' dif x\
&=  f''(g(x))(g'(x))^2dif x^2 + f'(g(x))g''(x) dif x^2 $ <eq12>

由@eq8 ，有

$ g'(x)dif x = dif u $
$ g''(x) dif x^2 = dif^2 u $

代入 @eq12 有

$ dif^2 y &= f''(g(x))underline((g'(x)dif x))^2 + f'(g(x))underline(g''(x) dif x^2)\
&= f''(g(x)) dif u^2 + f'(u) dif^2 u
$

也就是说高阶微分并不具有形式不变性，多出了一项$f'(u)dif^2 u$．

= 多元函数

另外，多元函数也具有一阶微分形式不变性，即

$ dif z = (diff z) / (diff u) dif u + (diff z) / (diff v) dif v $ <eq16>

当$z = f(u, v)$, $f$具有连续偏导数，$u, v$是自变量时，@eq16 也成立．

当$z = f(u, v), u = phi(x, y), v = psi(x, y)$, $f, phi, psi$都具有连续偏导数时，@eq16 成立．

证明略．