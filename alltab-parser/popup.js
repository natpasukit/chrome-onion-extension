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
            // If localstorage key exist clear else set it
            if (localStorage.getItem("TabLog") === null) {
              // Remove old Data
              localStorage.removeItem('TabLog');
            }
            localStorage.setItem('TabLog',JSONurl);
            var retrievedObject = localStorage.getItem('TabLog');
            console.log('retrievedObject: ', JSON.parse(retrievedObject));
        }, 1000);
    }else{
      alert('Your browser does not support localstorage');
      console.log('Your browser does not support localstorage');
    }
  });

  var loadPageButton = document.getElementById('loadTab');
  loadPageButton.addEventListener('click',function(){
    //Load data into app
    var retrievedObject = JSON.parse(localStorage.getItem('TabLog'));
    console.log(retrievedObject);
    retrievedObject.forEach(function(current_url){
      console.log(current_url.url);
      chrome.tabs.create({ url: current_url.url });
    });
  });
});
