/*
 *  John Chiodo
 *  jchiodo@hawk.iit.edu
 *  ITMD462 - Assignment7 week11
 *  11/07/2017
 */

 $(document).ready(function() {
  "use strict";


    $("#addUserBtn").on("click", function() {
        console.log("app.js:addUserBtn callback.");
        var newName = $("input[name='userName']").val();
    	var newEmail = $("input[name='userEmail']").val();
        console.log("app.js:addUserBtn callback values: " + newName + ", " + newEmail);
     	var newItem = {'user' : {
                name: newName,
                email: newEmail
            }};
        $.ajax({
        	    url: "http://localhost:3000/users",
                type: "POST",
                data: JSON.stringify(newItem),
                contentType: "application/json",
                success: function(newItem, status) {
                	// $itemList.append(buildItemEl(newItem));
                    var $output = $("<p>");
                    $output.text("New userID: " + newItem.id);
                    $(".addUserOutput").html($output);
                }
        });
    });

    /* get userID */
    $("#getUserBtn").on("click", function() {
        console.log("app.js:getUserBtn callback.");
        var userID = $("input[name='userid']").val();
        console.log("app.js:getUserBtn form value: " + userID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID,
                type: "GET",
                success: function(userInfo, status) {
                    console.log("app.js:getUserBtn return value: " + JSON.stringify(userInfo));
                    // just put output to a simple div as paragraph
                    var $output = $("<p>");
                    $output.text("Username: " + userInfo.name + " Email: " + userInfo.email);
                    $(".getUserOutput").html($output);
                }
        });
    });


    /* add reminder */
    $("#addRemBtn").on("click", function() {
        console.log("app.js:addRemBtn callback.");
        var userID = $("input[name='userID']").val();
        var newTitle = $("input[name='userTitle']").val();
        var newDesc = $("input[name='userDesc']").val();
        console.log("app.js:addUserBtn callback values: " + userID + ", " + newTitle + ", " + newDesc);
        var newReminder  =   {"reminder" : {
                "title" : newTitle,
                "description" : newDesc
            }};
        $.ajax({
                url: "http://localhost:3000/users/" + userID + "/reminders",
                type: "POST",
                data: JSON.stringify(newReminder),
                contentType: "application/json",
                success: function(newItem, status) {
                    // $itemList.append(buildItemEl(newItem));
                    var $output = $("<p>");
                    $output.text("New ReminderID: " + newItem.reminderid);
                    $(".addRemOutput").html($output);
                }
        });
    });


    /* get single reminder */
    $("#getRemBtn").on("click", function() {
        console.log("app.js:getRemBtn callback.");
        var userID = $("input[name='userID2']").val();
        var reminderID = $("input[name='reminderID2']").val();
        console.log("app.js:getRemBtn form value: " + userID + ", " + reminderID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID + "/reminders/" + reminderID,
                type: "GET",
                success: function(reminderInfo, status) {
                    console.log("app.js:getRemBtn return value: " + JSON.stringify(reminderInfo));
                    // just put output to a simple div as paragraph
                    var $output = $("<p>");
                    $output.text("Title: " + reminderInfo.title + " | " +
                                 " Description: " + reminderInfo.description + " | " +
                                 " Created: " + reminderInfo.created);
                    $(".getRemOutput").html($output);
                }
        });
    });

    /* get all reminder */
    $("#getAllRemBtn").on("click", function() {
        console.log("app.js:getAllRemBtn callback.");
        var userID = $("input[name='userID3']").val();
        console.log("app.js:getAllRemBtn form value: " + userID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID + "/reminders/",
                type: "GET",
                success: function(allReminders, status) {
                    console.log("app.js:getAllRemBtn return value: " + allReminders);
                    // just put output to a simple div as List
                    $(".getAllRemOutput").empty();
                     allReminders.forEach(function (reminders) {
                        var $output = $("<li>");
                        $output.text("Title: " + reminders.title + " | " +
                                " Description: " + reminders.description + " | " +
                                " Created: " + reminders.created);
                        $(".getAllRemOutput").append($output);
                    });

                }
        });
    });


    /* delete single user */
    $("#delUserBtn").on("click", function() {
        console.log("app.js:delUserBtn callback.");
        var userID = $("input[name='delUserID']").val();
        console.log("app.js:delUserBtn form value: " + userID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID,
                type: "DELETE",
                success: function(status) {
                    console.log("app.js:getAllRemBtn status: " + status);
                    // just put output to a simple div as List
                     var $output = $("<p>");
                    $output.text("UserID " + userID + " has been deleted");
                    $(".delUserOutput").html($output);
            }
        });
    });


    /* delete single reminder */
    $("#delRemBtn").on("click", function() {
        console.log("app.js:delRemBtn callback.");
        var userID = $("input[name='delUserID2']").val();
        var remID = $("input[name='delRemID']").val();
        console.log("app.js:delRemBtn form value: " + userID + ", " + remID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID + "/reminders/" + remID,
                type: "DELETE",
                success: function(status) {
                    console.log("app.js:delRemBtn status: " + status);
                    // just put output to a simple div as List
                    $(".delRemOutput").empty();
                     var $output = $("<p>");
                    $output.text("ReminderID " + remID + " has been deleted" +
                                 " for userID: " + userID);
                    $(".delRemOutput").html($output);
            }
        });
    });


    /* delete ALL reminders */
    $("#delAllRemBtn").on("click", function() {
        console.log("app.js:delAllRemBtn callback.");
        var userID = $("input[name='delRemUser']").val();
        console.log("app.js:delAllRemBtn form value: " + userID);
        
        $.ajax({
                url: "http://localhost:3000/users/" + userID + "/reminders/",
                type: "DELETE",
                success: function(status) {
                    console.log("app.js:delAllRemBtn status: " + status);
                    // just put output to a simple div as List
                    $(".delAllRemOutput").empty();
                     var $output = $("<p>");
                    $output.text("All Reminders for userID " + userID + " have been deleted");
                    $(".delAllRemOutput").html($output);
            }
        });
    });

}); // document ready
