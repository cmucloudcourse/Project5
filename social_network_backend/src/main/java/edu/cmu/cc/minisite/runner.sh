#!/bin/bash

###############################################################################
##                 15-319/15-619 Cloud Computing Course                      ##
##                Runner Script for Project 3 Module 2                       ##
##                                                                           ##
##     Copyright 2017-2018, 15-319/15-619: Cloud Computing Course            ##
##                     Carnegie Mellon University                            ##
##   Unauthorized distribution of copyrighted material, including            ##
##  unauthorized peer-to-peer file sharing, may subject the students         ##
##  to the fullest extent of Carnegie Mellon University copyright policies.  ##
###############################################################################

###############################################################################
##                      README Before You Start                              ##
###############################################################################
    # Fill in the functions below for each question with the correct choice(s)
# in the function.
# 
# This task grades your understanding of differences between SQL and NoSQL 
# databases, including which database best applies in which scenario. Please 
# read the comments carefully. You are free to go through the primer and the 
# writeup(s) to figure the answers to these questions.
#
# The colon `:` is a POSIX built-in basically equivalent to the `true` command,
# REPLACE it with your own command in each function.
# Before you fill your solution,
# DO NOT remove the colon or the function will break because the bash functions
# may not be empty!

###############################################################################
##                             Task 1                                        ##
###############################################################################
# In each of the following multiple choice questions, you should echo the 
# correct option to StdOut. Please note there is a single correct choice and 
# none of the questions require you to echo more than one choice.
# e.g. echo "A"

q1() {
  # Question:
  # Which of the following are advantages of NoSQL databases (such as HBase) 
  # but are NOT of SQL databases such as MySQL.
  #
  # A. Superior non-sequential read/write performance over Flat Files
  # B. Dynamic Schema
  # C. Support for Indexing
  # D. Support for Java API
  echo "B"
}

q2() {
  # Question:
  # Which of the following choices are typically characteristics of NoSQL 
  # databases but not SQL databases?
  # 
  # A. Rigidly structured data
  # B. Data Integrity
  # C. High Write Scalability 
  # D. Database Normalization
  echo "C"
}

q3() {
  # Question:
  # Which of the following advantages of MongoDB makes it ideal for use in 
  # storing unstructured data such as in Task 3?
  # 
  # A. Document Storage
  # B. Indexing of Columns
  # C. Automatic Replication
  # D. Strong consistency
  echo "A"
}

q4() {
  # Question: 
  # Which of the following is a direct result that comes from the normalizing 
  # the schema in a SQL database?
  # 
  # A. Less Redundant Data
  # B. Increased Performance
  # C. Reliability
  # D. Fault Tolerance
  echo "A"
}

################################################################################
##                          Scenarios                                        ##
###############################################################################
# Read Carefully:
# 
# The following questions present you with various scenarios in which database
# choices need to be made. For each scenario, you are presented with data 
# available to make the decision and presented with three database choices. 
# Please select the most appropriate choice in each scenario. Following these 
# are various reasons which justify this database choice. Please select ALL 
# characteristics which apply to the selected database, regardless of whether 
# they apply to other databases as well.
# 
# For questions asking you to choose between a single choice, print the 
# character corresponding to the choice. For e.g. If the database corresponding 
# to choice "A" is appropriate : 
# echo "A" 
# 
# For questions asking you to pick characteristics corresponding to these
# databases, note more than one choice may be correct. Please print "ALL"
# correct choices as a SINGLE NUMBER, without spaces or commas. For e.g. 
# If the characteristics 1 and 2 prove useful :
# echo 12 

# SCENARIO 1: 
# We are starting a new company, and have decided to use a database to store 
# information for each user who registers on our website. After considering 
# our requirements, we design our database with the following attributes:
#  
# ID
# First Name
# Last Name
# Gender
# 
# After observing the website usage for a month, we decide to make some 
# changes to our application. First, we will require that each new user 
# provide their telephone number when they sign up to prevent from our service 
# from being spammed. However, we do not need this information from our 
# current users (since we have already removed all spammer accounts and the 
# information is not used anywhere else). To store the phone numbers, we 
# modify our database design to include a new column. The modified schema now 
# looks like:
#  
# ID
# First Name
# Last Name
# Gender
# Phone Number
# 
# A year later, the website is flooded with users and billions of users are 
# registered on it. To improve the user experience we conduct a market 
# analysis and find the users would be better served if we ask them for their 
# zip codes and tailor our offering based on their location. To store this, we 
# modify our database design to include a new column. The modified is:
# 
# ID
# First Name
# Last Name
# Gender
# Phone Number
# Address
# 
# Also to process analytics from the user data(in order to constantly improve 
# our service), we decide to use an open source project which works on top of 
# the Hadoop file system. We would like to be able to minimize the complexity 
# of this application. For example, we do not want to keep a duplicate copy of 
# the data.

q5() {
  # 
  # If you are the tech lead of our company and if you could have foreseen 
  # these kind of changes from the very beginning, keeping in mind advantages 
  # and disadvantages of each of the three databases you have worked with in 
  # this project, which data storage would you suggest our company should use 
  # and why? 
  # (Single Choice)
  # 
  # A. MySQL
  # B. HBase
  # C. MongoDB
  echo "B"
}

