# car-rental

INSTALLING GULP NOTES:

When working on the Macs at Yoobee, you will need:

MY NOTES:
---------

1. Make sure that you have the files package.json and gulpfile.js in your root dir

2. create .gitignore file in root directory

3. type this into the .gitignore file:
    package.json
    gulpfile.js
    node_modules

4. Add css/js/sass folders and files

5. Go to root directory in terminal

6. type: npm install

7. type: ~/node/bin/gulp

8. Go to http://localhost:1988/

9. Make sure files have the right names and are linked correctly in gulpfile.js and index.html



10. When starting up gulp again after already installing node modules then just use steps 7 and 8.


JARED'S NOTES:
---------

A. Set global installation path for node
  npm config set prefix=~/node

B. Run gulp task
  ~/node/bin/gulp

To use gulp you will need a *A: package.json in your root dir and a *B gulpfile.js in the root dir also. (You can use the files from the repo.).

Process for using gulp at home:
Do A. if you are at yoobee campus otherwise move to step 1. below
1. Place package.json and gulpfile in your rootdir
2. Go to root dir with terminal/cli
3. type: npm install
4. type: npm install gulp -g (if you have never installed gulp before)
5. type: gulp  or B. above if you are at Yoobee
