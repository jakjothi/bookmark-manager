// Bookmark Manager Module
$app = angular.module('BookmarkManager', ['ui.bootstrap']);

// Controller
$app.controller('BookmarkCtrl', [ '$scope', 'BookmarkService', '$modal', '$log',
	function($scope,  BookmarkService, $modal, $log) {
		// variables Initialization
		$scope.page = 'bookmark'; //Select 'All Items' as Default
		BookmarkService.getFolders($scope);

		$scope.bookmarks = [];
		$scope.folders = [];

		//Methods
		// Page Navigation
		$scope.navPage = function(name) {
			$scope.page = name;
		};

		// Loading Bookmarks and Folders
		$scope.loadItem = function(itemType) {
			$scope.page = itemType;
			switch(itemType) {
				case 'folder':
					BookmarkService.getFolders($scope);
					break;
				case 'bookmark':
					BookmarkService.getBookmark($scope);
					break;
				default:
					break;
			}
		};

		// Loading Bookmarks in Specific Folder
		$scope.loadBookmarks = function($index) {
			$scope.page = 'bookmark-view';
			$scope.folder_id = $scope.folders[$index].directoryId;
			$scope.folder_name = $scope.folders[$index].directoryName;
			BookmarkService.getDirectoryBookmarks($scope);
		};

		// Remove Folder
		$scope.removeDirectory = function() {
			BookmarkService.removeDirectory($scope);
		};

		// New Folder 
		$scope.saveFolder = function(name) {
			BookmarkService.newDirectory($scope, name);
		};

		// Open Bookmark Creation Prompt
		$scope.open = function (size) {

		    var modalInstance = $modal.open({
		      	templateUrl: 'myModalContent.html',
		      	controller: 'ModalInstanceCtrl',
		      	resolve: {
		        	folders: function () {
		          		return $scope.folders;
		        	}
		      	}
		    });

		    modalInstance.result.then(function (item) {
		    	console.log(item);
		      	if ($scope.bookmarks) {
		      		($scope.bookmarks).push(item);
		      	}
		    }, function () {
		      	$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		// Remove Bookmark
		$scope.removeBookmark = function(id, index) {
			BookmarkService.removeBookmark($scope, id, index);
		};

		// Move Bookmark
		$scope.bookmarkIndex = 0;
		$scope.moveBookmark = function(id, $index) {
			$scope.move_bookmark = id;
			$scope.move_bookmark_index = $index;
			$scope.bookmark_edit = true;
		};

		// Hide Edit Panel
		$scope.cancelBookmarkMove = function() {
			$scope.bookmark_edit = false;
		};

		// Save Bookmark Move
		$scope.saveBookmarkMove = function(bookmarkDirectory) {
			BookmarkService.moveBookmark($scope.move_bookmark, bookmarkDirectory, function() {
				if ($scope.page === 'bookmark-view') {
					($scope.bookmarks).splice($scope.move_bookmark_index, 1);
				}
				$scope.bookmark_edit = false;
			});
		};

		// Open Bookmark URL
		 $scope.openBookmark = function(url) {
		 	console.log(url);
		 	window.open(url);
		 };
	}
]);

// Factory
$app.factory('BookmarkService', ['$http', 
	function(Ajax) {
		return {
			getFolders: function($scope) {
				Ajax({method: 'GET', url: '/rest/v0.0.1/bookmarks/directory'})
					.success(function(result) {
						if (result) {
							$scope.folders = result.data;
						}
					})
					.error(function(data) {
						console.log(data);
					});
			},

			removeDirectory: function($scope) {
				Ajax({method: 'DELETE', url: '/rest/v0.0.1/bookmarks/directory/' + $scope.folder_id})
					.success(function(data) {
						$scope.page = 'folder';
					})
					.error(function(data) {

					});
			},

			newDirectory: function($scope, name) {
				Ajax({method: 'POST', url: '/rest/v0.0.1/bookmarks/directory', data: {directoryName: name}})
					.success(function(data) {
						$scope.folders.push(data);
					})
					.error(function(data) {

					});
			},

			saveBookmark: function(params, callback) {
				params.directoryId = params.directory.directoryId;
				Ajax({method: 'POST', url: '/rest/v0.0.1/bookmarks/', data: params})
					.success(function(result) {
						callback(result);
					})
					.error(function(data) {

					});
			},

			getBookmark: function($scope) {
				Ajax({method: 'GET', url: '/rest/v0.0.1/bookmarks'})
					.success(function(result) {
						if (result) {
							$scope.bookmarks = result.data;
						}
					})
					.error(function(data) {

					});
			},

			removeBookmark: function($scope, id, index) {
				Ajax({method: 'DELETE', url: '/rest/v0.0.1/bookmarks/' + id})
					.success(function(data) {
						($scope.bookmarks).splice(index, 1);
					})
					.error(function(data) {

					});	
			},

			getDirectoryBookmarks: function($scope) {
				Ajax({method: 'GET', url: '/rest/v0.0.1/bookmarks/directory/' + $scope.folder_id + '/bookmarks'})
					.success(function(result) {
						$scope.bookmarks = result.data;
					})
					.error(function(data) {

					});	
			},

			moveBookmark: function(id, directory, callback) {
				var params = {directoryId: directory.directoryId};

				Ajax({method: 'PUT', url: '/rest/v0.0.1/bookmarks/' + id, data: params})
					.success(function(result) {
						callback(result);
					})
					.error(function(data) {

					});
			},
		}
	}
]);

//Popup Controller
$app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, folders, BookmarkService) {

	$scope.folders = folders;

  	$scope.save = function (data) {
  		BookmarkService.saveBookmark(data, function(bookmarkData) {
  			$modalInstance.close(bookmarkData);
  		});
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
});