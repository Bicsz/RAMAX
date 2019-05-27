//Класс документов
class Doc{
  constructor(N_doc, year){
       this.N_doc = N_doc;
       this.year = year;
       this.arr_doc=[];
       console.log("New Doc creation "+this.N_doc+" "+this.year);
   }

   //добавление полной информации в масив
   addDoc(subDoc){
     console.log("Doc "+this.N_doc+" add a SubDoc");
     this.arr_doc.push(subDoc);

   }
}
//класс полной информации о документах
class SubDoc{
  constructor(N_pos, txt,coast){
       this.N_pos = N_pos;
       this.txt = txt;
       this.coast=coast;
       console.log("New SubDoc creation "+this.N_pos+" "+this.txt+" "+this.coast);
   }
}

var arr_Docs  = [];//масив из объектов класса Doc
var comboBox_2 = document.getElementById("comboBox_2");//комбобокс для фильтрации
var table2 = document.getElementById("table2");//таблица
var ta2_body = document.getElementById("ta2_body");//тело таблицы
function exam2(data){
  console.log("exam2 - test db2: ");//Тест базы данных, работает ли она
  for(var t=0;t<data.Head.N_doc.length;t++){
    console.log(t+" - "+data.Head.N_doc[t]);
  }


  for (i = 0; i < data.Head.N_doc.length; i++)//Получиение списка всех документов из базы
  {
      console.log("table "+i);
      arr_Docs.push(new Doc(data.Head.N_doc[i],data.Head.year[i]));
      CrElem('option',comboBox_2,data.Head.N_doc[i]);

  }
  for (i = 0; i < data.Pos.N_doc.length; i++)//дополнение документов существующих подробной информацией
  {
      console.log("table "+i);
      var index = arr_Docs.findIndex(x=> x.N_doc==data.Pos.N_doc[i]);
      arr_Docs[index].addDoc(new SubDoc(data.Pos.N_pos[i],data.Pos.txt[i],data.Pos.coast[i]));

  }

  makeTable(-1);//построение таблицы без фильтра
}


//построение таблицы (на вход порядковый номер документа для выведения, если -1, то выведет все)
function makeTable(selected_N_doc){

  ta2_body.remove();//очистка таблицы
  ta2_body = CrElem('tbody',table2);

  console.log("Building a same table for "+selected_N_doc+"...");
  var sum=0*1;//для подсчета суммы по документу
  var sumGLOBAL=0*1;//для подсчета итоговой суммы

  for(var i=0;i<arr_Docs.length;i++){
    if(i==selected_N_doc || selected_N_doc==-1)//применение фильтрации по выводу документов
    {
      var tr = CrElem('tr',ta2_body);

      CrElem('td',tr,arr_Docs[i].N_doc);
      CrElem('td',tr,arr_Docs[i].year);
      CrElem('td',tr,arr_Docs[i].arr_doc[0].N_pos);
      CrElem('td',tr,arr_Docs[i].arr_doc[0].txt);
      CrElem('td',tr,arr_Docs[i].arr_doc[0].coast);
      sum+=arr_Docs[i].arr_doc[0].coast*1;
      debugger;

      for(var y=1;y<arr_Docs[i].arr_doc.length;y++){
        var tr = CrElem('tr',ta2_body);
        CrElem('td',tr);
        CrElem('td',tr);
        CrElem('td',tr,arr_Docs[i].arr_doc[y].N_pos);
        CrElem('td',tr,arr_Docs[i].arr_doc[y].txt);
        CrElem('td',tr,arr_Docs[i].arr_doc[y].coast);
        sum+=arr_Docs[i].arr_doc[y].coast*1;
      }


      var tr = CrElem('tr',ta2_body);
      var td = CrElem('td',tr,"Всего по документу "+(i+1));
      td.colSpan=4;

      CrElem('td',tr,sum);
      sumGLOBAL+=sum*1;

    }


  }
  var tr = CrElem('tr',ta2_body);
  var td = CrElem('td',tr,"Итого");
  td.colSpan=4;
  CrElem('td',tr,"Итого");

}
