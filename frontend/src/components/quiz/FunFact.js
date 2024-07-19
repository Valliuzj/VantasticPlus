import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import { CommandInput,Command } from '../ui/command';

const FunFact = () => {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedFact = localStorage.getItem('funFact');
    const storedDate = localStorage.getItem('factDate');
    const today = new Date().toISOString().split('T')[0]; // 获取今天的日期，格式为 YYYY-MM-DD
    console.log(today);
    if (storedFact && storedDate === today) {
      setFact(storedFact);
    } else {
      const getFunFact = async () => {
        try {
          const response = await axios.get('https://api.api-ninjas.com/v1/facts', {
            headers: {
              'X-Api-Key': 'rCknrNaDwmdQO5fvK3CMiA==v07S9Tug7SRBuvpS'  
            }
          });
         // console.log("API Response:", response.data);

          if (response.data && response.data.length > 0) {
            const newFact = response.data[0].fact;
            setFact(newFact);
            localStorage.setItem('funFact', newFact);
            localStorage.setItem('factDate', today);
          }
        } catch (error) {
          console.error('Error fetching fun fact:', error);
        }
      };

      getFunFact();
    }
  }, []);

  return (
    <div className="max-w-[800px] min-w-[650px] overflow-hidden rounded-lg border shadow-md ml-3 mr-3 px-2 py-2">
        <div className="fun-fact font-mono font-bold text-rose-500 ">
          Today's Fun Fact: "{fact}"
       </div>
       </div>
  );
};

export default FunFact;
