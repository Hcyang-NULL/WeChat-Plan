import config as c

def _isNumber(ch):
    if ch >= '0' and ch <= '9':
        return True
    return False

class token:
    def init(self, text):
        self.pos = 0
        self.max = len(text)
        self.text = text
        self.ch = ''
        self.status = c.NON
        
        self.token = ''
        self.sg_apm = 0 # 1:am 2:pm
        self.apm = ''
        self.sg_setime = 0 # 0:start-time 1:end-time 
        self.shour = ''
        self.smin = ''
        self.ehour = ''
        self.emin = ''
        self.sg_half = 0 # 1:half-hour 2:zero-hour

        self.result = []
        self.now = []

    def sg_init(self):
        self.sg_apm = 0 # 1:am 2:pm
        self.apm = ''
        self.sg_setime = 0 # 0:start-time 1:end-time 
        self.shour = ''
        self.smin = ''
        self.ehour = ''
        self.emin = ''
        self.sg_half = 0 # 1:half-hour 2:zero-hour

    def trans_APM(self):
        self.apm = self.token
        self.token = ''
        if '早' in self.apm or '晨' in self.apm or "上午" in self.apm:
            self.sg_apm = 1
        elif '中午' in self.apm or '下午' in self.apm or '晚' in self.apm:
            self.sg_apm = 2
        else:
            print(('无法识别时间段为AM或PM: %s')%(self.apm))

    def trans_hour(self):
        if self.sg_setime == 0:
            self.shour = self.token
        else:
            self.ehour = self.token
        self.token = ''

        if self.sg_setime == 0:
            # No APM-mode
            if self.sg_apm == 0:
                self.now.append(self.shour)
            else:
                temp = int(self.shour)
                # AM-mode
                if self.sg_apm == 1:
                    self.now.append(str(temp))
                # PM-mode
                else:
                    if temp < 12:
                        temp += 12
                    self.now.append(str(temp))
        else:
            self.now.append('-')
            # No APM-mode
            if self.sg_apm == 0:
                self.now.append(self.ehour)
            else:
                temp = int(self.ehour)
                # AM-mode
                if self.sg_apm == 1:
                    self.now.append(str(temp))
                # PM-mode
                else:
                    if temp < 12:
                        temp += 12
                    self.now.append(str(temp))

    def trans_min(self):
        temp = int(self.token)
        if temp < 0 or temp > 60:
            print('分钟数超出范围')
            exit(1)

        self.now.append(':')
        if self.sg_setime == 0:
            self.smin = self.token
            self.now.append(self.smin)
        else:
            self.emin = self.token
            self.now.append(self.emin)
        self.token = ''

    def trans_event(self):
        self.now.append(' ')
        self.now.append(self.token)
        self.token = ''

    def take(self):
        if self.pos == self.max:
            self.end()
        else:
            self.ch = self.text[self.pos]
            self.pos += 1

    def end(self):
        self.status = c.END

    def NON(self):
        if self.sg_setime == 0:
            self.sg_init()
        self.token += self.ch
        if _isNumber(self.ch):
            self.status = c.H
        else:
            self.status = c.D
        self.take()

    def D(self):
        while self.status == c.D:
            if _isNumber(self.ch):
                self.status = c.H
                self.trans_APM()
                self.token += self.ch
            else:
                self.token += self.ch
            self.take()

    def H(self):
        while self.status == c.H:
            if _isNumber(self.ch):
                self.token += self.ch
            elif self.ch == ':' or self.ch == '：':
                self.status = c.M
                self.trans_hour()
            elif self.ch == '点':
                self.status = c.T
                self.trans_hour()
            self.take()
    
    def T(self):
        if _isNumber(self.ch):
            self.status = c.M
            self.token += self.ch
        elif self.ch == '整':
            self.status = c.Y
            self.now.append(':')
            self.now.append('00')
        elif self.ch == '半':
            self.status = c.Y
            self.now.append(':')
            self.now.append('30')
        else:
            print('error')
        self.take()

    def Y(self):
        if self.ch == '-' or self.ch == '到':
            self.status = c.NON
            self.sg_setime = 1
        else:
            self.status = c.E
            self.token += self.ch
            if self.sg_setime == 0:
                for i in range(4):
                    self.now.append('')
        self.take()

    def M(self):
        while self.status == c.M:
            if _isNumber(self.ch):
                self.token += self.ch
            elif self.ch == '分':
                self.status = c.C
                self.trans_min()
            elif self.ch == '-' or self.ch == '到':
                self.status = c.NON
                self.trans_min()
                self.sg_setime = 1
            else:
                self.status = c.E
                self.trans_min()
                self.token += self.ch
                if self.sg_setime == 0:
                    for i in range(4):
                        self.now.append('')
            self.take()
    
    def C(self):
        if self.ch == '-' or self.ch == '到':
            self.status = c.NON
            self.sg_setime = 1
        else:
            if self.sg_setime == 0:
                for i in range(4):
                    self.now.append('')
            self.status = c.E
            self.token += self.ch
        self.take()

    def E(self):
        while self.status == c.E:
            if self.ch == ',' or self.ch == ';' or self.ch == '，' or self.ch == '；' or self.ch == '。':
                self.status = c.NON
                self.trans_event()
                
                last = self.now[-1]
                if '(' in last:
                    temp = last.index('(')
                elif '（' in last:
                     temp = last.index('（')
                else:
                    temp = -1
                if temp != -1:
                    detail = last[temp:]
                    last = last[0:temp]
                    self.now[-1] = last
                    self.now.append(detail)
                else:
                    self.now.append('')

                print(len(self.now), end='')
                print(self.now, end='')
                print('        ', end='')
                print(''.join(self.now))

                self.result.append(self.now)
                self.sg_setime = 0
                self.now = []
            else:
                self.token += self.ch
            self.take()
        

def analysis(text):
    t = token()
    t.init(text)

    t.take()
    while True:
        if t.status == c.NON:
            t.NON()
        elif t.status == c.D:
            t.D()
        elif t.status == c.H:
            t.H()
        elif t.status == c.M:
            t.M()
        elif t.status == c.T:
            t.T()
        elif t.status == c.E:
            t.E()
        elif t.status == c.C:
            t.C()
        elif t.status == c.Y:
            t.Y()
        elif t.status == c.END:
            break
    
    print('>> analysis success')
    return t.result

# if __name__ == "__main__":
#     text = '早上6:40起床，7:10-7:30早餐；8点半到下午4点25分学习。12点20分到下午2点整午休（好好睡觉），晚上11点半睡觉。'
#     analysis(text)