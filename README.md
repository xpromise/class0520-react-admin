# git指令
* 通过create-react-app创建项目
* github创建远程仓库
* 来到本地仓库，关联远程仓库
	* git remote add origin xxx
* 将本地仓库代码推送远程仓库保管
	* 本地先进行版本控制
		* git add . 将工作区文件全部添加到暂存区
		* git commit -m 'xxx' 将暂存区所有文件添加版本区进行版本控制
	* git push origin master

* 作为开发者。新建一个分支在进行开发。
	* git checkout -b dev 新建并切换到dev分支（会将当前分支的代码复制dev分支）
* 开发完成，提交代码
	* git add .
	* git commit -m 'xxx'
	* git push origin dev

* 大家第一次去公司，拉取公司代码
	* git clone xxx 
	* 克隆下来只有master分支，需要dev分支开发
		* git fetch origin dev1:dev2 拉取远程仓库dev1分支内容，到本地仓库dev2分支上