const log4js = require('log4js');

log4js.configure({
    appenders: {
        stdout: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}]<%c>[==%m==]%n',
            }
        },//设置是否在控制台打印日志
        req: {//请求日志
            type: 'dateFile',
            filename: 'logs/req',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}]<%c>[==%m==]%n',
            }
        },
        err: {//错误日志
            type: 'dateFile',
            filename: 'logs/err',
            maxLogSize: 31457280, //3M
            pattern: '-yyyy-MM-dd.log',
            keepFileExt: true,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}]<%c>[==%m==]%n',
            }
        },
        sys: { //系统操作日志
            type: 'dateFile',
            filename: 'logs/info',
            maxLogSize: 61457280, //6M
            pattern: '-yyyy-MM-dd.log',
            keepFileExt: true,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}]<%c>[==%m==]%n',
            }
        },
    },
    categories: {
        default: {appenders: ['stdout'], level: 'debug'},
        err: {appenders: ['err', 'stdout'], level: 'error'},
        sys: {appenders: ['sys', 'stdout'], level: 'info'},
    }
});

exports.getLogger = (name) => {
    return log4js.getLogger(name);
};

exports.getLogId = () => {
    const mydate = new Date();
    return 'cms' + mydate.getDay() + mydate.getHours() +
        mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds();
};