/*****
** Compare two arrays for equality
*****/
function arraysEqual(a1, a2) {
  if(a1.length != a2.length){
    return false;
  }
  for(var i = a1.length; i--;) {
    if(a1[i] !== a2[i]){
      return false;
    }
  }
  return true;
}

/*****
** Append zero to array if 0 is not the last item
*****/
function append_zero(array){
  var new_array = array.slice()
  if(new_array[new_array.length-1] != 0){
    new_array.push(0);
  }
  return new_array;
}

/*****
** Complement the grid
*****/
function full_pyramid(pyramid_half){
  return pyramid_half.slice(1,pyramid_half.length).reverse().concat(pyramid_half);
}

/*****
** Draw grid in console
*****/
function draw_pyramid_console(pyramid,n){
  var pyramid_center = pyramid[(pyramid.length-1)/2];
  console.log("*** Pyramid build of",n,"blocks with center",pyramid_center,"blocks high***");
  console.log("*** [",pyramid.toString(),"] =",pyramid.reduce(function(a,b){return a+b;}),"blocks ***")
  for(var x = 0; x<= pyramid_center; x++){
    var string = '';
    pyramid.forEach(function(col){
      if(col > (pyramid_center - x)){
        string += '|=|';
      } else {
        string += '   ';
      }
    })
    console.log(string);
  }

  return true;
}

/*****
** Draw grid in HTML
*****/
function draw_pyramid_html(pyramid,n){
  var html = '<div class="grid">'
  var pyramid_center = pyramid[(pyramid.length-1)/2];
  html += '<div class="info">Pyramid build of '+ n + ' blocks with center ' + pyramid_center + ' blocks high</div>';
  html += '<div class="info">['+ pyramid.toString() + '] = ' + pyramid.reduce(function(a,b){return a+b;}) + ' blocks</div>';
  html += '<div class="pyramid">'
  for(var x = 0; x < pyramid.length; x++){
    var column = '<div class="col">';
    for (var b=1; b <= pyramid[x]; b++){
      column += '<div class="block"></div>';
    }

    column +='</div>';
    html += column;
  }
  html += '</div></div>';
  document.getElementById('result').innerHTML = html;
  
  return html;
}

/*****
** Kick down two blocks from center to edge
*****/
function kick_down(original_pyramid){
  var pyramid = original_pyramid.slice();
  pyramid = append_zero(pyramid);
  var len = pyramid.length;

  if( (pyramid[0]-2) > (pyramid[1] )){
    pyramid[0] -= 2;
    var change = false;
    for(var x = 1; x < len; x++){
      if( (pyramid[len-x-1] - pyramid[len-x]) > 1 ){
        pyramid[len-x]++;
        change = true;
        break;
      }
    }
    if(!change){
      pyramid[0] += 2;
    }
  }

  return pyramid;
}

/*****
** Construct grid
*****/
function build_pyramid(n){
  var pyramid = [n];
  while(!arraysEqual(pyramid, kick_down(pyramid))){
    pyramid = kick_down(pyramid);
  }

  return full_pyramid(pyramid);
}

