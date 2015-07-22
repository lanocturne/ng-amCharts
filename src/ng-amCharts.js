/**
 * Created by stan on 06/19/15.
 *
 * A directive for amcharts, http://docs.amcharts.com/3/javascriptcharts
 * Attribute: <am-chart></am-chart>
 * Attribute: options([object]), amcharts options
 * Attribute: data([object]), check d3 wiki for treemap data object format
 * Attribute: color([function]optional), customized color function, i.e. GraphConfigService.categoryColor
 * @example:<am-chart options="donutOptions"></am-chart>
 */
'use strict';

angular.module('ngAmchart', [])
    .directive('amChart', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                data: '=',
                height: '@',
                width: '@',
                color: '@'
            },
            template: '<div class="amchart"></div>',
            link: function (scope, $el) {

                // use existing outer id to create new id
                var id = $el[0].id;
                $el.attr('id', id);
                var chart;

                // we can't render a chart without any data
                var renderChart = function (amChartOptions) {
                    var o = amChartOptions || scope.options;

                    // set height and width
                    var height = scope.height || '350px';
                    var width = scope.width || '100%';

                    $el.css({
                        'height': height,
                        'width': width
                    });

                    // instantiate new chart object
                    if (o.type === 'stock') {
                        //dataset
                        o.dataSets = [];
                        _.each(scope.data, function (d) {
                            o.dataSets.push({
                                color: "#b0de09",
                                fieldMappings: [{
                                    fromField: "value",
                                    toField: "value"
                                }, {
                                    fromField: "volume",
                                    toField: "volume"
                                }],
                                dataProvider: d,
                                categoryField: "date"
                            });
                        });
                    } else {
                        o.dataProvider = scope.data || o.dataProvider;
                        if (scope.color) {
                            var colors;
                            if (scope.color === 'category') {
                                if (o.dataProvider.length > 5 && o.dataProvider.length < 11) {
                                    colors = d3.scale.category10().range();
                                } else {
                                    colors = d3.scale.category20b().range();
                                }
                                _.each(o.dataProvider, function (d, i) {
                                    d.color = colors[i];
                                });
                            }
                        }
                    }
                    chart = new AmCharts.makeChart(id, o);
                };

                scope.$watch('data', function (nv, ov) {
                    if (nv.length && (!ov || !ov.length)) {
                        // Render the chart
                        renderChart();
                    }
                });
            }
        };
    });