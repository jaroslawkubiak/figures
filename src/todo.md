TODO list

figure add:
[ x ] check if adding number don't exist in DB
[ x ] if figure img does not exists - upload image from hdd
[ x ] layout form
[ x ] when typing a figure number, after length of 6 get request for figure photo from bricklink.
[ x ] check if figure number is correct: display image or display error
[ x ] swap default select html element to dropdown menu as component
[ x ] limit inputs main name and additional name to character length that fit into label.
[ x ] validate form inputs - figure number, main name, price, series, release Year, weapon and purchase date.
[ x ] display error message - that field is required.
[ x ] hide error message when input field is in focus or dropdown menu is clicked.
[ x ] download photo from server to local disk
[ x ] upload photo from local disk to server
[ x ] when adding figure to DB - add purchase day, month and year add separately.
[ x ] stop generating id from JS - id have to be from DB
[ x ] input field for bricklink price
[ x ] limit to 22 char in figure main name
[ ] loader when newly added figure images is sending to ftp

figure edit:
[ x ] all inputs are edited
[ x ] delete figure
[ x ] when delete figure - delete img from ftp as well
[ x ] when editing number - check if it already exists in DB

figure list:
[ x ] after click on img - show on full screen
[ x ] after clicking on name - edit figure
[ x ] on PC view show more info, like: additional name, weapon, price, series etc.

figure R2-D2 list:
[ ] change layout to show more data

Filters:
[ x ] searching by: name, number: change with every typed character - useState
[ x ] use onlynumbers function to check input characters in number field
[ x ] combine searching by name - have to include searching both : mainName and additionalName
[ x ] searching list by: series, year
[ ] sorting by: series, number, main name, additional name, price. ASC and DESC
[ x ] reset all filters button

stats by:
[ ] show statistics for: release year and series. display nice stats
[ ] show calendar with summary: every month - quantity of purchasing figures and summary price.
[ ] every month after click showing only this figures - apply filters.

[ ] label making pdf - the one I use now in PHP
[ ] label reset button.

[ ] getting average price for all figures from BL in given time, example on link clicked, add do DB info about all price of all figures. then make statistics how price of figure was changed over time.

[ ] show only images of figures, like 3 img in row in random order

[ x ] list of figure series fetch from DB

others:
[ ] form to send many img from hdd to ftp
[ ] setting to switch off/on functions like: download img to local hdd,
[ x ] popup notification when add/edit delete figure

Account:
[ ] creating accounts
[ ] login/logout
[ ] forget password
[ ]
