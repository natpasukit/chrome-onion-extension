// Get URL from tab function
function gettab(user,callback){
  var url = new Array();
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //Push all tab into array
        url.push( {
          "url":tab.url
          ,"title":tab.title
        });
      });
    });
  });
  url = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
  //console.log(url);
  callback(url);
}

// FIX ARRAY TO OBJECT ! TO MAKE THIS WORK KWRKKRK

// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  var checkPageButton = document.getElementById('checkTab');
  checkPageButton.addEventListener('click',function(){
    //Get all open tab to console.log
    if (typeof(Storage) !== "undefined") {
      console.log('localstorage online');
      // Get url & save to localstorage
      gettab('user1',function(urlArray){
        localStorage.setItem('user1',JSON.stringify(urlArray));
      });
    }else{
      console.log('Your browser does not support localstorage');
    }
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('user1');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  });
});
