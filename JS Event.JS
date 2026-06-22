//Make End Date read-only until Start Date is selected
function validateDates(executionContext)
{
  var formContext = executionContext.getFormContext();
  
  var startDateAttri = formContext.getAttribute("ggs_startdate"); 
  var endDateAttri = formContext.getAttribute("ggs_enddate");

  var startDateValue =startDateAttri.getValue();
  var endDateValue =endDateAttri.getValue();

  var endDateCntrl = formContext.getControl("ggs_enddate");

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


//If the Event Status is either Completed or Cancelled, then all fields on the form should become read-only. 
function EventStatusChange(executionContext)
{
    var formContext = executionContext.getFormContext();

    var eventStatus = formContext.getAttribute("ggs_status").getValue();
    var status = formContext.getControl("ggs_status");
    var endDate = formContext.getControl("ggs_enddate");
    var eventCode =formContext.getControl("ggs_eventcode");

    var fields=["ggs_eventname",
                "ggs_startdate",           
                "ggs_location",
                "ggs_description",
                "ggs_eventtype"]
                
    if(eventStatus==805150002 || eventStatus==805150003) //805150002 is for complete and other one is value for cancelled
    {
        endDate.setDisabled(true);
        eventCode.setDisabled(true);
       
       fields.forEach(fieldname => 
      {
          var Field= formContext.getControl(fieldname);
          Field.setDisabled(true);
      });
        
    }else
    {        
        fields.forEach(fieldname =>
        {
           var Field= formContext.getControl(fieldname);
           Field.setDisabled(false);
       });
    }
}

//Ensure "Description" field is mandatory for Workshop or Conference Event types. 
function makeFieldMandatory(executionContext)
{
    var formContext = executionContext.getFormContext();

    var eventType = formContext.getAttribute("ggs_eventtype").getValue();
    var description = formContext.getAttribute("ggs_description");

    description.setRequiredLevel((eventType == 805150002 || eventType == 805150000) ? "required" : "none");
    //805150002- optionset value for workshop, 805150000-conference
}


//Based on the selected Event Type, the script will automatically switch to the appropriate BPF.
function onEventTypeChange(executionContext)
{
     var formContext = executionContext.getFormContext();
     var eventType = formContext.getAttribute("ggs_eventtype").getValue();

      if(eventType == null) return;

     if(eventType == 805150003) //corporate 
     {
        formContext.data.process.setActiveProcess("9710A8D2-2DEF-F011-8406-6045BDEA695E");
     }
     else 
     {
        formContext.data.process.setActiveProcess("F7100B11-2DEF-F011-8406-6045BDEA695E");
     }
}