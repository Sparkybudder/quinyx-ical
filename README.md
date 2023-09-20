# quinyx-ical

This project deploys through Netlify to your own serverless function. It will generate an iCal file from your Quinyx schedule and return it to the user, to be directly imported into their calendar.

## Setup
1. Fork this project
2. Create a new site in Netlify
3. Add the required environment variables `QUINYX_USERNAME`, `QUINYX_PASSWORD`
4. Deploy the site
5. Add the url as a subscription in your calendar (eg. `https://random-word-123.netlify.app/.netlify/functions/calendar-sync`)

## Local development
```zsh
# Install the Netlify CLI
npm install -g netlify-cli.

# Login to netlify
netlify login

# Clone the repository and navigate to project directory
git clone

# Start the functions server
netlify functions:serve

# Function will be available at
http://localhost:9999/.netlify/functions/calendar-sync
```