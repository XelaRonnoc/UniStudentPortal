## Question 1

The website has been deployed from the main branch utilising Cloudflare Pages and the command line wrangler tool. No issues were encountered whilst deploying the portal or when testing to ensure functionality was not affected on the deployed site. Please find deployed link below.

### Updating the Deployed site
In order to update the deployed sit on cloudflare pages ensure that the following steps are followed:
 1. Install wrangler via "npm install wrangler" in the root directory of the up to date project in the main branch.
 2. Login to cloud flare using "npx wrangler login". Additionally ensure your cloud flare pages account has access to the page you are planning on publishing and you have the privleges on this project to allow for publishing to deployment.
 3. in the root directory of the project on the up to date main branch use the command "npx wrangler pages publish ." which will publish the up to date branch to the deployed project on cloudflare pages.

Done! your changes are now in the deployed project.

### Deployed Link

-   https://comp2110-2023-group4.pages.dev/

## Question 2

What you achieved: a short (few paragraphs) description of what your group has implemented; highlight any extensions or additional work you did.

The team incorporated a clear and simplistic blue theme, as to allow the page to be vibrant and character, but to not draw attention away from the actual page elements. We wanted usability to be our main focus, especially in relation to the blog. It can be difficult to read chunks of text, if the background is too distracting or the posts itself aren't separated enough with a smooth flow.

The inclusion of a carousel display for our widgets was an idea thought up midway through the project. Allowing us to stand out from other groups, the mechanism combines both functionality and aesthetic to our website. The functionality allows end-users to click on the two arrow buttons on the side of the carousel, to iterate through each of the widgets and the advert. Initially a challenging task, our teammate, Sam began by moving the widgets from their default positions at the sides of the blog to a single row on top of the login widget. From then, it was merely a matter of utilising the grid function to hide all but two of the widgets, whilst allowing for the arrow buttons to take up the left and right sides of the page. These two processes took up a majority of the time to implement as coming up with these solutions required creativity, despite their simplicity in retrospect. Yet, the functionality lies in its hidden horizontal scrollbar, utilising the function overflow-x: scroll- in css- and having the buttons trigger an event- in javascript- that scrolls through the widgets. This button function was another challenge, leading to help from our other teammate, Craig, who worked out the syntax of the querySelector function in javascript. Through this effort, our carousel was an addition to our website that we are all proud of, bringing a higher level of quality to our project than if we maintained the default columns.

A big focus of the design/ implementation of the blog and login functionality was ensuring a good user experience through the utilization of helpful feedback that allowed users to easily recover from errors as well as be patient whilst waiting for the loading of API calls. These user feedback messages where implemented using Lit state variables that allowed for the use of ternary operators or Lazy evaluation to display the correct information to the user i.e the feedback message or the loaded section of the page.

To achieve an effective implementation of the login functionality we utilized Lit events in order to send an event to the main application element that then requested a re-render ensuring the page updated upon login to allow for users to access the blog post interface. This was required as we decided to maintain as loosely coupled implementation of the various Lit Elements as possible in order to allow for a more modular design, making CSS design and future maintenance/improvements easier.

This method of utilizing a Lit event to cause a re-render was also the first approach taken to implement the rendering of new posts posted by the current user. However, this implementation was unsuccessful with us being unable to get the blog widget to receive the Lit event. To overcome this issue we utilized the shadow root utility in Lit to get a DOM reference to the blog post widget which allowed for rapid and immediate updates to the blog post widget. As soon as the response to the POST request sent from the blog creation interface was received it triggered a GET request within the blog widget and a re-render of the element. Additionally, the blog post automatically fetches data from the server every 60 seconds in order to get a near real time live feed on other users blog posts. Further, as it was apparent that users may want to view posts older than the most recent 10, a next and previous page functionality was implemented at the bottom of the blog post widget. This was implemented using the Blog API's variables in the GET request which allowed us to change the index the blog posts should be retrieved from, allowing for simple navigation through the blog history.


## Question 3

What did you find challenging: tell us what was hard about completing the project. This might be technical (understanding the API) or organisational (communication within the group).

As stated previously, the carousel was probably the most challenging part to implement. We didn't have too many problems using LIT for the individual widgets but we did have some trouble incorporating the widgets with the overall design due to how they were implemented. We also struggled a bit with making the website responsive to different screen sizes, however, the carousel fixed a lot of those issues as the screen no longer needed to be wide to fit the blog and widgets. Aside from these technical challenges, the main hurdle we faced was using github cohesively as a group in a way that allowed us to do our individual tasks effectively. We had some issues with merge conflicts when working on design elements of the webpage but eventually got things to work by using individual branches when trying to get different elements to work.

## Question 4

What was rewarding: one or two things that you were able to do that you feel contributed to your understanding of the content of this unit.

