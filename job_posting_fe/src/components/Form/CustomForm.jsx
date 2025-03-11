import { React, useState }  from 'react';

function CustomForm() {

  const [jobTitle, setJobTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const [data, setData] = useState(null);
  const [loading, setLoading]= useState(true);

  //const url = `http://127.0.0.1:5000/${path}`;
  //const path = '';

  if (status === 'success') {
    return (
      <h1 className="h1">Thanks</h1>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setStatus('submitting'); // Update status to submitting
    setLoading(true); // Set loading to true

    try {
      const response = await fetch('http://127.0.0.1:5000/data_to_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        // It is required to serialize the content
        body: JSON.stringify({
          jobTitle: jobTitle,
          requirements: requirements,
          jobDescription: jobDescription,
          recruiterContact: recruiterContact,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      document.body.appendChild(img);
      setData(result); // Set data from response
      setStatus('success'); // Update status to success
    } catch (error) {
      setError(error.message); // Set error message
      setStatus('error'); // Update status to error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  function handleJobTitle(e) {
    setJobTitle(e.target.value);
  };

  function handleRequirements(e) {
    setRequirements(e.target.value);
  };

  function handleJobDescription(e) {
    setJobDescription(e.target.value);
  }

  function handleRecruiterContact(e) {
    setRecruiterContact(e.target.value);
  }

  // if (loading) return <div className="mb-3"><h1>Loading...</h1></div>;
  if (error) return <div className="mb-3"><h1>Error: {error}</h1></div>
  // if (!data) return <div className="mb-3"><h1>No data found</h1></div>

  return (
    <>
      {/*<Welcome />*/}
      <div>
        <h1 className="h1">Welcome!</h1>
        <p className="lead">Lets create a simple job post</p>
      </div>
      <div className="mb-3">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">Job title: </label>
            <input
              placeholder="Add job title only"
              type="text" 
              className="form-control" 
              name="jobTitle" 
              id="jobTitle" 
              required
              value={jobTitle}
              onChange={handleJobTitle}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="jobDescription" className="form-label">Job Description: </label>
            <textarea 
              placeholder="Add job description, separated by ;"
              type="text"
              className="form-control" 
              name="jobDescription" 
              id="jobDescription" 
              rows="3"
              required
              onChange={handleJobDescription}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="requirements" className="form-label">Requirements: </label>
            <textarea 
              placeholder="Add job description, separated by ;"
              type="text" 
              className="form-control" 
              name="requirements" 
              id="requirements" 
              rows="3" 
              required 
              onChange={handleRequirements}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="recruiterContact" className="form-label">Recruiter Contact information: </label>
            <input 
              type="text" 
              className="form-control" 
              name="recruiterContact" 
              id="recruiterContact" 
              required 
              onChange={handleRecruiterContact}
              disabled={status === 'submitting'}
              />
          </div>
          <button 
              disabled={recruiterContact.length === 0 || status === 'submitting'}
              className="btn btn-primary">
                Send me
          </button>
        </form>
      </div>
    </>
  );
}

{/*
  Sources:
  https://upmostly.com/tutorials/how-to-post-requests-react
  https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
  https://stackoverflow.com/questions/50046841/proper-way-to-make-api-fetch-post-with-async-await
  https://stackoverflow.com/questions/67079454/react-js-making-post-request-using-useeffect-and
  https://getbootstrap.com/docs/4.0/utilities/spacing/
  https://react.dev/learn/managing-state
  https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  https://maxrozen.com/fetching-data-react-with-useeffect
  */}

export default CustomForm;