TODO list

figure add:
[ ] check if adding number dont exist in DB
[ ] if figure img don't exists - upload img from hdd
[ x ] layout form
[ x ] when typing a figure number, after length 6 get request fo figure photo from bricklink.
[ x ] check if figure number is correct: display img or display error
[ x ] swap default select html element to dropdown menu as component
[ x ] limit inputs main name and additional name to character length that fit into label.
[ x ] validate form inputs - figure number, main name, price, series, release Year, weapon and purchase date.
[ x ] display error message - that field is required.
[ x ] hide error message when input field is in focus or dropdown menu is clicked.
[ x ] download photo from server to local disk
[ ] upload photo from local disk to server
[ ] when adding figure to DB - add purchase day, month and year add separatlly.
[ ] stop generating id from JS - id have to be from DB
[ x ] input field for bricklink price

figure edit:
[ x ] all inputs are eddited
[ x ] delete figure
[ ] if edited figure don't have related photo in BL catalog - get img from local/server disk

figure list:
[ x ] after click on img - show on full screen
[ x ] after clicking on name - edit figure
[ ] on PC view show more info, like: additional name, weapon, price, series etc.

Filters:
[ x ] searching by: name, number: change with every typed character - useState
[ x ] combine searching by name - have to include searching both : mainNAme adn additionalName
[ x ] searching list by: series, year
[ ] sorting by: series, number, main name, additional name, price. ASC and DESC
[ ] reset all filters button

stats by:
[ ] show statistics for: release year and series. display nice stats
[ ] show calendar with summary: every month - quantity of purchasing figures and summary price.
[ ] every month after click showing only this figures - apply filters.

[ ] label making pdf - the one I use now in PHP
[ ] label reset button.

[ ] getting average price for all figures from BL in given time, example on link clicked, add do DB info about all pirce of all figures. then make statistics how price of figure was changed over time.

[ ] show only images of figures, like 3 img in row in random order

[ ] list of figure series, weapons, years list, later fetch from DB