As a team, we believe that what was really rewarding was how the entire project came together in the end. It was obviously a daunting project, especially as group projects can be unpredictable as times due to the increase of work and the collaboration needed. However, the team worked really well together and pulled off a result which we were all proud of. We played to our strengths in this project, allowing us to divide the work to be more approachable and effective, i.e Alex working more on the functionality of the blog. Incorporating all these elements together, enabled the team to truly understand the effect each piece of work has when combined together to create a webpage. It isn't as simple as dragging a box on the front page, but actually takes a team to harmonise the elements together. In addition to this, tackling problems that were challenging, such as the widget carousel allowed for the team to develop the understandings and build on the foundations we have learnt throughout this unit.

## Question 5

Individual reflection: each team member should write one paragraph on their personal experience (include your name):
which widget did you choose and why?
what was the most challenging part of the project for you?

### Alex
I selected the Currency converter widget as I belive it was a reasonably challenging widget to create. It would allow me to learn the basics of API requests and handling variables within the HTTP GET request and the implementation/creation of LIT elements before attempting the more difficult blog post widget. It was also enjoyable building a tool that would have some practical applications within a wider conversion tool/site for example. I additionally found it's increased interactivity an interesting opportunity to work with UX design over some of the other widgets. It allowed me to focus on a smooth user experience utilizing feedback messages to keep the user updated on what was occurring with the various moving parts and making it obvious if there were any errors made by the user and how to remedy them. In addition to custom feedback messages I attempted to implement as much feedback using HTML forms as possible.

The biggest challenge for me was likely learning to use the LIT elements effectively and the LIT library in general especially when it came to the live updating of blog posts after posting. Having had experience developing in REACT I found LIT quite difficult as I felt it had many of the limitations of REACT without any of the useful features to balance it out. Part of this is also due to my comparative lack of experience in LIT compared to REACT which made it more difficult. That being said, I still very much enjoyed developing the login, blog posting and currency converter elements and ensuring they would function with the various HTTP requests and the backend API while implementing them effectively into our site's UX design.


### Charlie

Weather widgets are a very common feature of a lot of blogs and other websites so I chose a weather widget that shows the current temperature and weather (sunny, rainy, etc) in Macquarie Park (since that is where the uni is it makes the most sense). I chose to only show the temperature and weather as these are the most useful weather attributes and I did not want to make the widget overly busy which would compete with our minimalistic design. Since the widget has minimal features I wanted to add some interest by adding a corresponding weather image and changing the background colour to reflect the time of day. I managed to do this by using the "is day" boolean variable supplied by the API to make the background colour dark blue if the value was 0 and light blue if the value was 1. The API also provides a weather code, for example "0" = "Clear", which I used to display the current weather, and selected a relevant image to be displayed alongside it. The image is also dependent on whether it is day or night, for instance if it is clear and daytime there will be a sun, but if it is clear and nighttime there will be a moon.

The hardest part was adding the corresponding images to go with the weather forecast since I am not the best at JavaScript and couldn't figure out how to update string variables to make it work with LIT and the API. I came up with a solution to circumnavigate this by concatenating the isDay variable and the weather string generated by the weathercode into the image url and naming the images accordingly. For example the name of the clear daytime image is "1Clear.png" which is displayed using the 1 from the isDay and "Clear" from the "0" weathercode and then concatenated as so: {"src/components/weather-images/" + isDay + weatherCode + ".png"}.



### Craig

The widget that I developed was displaying a dog image, incorporating a dog API which cycled randomly through an abundance of images in the database. As I wanted to cover the stylistic approach for the webpage, I decided to opt for a streamlined widget that was effective but minimalistic. However, I still wanted to include something extra within this widget and discovered that the breed could be located within the response of the API, in the JSON object. After a few attempts I was able to split the response and return the specific breed associated with the current image that was displayed.

I personally believe the more difficult part about the project was ensuring that the commits I was uploading to the git repository, was not affecting anyone else's work. This project was the first time I used github in a group aspect, and understood the importance of pulling, merging conflicts, and not developing the same file/code simultaneously. I discovered the importance of branches, for the purpose of developing big changes, such as the widget carousel the team implemented, as to not affect the main code until it has been tested and finalised.

### Sam

Throughout my journey in this project I have had to constantly learn and adapt my skills in html, css and javascript in order to provide my parts of the code for our website. In the beginning of the project timeline, our group met up in person and established what each of us would do for our API widgets; I chose to implement the jokeAPI for my part. Simply chosen because I felt it would be fun to include something humorous to our project and I have learned a lot from its implementation process. Throughout the semester, I had struggled with javascript and could not wrap my head around it, but by working with API’s for the project I was forced to go back and teach myself javascript. I can now confidently say, I have wrapped my head around the mechanisms and syntax of javascript. The joke bot widget, is a fairly simple one- now that I look back on it- when the end-user loads into the website a joke from the API is loaded and when they click the button labelled “New Joke” a new joke is loaded and a laugh track is played. This was a challenging task, but I am proud of the result as I think it brings some fun into our site. The other task I worked on was the widget carousel which, as detailed previously, was a challenge. Luckily, due to the resources found on the internet and assistance from Craig and other members of the group, I was able to complete it. The entirety of the project was a challenge, starting off with unfamiliarity in the languages and leaving feeling confident to program in javascript and utilising API’s is something I'm immensely proud of.
