function line(content){ "use strict";
  try{
    content = content.toString().replace(/[\r\n]+/g, "").match(/\/\*\+(.+)\+/i)[1];
  }catch(err){
    content = undefined;
  }
  return content;
}

//Usage:
// 1   |line(function(){/*+Hello
// 2   | World!+*/});
// OUT |"Hello World !"