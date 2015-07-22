/**
 * Created by stan on 6/18/15.
 */
'use strict';
angular.module('ngAmchart')
    .factory('AmChartFactory', function () {
        var column3dOptions = {
                "theme": "light",
                "type": "serial",
                "valueAxes": [{
                    "stackType": "3d",
                    "unit": "",
                    "position": "left"
                }],
                "startDuration": 1,

                "plotAreaFillAlphas": 0.1,
                "depth3D": 60,
                "angle": 30,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "export": {
                    "enabled": true
                }
            },

            columnOptions = {
                "type": "serial",
                "theme": "light",
                "valueAxes": [{
                    precision: 0,
                    "minimum": 0,
                    "axisAlpha": 0,
                    "dashLength": 4,
                    "position": "left"
                }],
                "startDuration": 1,
                "marginRight": 0,
                "marginLeft": 0,
                "marginBottom": 0,
                "categoryField": "name",
                "categoryAxis": {
                    "fontSize": 8,
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "tickLength": 0,
                    gridPosition: 'start',
                    autoWrap: true
                },
                "export": {
                    "enabled": true
                }
            },

            cylinderOptions = {
                "theme": "light",
                "type": "serial",
                "startDuration": 2,
                "valueAxes": [{
                    "position": "left",
                    "axisAlpha": 0,
                    "gridAlpha": 0
                }],
                "depth3D": 40,
                "angle": 30,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "gridAlpha": 0

                },
                "export": {
                    "enabled": true
                }

            };
        return {
            column: {
                get3d: function (title) {
                    var c3 = _.clone(column3dOptions);
                    c3.valueAxes[0].title = title;
                    return c3;
                },

                getCylinder: function (vf, cf) {
                    var cylinder = _.cloneDeep(cylinderOptions);
                    cylinder.categoryField = cf;
                    cylinder.graphs = [{
                        "balloonText": "[[category]]: <b>[[value]]</b>",
                        "colorField": "color",
                        "fillAlphas": 0.85,
                        "lineAlpha": 0.1,
                        "type": "column",
                        "topRadius": 1,
                        valueField: vf
                    }];
                    return cylinder;
                },

                composeGraphs: function (data) {
                    var graphs = [];
                    _.each(_.keys(data), function (d) {
                        if (d !== 'source') {
                            graphs.push({
                                "balloonText": d + " for [[category]] : <b>[[value]]</b>",
                                "fillAlphas": 0.9,
                                "lineAlpha": 0.2,
                                "type": "column",
                                "valueField": d,
                                title: d
                            });
                        }
                    });
                    return graphs;
                },

                get: function (vf, cf) {
                    var options = _.clone(columnOptions);
                    options.categoryField = cf;
                    options.graphs = [{
                        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                        "colorField": "color",
                        "cornerRadiusTop": 8,
                        "fillAlphas": 0.8,
                        "lineAlpha": 0,
                        "type": "column",
                        "valueField": vf
                    }];

                    return options;
                }
            },

            donut: {
                get3d: function (vf, tf) {
                    return {
                        "type": "pie",
                        "theme": "light",
                        "valueField": vf,
                        "titleField": tf,
                        "startEffect": "elastic",
                        "startDuration": 2,
                        "labelRadius": 15,
                        "innerRadius": "50%",
                        "depth3D": 10,
                        labelText: '',
                        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        "angle": 15,
                        "export": {
                            "enabled": true
                        }
                    };
                }
            }
        };
    });