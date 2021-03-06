'use strict';

choral.controller('CardCtrl', [
  '$scope',
  'CardSvc',
  'card',
  'auth',
  function ($scope, CardSvc, card, auth) {
    $scope.card = card;
    var user = auth.profile.nickname;
    $scope.user_id = auth.profile.user_id;

    $scope.addCollab = function () {
      if ($scope.body == null || $scope.body == "") {
        console.log('Sorry, nothing was entered!');
      } else {
        CardSvc.addCollab(card._id, {
          body: $scope.body,
          author: user,
          user_id: $scope.user_id
        }).success(function (collab) {
          console.log('I am being pushed!');
          $scope.card.collabs.push(collab);
        });
      }
      $scope.body = "";
    };

    $scope.like = function (collab) {
      CardSvc.likeCollab(card, collab);
    };

    $scope.dislike = function (collab) {
      CardSvc.dislikeCollab(card, collab);
    };
  }]);
