# socket-console README

通过建立socket服务，将接收到的内容打印到vscode的输出窗口。

目的是用于在vscode上显示robot framework的日志信息。

其他用途类似



## Robot Framework
RobotListener.py
```python 

# ecoding=utf-8
# Author: Sven_Weng
# Email : sven_weng@wengyb.com
# Web   : http://wybblog.applinzi.com
import socket


class RobotListener(object):
    ROBOT_LISTENER_API_VERSION = 2
    def __init__(self):
        self.sock = socket.socket()
        self.conn = self.sock.connect(("127.0.0.1", 57610))

    def start_suite(self, name, args):
        self._send_socket("Starting Suite : " + name + "  " + args['source'])

    def start_test(self, name, args):
        self._send_socket("Starting test : " + name)
        if args['template']:
            print 'Template is : ' + args['template']

    def end_test(self, name, args):
        self._send_socket("Ending test:  " + args['longname'])
        self._send_socket("Test Result is : " + args['status'])
        self._send_socket("Test Time is: " + str(args['elapsedtime']))

    def log_message(self, message):
        self._send_socket(message['timestamp'] + " :   " + message['level'] + " : " + message['message'])

    def _send_socket(self, msg):
        self.sock.sendall(msg)
```

```bat 
:: robot framework 运行一个文件并打印日志到57610端口
pybot.bat --listener RobotListener.py test.robot

```


## Extension Settings

设置方式：文件——首选项——设置——输入`socket print`，即可看到如下设置项

`socketPrint.port`:监听的端口号 

修改端口之后生效：`Ctrl+Shift+P` 之后输入`socket print`,选择socket print 确认即可生效

**Enjoy!**
