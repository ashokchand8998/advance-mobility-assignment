
  # Vehicle Transfer Module
  To run the application.
   - Clone and install packages in both client and server folder.
   - Setup env file and variables
   - Run appropriate commands for starting both client and server app as per respective scripts in package.json file  
  
  ## Future Expansion Plan
  The application is built considering the future scope of different type of entities other than the drivers
   - Accordingly more owner type can be added either directly to the code or making it dynamic by storing types in DB and providing UI for updating the same
   - As per new type of owners different tables can be created to handle the request queries Accordingly
   - I have kept the table as driver and not owner because of
       - Requirement stated in the shared notion file
       - Keeping all of the entities of different type isn't a good solution for managing different entities individually, for ex. a driver type entity can be a part of organisation type entity and thus may need a seperate set of features and data maintained for it.
    