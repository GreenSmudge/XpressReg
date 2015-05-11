// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface IPersonalInfoViewModel extends ng.IScope {

    firstName: string;
    lastName: string;
    barcode: string;   
    birthday: any;    
    savePersonalInfo: () => void;
    update: () => void;
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class PersonalInfoViewModel {
    constructor($scope: IPersonalInfoViewModel, $http: ng.IHttpService) {

        $scope.barcode = Session.registrationData.Barcode;
        $scope.birthday = Session.registrationData.Registration.Birthdate;
        $scope.firstName = Session.registrationData.Registration.NameFirst;
        $scope.lastName = Session.registrationData.Registration.NameLast;       

        $scope.update = () => {

            Session.registrationData.Barcode = $scope.barcode;
            Session.registrationData.Registration.NameFirst = $scope.firstName;
            Session.registrationData.Registration.NameLast = $scope.lastName;           
            Session.registrationData.Registration.Birthdate = <Date>$scope.birthday;

        }

        $scope.savePersonalInfo = () => {

            Session.registrationData.Barcode = $scope.barcode;
            Session.registrationData.Registration.NameFirst = $scope.firstName;
            Session.registrationData.Registration.NameLast = $scope.lastName;
        }
    }       
}