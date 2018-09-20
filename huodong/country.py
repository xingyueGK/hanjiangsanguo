#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/10 18:01
# @Author  : xingyue
# @File    : country.py

def jioncountry(self, name):  # 加入国家
    self.action(c='member', m='index')
    for i in range(1, 85):
        info = self.action(c='country', m='get_rank', page=i)
        for item in info["list"]:
            if item['name'] == name:
                print item['name'], name
                id = int(item['id'])
                print id
                self.action(c='country', m='apply', id=id)
                exit(3)