// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface IPatronCodesViewModel extends ng.IScope {

    patroncodeID: number;
    patronCodes: Array<IPatronCode>;    
    selectedPatronCode: any;
   
    savePatroncode: () => void;
  
    update: () => void;
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class PatronCodesViewModel {
    constructor($scope: IPatronCodesViewModel, $http: ng.IHttpService) {

      
        $scope.patronCodes = Session.patroncodes;

        $scope.selectedPatronCode = Session.patroncodes[0];

        $scope.patroncodeID = Session.registrationData.PatronCodeID;

        $scope.update = () => {

            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;

        }

        $scope.savePatroncode = () => {

            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;
        }
    }
}