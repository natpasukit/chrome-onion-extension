// Get URL from tab function
function gettab(){
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //collect all of the urls here, I will just log them instead
        console.log(tab.url);
      });
    });
  });
}

// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  var checkPageButton = document.getElementById('checkTab');
  checkPageButton.addEventListener('click',function(){
    //Get all open tab to console.log
    gettab();
  });
});
