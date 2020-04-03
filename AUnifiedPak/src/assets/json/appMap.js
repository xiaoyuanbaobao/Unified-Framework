AppMap = function (container, config) {
    return {
        init: function () {
            this.container = container;
            this.cfg = config ? config : {};
			$(window).resize(function () {
				myApp.theApp.currentModule.onsize();
            });
        },
        loadData: function (config) {
            $('#' + this.container).html('<div class="psv-container"><div id="divMap"></div><div class="psv-panel"><div class="psv-panel-resizer"></div><div class="psv-panel-close-button"></div><div class="psv-panel-content"></div></div></div><div id="btnTip"><a href="javascript:;" style="border-radius: 36px!important;width: 36px;height: 36px;padding-top: 9px;" class="btn btn-circle btn-icon-only blue"><i class="fa fa-bar-chart"></i></a></div><div id="divTip"></div><div id="psv-marker" class="psv-marker psv-marker--normal has-tooltip psv-marker--visible" style="transform: translate3d(0px,0px, 0px); transform-origin: 50% 50% 0px;"></div>');
            $('#btnTip').bind(TUI.env.ua.clickEventUp, { handle: this }, function (e) {
                e.data.handle.openTip();
            });
            var closeBtn = $("#" + container).context.querySelector('.psv-panel-close-button');
            closeBtn.addEventListener('click', this.closePanel.bind(this));

            // Event for panel resizing + stop bubling
            var resizer = $("#" + container).context.querySelector(".psv-panel-resizer");
            resizer.addEventListener('mousedown', this.onMouseDown.bind($("#" + container)));
            resizer.addEventListener('touchstart', this.onTouchStart.bind($("#" + container)));
            $("#" + container).context.addEventListener('mouseup', this.onMouseUp.bind($("#" + container)));
            $("#" + container).context.addEventListener('touchend', this.onMouseUp.bind($("#" + container)));
            $("#" + container).context.addEventListener('mousemove', this.onMouseMove.bind($("#" + container)));
            $("#" + container).context.addEventListener('touchmove', this.onTouchMove.bind($("#" + container)));
            this.loadMap();
            this.loadTip();
            //this.loadKPIData();
        },
        loadMap:function(){
            $.ajax({
                    type: 'get',
                    url: 'srv/map/getMapArea.tjs',
                    dataType: "json",
                    context: this,
                    success: function (result) {
                        $('#divMap').empty();
                        result[2].point = {
                            events: {
                                click: function (e) {
                                    $.ajax({
                                        type: 'get',
                                        url: "srv/cyber/getNodeObjectPannel.ejs?fullTag=" + e.point.name,
                                        dataType: "html",
                                        context: myApp.theApp.currentModule,
                                        error: function (result) {
                                            this.showPanel((new Date()).Format("yyyy-MM-dd hh:mm:ss") + " 加载内容失败！<br>");
                                        },
                                        success: function (result) {
                                            this.closeTip();
                                            this.showPanel(result);
                                            this.showNodePannel(this, e.point.config, $("#" + myApp.theApp.currentModule.container).find(".psv-panel .psv-panel-content"));
                                        }
                                    });
                                }
                            }
                        };
                        $('#divMap').highcharts('Map', {
                            title: {
                                text: "北京工业大学",
                                style: { "color": "#94B2D0" }
                            },
                            chart: {
                                backgroundColor: "#182b43",
                            },
                            mapNavigation: {
                                enabled: true,
                                enableDoubleClickZoomTo: true
                            },
                            legend: {
                                align: 'right',
                                verticalAlign: 'top',
                                floating: true,
                                layout: 'vertical',
                                itemStyle: { "color": "#94B2D0" },
                                itemHoverStyle: { "color": "#1099EC" },
                                itemHiddenStyle: { "color": "#405775" },
                                backgroundColor: "#1D324F",
                                borderColor: "#405775",
                                borderWidth: 1,
                                shadow: false
                            },
                            exporting: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            series: result
                        });
                    }
                });
        },
        loadKPIData: function () {
            /*
            var Series = [];
            var startTime = new Date();
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Month?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalBuyMoney&groupby=GroupObject&GroupFullTag=" + this.cfg.GroupFullTag + "$&NodeObjectTag=RunKPI" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Month?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalBackMoney&groupby=GroupObject&GroupFullTag=" + this.cfg.GroupFullTag + "$&NodeObjectTag=RunKPI" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Month?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalFreeMoney&groupby=GroupObject&GroupFullTag=" + this.cfg.GroupFullTag + "$&NodeObjectTag=RunKPI" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Month?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalCancelMoney&groupby=GroupObject&GroupFullTag=" + this.cfg.GroupFullTag + "$&NodeObjectTag=RunKPI" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Day?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalEngery&NodeObjectTag=RunKPI&groupby=Time&GroupFullTag=" + this.cfg.GroupFullTag + "$" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Day?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalBuyMoney&NodeObjectTag=RunKPI&groupby=Time&GroupFullTag=" + this.cfg.GroupFullTag + "$" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Day?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalBackMoney&NodeObjectTag=RunKPI&groupby=Time&GroupFullTag=" + this.cfg.GroupFullTag + "$" });
            Series.push({ url: "/API/System/LCPS/Mining/Statistics/Day?startTime=" + startTime.Format("yyyy-01-01 00:00:00") + "&keyvalue=TotalCancelMoney&NodeObjectTag=RunKPI&groupby=Time&GroupFullTag=" + this.cfg.GroupFullTag + "$" });

            $.ajax({
                url: 'srv/map/getKPIData.tjs',
                data: { Series: TUI.JSON.encode(Series) },
                type: "post",
                dataType: "json",
                context: this,
                success: function (result) {
                    $('#column1').empty();
                    $('#column2').empty();
                    $('#column3').empty();
                    var ncount = 0;
                    var series1 = [{ type: "column", name: "日用电量", type: "column", data: [] }];
                    var series2 = [{ type: "spline", name: "支出电费", data: [] }, { type: "spline", name: "日净收入", data: [] }];
                    for (var i = 0; i < result[4].datas.data.length; i++) {
                        if (result[4].datas.data[i].value.DayMeasure != null) {
                            var dd = new Date(result[4].datas.data[i].year, result[4].datas.data[i].month - 1, result[4].datas.data[i].day, 0, 0, 0);
                            var dateTime = Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate(), dd.getHours(), 0, 0, 0);
                            var d = {
                                x: dateTime, name: result[4].datas.data[i].month + "月" + result[4].datas.data[i].day + "日",
                                y: TUI.Utils.floatPrecision(result[4].datas.data[i].value.DayMeasure, 2),
                            };
                            series1[0].data[ncount] = d;
                            var d = {
                                x: dateTime, name: result[4].datas.data[i].month + "月" + result[4].datas.data[i].day + "日",
                                y: TUI.Utils.floatPrecision(result[4].datas.data[i].value.DayMeasure * 0.51, 2),
                            };
                            series2[0].data[ncount] = d;
                            ncount++;
                        }
                    }

                    var ncount = 0;
                    for (var i = 0; i < result[5].datas.data.length; i++) {
                        if (result[5].datas.data[i].value.DayMeasure != null) {
                            var TotalBuy = result[5].datas.data[i].value.DayMeasure;
                            var TotalBack = result[6].datas.data[i].value.DayMeasure;
                            var TotalCancel = result[7].datas.data[i].value.DayMeasure;
                            var dd = new Date(result[5].datas.data[i].year, result[5].datas.data[i].month - 1, result[5].datas.data[i].day, 0, 0, 0);
                            var dateTime = Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate(), dd.getHours(), 0, 0, 0);
                            var d = {
                                x: dateTime, name: result[5].datas.data[i].month + "月" + result[5].datas.data[i].day + "日",
                                y: TUI.Utils.floatPrecision(TotalBuy - TotalBack - TotalCancel, 2),
                            };
                            series2[1].data[ncount] = d;
                            ncount++;
                        }
                    }
                    $('#column1').highcharts({
                        colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#f45b5b', '#91e8e1'],
                        chart: {
                            type: 'column',
                            zoomType: 'x',
                            backgroundColor: 'transparent',
                            margin: [30, 40, 20, 40]
                        },
                        title: {
                            text: new Date().getFullYear() + '年日用电量',
                            y: 5,
                            style: { "color": "#94B2D0", "fontSize": "14px" }
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m-%d',
                                year: '%Y-%m-%d'
                            },
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: null
                            },
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" },
                                format: '{value}'
                            },
                            stackLabels: {
                                style: { "color": "#94B2D0" },
                                enabled: true
                            }
                        },
                        tooltip: {
                            valueSuffix: ' 度'
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    color: '#94B2D0',
                                    enabled: false
                                },
                                borderWidth: 0
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: series1
                    });
                    var series = [{ type: "column", name: "总计", type: "column", data: [] }];
                    series[0].data.push({ y: result[0].datas.data[0].value.MonthMeasure, color: "#1099EC" });
                    series[0].data.push({ y: result[1].datas.data[0].value.MonthMeasure, color: "#D84C49" });
                    series[0].data.push({ y: result[2].datas.data[0].value.MonthMeasure, color: "#1BBFAF" });
                    series[0].data.push({ y: result[3].datas.data[0].value.MonthMeasure, color: "#DDBD45" });
                    $('#column2').highcharts({
                        colors: ['#1099EC', '#D84C49', '#1BBFAF', '#DDBD45', '#f15c80', '#e4d354', '#f45b5b', '#91e8e1'],
                        chart: {
                            type: 'column',
                            backgroundColor: 'transparent',
                            margin: [30, 40, 20, 40]
                        },

                        title: {
                            text: new Date().getFullYear() + '年购退电金额',
                            y: 5,
                            style: { "color": "#94B2D0", "fontSize": "14px" }
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" }
                            },
                            categories: ["购电金额", "退电金额", "配额金额", "核销金额"],
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: null
                            },
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" },
                                format: '{value}'
                            },
                            stackLabels: {
                                style: { "color": "#94B2D0" },
                                enabled: true
                            }
                        },
                        tooltip: {
                            valueSuffix: ' 元'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    color: '#94B2D0',
                                    enabled: false
                                },
                                borderWidth: 0
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: series
                    });
                    $('#column3').highcharts({
                        colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#f45b5b', '#91e8e1'],
                        chart: {
                            zoomType: 'x',
                            backgroundColor: 'transparent',
                            margin: [30, 40, 20, 40]
                        },
                        title: {
                            text: new Date().getFullYear() + '年收支平衡曲线',
                            y: 5,
                            style: { "color": "#94B2D0", "fontSize": "14px" }
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m-%d',
                                year: '%Y-%m-%d'
                            },
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" }
                            }
                        },
                        yAxis: {
                            title: {
                                text: null
                            },
                            gridLineColor: '#405775',
                            lineColor: "#94B2D0",
                            lineWidth: 1,
                            labels: {
                                style: { "color": "#94B2D0" },
                                format: '{value}'
                            },
                            stackLabels: {
                                style: { "color": "#94B2D0" },
                                enabled: true
                            }
                        },
                        tooltip: {
                            shared: true,
                            valueSuffix: ' 元'
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    color: '#94B2D0',
                                    enabled: false
                                },
                                borderWidth: 0
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: series2
                    });
                }
            });*/
        },
        showNodePannel: function (psv, config, pannel) {
            pannel.find('.make-switch').bootstrapSwitch();
            pannel.find('.btn').on(TUI.env.ua.clickEventUp, { handle: psv, config: config }, function (e) {
                if (this.id == "save") {
                    vlist = [];
                    for (var i = 0; i < e.data.config.ObjectAttr.length; i++) {
                        switch (e.data.config.ObjectAttr[i].AttrType) {
                            case "text":	//纯文本
                                {
                                    vlist[vlist.length] = {
                                        AttrType: 0,
                                        AttrTag: e.data.config.ObjectAttr[i].AttrTag,
                                        AttrValue: $('#' + e.data.config.ObjectAttr[i].AttrID).prop("value"),
                                        EnumKey: (e.data.config.ObjectAttr[i].EnumFlag ? $('#' + e.data.config.ObjectAttr[i].AttrID + ' option:selected').text() : "")
                                    };
                                }
                                break;
                            case "float":	//浮点型数字
                                {
                                    vlist[vlist.length] = {
                                        AttrType: 2,
                                        AttrTag: e.data.config.ObjectAttr[i].AttrTag,
                                        AttrValue: parseFloat($('#' + e.data.config.ObjectAttr[i].AttrID).prop("value")),
                                        EnumKey: (e.data.config.ObjectAttr[i].EnumFlag ? $('#' + e.data.config.ObjectAttr[i].AttrID + ' option:selected').text() : "")
                                    };
                                }
                                break;
                            case "int":	//整型数字
                                {
                                    vlist[vlist.length] = {
                                        AttrType: 3,
                                        AttrTag: e.data.config.ObjectAttr[i].AttrTag,
                                        AttrValue: parseInt($('#' + e.data.config.ObjectAttr[i].AttrID).prop("value")),
                                        EnumKey: (e.data.config.ObjectAttr[i].EnumFlag ? $('#' + e.data.config.ObjectAttr[i].AttrID + ' option:selected').text() : "")
                                    };
                                }
                                break;
                            case "bool":	//布尔型数字
                                {
                                    vlist[vlist.length] = {
                                        AttrType: 4,
                                        AttrTag: e.data.config.ObjectAttr[i].AttrTag,
                                        AttrValue: $("#" + e.data.config.ObjectAttr[i].AttrID).bootstrapSwitch("state"),
                                        EnumKey: ""
                                    };
                                }
                                break;
                        }
                    }
                    $.ajax({
                        url: "srv/webvr/setAttrValue.ejs",
                        data: { OpcPath: e.data.config.NodeFullTag, vlist: TUI.JSON.encode(vlist) },
                        type: "POST",
                        dataType: "json",
                        context: this,
                        error: function () {
                        },
                        success: function (result) {
                            if (!result.flag) {
                                toastr["warning"](result.info, "智能设备属性设置");
                                return;
                            }
                            $(".btn-group-justified").hide();
                        }
                    });
                }
                else if (this.id == "cancel") {
                    myApp.theApp.currentModule.showNodePannel(e.data.handle, e.data.config,pannel);
                }
                else if (this.id == "edit") {
                    $(".stethoscope").hide();
                    $(".product").hide();
                    $(".device").show();
                    $(".psv-home").hide();
                    $(".btn-group-justified").show();
                }
                else if (this.id == "cyber-home") {
                    $(".stethoscope").hide();
                    $(".product").hide();
                    $(".device").hide();
                    $(".psv-home").show();
                    $(".btn-group-justified").show();
                }
                else if (this.id == "refresh") {
                    $(".stethoscope").hide();
                    $(".product").hide();
                    $(".device").show();
                    $(".psv-home").hide();
                    //
                    $.ajax({
                        url: "srv/webvr/readMonitValue.ejs",
                        data: { OpcPath: e.data.config.NodeFullTag },
                        type: "POST",
                        dataType: "json",
                        context: this,
                        error: function () {
                        },
                        success: function (result) {
                            if (!result.flag) {
                                toastr["warning"](result.info, "智能设备即抄");
                            }
                        }
                    });
                    //
                    TUI.Comet.OnClose();
                    TUI.Comet.AddOPCSrv(e.data.config.NodeFullTag, myApp.theApp.currentModule.refreshNode(e.data.handle, e.data.config, pannel));
                    TUI.Comet.OnListen();
                }
                else if (this.id == "info") {
                    $(".stethoscope").hide();
                    $(".product").show();
                    $(".device").hide();
                    $(".psv-home").hide();
                }
                else if (this.id == "stethoscope") {
                    $(".stethoscope").show();
                    $(".product").hide();
                    $(".device").hide();
                    $(".psv-home").hide();
                }
                else if (this.id == "record") {
                    var NodeRecordInfo = $('#NodeRecordInfo').prop("value");
                    if (NodeRecordInfo == "") {
                        toastr["warning"]("必须输入点检设备状态描述信息", "人工设备点检");
                        return;
                    }
                    //
                    if (e.data.config.VideoID != "" && e.data.config.VideoID != undefined) {
                        var userTag = e.data.config.VideoID + (new Date()).Format("yyyyMMddhhmmss");
                        $.ajax({
                            type: 'PUT',
                            url: "/API/Video/" + e.data.config.VideoID,
                            data: { type: "video", saveFile: "/Upload/Video/" + userTag + ".mp4", frontSecond: 10, backSecond: 5 },
                            dataType: "json",
                            context: {
                                NodeFullName: e.data.config.NodeFullName,
                                NodeFullTag: e.data.config.NodeFullTag,
                                NodeID: e.data.config.NodeID,
                                RecordStatus: $('#NodeRecordStatus').prop("value"),
                                NodeRecordInfo: NodeRecordInfo,
                                VideoID: e.data.config.VideoID,
                                VideoFile: "/Upload/Video/" + userTag + ".mp4"
                            },
                            error: function (result) {
                                alert("远程服务故障，请检查网络或稍后再试！");
                            },
                            success: function (result) {
                                if (result.flag) {
                                    $.ajax({
                                        type: 'post',
                                        url: "srv/Inspect/pushNodeRecode.ejs",
                                        data: this,
                                        dataType: "json",
                                        error: function (result) {
                                            alert("远程服务故障，请检查网络或稍后再试！");
                                        },
                                        success: function (result) {
                                            if (result.flag) {
                                                $('#NodeRecordInfo').val("");
                                                var status = ['success', 'info', 'warning', 'danger', 'danger'];
                                                $(".stethoscope").append('<div class="alert alert-block alert-' + status[result.data.RecordStatus] + ' fade in">'
															+ '		<h4 class="alert-heading"><span style="float:left;">' + result.data.RecordName + '</span><span style="float:right;">' + TUI.Utils.dateMessage(result.data.RecordTime) + '</span></h4>'
															+ '		<br><p style="font-size:10.5pt;">' + result.data.RecordInfo + '</p>'
															+ '</div>');
                                                toastr["success"]("提交设备点检记录成功！", "人工设备点检");
                                            }
                                        }
                                    });
                                }
                                else {
                                    toastr["warning"](result.info, "人工视频监控");
                                }
                            }
                        });
                    }
                    else {
                        $.ajax({
                            type: 'post',
                            url: "srv/Inspect/pushNodeRecode.ejs",
                            data: { NodeFullName: e.data.config.NodeFullName, NodeFullTag: e.data.config.NodeFullTag, NodeID: e.data.config.NodeID, RecordStatus: $('#NodeRecordStatus').prop("value"), NodeRecordInfo: NodeRecordInfo },
                            dataType: "json",
                            context: e.data.handle,
                            error: function (result) {
                                alert("远程服务故障，请检查网络或稍后再试！");
                            },
                            success: function (result) {
                                if (result.flag) {
                                    $('#NodeRecordInfo').val("");
                                    var status = ['success', 'info', 'warning', 'danger', 'danger'];
                                    $(".stethoscope").append('<div class="alert alert-block alert-' + status[result.data.RecordStatus] + ' fade in">'
												+ '		<h4 class="alert-heading"><span style="float:left;">' + result.data.RecordName + '</span><span style="float:right;">' + TUI.Utils.dateMessage(result.data.RecordTime) + '</span></h4>'
												+ '		<br><p style="font-size:10.5pt;">' + result.data.RecordInfo + '</p>'
												+ '</div>');
                                    toastr["success"]("提交设备点检记录成功！", "人工设备点检");
                                }
                            }
                        });
                    }
                }
                else {
                    $.ajax({
                        type: 'post',
                        url: "srv/webvr/pushActionTask.ejs",
                        data: { OPCFilter: e.data.config.NodeFullTag, RuleID: this.id },
                        dataType: "json",
                        context: e.data.handle,
                        error: function (result) {
                            alert("远程服务故障，请检查网络或稍后再试！");
                        },
                        success: function (result) {
                            toastr["success"]("发送远程控制指令成功，控制状态可查询控制中心！", "远程控制服务");
                        }
                    });
                }
                return false;
            });
            //
            pannel.find('.chart-bar').on(TUI.env.ua.clickEventUp, { handle: psv, usedata: config, pannel: pannel }, function (e) {
                var idx = e.data.usedata.OPCValueMap[this.id];
                if (idx != undefined) {
                    e.data.valueConfig = {
                        datanode: e.data.usedata,
                        datavalue: e.data.usedata.OPCValueList[idx]
                    };
                    //
                    $.ajax({
                        type: 'get',
                        url: "srv/cyber/getValueObjectPannel.ejs?valuePath=" + e.data.usedata.NodeFullTag + "&valueTag=" + e.data.usedata.OPCValueList[idx].ValueTag,
                        dataType: "html",
                        context: e.data,
                        success: function (result) {
                            this.handle.showPanel(result);
                            //
                            myApp.theApp.currentModule.showValueChart(this.handle, this.valueConfig, this.pannel);
                        }
                    });
                }
                return false;
            });
            //
            pannel.find('.chart-line').on(TUI.env.ua.clickEventUp, { handle: psv, usedata: config, pannel: pannel }, function (e) {
                var idx = e.data.usedata.OPCValueMap[this.id];
                if (idx != undefined) {
                    e.data.valueConfig = {
                        datanode: e.data.usedata,
                        datavalue: e.data.usedata.OPCValueList[idx]
                    };
                    //
                    $.ajax({
                        type: 'get',
                        url: "srv/cyber/getValueObjectPannel.ejs?valuePath=" + e.data.usedata.NodeFullTag + "&valueTag=" + e.data.usedata.OPCValueList[idx].ValueTag,
                        dataType: "html",
                        context: e.data,
                        success: function (result) {
                            this.handle.showPanel(result);
                            //
                            myApp.theApp.currentModule.showValueChart(this.handle, this.valueConfig, this.pannel);
                        }
                    });
                }
                return false;
            });
            //
            pannel.find('.chart-gant').on(TUI.env.ua.clickEventUp, { handle: psv, usedata: config, pannel: pannel }, function (e) {
                var idx = e.data.usedata.OPCValueMap[this.id];
                if (idx != undefined) {
                    e.data.valueConfig = {
                        datanode: e.data.usedata,
                        datavalue: e.data.usedata.OPCValueList[idx]
                    };
                    //
                    $.ajax({
                        type: 'get',
                        url: "srv/cyber/getValueObjectPannel.ejs?valuePath=" + e.data.usedata.NodeFullTag + "&valueTag=" + e.data.usedata.OPCValueList[idx].ValueTag,
                        dataType: "html",
                        context: e.data,
                        success: function (result) {
                            this.handle.showPanel(result);
                            //
                            myApp.theApp.currentModule.showValueChart(this.handle, this.valueConfig, this.pannel);
                        }
                    });
                }
                return false;
            });
        },
        showPanel: function (content) {
            this.isShowPanel = true;
            $("#" + myApp.theApp.currentModule.container).find(".psv-panel").addClass("psv-panel--open");
            $("#" + myApp.theApp.currentModule.container).find(".psv-panel .psv-panel-content")[0].innerHTML = content;
            $("#" + myApp.theApp.currentModule.container).find(".psv-panel .psv-panel-content")[0].scrollTop = 0;

        },
        closePanel: function () {
            if (this.isShowPanel) {
                this.isShowPanel = false;
                $("#" + myApp.theApp.currentModule.container).find(".psv-panel").removeClass("psv-panel--open");
            }
        },
        onMouseDown: function (evt) {
            evt.stopPropagation();
            myApp.theApp.currentModule.startResize(evt);
        },
        onTouchStart: function (evt) {
            evt.stopPropagation();
            myApp.theApp.currentModule.startResize(evt.changedTouches[0]);
        },
        onMouseUp: function (evt) {
            if (this.prop("mousedown")) {
                evt.stopPropagation();
                $("#" + myApp.theApp.currentModule.container).prop("mousedown", false);
                //$("#" + container).context.classList.remove('psv-panel-content--no-interaction');
            }
        },
        onMouseMove: function (evt) {
            if (this.prop("mousedown")) {
                evt.stopPropagation();
                myApp.theApp.currentModule.resize(evt);
            }
        },
        onTouchMove: function (evt) {
            if (this.prop("mousedown")) {
                evt.stopPropagation();
                myApp.theApp.currentModule.resize(evt.touches[0]);
            }
        },
        startResize: function (evt) {
            $("#" + myApp.theApp.currentModule.container).prop("mouse_x", parseInt(evt.clientX));
            $("#" + myApp.theApp.currentModule.container).prop("mouse_y", parseInt(evt.clientY));
            $("#" + myApp.theApp.currentModule.container).prop("mousedown", true);
            //$("#" + container).context.classList.add('psv-panel-content--no-interaction');
        },
        resize: function (evt) {
            var x = parseInt(evt.clientX);
            var y = parseInt(evt.clientY);
            var width = $("#" + myApp.theApp.currentModule.container).find(".psv-panel")[0].offsetWidth - (x - $("#" + myApp.theApp.currentModule.container).prop("mouse_x"));
            $("#" + myApp.theApp.currentModule.container).find(".psv-panel").width(width);

            $("#" + myApp.theApp.currentModule.container).prop("mouse_x", x);
            $("#" + myApp.theApp.currentModule.container).prop("mouse_y", y);
        },
        showValueChart: function (psv, config, pannel) {
            var nodeInfo = config.datanode;
            var valueInfo = config.datavalue;
            //
            $('#chart_home').bind(TUI.env.ua.clickEventDown, { handle: psv, config: config, pannel: pannel }, function (e) {
                TUI.Comet.OnClose();
                //psv, config, pannel
                $.ajax({
                    type: 'get',
                    url: "srv/cyber/getNodeObjectPannel.ejs?fullTag=" + config.datanode.NodeFullTag,
                    dataType: "html",
                    context: myApp.theApp.currentModule,
                    error: function (result) {
                        this.showPanel((new Date()).Format("yyyy-MM-dd hh:mm:ss") + " 加载内容失败！<br>");
                    },
                    success: function (result) {
                        this.closeTip();
                        this.showPanel(result);
                        this.showNodePannel(this, config.datanode, $("#" + myApp.theApp.currentModule.container).find(".psv-panel .psv-panel-content"));
                    }
                });
                return false;
            });
            //
            if (valueInfo.ParamFlag == 1) {
                valueInfo.selDate = new Date();
                valueInfo.selDate.setHours(0, 0, 0, 0);
                if (valueInfo.DataUnit == "无")
                    valueInfo.DataUnit = "";
                myApp.theApp.currentModule.loadChartBar(nodeInfo.NodeID, nodeInfo.NodeFullTag, valueInfo);
                //
                $('#chart_prov').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                    e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", -3);
                    myApp.theApp.currentModule.loadChartBar(e.data.id, e.data.nodePath, e.data.valInfo);
                    return false;
                });
                //
                $('#chart_next').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                    e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", 3);
                    myApp.theApp.currentModule.loadChartBar(e.data.id, e.data.nodePath, e.data.valInfo);
                    return false;
                });
            }
            else {
                if (valueInfo.DataType != "布尔型") {
                    valueInfo.selDate = new Date();
                    valueInfo.selDate.setHours(0, 0, 0, 0);
                    if (valueInfo.DataUnit == "无")
                        valueInfo.DataUnit = "";
                    myApp.theApp.currentModule.loadChartLine(nodeInfo.NodeID, nodeInfo.NodeFullTag, valueInfo);
                    //
                    $('#chart_prov').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                        e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", -3);
                        myApp.theApp.currentModule.loadChartLine(e.data.id, e.data.nodePath, e.data.valInfo);
                        return false;
                    });
                    //
                    $('#chart_next').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                        e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", 3);
                        myApp.theApp.currentModule.loadChartLine(e.data.id, e.data.nodePath, e.data.valInfo);
                        return false;
                    });
                }
                else {
                    valueInfo.selDate = new Date();
                    valueInfo.selDate.setHours(0, 0, 0, 0);
                    if (valueInfo.DataUnit == "无")
                        valueInfo.DataUnit = "";
                    myApp.theApp.currentModule.loadChartGant(nodeInfo.NodeID, nodeInfo.NodeFullTag, valueInfo);
                    //
                    $('#chart_prov').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                        e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", -3);
                        myApp.theApp.currentModule.loadChartGant(e.data.id, e.data.nodePath, e.data.valInfo);
                        return false;
                    });
                    //
                    $('#chart_next').bind(TUI.env.ua.clickEventDown, { handle: this, id: nodeInfo.NodeID, nodePath: nodeInfo.NodeFullTag, valInfo: valueInfo }, function (e) {
                        e.data.valInfo.selDate = e.data.valInfo.selDate.DateAdd("d", 3);
                        myApp.theApp.currentModule.loadChartGant(e.data.id, e.data.nodePath, e.data.valInfo);
                        return false;
                    });
                }
            }
        },
        loadChartBar: function (id, nodePath, valInfo) {
            var domid = id;
            var startTime = valInfo.selDate.DateAdd("d", -2);
            var endTime = valInfo.selDate.DateAdd("d", 1);
            var unit = valInfo.DataUnit;
            var vname = valInfo.ValueName;
            $.ajax({
                url: "srv/webvr/getChartBar.ejs?NodeID=" + id + "&valTag=" + valInfo.ValueTag + "&startTime=" + startTime.Format("yyyy-MM-dd") + "&endTime=" + endTime.Format("yyyy-MM-dd"),
                dataType: "json",
                context: { id: id, valInfo: valInfo },
                success: function (result) {
                    $('#psv-marker-' + domid).find(".psv-chart").empty();
                    $('#psv-marker-' + domid).find(".psv-chart").highcharts({
                        chart: {
                            zoomType: 'x',
                            backgroundColor: 'transparent',
                            margin: [20, 15, 40, 50]
                        },
                        title: {
                            text: null,
                            style: { "color": "#fff" }
                        },
                        subtitle: {
                            text: null
                        },

                        xAxis: {
                            plotBands: [{
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 18, 0, 0)
                            }, {
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.DateAdd("d", 1).getFullYear(), startTime.DateAdd("d", 1).getMonth(), startTime.DateAdd("d", 1).getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.DateAdd("d", 1).getFullYear(), startTime.DateAdd("d", 1).getMonth(), startTime.DateAdd("d", 1).getDate(), 18, 0, 0)
                            }, {
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.DateAdd("d", 2).getFullYear(), startTime.DateAdd("d", 2).getMonth(), startTime.DateAdd("d", 2).getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.DateAdd("d", 2).getFullYear(), startTime.DateAdd("d", 2).getMonth(), startTime.DateAdd("d", 2).getDate(), 18, 0, 0)
                            }],
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m-%d',
                                year: '%Y-%m-%d'
                            },
                            labels: {
                                style: { "color": "#fff" }
                            }
                        },
                        yAxis: [{
                            min: 0,
                            gridLineWidth: 1,
                            gridLineColor: '#f7f7f7',
                            lineWidth: 1,
                            title: {
                                align: 'high',
                                rotation: 0,
                                offset: -25,
                                text: ''
                            },
                            labels: {
                                format: '{value}',
                                style: { "color": "#fff" }
                            },
                            stackLabels: {
                                enabled: true
                            }
                        }],
                        tooltip: {
                            formatter: function () {
                                return '<b>' + TUI.Utils.parseDate(Math.round(this.x / 1000) - 8 * 3600).Format("yyyy-MM-dd  hh:mm") + ' 到 ' + TUI.Utils.parseDate(Math.round(this.x / 1000) - 7 * 3600).Format("hh:mm") + '</b><br/>' +
                                    vname + ': ' + this.y + unit;
                            }
                        },
                        plotOptions: {
                            column: {
                                borderWidth: 0
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: result.series
                    });
                }
            });
        },
        loadChartLine: function (id, nodePath, valInfo) {
            var domid = id;
            var startTime = valInfo.selDate.DateAdd("d", -2);
            var endTime = valInfo.selDate.DateAdd("d", 1);
            var unit = valInfo.DataUnit;
            var vname = valInfo.ValueName;
            $.ajax({
                url: "srv/webvr/getChartLine.ejs?NodeID=" + id + "&valTag=" + valInfo.ValueTag + "&startTime=" + startTime.Format("yyyy-MM-dd") + "&endTime=" + endTime.Format("yyyy-MM-dd"),
                dataType: "json",
                context: { id: id, valInfo: valInfo },
                success: function (result) {
                    $('#psv-marker-' + domid).find(".psv-chart").empty();
                    $('#psv-marker-' + domid).find(".psv-chart").highcharts({
                        chart: {
                            type: 'spline',
                            zoomType: 'x',
                            backgroundColor: 'transparent',
                            margin: [20, 15, 40, 50]
                        },
                        title: {
                            text: null,
                            style: { "color": "#fff" }
                        },
                        subtitle: {
                            text: null
                        },

                        xAxis: {
                            plotBands: [{
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 18, 0, 0)
                            }, {
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.DateAdd("d", 1).getFullYear(), startTime.DateAdd("d", 1).getMonth(), startTime.DateAdd("d", 1).getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.DateAdd("d", 1).getFullYear(), startTime.DateAdd("d", 1).getMonth(), startTime.DateAdd("d", 1).getDate(), 18, 0, 0)
                            }, {
                                color: 'rgba(255,255,255,0.1)',
                                from: Date.UTC(startTime.DateAdd("d", 2).getFullYear(), startTime.DateAdd("d", 2).getMonth(), startTime.DateAdd("d", 2).getDate(), 8, 0, 0),
                                to: Date.UTC(startTime.DateAdd("d", 2).getFullYear(), startTime.DateAdd("d", 2).getMonth(), startTime.DateAdd("d", 2).getDate(), 18, 0, 0)
                            }],
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m-%d',
                                year: '%Y-%m-%d'
                            },
                            labels: {
                                style: { "color": "#fff" }
                            }
                        },
                        yAxis: [{
                            min: 0,
                            gridLineWidth: 1,
                            gridLineColor: '#f7f7f7',
                            lineWidth: 1,
                            title: {
                                align: 'high',
                                rotation: 0,
                                offset: -25,
                                text: ''
                            },
                            labels: {
                                format: '{value}',
                                style: { "color": "#fff" }
                            },
                            stackLabels: {
                                enabled: true
                            }
                        }],
                        tooltip: {
                            formatter: function () {
                                return '<b>' + TUI.Utils.parseDate(Math.round(this.x / 1000) - 8 * 3600).Format('yyyy-MM-dd  hh:mm:ss') + '</b><br/>' +
                                    vname + ': ' + this.y + unit;
                            }
                        },
                        plotOptions: {
                            spline: {
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 2
                                    }
                                },
                                marker: {
                                    enabled: false
                                },
                                pointInterval: 600000
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: result.series
                    });
                }
            });
        },
        loadChartGant: function (id, nodePath, valInfo) {
            var domid = id;
            var unit = valInfo.DataUnit;
            var selDate = valInfo.selDate;
            var tc = valInfo.selDate;
            tc.setHours(0, 0, 0, 0);
            var selDate = (tc.getDay() == 0 ? tc : tc.DateAdd("d", -tc.getDay()));
            //
            $.ajax({
                url: "srv/webvr/getChartGant.ejs?NodeID=" + id + "&valTag=" + valInfo.ValueTag + "&selDate=" + valInfo.selDate.Format("yyyy-MM-dd"),
                dataType: "json",
                context: { id: id, valInfo: valInfo },
                success: function (tasks) {
                    var series = [];
                    $.each(tasks.reverse(), function (i, task) {
                        var item = {
                            name: task.name,
                            data: []
                        };
                        //
                        $.each(task.intervals, function (j, interval) {
                            item.data.push({
                                x: interval.from,
                                y: i,
                                label: interval.label,
                                from: interval.from,
                                to: interval.to
                            }, {
                                x: interval.to,
                                y: i,
                                from: interval.from,
                                to: interval.to
                            });
                            // add a null value between intervals
                            if (task.intervals[j + 1]) {
                                item.data.push(
                                    [(interval.to + task.intervals[j + 1].from) / 2, null]
                                );
                            }
                        });
                        series.push(item);
                    });
                    // create the chart
                    $('#psv-marker-' + domid).find(".psv-chart").empty();
                    $('#psv-marker-' + domid).find(".psv-chart").highcharts({
                        chart: {
                            backgroundColor: 'transparent',
                            margin: [20, 15, 40, 90]
                        },
                        title: {
                            text: null,
                            style: { "color": "#fff" }
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                style: { "color": "#fff" }
                            }
                        },
                        yAxis: {
                            tickInterval: 1,
                            labels: {
                                formatter: function () {
                                    if (tasks[this.value]) {
                                        return tasks[this.value].name;
                                    }
                                },
                                style: { "color": "#fff" }
                            },
                            startOnTick: false,
                            endOnTick: false,
                            title: {
                                text: null
                            },
                            max: 6, // 定义统计值 最大值  
                            min: 0, // 定义最小值  
                            minPadding: 0.2,
                            maxPadding: 0.2
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + tasks[this.y].name + '</b><br/>' +
                                    Highcharts.dateFormat('%H:%M:%S', this.point.options.from) +
                                    ' - ' + Highcharts.dateFormat('%H:%M:%S', this.point.options.to);
                            }
                        },
                        plotOptions: {
                            line: {
                                lineWidth: 9,
                                //linecap:"square",
                                marker: {
                                    enabled: false
                                },
                                dataLabels: {
                                    color: '#94B2D0',
                                    enabled: true,
                                    align: 'left',
                                    formatter: function () {
                                        return this.point.options && this.point.options.label;
                                    }
                                }
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        series: series
                    });
                }
            });
        },
        loadTip:function(){
            var text = "";
            text += "<div  style=\"text-align: right;\">";
            text += "   <span id=\"btnClose\"><i class=\"fa fa-close\"></i>&nbsp;</span>";
            text += "</div>";
            $("#divTip").append(text);
            $("#divTip").append('<div class="row" style="margin:0;"></div>');

            var text = "";
            text += "<div class=\"col-sm-4\" style=\"padding: 0px;height:200px;\" id=\"column1\"></div><div class=\"col-sm-4\" style=\"padding: 0px;height:200px;\" id=\"column2\"></div><div class=\"col-sm-4\" style=\"padding: 0px;height:200px;\" id=\"column3\"></div>";
            $("#divTip .row").append(text);
            //
            $('#btnClose').bind(TUI.env.ua.clickEventUp, { handle: this }, function (e) {
                e.data.handle.closeTip();
            });
        },
        closeTip:function(){
            $("#divTip").animate({ bottom: '-240px' }, function (e) {
                $('#column1').stopTime();
                $("#divTip").empty();
            });
        },
        openTip: function () {
            this.closePanel();
            $("#divTip").animate({ bottom: '10px' }, function (e) {
                myApp.theApp.currentModule.loadTip();
                myApp.theApp.currentModule.loadKPIData();
            });
        },
		onsize: function () {
        },
		show: function (speed) {
            $('#' + this.container).show();
            this.loadData(config);
        },
        hide: function (speed) {
            $('#' + this.container).hide();
        },
        clear: function () {
            $('#' + this.container).empty();
        }
    }
};
