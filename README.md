<h1>A JavaScript String-Buffer That Does Not Sucks!</h1>

<ul>
<li><strong>Significantly Faster</strong>: <em>Much</em> Better than using the <code>+</code> operand.</li>
<li><strong>Easy Multi-Line Append</strong>: Easy enter anything, no escaping needed, full Unicode support.</li>
<li><strong>Chain</strong> as much <code>.append</code> calls one to another, with minimal to none operation-cost.</li>
<li><strong>Simplified Usage</strong>: No <code>new</code> needed, also- save one <code>.append</code> by already starting with a value..</li>
</ul>

<ul>
<li><strong>Memory Efficient</strong>: Relaying on native <code>Array</code> object, with <em>object-oriented</em> properties.</li>
 <li>Multi-Line uses a multi-line comment, which is unrestricted by nature, wrapped with a function. The functions's content (its <code>.toString</code> (a prototype from <code>Function</code>) allows accessing the comment - and grabbing the content without the <code>/*</code> and <code>*/</code> wrapping - pretty awesome! <sup>right?</sup>,
 thank this repository for the idea: <a href="https://github.com/sindresorhus/multiline">github.com/sindresorhus/multiline</a>
 <strong><a href="https://github.com/sindresorhus/multiline/issues/35">I did!</a></strong>.</li>
 <li>When calling the method the system does create a new object, and array (internally) which, due to shorthand does not required you to use the <code>new</code> syntax :]</li>
 </ul>
