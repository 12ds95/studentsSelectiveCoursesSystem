var express = require('express');
var router = express.Router();
var Teacher = require('../models/Teacher');
var Department = require('../models/Department');
var assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
    // 左侧固定参数
    Teacher.getTeacherList(function (err, res) {
        console.log(res);
    });
    var leftTitle = '信息与动态';
    var leftImage = 'images/photo_teacher.png';
    var leftText = {
        '工号': '2333',
        '院系': '妓院妓院妓院'
    };
    // 右侧筛选器固定参数
    var filterNameData = [
        ['工号', 'id'],
        ['姓名', 'name'],
        ['学院', 'department']
    ];
    var filterOpData = [
        ['等于', '$eq'],
        ['不等于', '$ne'],
        ['包含', '$regex'],
        ['大于', '$gt'],
        ['小于', '$lt']
    ];
    // 渲染
    res.render('teacherManager',{
        title: '选课页',
        leftTitle: leftTitle,
        leftImage: leftImage,
        leftText: leftText,
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});

router.post('/tableData', function(req, res, next) {
    // TODO assume pageNum start from 1
    var pageNum = req.body['pageNum'];
    var query = req.body['query'];
    var pageSize = 20;
    getTeacherData(query,pageNum,pageSize,function(jsonn){
        res.json(jsonn);
    });
});
function getTeacherData(query,pageNum,pageSize,cb) {
    // 以下是后端数据库的函数：读取20位教师信息（不到20则以实际为准），返回教师总数
    // 返回值：result包，包括TotalItem标签的全部教师总数，和Data标签的[from,to]区间的教师工号、姓名、学院信息
    // result = get20Data(...)
    // 以下是前端伪造的数据
    // var result = {      // 这个是伪造数据，应删除（返回格式应与此一致）
    //     'Data': [
    //         {id:'1_1', name:'教师张三', department:'计算机科学与技术学院'},
    //         {id:'1_2', name:'教师李四', department:'信电'}
    //     ],
    //     'TotalItem': 4
    // };
    // 以上
    Teacher.getAPage(pageNum,pageSize,function(teachers){
        var result = {
            'Data': teachers
            , 'TotalItem': teachers.length
        };
        Teacher.getNumberofTeacher(pageSize,function(totalNumber){
            var jsonn = {};
            jsonn['PageTotal'] = parseInt((totalNumber-1) / 20 + 1);
            jsonn['Title'] = ['工号','姓名','学院'];
            jsonn['Content'] = [];
            jsonn['IsShow'] = [true, true, true];
            for (var i=0; i<result['Data'].length; i++) {
                jsonn['Content'].push({
                    '工号': result['Data'][i]['id'],
                    '姓名': result['Data'][i]['name'],
                    '学院': result['Data'][i]['department']
                });
            }
            cb(jsonn);
        });
    });    
}

router.post('/getData', function (req, res, next) {
    var ID = req.body['工号'];
    // 以下是后端数据库的函数：查找教师
    // 返回值：result包，包括该教师的所有信息
    // result = addData(...)
    Teacher.findOne({id:ID},function (err, result) {
        var jsonn = {};
        jsonn['工号'] = result['id'];
        jsonn['性别'] = result['ismale'] === true ? '男': '女';
        jsonn['姓名'] = result['name'];
        jsonn['学院'] = result['department'];
        jsonn['手机号码'] = result['phone_number'];
        jsonn['个人简介'] = result['info'];
        res.json(jsonn);
    });

});

router.post('/addData', function(req, res, next) {
    var ID = req.body['工号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var phone = req.body['手机号码'];
    var info = req.body['个人简介'];

    var teacher = new Teacher({
          name:req.body['姓名']
        , ismale:req.body['性别']
        , id:req.body['工号']
        , uname:req.body['工号'] //默认使用工号作为用户名
        , phone_number:req.body['手机号码']
        , info : req.body['个人简介']
        , department:department
    });
    teacher.save(function (err, save_res) {
        var status;
        var msg;
        if (err){ status = -1; msg = err;}
        else { status = 0; msg = "Add success!"}
        var jsonn = {};
        jsonn['status'] = status;
        jsonn['errMsg'] = msg;
        res.json(jsonn);
    });
    
});

router.post('/modifyData', function(req, res, next) {
    var ID = req.body['工号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var phone = req.body['手机号码'];
    var info = req.body['个人简介'];
    // 以下是后端数据库的函数：修改教师
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    Teacher.findOne({id:ID},function(err,teacher){
        teacher.name = name;
        teacher.ismale = (gender == '男');
        teacher.phone_number = phone;
        teacher.info = info;
        // delete dept-find here
        // update the teacher's department
        teacher.department = department;
        teacher.save(function(err,save_res){
            assert.equal(err,null);
            console.log('Teacher info update success!');
            var status,errmsg;
            if(err) { status = 1; errmsg = err;}
            else { status = 0; errmsg = null;}
                var jsonn = {};
                jsonn['status'] = status;
                jsonn['errMsg'] = errmsg;
                // return until update finish
                res.json(jsonn);
        });
        
    });
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['工号'];
    // 以下是后端数据库的函数：删除教师
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    Teacher.findOne({id:ID},function(err,teacher){
        assert.equal(err,null);
        teacher.remove(function(err,remove_res){
            var jsonn = {};
            if (err){jsonn['status'] = 1; jsonn['errMsg'] = err ;}
            else { jsonn['status'] = 0;jsonn['errMsg'] = null;}
            res.json(jsonn);
        });
    });
});

module.exports = router;
