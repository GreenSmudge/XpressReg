var app = angular.module("RegistrationApp", ["ngRoute"])
// The logger to demonstrate AngularJS dependency injection
    .factory("logger",() => new DefaultLogger())
// Our controllers for the two views
    .controller("RegisterTypesController", RegisterTypesViewModel)
    .controller("OrgController", OrgViewModel)
    .controller("PatronCodesController", PatronCodesViewModel)
    .controller("PersonalInfoController", PersonalInfoViewModel)
    .controller("ContactInfoController", ContactInfoViewModel)
    .controller("SummaryController", SummaryViewModel)
// The routes for the SPA
    .config(($routeProvider: ng.route.IRouteProvider) => {
    $routeProvider
        .when("/", {
        templateUrl: "registrations.html", controller: "RegisterTypesController"
        })
        .when("/orgs", {
        templateUrl: "organizations.html", controller: "OrgController"
        })
        .when("/codes", {
        templateUrl: "patronCodes.html", controller: "PatronCodesController"
        })
        .when("/personalinfo", {
        templateUrl: "personalInfo.html", controller: "PersonalInfoController"
        })
        .when("/contactinfo", {
        templateUrl: "contactInfo.html", controller: "ContactInfoController"
        })
        .when("/summary", {
        templateUrl: "summary.html", controller: "SummaryController"
        })
    ;
});

app.config(function ($httpProvider) {
    // Set up http defaults
    $httpProvider.defaults.headers.common.Authorization = Session.authorization;
});

app.run(['$http', '$rootScope', function ($http, $rootScope) {

    // Initialize session object
    Session.registrationData = new RegistrationData();

    // Cache list of organizations
    var svc = new PolarisApplicationService($http);

    svc.getOrganizations(null).then(function (data) {
        data.forEach(o => {
            if (o.OrganizationCodeID == 3) {
                Session.organizations.push(o)
            }
        });
    });

    svc.getPatronCodes(null).then(function (data) {
        data.forEach(o => Session.patroncodes.push(o));
    });
}]);