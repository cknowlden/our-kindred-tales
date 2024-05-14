Google Cloud Storage Bucket and API Setup Guide

This guide will walk you through the process of setting up a Google Cloud Storage (GCS) bucket and configuring the necessary API access. Google Cloud Storage is used to host your JSON and hold completed PDFs.


#####


Prerequisites

Before you begin, ensure you have the following:

1. Google Cloud Platform Account: You need an active Google Cloud Platform (GCP) account. If you don't have one, you can sign up [here.](https://cloud.google.com/?hl=en)

2. Project: Create a project in the Google Cloud Console if you haven't already. [See Documentation Here](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

3. Billing: Enable billing for your project. Google Cloud Platform offers a free tier with certain limitations.


#####


Step 1: Create a GCS Bucket

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and select your project.

2. In the left-hand menu, navigate to "Storage" > "Browser."

3. Click on the "Create Bucket" button.

4. Enter a unique name for your bucket. Bucket names must be unique across all of Google Cloud Storage. In this app, for example, the example bucket used is "example-kindred-tales". This will be replaced by the name of your bucket in this project.

5. Choose a location for your bucket. This determines where your data will physically reside. Consider choosing a location closest to your users for optimal performance.

6. Configure additional settings such as storage class, access control, and encryption. Adjust these settings according to your requirements.

7. Click "Create" to create your bucket.



Step 2: Set Up API Access

1. In the Cloud Console, go to the "APIs & Services" > "Library" page. If you have any difficulty finding, you can also utilize the search button.

2. Search for "Google Cloud Storage JSON API" and select it.

3. Click the "Enable" button to enable the API.

4. Navigate to "Credentials" in the left-hand menu under "APIs & Services."

5. Click on the "Create credentials" dropdown and select "Service account."

6. Fill out the form with the necessary details. Choose the role for the service account that suits your needs. For accessing GCS, the predefined role "Storage Object Admin" provides sufficient permissions.

7. Click "Continue" and then "Done" to create the service account.

8. Once the service account is created, click on it from the list of service accounts.

9. Navigate to the "Keys" tab and click on "Add Key" > "Create new key."

10. Choose the key type as "JSON" and click "Create" to download the key file onto your local computer. This JSON file contains your private key, so keep it secure. You will need to use this file in the next steps below.



Step 3: Configure Authentication
1. Copy the downloaded JSON key file to your project directory.

2. This is the file you will include in your .env file.
<img src="../our-kindred-tales/documentation/images/env.png">

3. To create a .env file, click outside the root directory folder and create a new file. You will then name this file .env
<img src="../our-kindred-tales/documentation/images/create_dot_env.png">

4. You will then set SERVICE_ACCOUNT_KEY_PATH to equal the route to your JSON key file on your project directory. <img src="../our-kindred-tales/documentation/images/env_file.png"> This is what will be used in your gcs.router.js and overview.router.js to authenticate to be able to access your Google Cloud Bucket.



Step 4: Start Using Google Cloud Storage
You're now ready to start using Google Cloud Storage in your applications. You can use the Google Cloud Storage client libraries to interact with your buckets.

1. You can replace the app Google Cloud Bucket with your Bucket Name. To get your routes working with the current app, you can create your bucket to look similarly with the json-files folder path and the pdf-files folder path. <img src="../our-kindred-tales/documentation/images/gcs_bucket.png">

2. You will replace the routes with your bucket name and the file path. For example, here you see that your authentication SERVICE_ACCOUNT_KEY_PATH is used to authenticate so you can access your Google Cloud Bucket. You then access your bucket in this GET route and "example-kindred-tales" can be replaced by your bucket name. "Json-files" is one of the bucket pathways. This is the pathway to get your Json files. If you were accessing the pdf-files folder path referenced above, this would be replaced with "pdf-files" <img src="../our-kindred-tales/documentation/images/bucket_route.png">



#####



You are now set to have Bubble.io post/send the JSON data to the "json-files" folder path on Google Cloud Storage or a similarly named path of your choosing. Your Kindred Tales app will then receive the JSON data from Google Cloud. When your PDF is created, the completed PDF will then be sent back to Google Cloud Storage "pdf-files" folder pathway. <img src="../our-kindred-tales/documentation/images/gcs_post.png">





Refer to the [Google Cloud Storage Documentation](https://cloud.google.com/storage/docs) for detailed information on how to use GCS with various programming languages and tools.