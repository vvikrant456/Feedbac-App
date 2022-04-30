import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(()=>{
    // console.log(123)
    fetchFeedback()
  },[]);

  //Fetch Feedback
  const fetchFeedback = async()=>{
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    // console.log(data);
    setFeedback(data);
    setIsLoading(false);
  }

  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]); //spread operator
  };

  //delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //update  feedback item
  const updateFeedback = (id, updItem) => {
    // console.log(id, updItem);
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        isLoading,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
