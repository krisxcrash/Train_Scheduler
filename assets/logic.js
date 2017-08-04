  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCML1IJPb9PjNMOyAr2GxUKqMt0iYM89cs",
    authDomain: "train-scheduler-6cec5.firebaseapp.com",
    databaseURL: "https://train-scheduler-6cec5.firebaseio.com",
    projectId: "train-scheduler-6cec5",
    storageBucket: "train-scheduler-6cec5.appspot.com",
    messagingSenderId: "454299206031"
  };

  firebase.initializeApp(config);

  var trainSchedule = firebase.database();

// Creates variables for data entered when button is submitted

  $("#addTrain").on("click", function() {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrainTime,
      frequency: frequency
    }

// Pushes train schedule data to Firebase

    trainSchedule.ref().push(newTrain);

// Clears the input fields once data is pushed

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    return false;

  });

// Create a Firebase event

  trainSchedule.ref().on("child_added", function(childSnapshot, prevChildKey) {

// Create variables to store the values of the object within Firebase

    var trainName2 = childSnapshot.val().name;
    var destination2 = childSnapshot.val().destination;
    var firstTrainTime2 = childSnapshot.val().firstTrain;
    var frequency2 = childSnapshot.val().frequency;

        console.log(firstTrainTime2);

// Create variables to calculate the times
// debugger;

    var timeDifference = moment().diff(moment.unix(firstTrainTime2), "minutes");
    var remainingTime = moment().diff(moment.unix(firstTrainTime2), "minutes") % frequency2;
    var minutes = frequency2 - remainingTime;

    var arrivalTime = moment().add(minutes, "m").format("hh:mm A");


    console.log(minutes);

// Appends the train data to the table
  $("#trainData > tbody").append("<tr><td>" + trainName2 + "</td><td>" + destination2 + "</td><td>" + frequency2 + "</td><td>" + arrivalTime + "</td><td>" + minutes + "</td></tr>");


  });



