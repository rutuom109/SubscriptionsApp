<!-- //setup instruction -->
1.Clone the repository
git clone <paste repositorylink that i give>
2.Install dependencies
so do npm install
3.Start Metro bundler
npx react-native start
4.Run the application
npx react-native run-android
Tested on Android (API level 30+)

<!-- library i used  -->

1.@react-navigation/native  
  Used for handling screen navigation between Active News and Archived News screens.
2.@react-navigation/native-stack  
  Provides stack-based navigation with native performance.
3.react-native-swipe-list-view  
  for swiping archived button .
4.@react-native-async-storage/async-storage
  to Store archived item 


  
<!-- app workflow -->
When the app starts, the Active News screen is shown first.  
On this screen, business news articles are loaded from the API and displayed in a list.
Users can search news by title or author using the search bar.  
Each news item can be swiped left to show the Archive option.  
When Archive is pressed, the item is removed from the active list and stored locally.
The Archived News screen shows all archived articles.  
From this screen, users can restore any article back to the Active News list.  
All archived data is saved using local storage, so it remains after app restart.


<!-- This practical task was implemented inside my  existing React Native project because of network issues while creating a new project.  
The project name is different from the assignment instructions, but all code and functionality follow the given requirements.
 -->