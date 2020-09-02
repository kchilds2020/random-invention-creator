import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import randomWords from 'random-words'

const App = () =>{ 

  const [adjective, setAdjective] = useState('');
  const [noun, setNoun] = useState('');
  const [isLoading,setLoading] = useState(false)

  useEffect(() => {
    const getWords = async () => {
      
      let nounFound = false
      let adjFound = false
      let count = 0;
        try {
            setLoading(true)
            while(nounFound === false || adjFound === false){
              let random = randomWords()
              const word = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${random}?key=01c77953-d1ac-4bda-b229-71633cd93e15`)
              console.log(word.data[0].fl)
              let wordType = word.data[0].fl
              if(wordType === 'adjective') {
                adjFound = true;
                setAdjective(random)
              }
              if(wordType === 'noun'){
                nounFound = true;
                setNoun(random)
              }
              count++;
            }
          console.log(`${count} requests`)
          setLoading(false)
            
        } catch (error) {
        }
    }
    getWords()
  }, [])

    return (
      <div style = {{maxWidth: '1000px', margin: '50px auto', boxShadow: '0px 0px 4px #aaa', padding: '20px', borderRadius: '8px'}}>
        <h1 style={{textAlign: 'center'}}>Random Idea Generator</h1>
        {isLoading ? <h2>LOADING</h2> : <h2 style = {{textAlign: 'center'}}>{adjective} {noun}</h2>}
      </div>
    )
}

export default App;