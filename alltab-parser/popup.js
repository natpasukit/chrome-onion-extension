// Get URL from tab function
function gettab(){
  url = [];
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //Push all tab into array
        url.push( {
          "url":tab.url
          ,"title":tab.title
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
    // Using indexedDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    // Check support for indexedDB
    if (!window.indexedDB) {
       window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }
    var db;
    var request = indexedDB.open("TAB Log");
    request.onerror = function(event) {
      alert("Please allow IndexedDB!");
    };
    request.onsuccess = function(event) {
      db = event.target.result;
    };
  });
});

// Global error handle for indexedDB
// db.onerror = function(event) {
//   // Generic error handler for all errors targeted at this database's
//   // requests!
//   alert("Database error: " + event.target.errorCode);
// };
