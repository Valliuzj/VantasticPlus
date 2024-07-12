import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className='lg:grid lg:grid-cols-3 bg-white h-[150px] rounded-xl shadow-lg relative bg-transparent mb-5'>
        <div className="col-span-1 flex flex-col items-center justify-center lg:items-start">
                <div className="my-5 ml-10 font-extrabold text-2xl text-rose-500">
                    Today's Fun Fact:
                </div>
        </div>
        <div className="col-span-full lg:col-span-2 flex">
            <p className="my-auto text-wrap">{fact}</p>
        </div>
        
    </div>
  );
};

export default FunFact;
