# studentsSelectiveCoursesSystem

In the working directory, use
`npm install`
to install dependencies

use 
`bower install` 
to install bootstrap

You have to install mongoDB to use this web app, if you have mongoDB, 
use command line
`mongod`
to run mongoDB before you run this webapp

# issue 1
* 直接把department改成字符串，取消这个表

# studentsSelectiveCoursesSystem

In the working directory, use
`npm install`
to install dependencies

use 
`bower install` 
to install bootstrap

*(Although, the dependencies are included in this project)*

You have to install mongoDB to use this web app, if you have mongoDB, 

use command line

`mongod`
to run mongoDB before you run this webapp

## 现在仍需要实现的功能：
* 学生的credit还没有计算
* 访问到不属于自己的路由的时候，该如何处理
* teacher 中查看课表的时候，还不能选择学期
* 选课中的筛选功能
* teacher 中pickStudent的功能需要从请求中获取数据
* reviewclass 中的搜索功能

## 正在进行的工作

## 新增的功能
* 管理员 - 完成了学生管理的测试
* 管理员 - 完成了教师管理的测试
* 管理员 - 完成了通知管理的测试


### Previous Commit
* 获取用户类型的函数中需要添加管理员类型 - 可以返回0，表示管理员
* teacher 中查看一个老师的所有课表
* select 选课页面 尚未实现
* admin/reviewapplyforclass中的内容完成
* applyforClass 完成
* reselect 补选页面
* 实现了changepw/personalinfo中的功能 - 可能有bug
* curriculum中显示课表的内容要与相应的学生挂钩
* /teacher/pickStudents/delete 功能实现
* bySelection 弃用 - 删除
* 弃用了User路由
* student 页面，显示学生的个人信息
* personalInfo 中提取个人信息，修改个人信息，
* noticeManager中全部的与News有关的操作
* Notice 与 News 暂时当做同一个东西了，不知道是否可以？
* 实现index中获取新闻
* 经过检查，密码比对的功能是正常的
* teacherManager添加老师的时候，也应该在User中添加对应的用户
* studentManager 页面的数据库跑通
* 把用到department的部分基本改成了字符串
* 重新实现了按页查找，可以使用getAPage(pageSize)函数来进行操作
* index中用户登录的时候，密码的匹配算法有问题。无法正常的登录

## 需要调试的bug
* 管理员点击首页直接退到了登录界面
* 手动输入路由/admin 无法加载图片
* 教师管理 无法添加教师
* 公共信息原理 无法添加课程？
### 之前的bug
* schema/teacher.js 中，无法添加新的User - 会在 teacherManager中添加老师的时候体现出来 也就是teacherManager无法添加老师
* schema/student.js 中，无法添加新的User，导致无法添加新的学生
* schema/student.js 中 pre('save')中不知道为什么this是空的
* 还没有处理一个学生选两次课的问题

## 需要协作完成的
* teacherManager删除和修改教师的测试 - 需要从master合并
* reselect/submit 界面中，返回一个课程id吧
