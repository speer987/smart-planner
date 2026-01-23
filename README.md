# SmartPlanner - AI Powered Yearly Goal Planner

### What is SmartPlanner?
SmartPlanner is an AI powered web app that helps users break down their complex yearly goals into monthly, quarterly and weekly goals. It was made based on the **funnel down system** of creating and achieving goals which is **a technique used in productivity and neurodiverse circles** to gain clarity of the smallest steps that need to be taken to complete a long term goal.

#### Motivation / Problem Statement
SmartPlanner is an app that takes the guesswork out of planning and achieving goals. Many people who set goals may not have a clear idea of a starting point or enough context/knowledge about the goal itself to envision what must be done on the way there. In other words, SmartPlanner gives the user the tools to work through a journey instead of focusing only on the destination (in this case, a long term goal).  

Furthermore, the problem SmartPlanner hopes to solve is executive dysfunction and overwhelm when committing to goals by leveraging a cutting edge AI API that will basically help advise the user by providing quarterly, monthly, and weekly goal breakdowns. Ultimately, this app was made to help prevent goals from feeling insurmountable, which normally causes users to give up their pursuit of achieving a year long goal.

#### Features / Key Functionality
- Provides a free form text area, as well as AI generated suggestions for goals that users can select.
- Clarifies the intent of a users goal with freeform questions that the Gemini API generates in order to formulate goals into something that is specific, measurable, achievable, relevant and time bound (inspired by **SMART goals**).
- Accounts for user input and generates four AI generated quarterly plans users can choose from depending on the pacing and plans they prefer.
- Incorporates the user selected quarterly plan to split the plan into months, and consequently weeks that can be expanded with an accordion to see daily plans (also broken down using the use of the Gemini API).
- Handles some rate limit errors by showing a user-facing sentence that tells them to try later.
- Uses a clean modern interface made with the use of React, Next.js and Tailwind CSS.

Overall, the core functionality of this app breaks goals down into quarterly, monthly, weekly, and daily actionable steps.

#### Tech Stack

Frontend: React, Next.js, Tailwind CSS, Headless UI (for the accordions)
Backend / API: Google Gemini AI, Node.js
Other: ADD DEPLOYMENT INFO HERE

#### Screenshots / GIF

ADD A VIDEO HERE

#### Live Demo

Try it out here: ADD LINK HERE

#### Challenges & What I Learned

This was the first time I've used an AI API, so I think this was a great learning experience to challenge myself to integrate the Gemini API into a web app. This made the whole app much more dynamic and user-centered.

Some other challenges I faced and things I learned throughout this project were:
- Making sure API keys are kept hidden.
- Adding error states to show what went wrong in the console.
- Using z-index to create a much more dynamic looking layout using SVGs.
- Learning how to prompt engineer to ensure that the output of the Gemini API was formatted a certain way so that I could display it using the React components that I handcrafted.
- Using loading states when the Gemini API is at work formulating a sound response to the inputs that I gave it, so the user knows something is happening in the background instead of staring at a blank screen.
- Parsing AI generated JSON.

#### Future Improvements
My main goal with the project was to create an MVP that could be used as a way to present the functionality of the Gemini API when it is used as part as a planning web app.

Some future improvements for this app include:
- Adding user account so that users can favorite or save plans for goals, as they may have more than one goal per year.
- Visualize goals in a calendar view, so that it is more intuitive, perhaps allowing users to export events to their calendars.
- Allow the users to export plans as a simplistic pdf with checkboxes that they can use to check off goals as the year progresses.