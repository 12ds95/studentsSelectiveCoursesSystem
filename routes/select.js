var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // 筛选器固定参数
    var filterNameData = [
        '课程名称',
        '课程代码',
        '教师名字',
        '课程类别',
        '上课时间',
        '上课地点',
        '学期'
    ];
    var filterOpData = [
        '包含',
        '不包含',
        '等于',
        '不等于',
        '始于',
        '并非起始于',
        '止于',
        '并非停止于'
    ];
    var classList = [{
        '课程代码': '0xcccc',
        '课程名称': 'Hello World',
        '课程网址': 'http://www.baidu.com/',
        '课程类别': 'CS',
        '学分': '12.0',
        '学期': '春夏秋冬',
        '详情': [{
            '教师名称': '程序猿',
            '上课时间': '周一',
            '上课地点': '世界一流大学'
        },{
            '教师名称': '程序媛',
            '上课时间': '周二',
            '上课地点': '三本大学'
        }],
        '课程信息': {
            '课程英文名称': 'English Name',
            '开课学院': 'Course Department',
            '周学时': '3.0-2.0',
            '权重系数': '1.0',
            '课程归属': '布吉岛',
            '预修要求': '无',
            '课程简介': '不存在的',
            '教学大纲': '无'
        }
    },{
        '课程代码': '烫烫烫烫',
        '课程名称': '錕斤洘哴',
        '课程网址': 'http://www.cc98.org/',
        '课程类别': 'bug',
        '学分': '0.0',
        '学期': '夏冬春秋',
        '详情': [{
            '教师名称': '虫子',
            '上课时间': '周三',
            '上课地点': '虫洞'
        },{
            '教师名称': '蛤蛤',
            '上课时间': '周四',
            '上课地点': '上海交通大学'
        }],
        '课程信息': {
            '课程英文名称': 'English Name',
            '开课学院': 'Course Department',
            '周学时': '3.0-2.0',
            '权重系数': '1.0',
            '课程归属': '布吉岛',
            '预修要求': '无',
            '课程简介': '不存在的',
            '教学大纲': '无'
        }
    }
    ];
    res.render('select',{
        title: '选课页',
        filterNameData: filterNameData,
        filterOpData: filterOpData,
        classList: classList
    });
});

module.exports = router;
