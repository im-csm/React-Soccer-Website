# Welcome to my Sport League UI Project! 

The goal of the project is to to create a SPA frontend to display a match schedule and tournament leaderboard with data from the backend API.
This site was built with:
- JSON backend API.
- React/Javascript frontend

The site has 2 main pages with a 404 Not Found page for any other URL. <br/>
The schedule page:
- Routed to http://localhost:3000/schedule or http://localhost:3000/
The leaderboard page:
- Routed to http://localhost:3000/leaderboard<br/>

Both the schedule and leaderboard page have a responsive layout, changing the table columns depending on the width of the page:<br/>

### Schedule Page
<img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/f3983356-407e-4091-b209-0abc5c3c3e00" width="855" height="600"/>
<br/>
<img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/31e65a93-a10f-4ca7-8240-f72fbea7bf55" width="500" height="500" /> <img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/ebf0b17f-ee8a-4817-b472-5a07e802a462" width="350" height="500" />

<br/>

## Leaderboard Page
<img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/c918439d-221f-429c-a89e-ee44ab5a7338" width="855" height="600"/>
<br/>
<img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/bca98afc-f0df-47de-9a64-5c211d72d56b" width="500" height="500"/>  <img src="https://github.com/im-csm/React-Soccer-Website/assets/71950678/cf07b333-bfd8-4787-a65b-a4015cff8bbf" width="350" height="500"/>

<br/>

# Instructions to run the site locally:

### Step 1: Install Dependencies.

This solution requires NodeJs v16 installed.<br/>
To install project dependencies run:

> npm install

### Step 2: Run the Backend Mock Server

The site works with a local mock server that distributes the JSON responses for API version, Match data, and Match data secret token.
To run the mock server use:

> npx json-fake-server -m dev-mock-server-config.json

### Step 3: Running the site locally:

> **npm** start

This opens up http://localhost:3000 in your default browser and will display the schedule page.
