function exam1(data){
  console.log("test db: ");//Тест базы данных, работает ли она
  for(var t=0;t<data.db1.x.length;t++){
    console.log(t+" - "+data.db1.x[t]);
  }

  var arr_month  = [];//хранит уже существующие месяцы
  var arr_person = [];//хранит уже существующие личности
  var arr_tr = [];//для удобства обращения к полям таблицы, чтобы не искать в документе каждый раз
  var ta1_head = document.getElementById("ta1_head");//заголовки таблицы
  var ta1_body = document.getElementById("ta1_body");//тело таблицы
  var newMonth=false;

  //Смотрим по всем значениям, если новый месяц, то пишем и сохрианяем его. Если новая личность - аналогично. При переходе к новому месяцу в уже созданных личностях пишутся нули. Нули так же пишутся, если личность появляется в конце базы
  for (i = 0; i < data.db1.x.length; i++)
  {
      console.log("table "+i);

      console.log(arr_month.indexOf(data.db1.x[i]));
      var month_index=arr_month.indexOf(data.db1.x[i]);//ищет месяц

      if(month_index!=-1){
        console.log("month "+data.db1.x[i]+" finded!");
        newMonth=false;
      }
      else {
        console.log("month "+data.db1.x[i]+" not finded...");
        CrElem('th',ta1_head,data.db1.x[i]);
        month_index=arr_month.length;
        arr_month.push(data.db1.x[i]);
        newMonth=true;

      }

      var person_index=arr_person.indexOf(data.db1.y[i]);//ищет личность

      if(person_index!=-1 ){
        console.log("person "+data.db1.y[i]+" finded!");

        if(newMonth){
          CrElem('td',arr_tr[person_index],data.db1.val[i]);
        }else{//Если не новый месяц, то изменить с нуля на свое значение
          arr_tr[person_index].children[arr_tr[person_index].children.length-1].innerHTML = data.db1.val[i];
        }
      }
      else{
        console.log("person "+data.db1.y[i]+" not finded...");
        var tr = CrElem('tr',ta1_body);
        tr.id = 'tr' + arr_person.length;

        arr_tr.push(tr);
        CrElem('td',tr,data.db1.y[i]);

        debugger;
        console.log("month_index "+month_index);
        for(var q=0;q<month_index;q++){
          console.log("person val "+q+" adding");
          CrElem('td',tr,"0");
        }
        CrElem('td',tr,data.db1.val[i]);
        person_index=data.db1.y.length;
        arr_person.push(data.db1.y[i]);
      }
      console.log("check, is it need to add some 0`s ");
      if(newMonth){//дописать нули во все существующие персоны, если месяц был новым
        console.log("yes, its new month");
        console.log("arr_person.length="+arr_person.length);
        for(var v=0;v<arr_person.length;v++){
          console.log("arr_tr["+v+"].children.length="+arr_tr[v].children.length);
          if(arr_tr[v].children.length-1<arr_month.length){
            CrElem('td',arr_tr[v],"0");
        }
      }
    }


  }
}
