// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  var checkPageButton = document.getElementById('checkTab');
  checkPageButton.addEventListener('click',function(){
    //Get all open tab to console.log
    if (typeof(Storage) !== "undefined") {
      console.log('localstorage online');
      // Get url & save to localstorage
      var i = 0;
      var url = [];
      chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
          window.tabs.forEach(function(tab){
            url.push( {
                    "url":tab.url,
                    "title":tab.title
                    } );
          });
        });
      });
        setTimeout(function(){
            var JSONurl = JSON.stringify(url);
            localStorage.setItem('TabLog',JSONurl);
            var retrievedObject = localStorage.getItem('TabLog');
            console.log('retrievedObject: ', JSON.parse(retrievedObject));
        }, 1000);
    }else{
      alert('Your browser does not support localstorage');
      console.log('Your browser does not support localstorage');
    }
  });
});
