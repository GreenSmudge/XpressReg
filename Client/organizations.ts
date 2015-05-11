
// The interface the Angular's $scope. Used to access the data structure for
// data binding in a type-safe way. 
interface IOrgViewModel extends ng.IScope {

    organizationID: number;    
    organizations: Array<IOrganization>; 
    selectedOrg: any;  

    saveOrganization: () => void;   
    update: () => void;

}
 
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
// 

class OrgViewModel {
    constructor($scope: IOrgViewModel, $http: ng.IHttpService) {

        $scope.organizations = Session.organizations;
        
        $scope.selectedOrg = Session.organizations[0];


        $scope.update = () => {

            $scope.organizationID = $scope.selectedOrg.OrganizationID;
            Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
        }

        $scope.saveOrganization = () => {

            Session.registrationData.OrganizationID = $scope.selectedOrg.OrganizationID;
        }
    }
} 