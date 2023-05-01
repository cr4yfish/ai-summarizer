import Head from 'next/head'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import "material-icons/iconfont/material-icons.css"
import { useState, useEffect, useRef, FormEvent } from 'react';
import { ClipLoader } from 'react-spinners'

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const poppinsBlack = Poppins({ weight: "900", subsets: ["latin"] });

import Background from '@/components/Background'
import Button from '@/components/Button';

interface AnswerObject {
  answer: string;
  end: number,
  score: number,
  start: number,
}

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState("");
  const [summarization, setSummarization] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const hiddenFileInput = useRef<any>(null);

  const handleFileChange = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
  } 

  const getAnswer = async () => {
    setIsAsking(true);
    const response = await fetch("/api/question", {
      method: "POST",
      body: JSON.stringify({
        question,
        context
      })
    })
    console.log(response)
    if(response.ok) {
      const responseObj = await response.json() as AnswerObject;
      console.log(responseObj);
      setAnswer(responseObj.answer);
      setIsAsking(false);
      console.log(responseObj.answer)
    } else {
      try {
        console.log(await response.json());
      } catch (e) {}
      console.log("error", response.statusText)
      setIsAsking(false);
    }
  }

  const summarize = async (e: FormEvent) => {
    e.preventDefault();
    setIsSummarizing(true);
    const response = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({
        context
      })
    })
    if(response.ok) {
      const sumResponse = await response.json();
      console.log(sumResponse);
      setSummarization(sumResponse.summary_text);
      setContext(sumResponse.summary_text);
      setIsSummarized(true);
      setIsSummarizing(false);
    } else {
      try {
        console.log(await response.json());
      } catch (e) {}
      console.log("error", response.statusText)
      setIsSummarizing(false);
    }
  }

  return (
    <>
      <Head>
        <title>AI Summarizer</title>
        <meta name="description" content="Summarize and ask questions powered by AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${poppins.className} `}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.title} ${poppinsBlack.className}`}>Summarize Everything</h1>
          <span>And ask questions!</span>
        </div>
        <form onSubmit={summarize} className={styles.formWrapper}>

          <div className={styles.formEnterContext}>
            {false && <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Button iconName='upload'>Drop file</Button>
              <input name='file' type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{ display: "none" }} />
              <span>or</span>
            </div>}
            <div className={`${styles.formTextWrapper} ${isExpanded && styles.formTextWrapperExpanded}`}>
              <label htmlFor="textPaste">Enter Text</label>
              <div>
                <textarea
                  id="textPaste" 
                  autoComplete='off'
                  autoCorrect='on'
                  spellCheck
                  autoFocus={false}
                  value={context}
                  name='textPaste'
                  className={poppins.className}
                  onChange={(e) => setContext(e.currentTarget.value)}
                  disabled={isSummarizing}
                />
                {context.length > 32 && <button 
                  className={styles.expandButton}
                  onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <span 
                      className='material-icons'>
                      keyboard_double_arrow_down
                    </span>
                      Expand
                </button>}
              </div>
            </div>
          </div>
          <Button 
            icon={isSummarizing ? <ClipLoader color='#F258FF' size={16} /> : undefined}
            type='submit'
            disabled={isSummarizing}
            >Summarize</Button>


          <div className={styles.formQuestion}>
            <div style={{ backdropFilter: isSummarized ? "" : "blur(2px)"}} className={styles.formQuestionOverlay}></div>
            <label htmlFor="questionInput">Ask a question</label>
            <div className={styles.inputWrapper}>
              <span className='material-icons'>search</span>
              <input 
                className={poppins.className} 
                type="text" 
                onChange={(e) => setQuestion(e.currentTarget.value)}
                disabled={!isSummarized || isAsking}
              />
              </div>

              <Button 
                disabled={!isSummarized || isAsking} 
                icon={isAsking ? <ClipLoader color='#F258FF' size={16} /> : undefined}
                onClick={() => getAnswer()}>Ask</Button>
              <div className={styles.inputWrapper}>
                
                <label htmlFor="">Answer</label>
                <input 
                  className={`${poppins.className} ${styles.input}`} 
                  type="text"
                  value={answer}
                  readOnly
                  style={{ textTransform: "capitalize" }}
                />
              </div>

          </div>

         
        </form>
        
        <Background />

      </main>
    </>
  )
}
