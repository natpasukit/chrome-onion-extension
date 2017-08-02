// Get URL from tab function
function gettab(){
  var url = [];
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //Push all tab into array
        url.push( {
          "url":tab.url,
          "title":tab.title
        } );
      });
    });
  });
  return(url);
}

// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  var checkPageButton = document.getElementById('checkTab');
  checkPageButton.addEventListener('click',function(){
    //Get all open tab to console.log
    console.log(gettab());
    //Check browserver localstorage
    if(window.localStorage) {
      console.log('localstorage is available');
    } else {
      console.log('localstorage is unavailable');
    }
  });
});
