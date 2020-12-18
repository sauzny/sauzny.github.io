var data = [{
    "task": "无限立通",
    "startTime": "2012-08-01",
    "endTime": "2013-05-01",
    "status": 4
}, {
    "task": "BJCA",
    "startTime": "2013-06",
    "endTime": "2014-02",
    "status": 3
}, {
    "task": "折800",
    "startTime": "2014-02",
    "endTime": "2015-07",
    "status": 2
}, {
    "task": "图森未来",
    "startTime": "2015-09",
    "endTime": "2017-07",
    "status": 1
}, {
    "task": "南大通用",
    "startTime": "2017-07",
    "endTime": "2018-10",
    "status": 0
}];

var values = ['BI研发', '广告/基础架构', '电商', '安全', '短信/邮件推广'];
data.forEach(function (obj) {
    obj.range = [obj.startTime, obj.endTime];
    obj.status = values[obj.status];
});

var chart = new G2.Chart({
    container: 'shijian_mountNode',
    forceFit: true
    //height: window.innerHeight
});
chart.source(data);

chart.coord().transpose().scale(1, -1);
chart.interval().position('task*range').color('status', ['#F3F781', '#28B463', '#FA5858', '#81BEF7', '#82E0AA']);
chart.render();