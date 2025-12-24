//app working 

i tried to make simple ui as much as possible 
so first screen is subscription listing that have plus(+) button on bottom where we can add subscription .
that screen have 2 bottomtab one is subscription which is current screen and secound is analytic where we can see graphs 

-->on press of add we can see fill details like name ,amt etc when save again come to listing screen if want to edit then onpress of list and if want to delete there is button on right side for delete .

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//set up instruction 
i use react native cli with react native version 0.74 so there is no any extra setup required just run as we run our app.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//library used
| Library                                   | Purpose                |
| ----------------------------------------- | ---------------------- |
| react                                     | Core UI library        |
| react-native                              | Mobile framework       |
| @react-navigation/native                  | Navigation system      |
| @react-navigation/native-stack            | Stack navigation       |
| @react-navigation/bottom-tabs             | Bottom tab navigation  |
| react-native-safe-area-context            | Safe area handling     |
| react-native-screens                      | Navigation performance |
| @react-native-async-storage/async-storage | Local data storage     |
| @react-native-community/datetimepicker    | Date selection         |
| react-native-uuid                         |Generate unique IDs for add/edit screen|

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//renewal date logic working 
->Each subscription has a start date and a billing cycle (Monthly, Quarterly, Yearly).
->To get the next renewal date, we start from the start date and keep adding months/quarters/years until the date is after today.
->To show days left, we subtract today from the next renewal date.
->Both calculations are in utils/dateUtils.js using getNextRenewalDate and daysUntil.
Example:
Start: 1 Dec, Monthly → Next renewal = 1 Jan
Days left = difference from today

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
analytics logic explain 
1.Monthly Spending
Logic:
i create an array of 12 months (Jan–Dec) with initial value 0.
Loop through all subscriptions:
Get the month from the subscription’s startDate.
Add the subscription’s amount to the corresponding month.
Display this data as a Bar Chart.
Example: If a subscription of ₹500 started in March, March’s total becomes 500.

2.Category-wise Spending
Logic:
Loop through all subscriptions:
Group amounts by category. If category is missing, mark it as “Other”.
Sum the amounts for each category.
Display as a Pie Chart with legend showing amount and category name.
Example: If two subscriptions belong to “Entertainment” for ₹200 and ₹300, total for “Entertainment” = ₹500.

3.Upcoming Renewals
Logic:
For each subscription, calculate next renewal date based on:
startDate
cycle (Monthly, Quarterly, Yearly)
Calculate days until next renewal.
Categorize subscriptions into this type of partition:
0–30 days, 31–60 days, 61–90 days, 91–365 days.
Display as a Bar Chart.
Example: If a monthly subscription renews in 20 days, it goes into the 0–30 days.