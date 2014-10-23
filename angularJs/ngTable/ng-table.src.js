(function (angular, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], function (angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function (angular) {
    'use strict';
    var app = angular.module('ngTable', []);
    app.factory('ngTableParams', ['$q', '$log', function ($q, $log) {
        var isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        var ngTableParams = function (baseParameters, baseSettings) {
            var self = this,
                log = function () {
                    if (settings.debugMode && $log.debug) {
                        $log.debug.apply(this, arguments);
                    }
                };

            this.data = [];
            this.jumpIndex = 1;
            this.parameters = function (newParameters, parseParamsFromUrl) {
                parseParamsFromUrl = parseParamsFromUrl || false;
                if (angular.isDefined(newParameters)) {
                    for (var key in newParameters) {
                        var value = newParameters[key];
                        if (parseParamsFromUrl && key.indexOf('[') >= 0) {
                            var keys = key.split(/\[(.*)\]/).reverse()
                            var lastKey = '';
                            for (var i = 0, len = keys.length; i < len; i++) {
                                var name = keys[i];
                                if (name !== '') {
                                    var v = value;
                                    value = {};
                                    value[lastKey = name] = (isNumber(v) ? parseFloat(v) : v);
                                }
                            }
                            if (lastKey === 'sorting') {
                                params[lastKey] = {};
                            }
                            params[lastKey] = angular.extend(params[lastKey] || {}, value[lastKey]);
                        } else {
                            params[key] = (isNumber(newParameters[key]) ? parseFloat(newParameters[key]) : newParameters[key]);
                        }
                    }
                    log('ngTable: set parameters', params);
                    return this;
                }
                return params;
            };
            this.settings = function (newSettings) {
                if (angular.isDefined(newSettings)) {
                    if (angular.isArray(newSettings.data)) {
                        //auto-set the total from passed in data
                        newSettings.total = newSettings.data.length;
                    }
                    settings = angular.extend(settings, newSettings);
                    log('ngTable: set settings', settings);
                    return this;
                }
                return settings;
            };
            this.page = function (page) {
                return angular.isDefined(page) ? this.parameters({'page': page}) : params.page;
            };
            this.total = function (total) {
                return angular.isDefined(total) ? this.settings({'total': total}) : settings.total;
            };
            this.count = function (count) {
                // reset to first page because can be blank page
                return angular.isDefined(count) ? this.parameters({'count': count, 'page': 1}) : params.count;
            };
            this.filter = function (filter) {
                return angular.isDefined(filter) ? this.parameters({'filter': filter}) : params.filter;
            };
            this.sorting = function (sorting) {
                if (arguments.length == 2) {
                    var sortArray = {};
                    sortArray[sorting] = arguments[1];
                    this.parameters({'sorting': sortArray});
                    return this;
                }
                return angular.isDefined(sorting) ? this.parameters({'sorting': sorting}) : params.sorting;
            };
            this.isSortBy = function (field, direction) {
                return angular.isDefined(params.sorting[field]) && params.sorting[field] == direction;
            };
            this.orderBy = function () {
                var sorting = [];
                for (var column in params.sorting) {
                    sorting.push((params.sorting[column] === "asc" ? "+" : "-") + column);
                }
                return sorting;
            };
            this.getData = function ($defer, params) {
                if (angular.isArray(this.data) && angular.isObject(params)) {
                    $defer.resolve(this.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                } else {
                    $defer.resolve([]);
                }
            };
            this.getGroups = function ($defer, column) {
                var defer = $q.defer();

                defer.promise.then(function (data) {
                    var groups = {};
                    angular.forEach(data, function (item) {
                        var groupName = angular.isFunction(column) ? column(item) : item[column];

                        groups[groupName] = groups[groupName] || {
                            data: []
                        };
                        groups[groupName]['value'] = groupName;
                        groups[groupName].data.push(item);
                    });
                    var result = [];
                    for (var i in groups) {
                        result.push(groups[i]);
                    }
                    log('ngTable: refresh groups', result);
                    $defer.resolve(result);
                });
                this.getData(defer, self);
            };
            this.generatePagesArray = function (currentPage, totalItems, pageSize) {
                var maxBlocks, maxPage, maxPivotPages, minPage, numPages, pages;
                maxBlocks = 11;
                pages = [];
                numPages = Math.ceil(totalItems / pageSize);
                if (numPages > 1) {
                    pages.push({
                        type: 'prev',
                        number: Math.max(1, currentPage - 1),
                        active: currentPage > 1
                    });
                    pages.push({
                        type: 'first',
                        number: 1,
                        active: currentPage > 1
                    });
                    maxPivotPages = Math.round((maxBlocks - 5) / 2);
                    minPage = Math.max(2, currentPage - maxPivotPages);
                    maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
                    minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
                    var i = minPage;
                    while (i <= maxPage) {
                        if ((i === minPage && i !== 2) || (i === maxPage && i !== numPages - 1)) {
                            pages.push({
                                type: 'more',
                                active: false
                            });
                        } else {
                            pages.push({
                                type: 'page',
                                number: i,
                                active: currentPage !== i
                            });
                        }
                        i++;
                    }
                    pages.push({
                        type: 'last',
                        number: numPages,
                        active: currentPage !== numPages
                    });
                    pages.push({
                        type: 'next',
                        number: Math.min(numPages, currentPage + 1),
                        active: currentPage < numPages
                    });
                }
                return pages;
            };
            this.url = function (asString) {
                asString = asString || false;
                var pairs = (asString ? [] : {});
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var item = params[key],
                            name = encodeURIComponent(key);
                        if (typeof item === "object") {
                            for (var subkey in item) {
                                if (!angular.isUndefined(item[subkey]) && item[subkey] !== "") {
                                    var pname = name + "[" + encodeURIComponent(subkey) + "]";
                                    if (asString) {
                                        pairs.push(pname + "=" + item[subkey]);
                                    } else {
                                        pairs[pname] = item[subkey];
                                    }
                                }
                            }
                        } else if (!angular.isFunction(item) && !angular.isUndefined(item) && item !== "") {
                            if (asString) {
                                pairs.push(name + "=" + encodeURIComponent(item));
                            } else {
                                pairs[name] = encodeURIComponent(item);
                            }
                        }
                    }
                }
                return pairs;
            };
            this.reload = function () {
                var $defer = $q.defer(),
                    self = this;

                settings.$loading = true;
                if (settings.groupBy) {
                    settings.getGroups($defer, settings.groupBy, this);
                } else {
                    settings.getData($defer, this);
                }
                log('ngTable: reload data');
                $defer.promise.then(function (data) {
                    settings.$loading = false;
                    log('ngTable: current scope', settings.$scope);
                    if (settings.groupBy) {
                        self.data = settings.$scope.$groups = data;
                    } else {
                        self.data = settings.$scope.$data = data;
                    }
                    settings.$scope.pages = self.generatePagesArray(self.page(), self.total(), self.count());
                });
            };

            this.reloadPages = function () {
                var self = this;
                settings.$scope.pages = self.generatePagesArray(self.page(), self.total(), self.count());
            };

            var params = this.$params = {
                page: 1,
                count: 1,
                filter: {},
                sorting: {},
                group: {},
                groupBy: null
            };
            var settings = {
                $scope: null, // set by ngTable controller
                $loading: false,
                data: null, //allows data to be set when table is initialized
                total: 0,
                defaultSort: 'desc',
                filterDelay: 750,
                counts: [10, 25, 50, 100],
                getGroups: this.getGroups,
                getData: this.getData
            };

            this.settings(baseSettings);
            this.parameters(baseParameters, true);
            return this;
        };
        return ngTableParams;
    }]);
    var ngTableController = ['$scope', 'ngTableParams', '$q', function ($scope, ngTableParams, $q) {
        $scope.$loading = false;

        if (!$scope.params) {
            $scope.params = new ngTableParams();
        }
        $scope.params.settings().$scope = $scope;

        var delayFilter = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        $scope.$watch('params.$params', function (newParams, oldParams) {
            $scope.params.settings().$scope = $scope;

            if (!angular.equals(newParams.filter, oldParams.filter)) {
                delayFilter(function () {
                    $scope.params.reload();
                }, $scope.params.settings().filterDelay);
            } else {
                $scope.params.reload();
            }
        }, true);

        $scope.sortBy = function (column, event) {
            var parsedSortable = $scope.parse(column.sortable);
            if (!parsedSortable) {
                return;
            }
            var defaultSort = $scope.params.$params.defaultSort;
            var inverseSort = (defaultSort === 'asc' ? 'desc' : 'asc');
            var sorting = $scope.params.sorting() && $scope.params.sorting()[parsedSortable] && ($scope.params.sorting()[parsedSortable] === defaultSort);
            var sortingParams = event.ctrlKey ? $scope.params.sorting() : {};
            sortingParams[parsedSortable] = (sorting ? inverseSort : defaultSort);
            $scope.params.parameters({
                sorting: sortingParams
            });
        };
        // next three lines added by xuchaosheng
        $scope.jumpallow = true;
        $scope.jump = function (event) {
            $scope.params.page(Number($scope.params.jumpIndex));
        };
    }];
    app.directive('ngTable', ['$compile', '$q', '$parse',
        function ($compile, $q, $parse) {
            'use strict';
            return {
                restrict: 'A',
                priority: 1001,
                scope: true,
                controller: ngTableController,
                compile: function (element) {
                    var columns = [], i = 0, row = null;
                    // custom header
                    var thead = element.find('thead');
                    // IE 8 fix :not(.ng-table-group) selector
                    angular.forEach(angular.element(element.find('tr')), function (tr) {
                        tr = angular.element(tr);
                        if (!tr.hasClass('ng-table-group') && !row) {
                            row = tr;
                        }
                    });
                    if (!row) {
                        return;
                    }
                    angular.forEach(row.find('td'), function (item) {
                        var el = angular.element(item);
                        if (el.attr('ignore-cell') && 'true' === el.attr('ignore-cell')) {
                            return;
                        }
                        var parsedAttribute = function (attr, defaultValue) {
                            return function (scope) {
                                return $parse(el.attr('x-data-' + attr) || el.attr('data-' + attr) || el.attr(attr))(scope, {
                                    $columns: columns
                                }) || defaultValue;
                            };
                        };
                        var parsedTitle = parsedAttribute('title', ' '),
                            headerTemplateURL = parsedAttribute('header', false),
                            filter = parsedAttribute('filter', false)(),
                            filterTemplateURL = false,
                            filterName = false;

                        if (filter && filter.$$name) {
                            filterName = filter.$$name;
                            delete filter.$$name;
                        }
                        if (filter && filter.templateURL) {
                            filterTemplateURL = filter.templateURL;
                            delete filter.templateURL;
                        }
                        el.attr('data-title-text', parsedTitle()); // this used in responsive table
                        columns.push({
                            id: i++,
                            title: parsedTitle,
                            sortable: parsedAttribute('sortable', false),
                            'class': el.attr('x-data-header-class') || el.attr('data-header-class') || el.attr('header-class'),
                            filter: filter,
                            filterTemplateURL: filterTemplateURL,
                            filterName: filterName,
                            headerTemplateURL: headerTemplateURL,
                            filterData: (el.attr("filter-data") ? el.attr("filter-data") : null),
                            show: (el.attr("ng-show") ? function (scope) {
                                return $parse(el.attr("ng-show"))(scope);
                            } : function () {
                                return true;
                            })
                        });
                    });
                    return function (scope, element, attrs) {
                        scope.$loading = false;
                        scope.$columns = columns;
                        /*if (attrs.jumpallow == 'true') {
                         scope.jumpallow = true;
                         }*/
                        scope.$watch(attrs.ngTable, (function (params) {
                            if (angular.isUndefined(params)) {
                                return;
                            }
                            scope.paramsModel = $parse(attrs.ngTable);
                            scope.params = params;
                        }), true);

                        scope.parse = function (text) {
                            return angular.isDefined(text) ? text(scope) : '';
                        };
                        if (attrs.showFilter) {
                            scope.$parent.$watch(attrs.showFilter, function (value) {
                                scope.show_filter = value;
                            });
                        }
                        angular.forEach(columns, function (column) {
                            var def;
                            if (!column.filterData) {
                                return;
                            }
                            def = $parse(column.filterData)(scope, {
                                $column: column
                            });
                            if (!(angular.isObject(def) && angular.isObject(def.promise))) {
                                throw new Error('Function ' + column.filterData + ' must be instance of $q.defer()');
                            }
                            delete column.filterData;
                            return def.promise.then(function (data) {
                                if (!angular.isArray(data)) {
                                    data = [];
                                }
                                data.unshift({
                                    title: '-',
                                    id: ''
                                });
                                column.data = data;
                            });
                        });
                        if (!element.hasClass('ng-table')) {
                            scope.templates = {
                                header: (attrs.templateHeader ? attrs.templateHeader : 'ng-table/header.html'),
                                pagination: (attrs.templatePagination ? attrs.templatePagination : 'ng-table/pager.html')
                            };
                            var headerTemplate = thead.length > 0 ? thead : angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                            var paginationTemplate = angular.element(document.createElement('div')).attr('ng-include', 'templates.pagination');
                            element.find('thead').remove();
                            var tbody = element.find('tbody');
                            element.prepend(headerTemplate);
                            $compile(headerTemplate)(scope);
                            $compile(paginationTemplate)(scope);
                            element.addClass('ng-table');
                            return element.after(paginationTemplate);
                        }
                    };
                },
                link: function (scope, element, attrs) {
                    console.log(attrs.jumpallow);
                }
            }
        }
    ]);

    angular.module('ngTable').run(['$templateCache', function ($templateCache) {
        $templateCache.put('ng-table/filters/select-multiple.html', '<select ng-options="data.id as data.title for data in column.data" multiple ng-multiple="true" ng-model="params.filter()[name]" ng-show="filter==\'select-multiple\'" class="filter filter-select-multiple form-control" name="{{column.filterName}}"> </select>');
        $templateCache.put('ng-table/filters/select.html', '<select ng-options="data.id as data.title for data in column.data" ng-model="params.filter()[name]" ng-show="filter==\'select\'" class="filter filter-select form-control" name="{{column.filterName}}"> </select>');
        $templateCache.put('ng-table/filters/text.html', '<input type="text" name="{{column.filterName}}" ng-model="params.filter()[name]" ng-if="filter==\'text\'" class="input-filter form-control"/>');
        $templateCache.put('ng-table/header.html', '<tr> <th ng-repeat="column in $columns" ng-class="{ \'sortable\': parse(column.sortable), \'sort-asc\': params.sorting()[parse(column.sortable)]==\'asc\', \'sort-desc\': params.sorting()[parse(column.sortable)]==\'desc\' }" ng-click="sortBy(column, $event)" ng-show="column.show(this)" ng-init="template=column.headerTemplateURL(this)" class="header {{column.class}}"> <div ng-if="!template" ng-show="!template" ng-bind="parse(column.title)"></div> <div ng-if="template" ng-show="template"><div ng-include="template"></div></div> </th> </tr> <tr ng-show="show_filter" class="ng-table-filters"> <th ng-repeat="column in $columns" ng-show="column.show(this)" class="filter"> <div ng-repeat="(name, filter) in column.filter"> <div ng-if="column.filterTemplateURL" ng-show="column.filterTemplateURL"> <div ng-include="column.filterTemplateURL"></div> </div> <div ng-if="!column.filterTemplateURL" ng-show="!column.filterTemplateURL"> <div ng-include="\'ng-table/filters/\' + filter + \'.html\'"></div> </div> </div> </th> </tr>');
        $templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager pagination"> ' +
            '<div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> ' +
            '<button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> ' +
            '<span ng-bind="count"></span> </button> </div>' +
            '<ul class="pagination ng-table-pagination fl"> <li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul>&nbsp;&nbsp;&nbsp;<span class="fl ml5" ng-show="jumpallow">跳转到第<input type="text" ng-model="params.jumpIndex" class="w40"/>页<a ng-click="jump($evrnt)">  跳转</a></span></div> ');
    }]);
    return app;
}));