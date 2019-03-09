// @ts-nocheck
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var net = require('net');
let out = vscode.window.createOutputChannel("Socket Print");
const port = vscode.workspace.getConfiguration().get('socketPrint.port');
out.appendLine("正在监听端口：" + port);
out.show();
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "socket-console" is now active!');
    //模块引入

    var listenPort = port;//监听端口
    var server = net.createServer(function (socket) {
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

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
    // 	// The code you place here will be executed every time your command is executed

    // 	// Display a message box to the user
    // 	vscode.window.showInformationMessage('Hello nodejs and pyhton World!');
    // });


    // context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
