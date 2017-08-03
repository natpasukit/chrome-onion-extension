// Get URL from tab function
function gettab(callback){
  var i = 0;
  var url = {};
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        i++;
        url[i] = tab.url;
      });
    });
  });
  callback(url);
}
// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  var checkPageButton = document.getElementById('checkTab');
  checkPageButton.addEventListener('click',function(){
    //Get all open tab to console.log
    if (typeof(Storage) !== "undefined") {
      console.log('localstorage online');
      // Get url & save to localstorage
      gettab(function(urlArray){
        console.log(urlArray);
        console.log(JSON.stringify(urlArray));
        localStorage.setItem('TabLog',urlArray);
      });
    }else{
      console.log('Your browser does not support localstorage');
    }
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('TabLog');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  });
});
