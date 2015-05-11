//// A simple logger interface to demonstrate AngularJS depdency injection.
//// The implementatio of the logger is published in index.ts.
//interface ILogger {
//    log: (string) => void;
//}
 
 
//// Reused business logic and data structure from the server
//class DefaultLogger implements ILogger {
//    public log(text: string) {
//        console.log(text);
//    }
//}

//interface IRegistration {

//    firstName: string;
//    lastName: string;
//    barcode: string;
//    organizationID: number;
//    patroncodeID: number;
//}

//class Registration implements IRegistration {

//    public firstName: string;
//    public lastName: string;
//    public barcode: string;
//    public organizationID: number;
//    public patroncodeID: number;

//    constructor(registration: IRegistration) {
      
//        this.firstName = registration.firstName;
//        this.lastName = registration.lastName;
//        this.organizationID = registration.organizationID;
//        this.patroncodeID = registration.patroncodeID;
//    }
//}


// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface IRegisterTypesViewModel extends ng.IScope {

    //regType: any;
    regTypeName: string;
    updateRegObject: () => void; 
  
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class RegisterTypesViewModel {
    constructor($scope: IRegisterTypesViewModel, $http: ng.IHttpService) {

        $scope.regTypeName = "Individuals" // Individual
        $scope.updateRegObject = () => {

        }
    }
}