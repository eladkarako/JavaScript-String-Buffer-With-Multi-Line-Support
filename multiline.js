function multiline(content){ "use strict";
  try{
    content = content.toString().replace(/\n/g, "##N##").replace(/\r/g, "##R##")
                                .match(/\/\*\+(.+)\+/i)[1]
                                .replace(/##N##/g, "\n").replace(/##R##/g, "\r")
                                ;
  }catch(err){
    content = undefined;
  }
  return content;
}

//Usage:
// 1   |multiline(function(){/*+Hello
// 2   |World!+*/});
// OUT |"Hello\nWorld !"