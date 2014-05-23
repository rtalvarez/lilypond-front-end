window.helper = {};

helper.staves = 0;

helper.animateKey = function(key){
  var element = $('.' + helper.class(key))
  element.addClass('light');
  setTimeout(function(){
    element.removeClass('light');
  }, 50)
}

helper.addStaff = function(){
  $('#main').append(helper.layer);
  helper.staves++;
};

helper.layer = "<div id='layer'>layer<div id='meta'>meta</div><div id='staff'>staff<input><div ng-model='staff" + helper.staves + "'> {{ note }} </div></div></div>";

helper.events = function(key){
  console.log(key)
  helper.animateKey(key);

  if (key === 'z'){
    helper.addStaff();
  }
}

helper.keycode = function(code){
  if (code === 59) {
    return ';';
  }
  else if (code === 44){
    return ',';
  }
  else if (code === 46){
    return '.';
  }
  else if (code === 47){
    return '/';
  }

  var letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[code - 97];
};

helper.class = function(char){
  if (char === ';'){
    return 'semc';
  }
  else if (char === '.'){
    return 'dot';
  }
  else if (char === '/'){
    return 'slash';
  }
  else if (char === ','){
    return 'comma';
  }

  return char;
}
