import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import randomWords from 'random-words'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner'
const App = () =>{ 

  const [noun1, setNoun1] = useState('');
  const [noun2, setNoun2] = useState('');
  const [isLoading,setLoading] = useState(false)

    const getWords = async () => {
      
      let nounFound = 0
        try {
            setLoading(true)
            while(nounFound < 2){
              let random = randomWords()
              const word = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${random}?key=01c77953-d1ac-4bda-b229-71633cd93e15`)
              console.log(word.data[0],word.data[0].fl)
              let wordType = word.data[0].fl
              if(wordType === 'noun'){
                if(nounFound === 0){
                  setNoun1(random)
                }
                if(nounFound === 1){
                  setNoun2(random)
                }
                nounFound++;
              }
            }
          setLoading(false)
            
        } catch (error) {
        }
    }
  useEffect(() => {
    getWords()
  }, [])

    return (
      <div style = {{maxWidth: '1000px', margin: '50px auto', boxShadow: '0px 0px 4px #aaa', padding: '20px',paddingTop: '0px', borderRadius: '8px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center'}}>Random Idea Generator</h1>
        {isLoading ? <Spinner animation="border" variant="primary" style={{margin: '10px'}}/> : <h2 style = {{textAlign: 'center'}}>{noun1} {noun2}s</h2>}
        <button style={{padding: '10px', border: 'none', backgroundColor: 'rgb(100,100,240)', color: 'white', borderRadius: '4px', cursor: 'pointer'}} onClick = {getWords}>New Idea</button>
      </div>
    )
}

export default App