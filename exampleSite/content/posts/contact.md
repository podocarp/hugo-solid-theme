+++
title= "Contact"
summary= "Contact me"
date= 2018-06-25T19:49:11-07:00
draft= false
categories= ["misc"]
+++

# Contact form

I may take some time to respond.

<form method="POST" action="https://formspree.io/cm9izxj0@outlook.com">
  <input type="email" name="email" placeholder="Your email">
  <input type="text" name="_subject" placeholder="Your Subject" />
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
  <input type="hidden" name="_next" value="{{< ref "/posts/thanks.md" >}}" />
</form>