q6() {
  # If you had thought things through originally, which of the characteristics 
  # of the three previous databases would have led you to choose the database 
  # you did in the previous question?
  # (Choose all that apply)
  # 
  # 1. Rigidly structured data
  # 2. Data Integrity
  # 3. Dynamic Schema
  # 4. Utilizes HDFS as its underlying storage
  # 5. Document Storage
  echo "34"
}

# SCENARIO 2: 
# Consider a system which stores the inventory for a warehouse, for an online 
# shopping portal. We need to select a database to store information about the 
# products stored in it. 

# The database will only need to store generic information about each product 
# and we are sure that we will not need to store any additional information 
# about each product in the future. Some of the information stored includes:
# 1. ID
# 2. Name
# 3. Categories
# 4. Dimensions
# 5. Color
# 6. Quantities
# 7. Location in the warehouse

# Our database needs to support the following questions/operations and it is 
# unlikely we will need to include additional functionality in our database:
# 1. Add a certain product in the warehouse.
# 2. Check whether a certain product is present in the warehouse
# 3. Get the quantity of a certain product present in the warehouse
# 4. Removal of products from the warehouse
# 5. Get a list of all the products present in warehouse
# 6. Get a list of products present in a specific location/bay in the warehouse
# 7. Movements of products within the warehouse in case of maintenance

# Our online shopping portal uses this database to check if a product is 
# available before the customer is allowed to buy the product. Thus the 
# database should ensure integrity of the data in the system.

q7() {
  # Question: 
  # If you are the tech lead of our company, what kind of database would you 
  # suggest our company to use for managing each of these warehouses?
  # (Single Choice)
  # 
  # A. MySQL
  # B. HBase
  # C. MongoDB
  echo "A"
}

q8() {
  # Question: 
  # If you had thought things through originally, which of the characteristics 
  # of the three previous databases would have led you to choose the database 
  # you did in the previous question?
  # (Choose all that apply)
  # 
  # 1. Rigidly structured data
  # 2. Data Integrity
  # 3. Dynamic Schema
  # 4. Document Storage
  echo "12"
}

# SCENARIO 3: 
# Your company is building an application which stores information on 
# restaurants in Pittsburgh to provide dining recommendations to it’s users. 
# The application takes into account various factors about the restaurants
# themselves including location, price level, cuisine, average customer rating,
# etc, which are added and removed based on user feedback and frequency of use.
# 
# The application allows the users to filter for restaurants based on multiple 
# criteria. For example, the user could ask for “Restaurants, having a price 
# rating of $$, serving american cuisine, with an average customer rating 
# above 3 and located in 15213”.

# The application itself does not require strict constraints on the integrity of 
# the data but should be able to handle a large amount of load to serve a large 
# number of users simultaneously.

# Also, your company is planning to add more functionality in terms of the data 
# being stored about each of the restaurants. It plans to introduce restaurant 
# menus, restaurant photos, among others, which would then be available to users 
# when filtering restaurants and would be shown in the results.
# 

q9() {
  # Question: 
  # Based on the above requirements, which database would you suggest that the 
  # company use?
  # (Single Choice)
  # 
  # A. MySQL
  # B. HBase
  # C. MongoDB
  echo "C"
}

q10() {
  # Question: 
  # If you had thought things through originally, which of the characteristics 
  # of the three previous databases would have led you to choose the database 
  # you did in the previous question?
  # (Choose all that apply)
  # 
  # 1. Rigidly structured data
  # 2. Data Integrity
  # 3. Dynamic Schema
  # 4. Document Storage
  # 5. Support for Indexing
  # 6. High Scalability
  echo "3456"

  #Completed the honors task.
}

###############################################################################
##                    DO NOT MODIFY ANYTHING BELOW                           ##
###############################################################################
declare -ar questions=( "q1" "q2" "q3" "q4" "q5" "q6" "q7" "q8" "q9" "q10")
last=${questions[$((${#questions[*]}-1))]}
readonly last
readonly usage="This program is used to execute your solution.
Usage:
./runner.sh to run all the questions
./runner.sh -r <question_id> to run one single question
Example:
./runner.sh -r q1 to run q1"

contains() {
  local e
  for e in "${@:2}"; do
  [[ "$e" == "$1" ]] && return 0;
  done
  return 1
}

run() {
  if contains "$1" "${questions[@]}"; then
  echo -n "$("$1")"
  fi
}

while getopts ":hr:" opt; do
  case $opt in
  h)
    echo "$usage" >&2
    exit
  ;;
  r)
    question=$OPTARG
    if contains "$question" "${questions[@]}"; then
    run "$question"
    else
    echo "Invalid question id" >&2
    echo "$usage" >&2
    exit 2
    fi
    exit
  ;;
  \?)
    echo "Invalid option: -$OPTARG" >&2
    echo "$usage" >&2
    exit 2
  ;;
  esac
done

if [ -z "$1" ]; then
  #echo "The answers generated by executing your solution are: " >&2
  echo "{"
  for question in "${questions[@]}"; do
  echo -n ' '\""$question"\":\""$(run "$question")"\"
  if [[ "${question}" == "$last" ]]; then
    echo ""
  else
    echo ","
  fi
  done
  echo "}"
else
  echo "Invalid usage" >&2
  echo "$usage" >&2
  exit 2
fi
