## Instructions

1. To initialize db should be located in ".../server/" run the following commands

    --- Create local database ---

    - rails db:create

    --- Generate tables ---

    - rails db:migrate

    --- Run import tasks ---

    - rake data:load ---> Primary data
    - rake data:types ---> Complementary data

2. To start go to root of project "/"

    --- Start server on port 4200 ---

    - yarn server

    --- Start client ---

    - yarn dev
