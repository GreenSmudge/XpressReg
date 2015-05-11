interface IPolarisApplicationService extends ng.IScope {
    baseUrl: string;
    authHeader: string;
    bibliographicRecords: Array<IBibliographicRecord>;
    getBibRecord: () => void;
}

class PolarisApplicationService {

    private httpService: ng.IHttpService;

    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    private handlerResponded(response: any, params: any): any {
        response.data.requestParams = params;
        return response.data;
    }

    public getBibRecord(params: any): ng.IPromise<any> {
        var result: ng.IPromise<any> = this.httpService.get(Session.baseUrl + "bibliographicrecords/695839")
            .then((response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public getOrganizations(params: any): ng.IPromise<any> {
        var result: ng.IPromise<any> = this.httpService.get(Session.baseUrl + "organizations")
            .then((response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public getPatronCodes(params: any): ng.IPromise<any> {
        var result: ng.IPromise<any> = this.httpService.get(Session.baseUrl + "patroncodes?orgid=3")
            .then((response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public submitNewRegistration(params: any): ng.IPromise<any> {

        var postData = {
            "WorkflowRequestType": 3,
            "TxnBranchID": 3,
            "TxnUserID": 1,
            "TxnWorkstationID": 1182,
            "RequestExtension": {
                "WorkflowRequestExtensionType": 4,
                "Data": Session.registrationData
            },
            "WorkflowReplies": null
        };

        var req = {
            method: "POST",
            url: Session.baseUrl + "workflow",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Session.authorization
            },
            data: postData
        }

        var result: ng.IPromise<any> = this.httpService(req).then(
            (response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public submitOK(answer: WorkflowAnswer, params: any): ng.IPromise<any> {

        var putData = {
            "WorkflowPromptID": answer.Prompt.WorkflowPromptID,
            "WorkflowPromptResult": WorkflowPromptResult.OK,
            "ReplyValue": null,
            "ReplyExtension": null
        };

        var req = {
            method: "PUT",
            url: Session.baseUrl + "workflow/" + answer.WorkflowRequestGuid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Session.authorization
            },
            data: putData
        }

        var result: ng.IPromise<any> = this.httpService(req).then(
            (response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public submitContinue(answer: WorkflowAnswer, params: any): ng.IPromise<any> {

        var putData = {
            "WorkflowPromptID": answer.Prompt.WorkflowPromptID,
            "WorkflowPromptResult": WorkflowPromptResult.Continue,
            "ReplyValue": null,
            "ReplyExtension": null
        };

        var req = {
            method: "PUT",
            url: Session.baseUrl + "workflow/" + answer.WorkflowRequestGuid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Session.authorization
            },
            data: putData
        }

        var result: ng.IPromise<any> = this.httpService(req).then(
            (response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }

    public submitWaive(answer: WorkflowAnswer, params: any): ng.IPromise<any> {

        var putData = {
            "WorkflowPromptID": answer.Prompt.WorkflowPromptID,
            "WorkflowPromptResult": WorkflowPromptResult.Waive,
            "ReplyValue": 2,//answer.Prompt.PromptExtension.Data.FeeAmount,
            "ReplyExtension": null
        };

        var req = {
            method: "PUT",
            url: Session.baseUrl + "workflow/" + answer.WorkflowRequestGuid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Session.authorization
            },
            data: putData
        }

        var result: ng.IPromise<any> = this.httpService(req).then(
            (response: any): ng.IPromise<any> => this.handlerResponded(response, params));

        return result;
    }
} 