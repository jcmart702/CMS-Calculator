const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);


document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById("cms-calc") !== null || document.getElementById("cms-calc") !== undefined){

    var cmsList = ["AEM","Drupal","Joomla","SAM","Sitecore","Wordpress"];
    var cmsResult = [];

    var url = "";

    var cmsForm = document.getElementById("cms-calc");

    if(cmsForm !== null){
      cmsForm.addEventListener('submit', handleSubmit);
    }
    
    function handleSubmit(event){
      event.preventDefault();

      var answers = [];

      var q1 = $("input[name=complexity]:checked").value;
      var q2 = $("input[name=budget]:checked").value;
      var q3 = $("input[name=live-date]:checked").value;
      var q4 = $("input[name=expertise]:checked").value;
      var q5 = $("input[name=privacy]:checked").value;
      var q6 = $("input[name=security]:checked").value;
      var q7 = $("input[name=visitors]:checked").value;

      var questions = [q1,q2,q3,q4,q5,q6,q7];

      for(var i = 0; i < questions.length; i++){
        answers.push(makeResultsArray(questions[i].substring(1,questions[i].length-1)));
      }

      var finalResults = findWinner(answers);

      var CMS = checkTie(finalResults, q1);

      for(var i = 0; i < CMS.length; i++){
        cmsResult.push(cmsList[(CMS[i])]);
      }

      if(cmsResult.length === 1){
        url = document.getElementById('cms-calc').getAttribute('action') + "?cms=" + cmsResult[0];
      }
      if(cmsResult.length === 2){
        url = document.getElementById('cms-calc').getAttribute('action') + "?cms1=" + cmsResult[0] + "&cms2=" + cmsResult[1];
      }

      window.location.href = url;
      return false;
    }
  }
});

//converts final array from responses from a string to an array of numbers
function makeResultsArray(answers){

  var arr = [];

  answers = answers.split(",");

  for(var i = 0; i < answers.length; i++){
    arr.push(parseInt(answers[i]));
  }

  return arr;
}

//adds all of the values together to get the total score based on responses
function findWinner(answers){

  var finalResults = [];

  for(var i = 0; i < answers.length; i++){
    for(var j = 0; j < answers[i].length; j++){
      if(i == 0){
        finalResults.push(answers[i][j]);
      } else {
        finalResults[j] += answers[i][j];
      }
    }
  }

  return finalResults;
}

function checkTie(results, q1){
  var max = results[0];
  var maxBreaker = results[0];
  var bestTwo = [];
  var bestInd = 0;
  var maxVals = [];
  var maxInd = 0;

  //finds biggest value between all of the final values calculated from responses
  for(var i = 0; i < results.length; i++){
    if(results[i] > max){
      max = results[i];
    }
  }

  //finds the index of all of those with max value and pushes it's tie breaker value to it as an array
  //ex: [[index, tie breaker], [index, tie breaker]]
  for(var i = 0; i < results.length; i++){
    if(results[i] === max){
      maxVals.push([i]);
    }
  }

  if(maxVals.length === 1){
    return maxVals[0];
  }

  //goes through entire set to see if there is more than one biggest value
  //if there is then finds the best two based off of the tie breaker value
  if(maxVals.length >= 2){

    for(var i = 0; i < maxVals.length; i++){
      checkTieValues(maxVals[i], q1);
    }

    //will need to run through this twice to get the second top value from the bunch
    for(var j = 0; j < 2; j++){
      maxBreaker = -9999;
      for(var i = 0; i < maxVals.length; i++){
        if(maxVals[i][1] > maxBreaker){
          maxBreaker = maxVals[i][1];
          maxInd = i;
          bestInd = maxVals[i][0];
        }

        if(i === maxVals.length - 1){
          bestTwo.push(bestInd);
          maxVals.splice(maxInd, 1);
        }
      }
    }
  }

  //returns indices of the best two values
  return bestTwo;
}

function checkTieValues(arr, q1){
  if(q1 === "[-9999,-1,-1,-9999,-9999,2]"){
    if(arr[0] === 0){
      arr.push(1);
    }
    if(arr[0] === 1){
      arr.push(4);
    }
    if(arr[0] === 2){
      arr.push(5);
    }
    if(arr[0] === 3){
      arr.push(3);
    }
    if(arr[0] === 4){
      arr.push(2);
    }
    if(arr[0] === 5){
      arr.push(6);
    }
  }
  if(q1 === "[-1,1,0,0,-1,1]"){
    if(arr[0] === 0){
      arr.push(2);
    }
    if(arr[0] === 1){
      arr.push(5);
    }
    if(arr[0] === 2){
      arr.push(4);
    }
    if(arr[0] === 3){
      arr.push(6);
    }
    if(arr[0] === 4){
      arr.push(1);
    }
    if(arr[0] === 5){
      arr.push(3);
    }
  }
  if(q1 === "[1,0,1,2,1,-1]"){
    if(arr[0] === 0){
      arr.push(2);
    }
    if(arr[0] === 1){
      arr.push(4);
    }
    if(arr[0] === 2){
      arr.push(5);
    }
    if(arr[0] === 3){
      arr.push(6);
    }
    if(arr[0] === 4){
      arr.push(3);
    }
    if(arr[0] === 5){
      arr.push(1);
    }
  }
  if(q1 === "[2,-1,0,1,2,-2]"){
    if(arr[0] === 0){
      arr.push(5);
    }
    if(arr[0] === 1){
      arr.push(2);
    }
    if(arr[0] === 2){
      arr.push(3);
    }
    if(arr[0] === 3){
      arr.push(4);
    }
    if(arr[0] === 4){
      arr.push(6);
    }
    if(arr[0] === 5){
      arr.push(1);
    }
  }
}
