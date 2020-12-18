
function getTextAttrs(cfg) {
    return _.assign({}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic'
    }, cfg.style);
}

// 给point注册一个词云的shape
G2.Shape.registerShape('point', 'cloud', {
    drawShape: function drawShape(cfg, container) {
        var attrs = getTextAttrs(cfg);
        return container.addShape('text', {
            attrs: _.assign(attrs, {
                x: cfg.x,
                y: cfg.y
            })
        });
    }
});
$.getJSON('ciyun.json', function (data) {
    var dv = new DataSet.View().source(data);
    var range = dv.range('value');
    var min = range[0];
    var max = range[1];
    dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        //size: [window.innerWidth, window.innerHeight],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        // 旋转角度
        rotate: function rotate() {
            var random = ~~(Math.random() * 4) % 4;
            if (random == 2 || random == 3) {
              random = 0;
            }
            return random * 90; // 0, 90
        },
        fontSize: function fontSize(d) {
            if (d.value) {
                return (d.value - min) / (max - min) * (80 - 24) + 24;
            }
            return 0;
        }
    });
    var width = 500;
    var height = 500;
    if(window.innerWidth < 500){
        width = window.innerWidth - 60;
        height = height + 200;
    }
    var chart = new G2.Chart({
        container: 'ciyun_mountNode',
        padding: 0,
        width: width,
        height: height
    });
    chart.source(dv, {
        x: {
            nice: false
        },
        y: {
            nice: false
        }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
        showTitle: false
    });
    chart.coord().reflect();
    chart.point().position('x*y').color('category').shape('cloud').tooltip('category');
    chart.render();
});