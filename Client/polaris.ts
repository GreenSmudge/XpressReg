class Session {
    public static organizations = new Array<IOrganization>();
    public static patroncodes = new Array<IPatronCode>();
                  
    public static baseUrl = "https://young-w8.polarislibrary.com/Polaris.ApplicationServices/api/v1/eng/1/1/";
    public static authorization = "PAS C81LxPGTueouxdQmiehvGFbdzUPnb4KX:m8XZrDMUCVqol6qB";         
    public static registrationData: RegistrationData;    
}

interface IOrganization {
    OrganizationID: number;
    ParentOrganizationID: number;
    OrganizationCodeID: number;
    Name: string;
    Abbreviation: string;
    SA_ContactPersonID: number;
    CreatorID: number;
    ModifierID: number;
    CreationDate: Date;
    ModificationDate: Date;
    DisplayName: string;
}

class Organization implements IOrganization {
    public OrganizationID: number;
    public ParentOrganizationID: number;
    public OrganizationCodeID: number;
    public Name: string;
    public Abbreviation: string;
    public SA_ContactPersonID: number;
    public CreatorID: number;
    public ModifierID: number;
    public CreationDate: Date;
    public ModificationDate: Date;
    public DisplayName: string;
}

interface IBibliographicRecord {
    bibliographicRecordID: number;
    browseAuthor: string;
    browseTitle: string;
}

class BibliographicRecord implements IBibliographicRecord {
    public bibliographicRecordID: number;
    public browseAuthor: string;
    public browseTitle: string;
}

interface IPatronCode {
	PatronCodeID: number;
	Description: string;
}

class PatronCodes implements IPatronCode {
    public PatronCodeID: number;
    public Description: string;
}

class PatronCustomData {

    public PatronDataLabelValue: string;
    public PatronCustomDataDefinitionID: number;
    public IsRequired: boolean;
    public PolarisCustomDataTypeID: number;
    public CustomDataEntry: any;
}

class RegistrationDetails {

    public NameFirst: string;
    public NameLast: string;
    public NameMiddle: string;
    public NameTitle: string;
    public NameSuffix: string;
    public LanguageID: number;
    public EmailAddress: string;
    public AltEmailAddress: string;
    public Password: string;
    public EntryDate: Date;
    public ExpirationDate: Date;
    public AddrCheckDate: Date;
    public UpdateDate: Date;
    public Gender: string;
    public Birthdate: Date;
    public RegistrationDate: Date;
    public FormerID: string;
    public eReceiptOptionID: number;
    public DeliveryOptionID: number;
    public EnableSMS: boolean;
    public Username: string;
    public StatisticalClassID: number;
    public Phone1CarrierID: number;
    public Phone2CarrierID: number;
    public Phone3CarrierID: number;
    public PhoneVoice1: string;
    public PhoneVoice2: string;
    public PhoneVoice3: string;
    public TxtPhoneNumber: string;
    public PhoneFAX: string;
    public SystemBlocks: number;
    public YTDCircCount: number;
    public CollectionExempt: boolean;
    public ExcludeFromOverdues: boolean;
    public ExcludeFromHolds: boolean;
    public ExcludeFromBills: boolean;
    public ExcludeFromAlmostOverdueAutoRenew: boolean;
    public ExcludeFromPatronRecExpiration: boolean;
    public ExcludeFromInactivePatron: boolean;
    public EmailFormatID: number;
    public ReadingList: boolean;
    public DeletionExempt: boolean;
    public User1: string;
    public User2: string;
    public User3: string;
    public User4: string;
    public User5: string;
    public PatronCustomData: Array<PatronCustomData>;

    constructor() {
        this.NameFirst = "";//"Jermey";
        this.NameLast = "";//"Young";
        this.NameMiddle = "";
        this.NameTitle = "";
        this.NameSuffix = "";
        this.LanguageID = 1
        this.EmailAddress = "";// "jeff.young@iii.com";
        this.AltEmailAddress = "";
        this.Password = "";
        this.EntryDate = null;
        this.ExpirationDate = new Date("2020-07-01T04:00:00.000Z");
        this.AddrCheckDate = new Date("2016-05-07T04:00:00.000Z");
        this.UpdateDate = null;
        this.Gender = "N";
        this.Birthdate = null;
        this.RegistrationDate = new Date("2015-05-07T04:00:00.000Z");
        this.FormerID = "";
        this.eReceiptOptionID = 0;
        this.DeliveryOptionID = 0;
        this.EnableSMS = false;
        this.Username = "";
        this.StatisticalClassID = 0;
        this.Phone1CarrierID = null;
        this.Phone2CarrierID = null;
        this.Phone3CarrierID = null;
        this.PhoneVoice1 = "";//"315-555-1212";
        this.PhoneVoice2 = "";
        this.PhoneVoice3 = "";
        this.TxtPhoneNumber = "";
        this.PhoneFAX = "";
        this.SystemBlocks = 0;
        this.YTDCircCount = 0;
        this.CollectionExempt = false;
        this.ExcludeFromOverdues = false;
        this.ExcludeFromHolds = false;
        this.ExcludeFromBills = false;
        this.ExcludeFromAlmostOverdueAutoRenew = false;
        this.ExcludeFromPatronRecExpiration = false;
        this.ExcludeFromInactivePatron = false;
        this.EmailFormatID = 2;
        this.ReadingList = false;
        this.DeletionExempt = false;
        this.User1 = "999999";
        this.User2 = "No restrictions";
        this.User3 = "";
        this.User4 = "";
        this.User5 = "Marcia";
        this.PatronCustomData = new Array<PatronCustomData>();

        var pcd1 = new PatronCustomData();
        pcd1.CustomDataEntry = "Jack Smith";
        pcd1.IsRequired = false;
        pcd1.PatronCustomDataDefinitionID = 8;
        pcd1.PatronDataLabelValue = "Parent/Guardian";
        pcd1.PolarisCustomDataTypeID = 2;
        this.PatronCustomData.push(pcd1);

        var pcd2 = new PatronCustomData();
        pcd2.CustomDataEntry = "";
        pcd2.IsRequired = false;
        pcd2.PatronCustomDataDefinitionID = 9;
        pcd2.PatronDataLabelValue = "Parent/Guardian birth date";
        pcd2.PolarisCustomDataTypeID = 3;
        this.PatronCustomData.push(pcd2);

        var pcd3 = new PatronCustomData();
        pcd3.CustomDataEntry = "1";
        pcd3.IsRequired = false;
        pcd3.PatronCustomDataDefinitionID = 11;
        pcd3.PatronDataLabelValue = "Numeric text box";
        pcd3.PolarisCustomDataTypeID = 1;
        this.PatronCustomData.push(pcd3);

        var pcd4 = new PatronCustomData();
        pcd4.CustomDataEntry = true;
        pcd4.IsRequired = false;
        pcd4.PatronCustomDataDefinitionID = 10;
        pcd4.PatronDataLabelValue = "Restricted patron";
        pcd4.PolarisCustomDataTypeID = 4;
        this.PatronCustomData.push(pcd4);
    }
}

class RegistrationData {

    public Barcode: string;
    public PatronCodeID: number;
    public OrganizationID: number;
    public NoticesAddress: string;
    public Registration: RegistrationDetails;

    constructor() {
        this.Registration = new RegistrationDetails();
    }
}

