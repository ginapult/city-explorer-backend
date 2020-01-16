# city-explorer-backend

Building the city-explorer backend.

Steps:
1) set up repo
2) deploy basic server to heroku
3) get LocationIQ token for API key
4) /location - user can enter name of location and see data about the area of interest
- User enters valid location to input
- User clicks "Explore!" button
- Map is populated with location centered on long/lat of search query
5) /weather - user enters a valid location in the input and sees data about the weather forecast for next eight days
- Weather data is populated with forecast summaries for next eight days
6) error handlers/routes - when user enters invalid location input, user receives an error message