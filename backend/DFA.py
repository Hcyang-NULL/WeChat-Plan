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

    def take(self):
        if self.pos == self.max:
            end()
        else:
            self.ch = self.text[self.pos]
            self.pos += 1

    def end(self):
        pass

    def NON(self):
        if _isNumber(self.ch):
            self.status = c.H
        else:
            self.status = c.D
        take()

    def D(self):
        while self.status == c.D:
            if _isNumber(self.ch):
                self.status = c.H
            else:
                pass
            take()

    def H(self):
        while self.status == c.H:
            if _isNumber(self.ch):
                pass
            elif self.ch == ':' or self.ch == '：':
                self.status = c.M
            elif self.ch == '点':
                self.status = c.T
            take()
    
    def T(self):
        if _isNumber(self.ch):
            self.status = c.M
        elif self.ch == '整':
            self.status = c.E
        elif self.ch == '半':
            self.status = c.E
        else:
            print('error')
        take()

    def M(self):
        while self.status == c.M:
            if _isNumber(self.ch):
                pass
            elif self.ch == '分':
                self.status = c.C
            elif self.ch == '-' or self.ch == '到':
                self.status = c.NON
            else:
                self.status = c.E
            take()
    
    def C(self):
        if self.ch == '-' or self.ch == '到':
            self.status = c.NON
        else:
            self.status = c.E
        take()
    
    def E(self):
        while self.status == c.E:
            if self.ch == ',' or self.ch == ';' or self.ch == '，' or self.ch == '。':
                self.status = c.NON
            else:
                pass
            take()
        

def analysis(text):
    t = token()
    t.init(text)

    while True:
        if t.status == c.NON:
            t.NON()
        elif t.status == c.D:
            t.D()