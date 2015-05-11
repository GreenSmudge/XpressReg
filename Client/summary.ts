// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface ISummaryViewModel extends ng.IScope {

    regTypeName: string;
    organizationID: number;
    patroncodeID: number;
    barcode: string;
    firstName: string;
    lastName: string;
    birthday: any;    
    email: string;
    phone: string;
    savePatron: () => void;   
    
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class SummaryViewModel {
    constructor($scope: ISummaryViewModel, $http: ng.IHttpService) {

        $scope.regTypeName = "Individuals" // Individual
        $scope.organizationID = Session.registrationData.OrganizationID;        

        $scope.patroncodeID = Session.registrationData.PatronCodeID;
        $scope.barcode = Session.registrationData.Barcode;
        $scope.birthday = Session.registrationData.Registration.Birthdate;
        $scope.firstName = Session.registrationData.Registration.NameFirst;
        $scope.lastName = Session.registrationData.Registration.NameLast;
        $scope.phone = Session.registrationData.Registration.PhoneVoice1;
        $scope.email = Session.registrationData.Registration.EmailAddress;

        $scope.savePatron = () => {
            var svc = new PolarisApplicationService($http);
            svc.submitNewRegistration(Session.registrationData).then(function (data) {
                // We have a workflow answer
                var worflowSvc = new WorkflowService($http);
                worflowSvc.processAnswer(data);
            });
        };
    }
}