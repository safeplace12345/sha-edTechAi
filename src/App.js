import './App.css';
import { useEffect, useState } from "react"
import useAuth from "./hooks/useAuth"
import * as qna from '@tensorflow-models/qna'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  AppBar,
  Box,
  Toolbar,
  Button,
  TextField
} from "@mui/material"
import { Expand, Menu } from "@mui/icons-material"

class QuestionAnswering {
  constructor() {
    this.modal = null
    this.init()
  }

  init = () => {
    this.modal = qna.load()
    console.log(this.modal)
  }
  askQuestion = async (question, passage) => {
    try {
      console.log(this.modal)
      const answers = await this.modal.findAnswers(question, passage)
    } catch (e) {
      console.log("FAILED:", e)
    }
  }
}

function App() {
  let QuestionAnsweringModel;
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const testData = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."

  const init = async () => {
    QuestionAnsweringModel = await qna.load()
    console.log({ QuestionAnsweringModel })
  }
  
  const ask = async (question, testData) => {
    console.log({ QuestionAnsweringModel })
    let an = await QuestionAnsweringModel.findAnswers("What is google", testData)
    const answer = an.sort((prev, curr) => prev.score - curr.score)[0]
    if (answer) {
      setAnswer(answer.text)
    }
  }

  useEffect(() => {
    init()
  }, [QuestionAnsweringModel])


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Answers
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ padding: 30 }}>
          <Typography variant="h4">What is your question?</Typography>
          <Typography >{testData}</Typography>
          <TextField
            style={{ margin: 20 }}
            // onChange={({ target: { value } }) => setQuestion(value)}
            fullWidth label="Type your question..."
            id="question" />
          <Button variant="contained"
            onClick={() => ask(question, testData)}>Ask Me
          </Button>
          <TextField disabled style={{ margin: 20 }} fullWidth id="fullWidth" value={answer} />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ padding: 30 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Expand />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Humanitarian</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
              <button onClick={() => ask(question, testData)}>Click me</button>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion disabled>
          <AccordionSummary
            expandIcon={<Expand />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Technology</Typography>
          </AccordionSummary>
        </Accordion>
      </Grid>
    </div>
  );
}

export default App;
