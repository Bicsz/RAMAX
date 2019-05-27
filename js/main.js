//Подключаем JSON
var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          console.log('DataBase uploaded');
          DataBase_Ready(xhr.response);
        } else {
          console.log('Something went wrong: ' + status);
        }
      };
      xhr.send();
  };

getJSON('db/data.json');//get DataBase


//Выполняется, когда JSON подключится
function DataBase_Ready(data){
  exam1(data);
  exam2(data);
  exam3(data);
}
