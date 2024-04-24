import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#d11fb6',
    color: 'white',
  },
  section: {
    margin: 10,
    padding: 25,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const newPDF = useSelector((store) => store.newPDF);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_NEWPDF' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            {/* <View style={styles.section}>
              <Text>Hello</Text>
            </View>
            <View style={styles.section}>
              <Text>World</Text>
            </View> */}
            <View style={styles.section}>
              <Text>{newPDF.initial}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
