#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2019/6/10 15:13
# @Author  : xingyue
# @File    : autoload.py

# 自动更新web 版本 破击v0登录限制

import os, re, time
import requests

webdir = os.path.abspath(os.path.join(os.path.dirname("__file__"), os.path.pardir)) + '/' + 'static/web'

gameurl = 'http://game.hanjiangsanguo.com/'

indexhtml = requests.get(gameurl).text
JSURL = re.search('src="(.*autoload.js.*?)"',indexhtml).group(1)


headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Host": "img2.hanjiangsanguo.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36"
}

v = time.strftime('%Y%m%d')
base_url = [
    'js/iscroll.js',
    'js/zepto.js',
    'js/zepto_fn.js']

def get_url():
    resutl = requests.get(JSURL, headers=headers)
    resutl.encoding = 'utf-8'
    staticUrl = re.search(r'staticUrl=\"(.*?)\"', resutl.text).group(1)
    basejs_list = eval(re.search(r'basejs_list=(.*?);', resutl.text).group(1)) + base_url
    for js in basejs_list:
        basename = os.path.basename(js)
        # 下载js文件
        js_url = staticUrl + '/' + js
        print js_url
        r = requests.get(js_url, headers=headers)
        dirname = os.path.dirname(js).replace('/', '\\')
        savepath = os.path.join(webdir, v, dirname, basename)
        if not os.path.exists(os.path.dirname(savepath)):
            os.makedirs(os.path.dirname(savepath))
        with open(savepath, 'wb') as f:
            if savepath.endswith('loginworld.js'):
                f.seek(0,0)
                f.write(re.sub(r'S.vip<5', 'S.vip<-1', r.content))
                continue
            f.write(r.content)

    # 处理修改字符串autoload

    autoload_text = re.sub(r'(B=xjs\()(staticUrl)(\+basejs_list\[A\])', '\\1localJS\\3', resutl.text)
    autoload_text = re.sub('(Platform\["loginurl"\]=\")(.*?)(\";)', '\\1http://127.0.0.1:5000/admin/web\\3',
                           autoload_text).encode('utf8')

    with open(os.path.join(webdir, v, 'js/autoload.js'), 'w+') as f:
        f.write('var localJS = "http://127.0.0.1:5000/static/web/%s/";'%v + autoload_text)

    webindex =  os.path.abspath(os.path.join(os.path.dirname("__file__"), os.path.pardir)) + '/' + 'templates/web/index.html'
    with open(webindex,'r+') as f:
        r = f.readlines()
        f.seek(0,0)
        for i in r:
            m =  re.sub(r'(.*web/)(\d+)(/js.*)',lambda m:m.group(1) +v+ m.group(3),i)
            f.write(m)
get_url()

