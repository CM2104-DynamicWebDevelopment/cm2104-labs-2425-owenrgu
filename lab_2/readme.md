# Lab 2

I completed the HTML Codio labs and answered the questions in the lab presentation below.

## CSS Questions [A]
1. What is the type of this element that contains the logo?
> The Google logo is contained in an `img` element.

2. What is the parent element of the logo? Why is this type of element the parent?
> The parent element of the logo is a `picture` element. This could be because the `picture` element allows multiple versions of the logo to be displayed depending on the screen size using the `source` elements. Google does not seem to be using this functionality anymore but maybe they were at one point.

3. What is unusual about hte parent element (think about what it does)?
> Though the element is called `picture`, it does not display the logo (or any images) on its own. It actually acts as a wrapper for the `img` element and any `source` elements, influencing how they are displayed.

4. Inspect the "GOOGLE SEARCH" button. What happens when you hover over the CSS style margin in the dev tools?
> When hovering over the margin style, orange highlights appear around the box.

## CSS Questions [B]

1. How does Google load its CSS (embedded, or an external CSS file)? 
> The majority of the CSS for the Google page seems to be embedded in the HTML document. We can see that there are several `<style>` tags in different elements of hte page.

2. What are the IDs for the navigation bar and the rest of the page content?
> The ID for the navigation bar is "navigation" and it has some weird classes too: `class="o3j99 n1xJcf Ne6nSd"`
> 
> The ID for the rest of the page content is not contained in a single `div` so there are several IDs. An interesting observation is that Google does not use ID attributes often.

3. How much padding is there at the top of the Google logo?
> There is no set padding between the navigation bar and the top of the Google logo. The height of the element that the Google logo is inside is set to be `100%-200px`, which in a way is padding without actually writing the CSS.

