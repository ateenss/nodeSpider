###后端数据库相关

1.采用mysql

2.采用sequelize这个ORM框架包裹连接mysql

3.config文件夹和model已经进行了初始化配置，直接在controller里面进行初始了，拿出来就可以进行异步化操控数据库
这个sequelize最大的功能就是进行异步化处理

4.passport是用来验证用户登录的，已经在config里面预先设置好，后面直接在登录验证的时候使用就可以了

