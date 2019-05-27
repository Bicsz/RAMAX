function CrElem(which,where,txt){
  txt = typeof txt !== 'undefined' ?  txt : "";

  var same = document.createElement(which);
  same.innerHTML = txt;
  where.appendChild(same);
  return same;
}
