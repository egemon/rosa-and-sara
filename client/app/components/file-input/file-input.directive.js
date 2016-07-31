angular.module('base')
.directive("fileInput", [function () {
    return {
        scope: {
            fileModel: "="
        },
        restrict: 'E',
        templateUrl: 'file-input.html',
        replace: true,
        link: function (scope, element) {
            console.log('[file-model] link:()', arguments);
            input = element.find('input');
            input.bind("change", function (changeEvent) {
                console.log('[file-model] element.bind()', arguments);
                if (changeEvent.target.files.length === 0) {
                    console.log('[cancel]', arguments);
                    scope.$apply(function () {
                        scope.fileModel = '';
                    });
                    return;
                }
                var qNumber = changeEvent.target.files.length;
                for (var i = 0; i < changeEvent.target.files.length; i++) {
                    (function () {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            console.log('[file-model] reader.onload()', arguments);
                            qNumber--;
                            scope.$apply(function () {
                                scope.fileModel.push({
                                    img: loadEvent.target.result
                                });
                                if (qNumber === 0) {
                                    scope.$emit('file-reading-finished');
                                }
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[i]);
                    })();
                }
            });
        }
    };
}]);