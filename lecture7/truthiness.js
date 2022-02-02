/* JavaScript has two equality comparisons: == and ===.
   The short version is that you should always use ===
   unless you know exactly what you're doing. The old
   == operator is very loose in what it considers to be
   equal. Some of these are get kind of weird, like
   how 0, "0", "", and false are all == to each other.
   ===, on the other hand, is very strict about not
   auto-converting between types like == does.

   The one situation where it's okay (and preferred by some)
   to use == over === is comparing to null or undefined.
   In most situations you won't care if a variable is one or
   the other, so the fact that null and undefined can only ==
   themselves or each other gives you a shortcut to checking
   for both.

   if() also has some weird rules about what triggers the
   "if" block vs the "else" block. Sometimes this gives us
   a handy shorthand because null and undefined will trigger
   the "else" block. On the other hand, 0 and empty string
   will also trigger the "else" block, which may not be what
   we want. The safe thing to do is to always use a boolean
   expression in if(), specifically ===. However, if you are
   confident that you want to trigger the "else" code and not
   the "if" code for null, undefined, 0, empty string, false,
   and NaN, then you can use if(<variable>) instead of
   if(<variable> === <something else>).

   Here's a handy chart for finding out what's ==, what's
   ===, and what will satisfy an if statement:
   https://dorey.github.io/JavaScript-Equality-Table/
*/