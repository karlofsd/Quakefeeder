## Instructions

1. Clone this repository

    - https://github.com/karlofsd/Quakefeeder.git

2. In main directory run:

    - git submodule init
    - git submodule update

3. To initialize db should be located in ".../server/" run the following commands

    --- Create local database ---

    - rails db:create

    --- Generate tables ---

    - rails db:migrate

    --- Run import tasks ---

    - rake data:load ---> Primary data
    - rake data:types ---> Complementary data

4. To start go to root of project "/"

    --- Start server on port 4200 ---

    - yarn server

    --- Start client ---

    - yarn dev
