---
title: 实现常用排序算法
published: 2023-09-20 13:34:51
slug: implement-common-sorting-algorithms
draft: false
tags: [算法, C/C++, 快速排序, 归并排序, 堆排序]
category: 算法
---

博客目前还没什么内容，水点经典的排序算法吧。

## 快速排序

### 简介

快速排序(Quick Sort)是非常常用的排序算法，平均时间复杂度为$O(n \log n)$，最坏复杂度$O(n^2)$，是一种不稳定排序。虽然有$O(n^2)$的最坏复杂度，但是快排在实践中的效率通常优于其他算法，这也是c++中的`std::sort`主要使用快排进行排序的原因（`std::sort`是混合排序算法，并非单一的快排，有空会出一篇文章解析一下其源码）

快排是典型的分治算法，快排选取一个基准值将数组按大小分成两份，一份大于基准值，一份小于基准值，然后对这两份分别递归地进行排序。

在具体实现中，通常用双指针完成这个划分操作，维护两个指针i、j，1到i-1储存$\leq$pivot的数，j+1到n储存$\geq$pivot的数，然后让i往前，j往后，如果i、j指向的两个元素都不符合条件只需要让两个元素交换就行了，一直移动i、j指针直到两个指针相遇，即完成了划分，然后再递归地进行。

### 实现

```cpp
void quickSort(int *begin, int *end){
    if(end - begin < 2) return;
    int pivot = *(begin + (end - begin) / 2); //取中间元素的值为基准值，也可以选取首元素或尾元素等。
    int *i = begin, *j = end - 1;
    while(true){
        while(*i < pivot) ++i; //i递增时无需判断i < j，因为选取的pivot在原数组中，而且j右边的元素都大于等于pivot。
        while(pivot < *j) --j; //只要遇到pivot或者j右边的元素，i就会停下来。反之，j递减时同理。
        if(!(i < j)){ //递归地排序
            quickSort(begin, i); //1 ~ i-1 的元素都满足小于等于pivot
            quickSort(j+1, end); //j+1 ~ n 的元素都满足大于等于pivot
            return;
        }
        std::iter_swap(i, j); //相当于swap(*i, *j)
        ++i; --j; //交换后一定满足*i <= pivot，*j  >= pivot，因此移动指针。
    }
}
```

## 归并排序

### 简介

归并排序排序(Merge Sort)与快速排序不同，它是一种稳定排序（Stable Sort），也就是说，对于数组中相等的元素，归并排序可以保证它们排序后相对位置不改变。由于我们用整数int的数组的排序作例子，这个特点并不能很好地表现出来，实际上在某些场景中这个性质很重要，因此c++特别地在`std::sort`之外提供了一个稳定排序算法`std::stable_sort`。

归并排序也是分治算法，归并排序重复进行合并操作，不断地将两个排序好的数组合并成一个排序好的数组，最终完成整个数组的排序。归并排序有两种实现，一种是空间复杂度$O(1)$的原地（In-place）算法，另一种需要额外$O(n)$的空间。

不使用额外空间的归并排序需要用到一个叫做手摇算法（Block Swap Algorithm/内存反转算法/三重反转算法）的技巧来交换数组中的两块内存，这会引入大量的变量交换操作从而增加算法消耗的时间，甚至有可能使归并排序退化到$O(n^2)$，本质上是一种时间换空间的方法，这里不多做介绍。较为常用的还是非原地的常规写法，这里也用这种实现方法来演示。

非原地版本的归并排序的平均、最坏时间复杂度都是$O(n \log n)$，非常优秀，但是实践中往往比快速排序慢上不少。

### 实现

```cpp
void mergeSort(int *begin, int *end){
    if(end - begin < 2) return; 
    int *mid = begin + (end - begin) / 2;
    mergeSort(begin, mid); 
    mergeSort(mid, end); //先将数组划分为两份，每份进行排序后再合并。
    int *tmp = new int[end - begin]; //申请额外的空间来临时存放合并后的结果
    int *i = begin, *j = mid, *k = tmp;
    while(i < mid && j < end) //只要两个部分都还有元素就一直比较，取较小的元素放进tmp中。
        if(*j < *i) *(k++) = *(j++); //这样的写法相当于 {*k = *j; ++k; ++j;}
        else *(k++) = *(i++);
    while(i < mid) *(k++) = *(i++); //退出上面的while循环后，两部分应该一个为空，一个非空
    while(j < end) *(k++) = *(j++); //将非空的那个全部放到tmp中
    memcpy(begin, tmp, (end - begin) * sizeof(int)); //将tmp中的元素拷贝回原位。
    delete tmp; //删除申请的空间，防止内存泄露
    return;
}
```

