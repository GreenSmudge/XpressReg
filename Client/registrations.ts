// A simple logger interface to demonstrate AngularJS depdency injection.
// The implementatio of the logger is published in index.ts.
interface ILogger {
    log: (string) => void;
}
 
 
// Reused business logic and data structure from the server
class DefaultLogger implements ILogger {
    public log(text: string) {
        console.log(text);
    }
}

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
interface IRegistrationsViewModel extends ng.IScope {

    firstName: string;
    lastName: string;
    barcode: string;
    organizationID: number;
    patroncodeID: number;
    birthday: any;
    email: string;
    phone: string;
    refresh: () => void;
    testPoLAppSvc: () => void;
    listOrganizations: () => void;
   // organizations: Array<IOrganization>;
    patronCodes: Array<IPatronCode>; 
    selectedOrg: any;
    selectedPatronCode: any;
    //regType: any;
    regTypeName: string;
    save: () => void;
    testWorkflow: () => void; 
 //   saveOrganization: () => void;
    savePatroncode: () => void;
    saveContactInfo: () => void;
    savePersonalInfo: () => void;
    updateRegObject: () => void; 
    update: () => void; 
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class RegistrationsViewModel {
    constructor($scope: IRegistrationsViewModel, $http: ng.IHttpService, private logger: ILogger) {

       // $scope.organizations = Session.organizations;
        $scope.patronCodes = Session.patroncodes;
   
        $scope.regTypeName = "Individuals" // Individual
        
       // $scope.selectedOrg = Session.organizations[0];  
        $scope.selectedPatronCode = Session.patroncodes[0];  
       

        $scope.save = () => {
            logger.log("Requesting...");
            alert("Saving");
            //$http.get<Array<IRegistration>>("http://localhost:1337/api/registrations")
            //    .success(registrations => {
            //    registrations.forEach(r => $scope.registrations.push(r));
            //});
        };


        $scope.testPoLAppSvc = () => {
            var svc = new PolarisApplicationService($http);
            svc.getBibRecord(695839).then(function (data) {
                alert(data.BrowseTitle);
            });
        };

        $scope.listOrganizations = () => {
            alert(Session.organizations[0].Name);
        };

        $scope.testWorkflow = () => {
            var svc = new PolarisApplicationService($http);
            svc.submitNewRegistration(null).then(function (data) {
                // We have a workflow answer
                var worflowSvc = new WorkflowService($http);
                worflowSvc.processAnswer(data);
            });
        };
        $scope.updateRegObject = () => {

           // Session.registrationData.Barcode = $scope.barcode;       
            Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;
            //Session.registrationData.Barcode = $scope.barcode;
            //Session.registrationData.Registration.NameFirst = $scope.firstName;
            //Session.registrationData.Registration.NameLast = $scope.lastName;
            Session.registrationData.Registration.PhoneVoice1 = $scope.phone;
            Session.registrationData.Registration.EmailAddress = $scope.email;
            $scope.organizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;
            Session.registrationData.Registration.Birthdate = $scope.birthday;
        }

        $scope.update = () => {

            Session.registrationData.Barcode = $scope.barcode;
            Session.registrationData.Registration.NameFirst = $scope.firstName;
            Session.registrationData.Registration.NameLast = $scope.lastName;
            Session.registrationData.Registration.PhoneVoice1 = $scope.phone;
            Session.registrationData.Registration.EmailAddress = $scope.email;
            $scope.organizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;
            Session.registrationData.Registration.Birthdate = <Date>$scope.birthday;

        }

        $scope.savePatroncode = () => {

            Session.registrationData.PatronCodeID = $scope.selectedPatronCode.PatronCodeID;
        }

        $scope.saveContactInfo = () => {

            Session.registrationData.Registration.PhoneVoice1 = $scope.phone;
            Session.registrationData.Registration.EmailAddress = $scope.email;
        }

        $scope.savePersonalInfo = () => {

            Session.registrationData.Barcode = $scope.barcode;
            Session.registrationData.Registration.NameFirst = $scope.firstName;
            Session.registrationData.Registration.NameLast = $scope.lastName;
        }

        //$scope.saveOrganization = () => {

        //    Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
        //}
    }
}