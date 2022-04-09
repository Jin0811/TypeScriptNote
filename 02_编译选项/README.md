常用命令：
- `tsc fileName -w`：开启单文件监视，文件发生变化，会自动进行编译
- `tsc -init`：生成tsconfig.json文件

`tsconfig.json`
是ts的配置文件，如果目录当中存在这个文件，执行`tsc`时，会编译目录当中全部的ts文件
如果执行的是`tsc -w`，则会监视目录当中所有文件的改变
