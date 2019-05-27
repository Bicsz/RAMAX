//класс рейсов
class Reis{
  constructor(Num, Aero_id_from,Aero_id_to,Time_departure,Time_arrival){
       this.Num = Num;
       this.Aero_id_from = Aero_id_from;
       this.Aero_id_to = Aero_id_to;
       this.Time_departure = Time_departure;
       this.Time_arrival = Time_arrival;

       console.log("New Reis creation "+this.Num);
   }
}
//класс аэропортов
class Aero{
  constructor(id, Title,Local_time){
       this.id = id;
       this.Title = Title;
       this.Local_time = Local_time;

       console.log("New Aero creation "+this.Title);
   }
}

var table3 = document.getElementById("table3");//таблица
var ta3_body = document.getElementById("ta3_body");//тело таблицы

var comboBox_3_time_start = document.getElementById("comboBox_3_time_start");//комбобокс для фильтрации
var comboBox_3_time_end   = document.getElementById("comboBox_3_time_end");//комбобокс для фильтрации
var arr_Reiss=[];//тут будут хранится объекты класса рейсов
var arr_Aeros=[];//тут будут хранится объекты класса аэропортов
function exam3(data){
  make_times();//заполнение фильтров временными промежутками

  for (i = 0; i < data.Reis.Num.length; i++)//Получиение списка всех рейсов из базы
  {
      console.log("table "+i);
      arr_Reiss.push(
        new Reis(
          data.Reis.Num[i],
          data.Reis.Aero_id_from[i],
          data.Reis.Aero_id_to[i],
          data.Reis.Time_departure[i],
          data.Reis.Time_arrival[i]
        ));
  }
  for (i = 0; i < data.Aero.id.length; i++)//Получиение списка всех аэропортов из базы
  {
      console.log("table "+i);
      arr_Aeros.push(
        new Aero(
          data.Aero.id[i],
          data.Aero.Title[i],
          data.Aero.Local_time[i]
        ));
  }
  debugger;

  makeTable3();//построение таблицы
}
function makeTable3(){
  ta3_body.remove();//очистка таблицы
  ta3_body = CrElem('tbody',table3);

  for(var i=0;i<arr_Reiss.length;i++){
    if(arr_Reiss[i].Time_departure>=comboBox_3_time_start.value && arr_Reiss[i].Time_departure<=comboBox_3_time_end.value)//применение фильтрации по выводу
    {
      var tr = CrElem('tr',ta3_body);
      CrElem('td',tr,arr_Reiss[i].Num);
      CrElem('td',tr,arr_Aeros.find(x=>x.id==arr_Reiss[i].Aero_id_from).Title);//поиск в аэропортах того, чей id соответствует Aero_id_from объекта рейса
      CrElem('td',tr,arr_Aeros.find(x=>x.id==arr_Reiss[i].Aero_id_to).Title);  //поиск в аэропортах того, чей id соответствует Aero_id_to объекта рейса
      CrElem('td',tr,arr_Reiss[i].Time_departure);
      CrElem('td',tr,arr_Reiss[i].Time_arrival);
    }
  }
}

function make_times(){
  var time;
  for (i = 0; i < 24; i++)
  {
    time=i<10 ? "0"+i+":00":i+":00";

    var temp = CrElem('option',comboBox_3_time_start,time);
    temp.value=time;

    var temp = CrElem('option',comboBox_3_time_end,time);
    temp.value=time;
  }
  comboBox_3_time_end.selectedIndex=23;
}
