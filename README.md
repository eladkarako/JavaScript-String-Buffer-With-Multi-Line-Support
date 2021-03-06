
<h1><img alt="" src="resources/logo.png"/></h1>

<hr/>

<strong>Note</strong> that the multiline comment has a little plus after the <code>*</code>
<sub>Because: It makes a more efficient "finding" Regular-Expression</sub>

```js
/*+Hello
World!+*/
```

<hr/>

<ul>
<li><h3><strong>Significantly Faster</strong>: <em>Much</em> Better than using the <code>+</code> operand.</h3></li>
<li><h3><strong>Easy Multi-Line Append</strong>: Easy enter anything, no escaping needed, full Unicode support.</h3></li>
<li><h3><strong>Chain</strong> as much <code>.append</code> calls one to another, with minimal to none operation-cost.</h3></li>
<li><h3><strong>Simplified Usage</strong>: No <code>new</code> needed, also- save one <code>.append</code> by already starting with a value..</h3></li>
</ul>

<h3>Developer Notes</h3>
<ul>
<li><h4><strong>Memory Efficient</strong>: Relaying on native <code>Array</code> object, with <em>object-oriented</em> properties.</h4></li>
<li><h4>Multi-Line uses a multi-line comment, which is unrestricted by nature, wrapped with a function. The functions's content (its <code>.toString</code> (a prototype from <code>Function</code>) allows accessing the comment - and grabbing the content without the <code>/*</code> and <code>*/</code> wrapping - pretty awesome! <sup>right?</sup>, thank this repository for the idea: <a href="https://github.com/sindresorhus/multiline">github.com/sindresorhus/multiline</a> &nbsp; <strong><a href="https://github.com/sindresorhus/multiline/issues/35">I did!</a></strong>.</h4></li>
<li><h4>When calling the method the system does create a new object, and array (internally) which, due to shorthand does not required you to use the <code>new</code> syntax :]</h4></li>
</ul>

<hr/>
<h3>The Code. <sub>Just in-case you don't feel like opening <code>multiline_buffered.js</code> above..</sub></h3>

```js
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

/* should print:
"hello
                                               world
!
and 10x for all the fish"
*/
```

<hr/>

<ul><li>
<h2>Wow! Amm..Again, How To <em>Multi-Line?</em></h2>
<h3>From the code below: <code>multiline_buffered(function(){/*+MULTILINE_CONTENT+*/})</code></h3>
<h4>Notice the <code>/*+</code> marking start and <code>+*/</code> marking the end. It is a little different than the <a href="https://github.com/sindresorhus/multiline">original multiline code</a>, but allows a little faster implementation (less complex regular-expression matching).

Have you notice that <code>##R##</code> and <code>##N##</code>?

Chrome has a bug with internal escaping of anonymous functions, from within the developer-console,
especially multi-line onces, with comments having line-feed characters.

since it is internal, you might not be interested knowing about it, but here it is anyway...

<img alt="" src="resources/chrome_multiline_regex_bug__workaround1.png"/>

but if you'll flat (temporary) the line-feed characters it will work just fine..

<img alt="" src="resources/chrome_multiline_regex_bug__workaround2.png"/>
</li>

<hr/>



<h3>Usage <sub>By Examples</sub></h3>

non-sense (sanity) usage: <em>add string, get it back</em>.

```js
multiline_buffered("Hello World!").toString();
```

<pre>
1  |Hello World!
</pre>

<hr/>

multiline classic behavior. 

```js
multiline_buffered(function(){/*+Hello
 World!+*/).toString();
```

<pre>
1  |Hello
2  | World!
</pre>

<hr/>

chain strings together <sup>significantly <strong>faster</strong> than using the <em><code>+</code></em> operand</sup>.

```js
multiline_buffered().append("hello").append(" ").append("world!").toString();

//or

multiline_buffered("hello").append(" ").append("world!").toString(); //'save' one append by starting with some data
```

<pre>
1  |Hello World!
</pre>

<hr/>

chain strings to generate an easy wrap.
<sup><em>Example: an easy closure wrap to keeps your DOM clean.</em></sup>

```js
multiline_buffered()
.append("(function(window, document){")
.append(function(){
/*+
  var me_so_happpppppy = ":)";

  console.log("hello");
  console.log("world!");

+*/
})
.append("}(self, self.document));")
.toString();
```

<pre>
1  |(function(window, document){
2  |
3  |  var me_so_happpppppy = ":)";
4  |
5  |  console.log("hello ");
6  |  console.log("world!");
7  |
8  |}(self, self.document));
</pre>

<hr/>

If you just want to use <code>multiline</code> without the buffer,
use <code>multiline.js</code> (or <code>multiline.min.js</code>)

here is a little more efficient code:

```js 
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
```

or the minified version that only takes less than 1KB! (200bytes)

```js
function multiline(content){try{content=content.toString().replace(/\n/g,"##N##").replace(/\r/g,"##R##").match(/\/\*\+(.+)\+/i)[1].replace(/##N##/g,"\n").replace(/##R##/g,"\r");}catch(err){content=undefined;}return content;}
```

<hr/>

Naturally there are cases where all you want to have is a long string, and the \r \n are simply for keeping
things more readble for you,
in that case use <code>line.js</code> (or <code>line.min.js</code>) that does not preserve line-feed characters and only creates a long string, keep in mind to have spaces where you need them, it is very useful if you want to include " or ' characters without the need to escape them! :]

Here is the code too...

```js
function line(content){try{content=content.toString().replace(/[\r\n]+/g,"").match(/\/\*\+(.+)\+/i)[1];}catch(err){content=undefined;}return content;}
```

<hr/>

<sub><a target="_blank" href="https://paypal.me/e1adkarak0" rel="nofollow"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" width="60" height="16" border="0" alt="PayPal Donation"></a></sub>
