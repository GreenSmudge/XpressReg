// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface IContactInfoViewModel extends ng.IScope {

    email: string;
    phone: string;
    saveContactInfo: () => void;
    update: () => void;
}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 
class ContactInfoViewModel {
    constructor($scope: IContactInfoViewModel, $http: ng.IHttpService) {

        $scope.phone = Session.registrationData.Registration.PhoneVoice1;
        $scope.email = Session.registrationData.Registration.EmailAddress;

        $scope.update = () => {

            Session.registrationData.Registration.PhoneVoice1 = $scope.phone;
            Session.registrationData.Registration.EmailAddress = $scope.email;

        }

        $scope.saveContactInfo = () => {

            Session.registrationData.Registration.PhoneVoice1 = $scope.phone;
            Session.registrationData.Registration.EmailAddress = $scope.email;
        }
    }
}