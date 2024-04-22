import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Details() {
  const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');
  const [evenPagesChecked, setEvenPagesChecked] = useState(false);
  const [simpleBarChecked, setSimpleBarChecked] = useState(false);
  const [scrollChecked, setScrollChecked] = useState(false);
  const [bookTitleChecked, setBookTitleChecked] = useState(false);
  const [bookAndAuthorChecked, setBookAndAuthorChecked] = useState(false);
  // const selectedProject = useSelector((state) => state.selectedProject);
  // const projectTitle = selectedProject ? selectedProject.title : '';

  return (
    <div>
      <h2>PROJECT DETAILS for project {/*{projectTitle}*/}</h2>
      <div><br/>
        <label>
          <b>New Chapter:</b><br/>
          <center>
          Even Pages Only
          <input
            type="checkbox"
            checked={evenPagesChecked}
            onChange={() => setEvenPagesChecked(!evenPagesChecked)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Save Space (Odds/Evens)
          </center>
        </label>
      </div><br/>

      <div>
        <label>
          <b>Chapter Divider:</b><br/>
          <center>
          Simple Bar
          <input
            type="checkbox"
            checked={simpleBarChecked}
            onChange={() => setSimpleBarChecked(!simpleBarChecked)}
          />

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Scroll
          <input
            type="checkbox"
            checked={scrollChecked}
            onChange={() => setScrollChecked(!scrollChecked)}
          />
          </center>
        </label>
      </div><br/>

      <div>
        <label>
          <b>Page Header:</b><br/>
          <center>
          Book Title Only
          <input
            type="checkbox"
            checked={bookTitleChecked}
            onChange={() => setBookTitleChecked(!bookTitleChecked)}
          />

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Book and Author Opposite Pages:
          <input
            type="checkbox"
            checked={bookAndAuthorChecked}
            onChange={() => setBookAndAuthorChecked(!bookAndAuthorChecked)}
          />
          </center>
        </label>
      </div>
    </div>
  );
}

export default Details;
