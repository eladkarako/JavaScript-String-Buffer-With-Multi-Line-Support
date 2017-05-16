function multiline_buffered(content){ "use strict";
  var  buffer                  = []
      ,REGEX_EXTRACT_MULTILINE = /\/\*\+(.+)\+/i
      ;

  function uncomment(content){ //extract multi-line string (also fix Chrome line-breaks identify bug in console).
    content = content.toString().replace(/\n/g, "##N##").replace(/\r/g, "##R##");
    content = content.match(REGEX_EXTRACT_MULTILINE);
    if(null === content || "undefined" === typeof content[1]) return undefined; //this means that at the end we need to filter-out undefined-s
    content = content[1];
    content = content.replace(/##R##/g, "\r").replace(/##N##/g, "\n");
    return content;
  }

  function append(content){
    var   is_string      = "string"      === typeof content
         ,is_multiline   = "function"    === typeof content  &&  "function" === typeof content.toString
         ,is_buffer      = "object"      === typeof content  &&  true       === /array/i.test(content)

         if(true === is_string)      buffer.push(content);
    else if(true === is_multiline)   buffer.push(uncomment(content));
    else if(true === is_buffer)      buffer.concat(content);

    return buffer;
  }

  function toString(separator){
    separator = "string" === typeof separator ? separator : "";       //normalise (default: empty string)
    return buffer
            .filter(function(item){return "string" === typeof item;}) //filter-out undefined-s
            .join(separator)
            ;
  }

  buffer.append   = append;     //made public
  buffer.toString = toString;   //made public

  append(content);              //init with value (optional. if undefineds - does nothing)

  return buffer;
}


//a little tryout
multiline_buffered(function(){/*+hello
                                               world
!
+*/})
.append("and 10x for all the ").append("fish")
.toString()