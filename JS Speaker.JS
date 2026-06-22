/*Before saving, make sure the Email is in proper email format (e.g., 
abc@example.com). The Phone Number must be 13 digits long, including the 
country code prefix (e.g., +911234567890). If the format is wrong, show an error 
message and prevent the save. */
function validateEmailOnChange(executionContext)
{
    var formContext = executionContext.getFormContext();
    var emailAttr = formContext.getAttribute("ggs_emailid");
    var emailCtrl = formContext.getControl("ggs_emailid");

    var emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,4}$/;

    var emailValue = emailAttr.getValue();
    if(!emailValue)return;

    emailValue=emailValue.trim();
    if (emailValue && !emailRegex.test(emailValue)) 
    {
        emailCtrl.setNotification("Invalid email format", "emailFormat");
        executionContext.getEventArgs().preventDefault();
    } else 
    {
        emailCtrl.clearNotification("emailFormat");
    }
}

function validatePhoneNumber(executionContext)
{
    var formContext = executionContext.getFormContext();
    var PhoneAttr = formContext.getAttribute("ggs_phonenumber");
    var PhoneCtrl = formContext.getControl("ggs_phonenumber");
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

function validateLinkedinLlink(executionContext)
{
    var formContext = executionContext.getFormContext();
    var LinkedinAttr = formContext.getAttribute("ggs_linkedinprofile");
    var LinkedinCtrl = formContext.getControl("ggs_linkedinprofile");

    LinkedinCtrl.clearNotification("URL")

    var linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/(in|company|school|groups|showcase)\/[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*\/?$/;

    var LinkedinValue=LinkedinAttr.getValue();
    if(!LinkedinValue )return;

    LinkedinValue = LinkedinValue.trim();
    if(LinkedinValue && !linkedInRegex.test(LinkedinValue))
    {
        LinkedinCtrl.setNotification("Please enter a valid LinkedIn URL ","URL");
    }else
    {
        LinkedinCtrl.clearNotification("URL");

    }

}

//Prevent saving if biography contains forbidden words or phrases (basic content moderation). 
function validateBiographyForbiddenWords(executionContext) 
{
    var formContext = executionContext.getFormContext();
    var Bioattr = formContext.getAttribute("ggs_biography");
    var Bioctrl = formContext.getControl("ggs_biography");

    if (!Bioattr || !Bioctrl) return;
    Bioctrl.clearNotification("forbiddenBio");

    var bio = Bioattr.getValue();
    if(!bio)return;
    var bioLower = bio.toLowerCase();

    var forbiddenList = 
    [
        "abuse",
        "violence",
        "spam",
        "hate",
        "offensive",
        "fraud",
        "scam",
        "sexual",   
        "terror",
        "fake"
     ];

    var foundForbidden = forbiddenList.some(function (word) 
    {
        return bioLower.includes(word);
    });

    if (foundForbidden) {
        Bioctrl.setNotification(
            "Biography contains forbidden or inappropriate words. Please revise the content.",
            "forbiddenBio"
        );
    }
        

}