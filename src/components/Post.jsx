// // import React from 'react';
// import { useParams } from 'react-router-dom';

// function Post() {
//   const params = useParams();
//   return (
//     <div>
//       <h1>Post {params.id} </h1>
//       <p> Name: {params.name} </p>
//     </div>
//   );
// }

// export default Post;

// import React from 'react';
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';

function Post() {
  const status = 200;
  const navigate = useNavigate();

  const onClick = () => {
    console.log('Hello World');
    navigate('/about');
  };

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path="/show" element={<h1>Hello world</h1>} />
      </Routes>
    </div>
  );
}

export default Post;