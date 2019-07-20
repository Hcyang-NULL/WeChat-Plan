# coding=utf-8 ##

from aiohttp import web
import os
import config as c
import requests
import pymysql as mysql
from DFA import analysis

async def analysisHandler(request):
    try:
        data = await request.json()
        text = data['text']
        date = data['date']

        res = analysis(text)

        with open(('./plans/%s.txt')%(date), 'w', encoding='utf-8') as f:
            for now in res:
                for i in range(len(now)):
                    if now[i] == '':
                        f.write('$$ ')
                    elif now[i] == ' ':
                        f.write('## ')
                    else:
                        f.write(now[i]+' ')
                f.write('\n')

        response_dict = {}
        response_dict['plan'] = res

        return web.json_response(response_dict)

    except Exception as e:
        print(e)

async def GetOpenidHandler(request):
    try:
        print('>> Openid Handler')
        json = await request.json()
        print('request openid')
        js_code = json["js_code"]
        app_id = c.app_id
        app_secret = c.app_secret
        grant_type = "authorization_code"
        url = "https://api.weixin.qq.com/sns/jscode2session?"
        url += ("appid="+app_id+"&")
        url += ("secret="+app_secret+"&")
        url += ("js_code="+js_code+"&")
        url += ("grant_type="+grant_type)
        res = requests.get(url)
        res = res.json()
        response_dict = {}
        print(res)
        if "errcode" in res:
            erro_code = res["errcode"]
            if erro_code != 0:
                response_dict["status"] = 303
                if erro_code == -1:
                    response_dict["msg"] = "busy"
                elif erro_code == 40029:
                    response_dict["msg"] = "invalid code"
                elif erro_code == 45011:
                    response_dict["msg"] = "too frequently"
                elif erro_code == 40013:
                    response_dict["msg"] = "invalid appid"
                elif erro_code == 40125:
                    response_dict["msg"] = "invalid appsecret"
                else:
                    response_dict["msg"] = "unknown erro"
        else:
            open_id = res["openid"]
            response_dict["status"] = 200
            response_dict["open_id"] = open_id
    except Exception as e:
        print(e)
        response_dict['status'] = 400
        response_dict['msg'] = '鏈煡閿欒'
    if 'open_id' in response_dict:
        print(response_dict['open_id'])
    return web.json_response(response_dict)

async def helloHandler(request):
    print('hello')
    return web.Response(text="Hello, world")

async def tomorrowHandler(request):
    try:
        data = await request.json()
        date = data['date']
        response_dict = {}

        if not os.path.isfile(('./plans/%s.txt')%(date)):
            response_dict['code'] = 904
            response_dict['plan'] = []
            return web.json_response(response_dict)
        
        result = []
        with open(('./plans/%s.txt')%(date), 'r', encoding='utf-8') as f:
            for line in f.readlines():
                temp = line.split(' ')
                temp = temp[:-1]
                for i in range(len(temp)):
                    if temp[i] == '$$':
                        temp[i] = ''
                    elif temp[i] == '##':
                        temp[i] = ' '
                result.append(temp)
        response_dict['plan'] = result
        response_dict['code'] = 200

        return web.json_response(response_dict)

    except Exception as e:
        print(e)
        response_dict['code'] = 500
        return web.json_response(response_dict)

async def storeHandler(request):
    try:
        data = await request.json()
        plan = data['plan']
        date = data['date']
        response_dict = {}

        with open(('./plans/%s.txt')%(date), 'w', encoding='utf-8') as f:
            for now in plan:
                print(now)
                for i in range(len(now)):
                    if now[i] == '':
                        f.write('$$ ')
                    elif now[i] == ' ':
                        f.write('## ')
                    else:
                        f.write(str(now[i])+' ')
                f.write('\n')

        response_dict['code'] = 200
        
        return web.json_response(response_dict)

    except Exception as e:
        print(e)

def init(app):
    app.router.add_get('/', helloHandler)
    app.router.add_post('/request_openid', GetOpenidHandler)
    app.router.add_post('/analysis', analysisHandler)
    app.router.add_post('/tomorrow', tomorrowHandler)
    app.router.add_post('/store', storeHandler)

if __name__ == "__main__":
    app = web.Application()
    init(app)
    web.run_app(app, host='127.0.0.1', port=19552)
