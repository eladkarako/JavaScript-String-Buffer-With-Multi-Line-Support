function multiline_buffered(content){ "use strict";
  var  buffer                  = []
      ,REGEX_EXTRACT_MULTILINE = /^\s*function\s*(\s*)\s*{\s*\/\*(.*)\*\/\s*\}\s*$/im
      ;

  //private functions
  function append_string(content){    buffer.push(str);                                       }   //plain text
  function append_multiline(content){ content = content.toString().replace(/function/ig,"");      //multiline
                                      append_string(content);                                 }
  function append_buffer(content){    buffer = [].concat(buffer, content);                    }   //buffer

  //main usage (will be made public next)
  function append(content){
    if(     "string"   === typeof content)                            append_string(   content);
    else if("function" === typeof content)                            append_multiline(content);
    else if(  "object" === typeof content
            &&"array"  === content.constructor.name.toLowerCase())    append_buffer(   content);
    return buffer;
  }

  function toString(separator, is_return_buffer_too){
    var result;

    separator             = "undefined" === separator ? "" : separator; //optional (when not defined, normalised to empty string)
    is_return_buffer_too  = true === is_return_buffer_too;              //optional (when not defined, normalised to false)

    result = buffer.join(separator);

    if(true === is_return_buffer_too)   result.buffer = buffer;     //object-oriented, puts buffer as object's attribute.
    else                                buffer = undefined;         //cleanup (usually at the end of append chain when got string result).

    return result;
  }

  //public access to methods (and internal buffer)
  buffer.append   = append;  
  buffer.toString = toString;

  append(content);  //(optional) start with content: `multiline_buffered(..content..)`.  Same as `multiline_buffered().append(..content..)`.

  return buffer;
}
