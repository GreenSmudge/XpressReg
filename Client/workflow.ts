enum WorkflowStatus {
    //Incomplete                // Unable to to complete process.
    InputRequired = -3,	        // The workflow is waiting for input from the caller.  Ex: Prompt
    ErrorOccurred = -2,	        // An unexpected error occurred during the execution of the workflow
    InvalidReply = -1,	        // An invalid reply was received
    Started = 0,
    CompletedSuccessfully = 1,	// The workflow process completed and successfully performed the operation. Ex: Item was checked out
    CompletedFailure = 2,		// The workflow process completed but failed to perform the operation.  Ex: Item was not checked out.
    CompletedCancelled = 3		// The workflow was cancelled.
}

enum WorkflowPromptOptions {
    YesNo = 1,
    YesNoCancel = 2,
    OKCancel = 3,
    OKWaiveCharge = 4,
    PayWaiveChargeCancel = 5,
    ContinueCancel = 6,
    ContinueWaiveChargeCancel = 7,
    OK = 8,
    Cancel = 9
}

enum WorkflowPromptResult {
    OK = 1,
    Yes = 2,
    No = 3,
    Cancel = 4,
    Continue = 5,
    Pay = 6,
    Waive = 7,
    Charge = 8
}

class WorkflowPrompt {

    public WorkflowPromptID: number;
    public Name: string;
    public Description: string;
    public WorkflowPromptType: number;
    public WorkflowPromptOptions: number;
    public DefaultPromptOption: number;
    public Title: string;
    public Message: string;
    public AlternateYesText: string;
    public AlternateNoText: string;
    public AlternateCancelText: string;
    public AlternateContinueText: string;
    public PromptExtension: any;
}

class WorkflowAnswer {

    public WorkflowRequestGuid: string;
    public WorkflowStatus: WorkflowStatus;
    public Prompt: WorkflowPrompt;
    public InformationMessages: any[];
    public AnswerExtension: any;
    public ReceiptType: number;
    public ReceiptUrl: string;
}

class WorkflowService {

    private httpService: ng.IHttpService;

    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    public processAnswer(answer: WorkflowAnswer) {

        alert("WorkflowRequestGuid: " + answer.WorkflowRequestGuid);

        if (answer != null) {
            if (answer.Prompt != null) {
                alert(answer.Prompt.Message + "  Prompt Options:" + answer.Prompt.WorkflowPromptOptions.toString());
            }

            if (answer.WorkflowStatus === WorkflowStatus.CompletedSuccessfully) {
                alert('Completed Successfully');
            } else if (answer.WorkflowStatus === WorkflowStatus.CompletedCancelled) {
                alert('Completed Cancelled');
            } else if (answer.WorkflowStatus === WorkflowStatus.CompletedFailure) {
                alert('Completed Failure');
            } else if (answer.WorkflowStatus === WorkflowStatus.ErrorOccurred) {
                alert('Error Occurred - ' + answer.InformationMessages[0]);
            } else if (answer.WorkflowStatus === WorkflowStatus.InputRequired) {
                if (answer.Prompt.WorkflowPromptOptions === WorkflowPromptOptions.OK) {
                    alert(answer.Prompt.Message);
                    // Submit OK
                    var svc = new PolarisApplicationService(this.httpService);
                    svc.submitOK(answer, null).then(function (data) {
                        var worflowSvc = new WorkflowService(this.httpService);
                        // We have a workflow answer
                        worflowSvc.processAnswer(data);
                    });
                } else if (answer.Prompt.WorkflowPromptOptions === WorkflowPromptOptions.ContinueCancel) {
                    // Submit continue
                    var svc = new PolarisApplicationService(this.httpService);
                    var _httpService = this.httpService;
                    svc.submitContinue(answer, null).then(function (data) {
                        var worflowSvc = new WorkflowService(_httpService);
                        // We have a workflow answer
                        worflowSvc.processAnswer(data);
                    });
                } else if (answer.Prompt.WorkflowPromptOptions === WorkflowPromptOptions.PayWaiveChargeCancel) {
                    // Submit waive
                    var svc = new PolarisApplicationService(this.httpService);
                    var _httpService = this.httpService;
                    svc.submitWaive(answer, null).then(function (data) {
                        var worflowSvc = new WorkflowService(_httpService);
                        // We have a workflow answer
                        worflowSvc.processAnswer(data);
                    });
                }

            } else if (answer.WorkflowStatus === WorkflowStatus.InvalidReply) {
                alert('Invalid Reply');
            } else {
                alert('Unknown status');
            }
        } else {
            alert('Workflow answer is null.');
        }
    }
} 