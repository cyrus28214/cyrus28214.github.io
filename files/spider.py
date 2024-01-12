import requests
from lxml import etree

headers = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
'Accept-Encoding': 'gzip, deflate, br', 
'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7', 
'Cache-Control': 'max-age=0', 
'Connection': 'keep-alive', 
'Host': 'quanben-xiaoshuo.com', 
'Referer': 'https://quanben-xiaoshuo.com/n/wozaishourendaludangjisi/', 
'Sec-Fetch-Dest': 'document', 
'Sec-Fetch-Mode': 'navigate', 
'Sec-Fetch-Site': 'same-origin', 
'Sec-Fetch-User': '?1', 
'Upgrade-Insecure-Requests': '1', 
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 
'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"', 
'sec-ch-ua-mobile': '?0', 
'sec-ch-ua-platform': '"Windows"', 
}

def getHTML(path, prefix=f'https://quanben-xiaoshuo.com/n/'):
    r = requests.get(prefix + path, headers=headers)
    return etree.HTML(r.text)

def getPageCount(name):
    r = getHTML(f'{name}/xiaoshuo.html')
    return len(r.xpath('//ul[@class="list"]/li'))

def getBookTitle(name):
    r = getHTML(f'{name}/xiaoshuo.html')
    return r.xpath('//h1[@class="title"]/text()')[0]

def getChapterTitle(name, page):
    r = getHTML(f'{name}/{page}.html')
    return r.xpath('//h1[@class="title"]/text()')[0]

def getChapter(name, page):
    r = getHTML(f'{name}/{page}.html')
    r = r.xpath('//div[@id="articlebody"]/p/text()')
    content = '\n'.join(['    '+para for para in r])
    title = getChapterTitle(name, page)
    return '\t' + title + '\n' + content


names = ('toutouyangzhixiaojinwu','wozaishourendaludangjisi')

for name in names:
    page_count = getPageCount(name)
    title = getBookTitle(name)
    with open(title + '.txt', 'w') as f:
        for i in range(1, page_count+1):
            print(f'正在下载 {title} {getChapterTitle(name, i)}')
            f.write(getChapter(name, i) + '\n')