## 堆排序

### 简介

堆排序就是利用堆进行排序，如果对堆这种数据结构不熟悉可以看一看我的[这篇](/posts/heap-explanation/)文章。

堆排的思想很简单，就是在需要排序的数组上建立堆，然后执行`pop`操作，直到堆为空，因为每次`pop`出来的元素都是堆中的最大/最小值，所以可以保证出来的元素有序。堆排也是一种不稳定排序，时间复杂度$O(n \log n)$。堆排序相比于先前两种排序的优势是它不需要递归，堆排序使用了更少的栈空间，防止因递归层数过多引发的低效（尤其是对于快排来说）。

### 实现

只要实现了堆的代码，堆排就很简单了。

```cpp
class Heap{
        inline int& _get(int node); //_get不能暴露给用户，因为可能使值被修改导致堆性质被破环。
    public:
        std::vector<int> tree;
        Heap(){};
        Heap(std::vector<int>& vec);
        inline int size();
        inline int top();
        inline int get(int node);
        bool isValid(int node);
        void shiftUp(int node);
        void shiftDown(int node);
        void push(int val);
        void pop();
        void remove(int node);
        void set(int node, int val);
    
};

Heap::Heap(std::vector<int>& vec){
    tree =  vec;
    for(int i = size()>>1; i; --i){
        shiftDown(i);
    }
}

inline int Heap::size(){
    return tree.size();
}

inline int Heap::top(){
    if(size() == 0) throw "堆不能为空";
    return get(1);
}

inline int Heap::get(int node){
    if(!isValid(node)) throw "无效节点";
    return tree[node-1];
}

inline int& Heap::_get(int node){
    if(!isValid(node)) throw "无效节点";
    return tree[node-1];
}

bool Heap::isValid(int node){
    return node >= 1 && node <= size();
}

void Heap::shiftUp(int node){ //传入要调整的节点编号
    while(node > 1 && _get(node>>1) < _get(node)){ //如果不是根节点而且父节点小于自己就交换自己和父节点
        std::swap(_get(node>>1), _get(node));
        node >>= 1;
    }
}

void Heap::shiftDown(int node){
    while((node<<1|1) <= size()){ //如果有两个孩子
        int max_chd = _get(node<<1) > _get(node<<1|1) ? node<<1 : node<<1|1; //取较大的孩子
        if(_get(max_chd) > _get(node)){
            std::swap(_get(max_chd), _get(node));
            node = max_chd;
        }
        else break;
    }
    if(node<<1 == size() && _get(node<<1) > _get(node)){ //最后可能出现只有一个子节点的情况，单独判断
        std::swap(_get(node<<1), _get(node));
    }
}

void Heap::push(int val){
    tree.push_back(val);
    shiftUp(size());
}

void Heap::pop(){
    if(size() == 0) throw "堆不能为空";
    if(size() == 1){
        tree.pop_back();
        return;
    }
    std::swap(_get(1), _get(size()));
    tree.pop_back();
    shiftDown(1);
}

void Heap::remove(int node){
    if(size() == 0) throw "堆不能为空";
    while(node > 1){ //向上交换到根节点
        std::swap(_get(node>>1), _get(node));
        node >>= 1;
    }
    pop();
}

void Heap::set(int node, int val){
    if(val > _get(node)){
        _get(node) = val;
        shiftUp(node);
    }
    if(val < _get(node)){
        _get(node) = val;
        shiftDown(node);
    }
}

//以上的代码在简介里的那篇文章中有讲解

void heapSort(int *begin, int *end){
    std::vector vec(begin, end);
    Heap hp(vec);
    for(int *p = begin; p != end; ++p){
        *p = hp.top();
        hp.pop();
    }
}

```
