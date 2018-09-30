#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/21 11:37
# @Author  : xingyue
# @File    : userinfo.py



from huodong.task.base import SaoDangFb

class task(SaoDangFb):
    def userinfo(self):
        try:
            info = self.action(c='blackmarket', m='index')  # 获取黑市首页
            memberInfo = self.action(c='member', m='index')
            try:
                country = self.action(c='country', m='get_member_list')['country']
                if country:
                    countryName = country['name']
                else:
                    countryName = None
            except:
                countryName = None
            name = memberInfo['nickname']  # 账号
            level = memberInfo['level']  # 等级
            act = memberInfo['act']  # 军令
            silver = memberInfo['silver']  # 银币
            gold = memberInfo['gold']  # 元宝
            vip = memberInfo['vip']
            reputation = memberInfo['reputation']  # 声望
            userlist = [self.user, name, level, vip, countryName, act, silver, gold, info['info']['get2'],
                        info['info']['get3'],
                        reputation]
            return userlist
        except:
            return [self.user,self.passwd,0,0,0,0,0,0,0,0,0]

def userinfo(user,passwd,addr,*args,**kwargs):
    action = task(user,passwd,addr)
    result = action.userinfo()
    return result
