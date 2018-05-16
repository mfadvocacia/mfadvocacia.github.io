var app = angular.module('myApp', ['firebase']);
app.controller('myCtrl', function($scope, $firebaseArray) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    var todosRef = firebase.database().ref('/noticias');
    $scope.todos = $firebaseArray(todosRef);
    //$scope.todos = $scope.todos.slice(1, 3);
});

app.controller('loginCtrl',  function($scope,$firebaseArray) {
    
    var todosRef = firebase.database().ref('/noticias');
    $scope.todos = $firebaseArray(todosRef);
    
    $scope.login = function(){
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(){
                        
            $scope.logado = true;
            $scope.$apply();
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
    
    $scope.removeItem = function(novo) {
        
        //var ref = firebase.database().ref('/noticias');
        //var items = $firebaseArray(ref);    
        //items.$remove(items.$indexFor(key));
        
        $scope.todos.$remove(novo).then(function(ref) {
            ref.key() === item.$id; // true
        });
        
        //delete $scope.todos[key];   
        //$scope.todos.$save();
    };
    
    $scope.add = function(){
        var data = new Date();
        var novadata = "";
        novadata +=  data.getDate();
        novadata += '/' + (data.getMonth()+1);
        novadata += '/' + data.getFullYear();       
        
        var todosRef = firebase.database().ref('/noticias');
        todosRef.push({descricao: $scope.descricao, titulo: $scope.titulo, data: novadata}).then(function(){
            
            alert("inserido");
            $scope.descricao = "";
            $scope.titulo = "";
            $scope.$apply();
        });
    }
  }
);
