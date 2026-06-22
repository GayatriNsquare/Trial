function validateForbiddenWords(executionContext) 
{
    var formContext = executionContext.getFormContext();
    var Commentattr = formContext.getAttribute("ggs_comments");
    var Commentctrl = formContext.getControl("ggs_comments");

    if (!Commentattr || !Commentctrl) return;
    Commentctrl.clearNotification("forbiddenBio");

    var Content = Commentattr.getValue();
    if(!Content)return;
    var contentLower = Content.toLowerCase();

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
        return contentLower.includes(word);
    });

    if (foundForbidden) {
        Commentctrl.setNotification(
            "Biography contains forbidden or inappropriate words. Please revise the content.",
            "forbiddenBio"
        );
    }
}

function hideShow(executionContext)
{
    var formContext = executionContext.getFormContext();
    var ratingAtrr= formContext.getAttribute("ggs_rating");
    var rating = ratingAtrr.getValue();

    var commentAttri=formContext.getAttribute("ggs_comments");
    var commentCtrl=formContext.getControl("ggs_comments");

    if(rating<3)
    {
        commentCtrl.setVisible(true);//visible
        commentCtrl.setDisabled(false);//unlock
    }
    else
    {
        commentCtrl.setVisible(false);//not visible
        commentCtrl.setDisabled(true);//lock
    }

}