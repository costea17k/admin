(function () {
    angular
        .module('admin.unit')
        .controller('UnitListController', controller);

    controller.$inject = ['$scope', 'UnitListService'];

    function controller($scope, unitListService) {

        /**
         * VM public
         */
        var vm = this;
        vm.display = 'published'
        vm.toggleDisplay = toggleDisplay;

        /**
         * Scope
         */
        $scope.tableData = [];
        $scope.totalServerItems = 0;
        $scope.filterOptions = {
            filterText: '',
            useExternalFilter: false
        };
        $scope.pagingOptions = {
            pageSizes: [25, 50, 100],
            pageSize: 25,
            currentPage: 1
        };
        $scope.tableOptions = {
            data: 'tableData',
            enablePaging: false,
            showFooter: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            selectedItems: $scope.mySelections,
            multiSelect: false
        };

        /**
         * @constructor
         */
        init();

        function init() {
            getUnits();
        }

        /**
         * @private
         */
        function getUnits() {
            unitListService
                .get('unitListSimple', vm.display)
                .then(updateTable);
        }

        /**
         * @private
         */
        function updateTable(response) {
            console.log(response.data);
            $scope.tableData = response.data;
            $scope.totalServerItems  = response.data.length;
        }

        function toggleDisplay() {
            vm.display = vm.display != 'published' ? 'published' : 'unpublished';
            getUnits();
        }
    }

})(angular);