---
title: C++11方便又常用的特性
published: 2023-07-01
slug: cpp11-convenient-and-commonly-used-features
draft: false
category: 编程语言
tags: [C/C++, 编程语言]
---
不会吧，C++20都出了，不会还有人在学C++11的新特性吧（就是我）。这篇文章介绍一些C++11的方便的语法糖/特性。

## auto类型推导

这可以说是C++11中最方便最常用的特性了，一旦开始用就再也回不去了。

```cpp
    float foo();
    auto a = 3; // a的类型是int
    auto b = foo(); // b的类型是float
    auto c; // 报错，因为编译器无法推断出c的类型
```

这个特性在遍历stl容器的时候很好用，例：


```cpp
    std::vector<int> array;

    // 传统的方法很长很麻烦
    for(std::vector<int>::iterator it = array.begin(); it != array.end(); ++it){
        // do something
    }

    // 现在只需这样
    for(auto it = array.begin(); it != array.end(); ++it){
        // do something
    }
```

要注意`auto`可以用于函数返回值但不能用于函数参数

```cpp
auto foo(int a
  - int b){
    return a+b; // 则auto会自动推导为int
}

int bar(auto a, auto b); // 报错，因为编译器无法自动推导出a、b的类型，如果有这种需求就使用template吧
```

## 范围for循环

范围for循环又比上面提到的遍历容器的方式更简单了，上代码：

```cpp
for(int i : a){} // a可以是int[]、vector<int>、queue<double>等等，很灵活，甚至自己写的类只要定义了begin()、end()、++等函数也可以使用这个语法糖
for(int& i : a){} // 这样的话i是一个引用
for(auto& i : a){} // 结合上一个特性就有了究极偷懒的写法
```

## lambda表达式

python里面的lambda表达式实在是好用，C++11里面也有lambda表达式，不过C++毕竟是静态语言，用起来还是没有python里面的灵活。
格式：
```
    [捕获列表] (函数参数) mutable 或 exception 声明 -> 返回值类型 {函数体}
```

其中，捕获列表有：

- [] 表示不捕获任何变量
- [=] 表示按值传递的方法捕获父作用域的所有变量
- [&] 表示按引用传递的方法捕获父作用域的所有变量
- [=, &a] 表示按值传递的方法捕获父作用域的所有变量，但按引用传递的方法捕获变量a
- [&, a] 表示按引用传递的方法捕获父作用域的所有变量，但按值传递的方法捕获变量a

```cpp
#include<iostream>
#include<string>
#include<vector>
#include<algorithm>

int main(){
    // 例如要将下面的字符串从短到长排列
    std::vector<std::string> a = {"Alpha", "Charlie", "Echo", "Juliet"};

    std::sort(a.begin(), a.end(), [](auto &x, auto &y) auto {return x.length() < y.length();});

    for(auto& str : a){
        std::cout << str << std::endl;
    }

    /*
    输出结果：
    Echo
    Alpha
    Juliet
    Charlie
    */

    return 0;
}
```

## nullptr

C++11提供了`nullptr`关键字来代替以前的`NULL`。`NULL`的宏定义是`#define NULL ((void *)0)`，在隐式类型转换的时候会出现二义性。`nullptr`解决了这个问题，应该使用`nullptr`而不是`NULL`。
