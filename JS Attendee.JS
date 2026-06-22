function ShowHideField(executionContext)
{
    var formContext=executionContext.getFormContext();
    var PreffContactAttri=formContext.getAttribute("ggs_preferredcontactmethod");
    var PreffContactCtrl=formContext.getControl("ggs_preferredcontactmethod");

    var phoneField =formContext.getControl("ggs_phone");
    var emailField =formContext.getControl("ggs_email");

    var phone=805150001;
    var email=805150000;
    var both=805150002;
    var preffContact =PreffContactAttri.getValue();
    if(preffContact==email)
    {
        emailField.setVisible(true);
        phoneField.setVisible(false);
    }
    else
        if(preffContact==phone)
        {
            emailField.setVisible(false);
            phoneField.setVisible(true);
        }else
            if(preffContact==both)
            {
                emailField.setVisible(true);
                phoneField.setVisible(true);
             }
}


function validateEmailOnChange(executionContext)
{
    var formContext = executionContext.getFormContext();
    var emailAttr = formContext.getAttribute("ggs_email");
    var emailCtrl = formContext.getControl("ggs_email");

    var emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,4}$/;

    var emailValue = emailAttr.getValue();
    if(!emailValue)return;

    emailValue=emailValue.trim();
    if (emailValue && !emailRegex.test(emailValue)) {
        emailCtrl.setNotification("Invalid email format", "emailFormat");
    } else {
        emailCtrl.clearNotification("emailFormat");
    }
}

function validatePhoneNumber(executionContext)
{
    var formContext = executionContext.getFormContext();
    var PhoneAttr = formContext.getAttribute("ggs_phone");
    var PhoneCtrl = formContext.getControl("ggs_phone");
    PhoneCtrl.clearNotification("phone-invalid");

    var phoneRegex = /^\+91[0-9]{10}$/;
   
    var phoneNo =PhoneAttr.getValue();
    if(!phoneNo) return;

    phoneNO =phoneNo.trim();
    if(phoneNo && ! phoneRegex.test(phoneNo))
    {
        PhoneCtrl.setNotification("Phone must start with +91 and be followed by 10 digits.", "phone-invalid");
    }else
    {
        PhoneCtrl.clearNotification("phone-invalid");
    }
}
 

