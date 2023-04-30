import Head from 'next/head'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import "material-icons/iconfont/material-icons.css"
import { useState, useEffect, useRef, FormEvent } from 'react';

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
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState("");
  const [summarization, setSummarization] = useState("");
  const [loading, setLoading] = useState(false);

  const hiddenFileInput = useRef<any>(null);

  const handleFileChange = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
  } 

  const getAnswer = async () => {
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
      console.log(responseObj.answer)
    } else {
      try {
        console.log(await response.json());
      } catch (e) {}
      console.log("error", response.statusText)
    }
  }

  const summarize = async () => {
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
    } else {
      try {
        console.log(await response.json());
      } catch (e) {}
      console.log("error", response.statusText)
    }
  }

  const compute = async (e: FormEvent) => {
    e.preventDefault();
    summarize();
    getAnswer();
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
        </div>
        <form onSubmit={compute} className={styles.formWrapper}>

          <div className={styles.formEnterContext}>
            <span>Enter Context</span>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Button iconName='upload'>Drop file</Button>
              <input name='file' type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{ display: "none" }} />
              <span>or</span>
            </div>
            <div className={`${styles.formTextWrapper} ${isExpanded && styles.formTextWrapperExpanded}`}>
              <label htmlFor="textPaste">Paste Text</label>
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
          <div className={styles.formQuestion}>
            <label htmlFor="questionInput">Ask a question</label>
            <div className={styles.inputWrapper}>
              <span className='material-icons'>search</span>
              <input 
                className={poppins.className} 
                type="text" 
                onChange={(e) => setQuestion(e.currentTarget.value)}
              />
              </div>
          </div>

          <Button type='submit'>Ask</Button>
          <div className={styles.inputWrapper}>
            <input 
              className={`${poppins.className} ${styles.input}`} 
              type="text"
              value={answer}
            />
          </div>
        </form>
        
        <Background />

      </main>
    </>
  )
}
