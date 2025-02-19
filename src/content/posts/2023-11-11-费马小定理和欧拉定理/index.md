---
title: 费马小定理和欧拉定理
published: 2023-11-11
slug: fermat-and-euler-theorem
category: 数理
tags: [数学, 数论]
---

## 费马小定理

### 定义

若 $p$ 是素数，且 $\gcd(a,p) = 1$ ，则
$$a^{p-1} \equiv 1 \pmod{p}$$

另一种形式：若 $p$ 是素数，则
$$a^p \equiv a \pmod{p}$$

### 证明

构造集合 $A=\{1,2,\dots,p-1\}$ ，将集合中每一个数都乘以 $a$ 再模 $p$ ，即 $r_n=n\times a \bmod p$ ，得到新集合 $B=\{r_1,r_2,r_3,\dots,r_{p-1}\}$ 。

则有 $A = B$ ，这是因为 $\forall x,y \in A, \; x \neq y$ ，有 $ax-ay=a(x-y)\not\equiv 0 \pmod{p}$，即 $ax \not\equiv ay \pmod{p}$ ，故 $p-1$ 个 $r_n$ 互不相同。

于是就得到了 $B$ 其实也是 $\{1,2,\dots,p-1\}$，和 $A$ 一样。

所以
$$ 
1\times 2\times\dots\times(p-1)
\equiv a\times 2a\times\dots\times(p-1)a \pmod{p}
$$
即
$$
(p-1)! \equiv (p-1)!\times a^{p-1} \pmod{p}
$$
因为 $(p-1)!$ 与 $p$ 互质，可以两边都除以 $(p-1)!$ 即得证。

## 欧拉函数

在学习欧拉定理之前，需要先了解欧拉函数（欧拉，怎么到处都是你？）

### 定义

欧拉函数 $\varphi(n)$ 表示所有小于 $n$ 的数中与 $n$ 互质的数的个数。

### 性质

对于质数 $p$ ，由定义立即有 $\varphi(p) = p-1$

欧拉函数是积性函数，这意味着若 $\gcd(a,b)=1$ 有 $\varphi(a\times b) = \varphi(a)\times\varphi(b)$

还有很多有趣的性质，感兴趣可以自行了解。

## 欧拉定理

### 定义

若 $\gcd(a,m)=1$ ，则 
$$a^{\varphi(m)}\equiv1\pmod{m}$$

不难发现欧拉定理是费马小定理的推广，费马小定理是欧拉定理当 $m$ 为质数的特例。

### 证明

欧拉定理的证明也和费马小定理的证明很像，考虑所有小于 $m$ 与 $m$ 互质的数的集合 $\Phi=\{c_1,c_2,\dots,c_{\varphi(m)}\}$

再记 $a\Phi=\{ac_1,ac_2,\dots,ac_{\varphi(m)}\}$

同上，不难验证 $c_n$ 也是互异的，且 $c_n$ 与 $m$ 互质， $a\Phi$ 也是所有小于 $m$ 与 $m$ 互质的数的集合。所以

$$a\Phi=\Phi$$

接下来就顺理成章了

$$\prod_{i=1}^{\varphi(m)}i\equiv\prod_{i=1}^{\varphi(m)}ai\pmod{m}$$
$$a^{\varphi(m)}\equiv1\pmod{m}$$

*拓展学习：群论中的拉格朗日定理*

### 应用

由 $a^{\varphi(m)}\equiv1\pmod{m}$ 可以得到 
$$
a^n\equiv a^{n\bmod\varphi(m)}\pmod{m}
$$

- 在实际应用中，可以使用欧拉定理对指数降幂

$$
\begin{align*}
&19^{13202}\pmod{101} \\
\equiv& 19^{13202\bmod\varphi(101)}\\
\equiv& 19^{13202\bmod 100}\\
\equiv& 19^2\\
\equiv& 58
\end{align*}
$$

- 欧拉定理还可以应用到RSA加密算法中

## 拓展欧拉定理

刚刚的欧拉定理好是好，就是有一个条件 $\gcd(a,m)=1$ 假如不满足这个条件，可以吗？

### 定义

扩展欧拉定理：

$$
a^n\equiv
\begin{cases}
a^{n\bmod\varphi(m)}&\gcd(a,m)=1\\
a^n&\gcd(a,m)\neq 1,n<\varphi(m)\\
a^{(n\bmod\varphi(m))+\varphi(m)}&\gcd(a,m)\neq 1,n\geq\varphi(m)\\
\end{cases}
\pmod{m}
$$

也就是说，假如 $a,m$ 不互质且 $n$ 不够大，那降幂。假如 $a,m$ 不互质且 $n$ 足够大，可以降幂，但是需要在指数上多加一个 $\varphi(m)$

### 证明

扩展欧拉定理的证明相对就没有其他两个定理简单了，所以我<span style="color:grey;font-size:0.75em">咕咕咕</span>了

## 参考链接

[https://zh.wikipedia.org/zh-hans/%E8%B4%B9%E9%A9%AC%E5%B0%8F%E5%AE%9A%E7%90%86](https://zh.wikipedia.org/zh-hans/%E8%B4%B9%E9%A9%AC%E5%B0%8F%E5%AE%9A%E7%90%86)

[https://zh.wikipedia.org/zh-hans/%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86_(%E6%95%B0%E8%AE%BA)](https://zh.wikipedia.org/zh-hans/%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86_(%E6%95%B0%E8%AE%BA))

[https://oi-wiki.org/math/number-theory/fermat/](https://oi-wiki.org/math/number-theory/fermat/)

[https://oi-wiki.org/math/number-theory/euler-totient/](https://oi-wiki.org/math/number-theory/euler-totient/)