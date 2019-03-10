// @ts-nocheck
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var net = require('net');
let out = vscode.window.createOutputChannel("Socket Print");
var server;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "socket-console" is now active!');
    const port = vscode.workspace.getConfiguration().get('socketPrint.port');
    socketprint(port)
    context.subscriptions.push(vscode.commands.registerCommand('extension.Socketprint', function () {
        const port = vscode.workspace.getConfiguration().get('socketPrint.port');
        try {
            server.close()
        } catch (error) {
            console.log("server 未启动"+error)
        }
        socketprint(port)
    }));

    // context.subscriptions.push(disposable);
}

function socketprint(port) {
    out.appendLine("正在监听端口：" + port);
    out.show();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //模块引入

    var listenPort = port;//监听端口
    server = net.createServer(function (socket) {
        // 创建socket服务端
        out.appendLine('connect: ' + socket.remoteAddress + ':' + socket.remotePort);
        socket.setEncoding('binary');
        //接收到数据
        socket.on('data', function (data) {
            // console.log('client send:' + data);
            out.appendLine(data);
        });
        // socket.pipe(socket);
        //数据错误事件
        socket.on('error', function (exception) {
            console.log('socket error:' + exception);
            socket.end();
        });
        //客户端关闭事件
        socket.on('close', function (data) {
            out.appendLine('client closed!');
            // socket.remoteAddress + ' ' + socket.remotePort);
        });
    }).listen(listenPort);
    //服务器监听事件
    server.on('listening', function () {
        console.log("server listening:" + server.address().port);
    });
    //服务器错误事件
    server.on("error", function (exception) {
        console.log("server error:" + exception);
    });
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
