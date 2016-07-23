export const moveArrayElementPosition = function(arr,fromIndex,toIndex){
  var elems = [...arr];
  var elem = elems[fromIndex];
  elems.splice(fromIndex,1);
  elems.splice(toIndex,0,elem);
  return elems;
}