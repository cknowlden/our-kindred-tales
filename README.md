Kindred Tales PDF Generator

Duration: 3 weeks

Welcome to the Kindred Tales PDF Generator, This tool is designed to help you quickly and with minimal input create both digital PDFs as well as PDFs formatted to be sent to the publisher Lulu.

to see the fully functional site, please visit: 

Installation
1. Create a database named kindred-tales
2. The queries in database.sql are set up to create all required tables. The project is built on Postgres, so you will need to make sure you have that installed. I recommend using Postico to run those queries as that was what I used to create them.
3. Open your editor of choice and run npm install
4. Run npm run server in your terminal
5. Run npm run client in your terminal

Usage
Upon load The app will reach out to your GCS database and pull any existing orders found there, You can then use the Drop down menu located on each item in the table and use the options there for each stage of the process.

Features
automated generation of a clean digital copy of the PDF
Allowing manual input of customer information to include, shipping address and phone number.
Automated generation of a PDF set to publisher specifications and sending the the created PDF directly to the publisher for production.

Feedback


Disclaimer


Acknowledgerment
The Kindred Tales PDF Generator was created by a team of developers to include Ashleigh Carter, Cali Knowlden, Daniel Holt, Jan Michael A Biyo, LuAnn Yang, and Richard Barnitz. Special thanks to Prime Digital Academy who equipped and helped us to make this application a reality. And to Kindred Tales owner and founder Nick Hern for allowing us to work with him on such a fantastic product.

Built With
JS
CSS
HTML
Nodejs
Express
React
Redux
Heroku
Material-UI
PostgreSQL
GCS
PDFMake


Support
If you have suggestion or issues, please email me at holt.daniel.b@gmail.com