// Add onClick listener to checkTab button
document.addEventListener('DOMContentLoaded',function(){
  // Localstorage check
  if (typeof(Storage) !== "undefined"){
    console.log('Extension localstorage loaded');
  }else{
    alert('Browser do not support localstorage, Please update your browser.');
  }

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
      // Google api is async
        setTimeout(function(){
            var JSONurl = JSON.stringify(url);
            // If localstorage key exist clear else set it
            if (localStorage.getItem("TabLog") === null) {
              // If not set , set it.
              localStorage.setItem('TabLog',JSONurl);
              console.log('No existing data, Saving tab...');
            }else{
              // Remove data on user prompt
              if(confirm("Old tab data exist do you wish to overwrite it ?") == true){
                console.log('Old data existing, Clearing and saveing new data');
                localStorage.removeItem('TabLog');
                localStorage.setItem('TabLog',JSONurl);
              }else{
                console.log('User cancel data overwrite');
              }
            }
            // Check return value
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
    if(typeof(Storage) !== "undefined" && localStorage.getItem("TabLog") !== null){
      //Load data into app
      var retrievedObject = JSON.parse(localStorage.getItem('TabLog'));
      // Check loaded data
      console.log(retrievedObject);
      // Create TAB from data
      retrievedObject.forEach(function(current_url){
        console.log(current_url.url);
        chrome.tabs.create({ url: current_url.url });
      });
    }else{
      if(typeof(Storage) !== "undefined"){
        alert('No tab saved');
      }else{
        alert('Browser does not support localstorage');
      }
    }
  });

  var closePageButton = document.getElementById('closeTab');
  closePageButton.addEventListener('click',function(){
    // Count all tab
    chrome.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        // Close all tab based on tab ID
        chrome.tabs.remove(tabs[i].id);
      }
    });
    chrome.tabs.create({});
  });

  var saveHistoryButton = document.getElementById('saveHistory');
  saveHistoryButton.addEventListener('click',function(){
    // Load history data
    chrome.history.search({text:'', maxResults: 1000},function(history){
      // If localstorage key exist clear else set it
      if (localStorage.getItem("HistoryLog") === null) {
        // Remove old Data
        localStorage.removeItem('HistoryLog');
      }
      console.log(history);
      var historyjson = JSON.stringify(history);
      localStorage.setItem('HistoryLog',historyjson);
    });
  });

  var loadHistoryButton = document.getElementById('loadHistory');
  loadHistoryButton.addEventListener('click',function(){
    // Get local data
    var historyObject = JSON.parse(localStorage.getItem('HistoryLog'));
    console.log(historyObject);
    historyObject.forEach(function(historydata){
      // console.log(historydata.url);
      chrome.history.addUrl({url: historydata.url},function(){
        console.log(historydata.url);
      });
    });
  });

  var clearHistoryButton = document.getElementById('clearHistory');
  clearHistoryButton.addEventListener('click',function(){
    // Clear local history data
    chrome.history.deleteAll(function(){
      console.log('delete history');
    });
  });
});
