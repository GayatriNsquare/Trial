//Make End Date read-only until Start Date is selected
function validateDates(executionContext)
{
  var formContext = executionContext.getFormContext();
  
  var startDateAttri = formContext.getAttribute("ggs_starttime"); 
  var endDateAttri = formContext.getAttribute("ggs_endtime");

  var startDateValue =startDateAttri.getValue();
  var endDateValue =endDateAttri.getValue();

  var endDateCntrl = formContext.getControl("ggs_endtime");

    // Make End Date read-only until Start Date is selected
    endDateCntrl.setDisabled((!startDateValue)? true:false);
    
//Throw error & clear field if End Date is greater and equal to startdate 
    if(endDateValue && endDateValue<= startDateValue)
    {            
       formContext.ui.setFormNotification("End Date must be greater than Start Date.", "ERROR", "date_error");
       endDateAttri.setValue(null);
    }
    else { formContext.ui.clearFormNotification("date_error");}
    
}//end 

