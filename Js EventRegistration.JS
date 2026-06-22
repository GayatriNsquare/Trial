/*When an Event is selected, automatically fill in the Event Start Date & Event End 
Date referenced from the selected Event. If the Event is removed, clear the Event 
Start Date & Event End Date field. */
function SetDatesonChange(executionContext) 
{
    var formContext = executionContext.getFormContext();
    var eventLookup = formContext.getAttribute("ggs_event").getValue();
 
    var eventStartDateAttri =formContext.getAttribute("ggs_eventstartdate");
    var eventEndDateAttri=formContext.getAttribute("ggs_eventenddate");
    var eventStartDateCtrl =formContext.getControl("ggs_eventstartdate");

    // If Event is removed - clear dates
    if (!eventLookup)
   {
        eventStartDateAttri.setValue(null);
        eventEndDateAttri.setValue(null);
        return;
    }
    var eventId = eventLookup[0].id.replace("{", "").replace("}", "");

    Xrm.WebApi.retrieveRecord("ggs_event", eventId, "?$select=ggs_enddate,ggs_startdate").then(
	function success(result) 
    {
		// Columns//
		var ggs_eventid = result["ggs_eventid"]; // Guid
	    var ggs_enddate = result["ggs_enddate"]; // Date Time
		var ggs_enddate_formatted = result["ggs_enddate@OData.Community.Display.V1.FormattedValue"];
		var ggs_startdate = result["ggs_startdate"]; // Date Time
		var ggs_startdate_formatted = result["ggs_startdate@OData.Community.Display.V1.FormattedValue"];

        //setting value
        if(ggs_startdate!=null && ggs_enddate!=null)
        {
            eventStartDateAttri.setValue(new Date(ggs_startdate));
            eventEndDateAttri.setValue(new Date(ggs_enddate));   
        }
	},
	function(error) {
		console.log(error.message);
	}
    );
     
}

