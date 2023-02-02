import './App.css';
import { useEffect, useState } from "react"
import useAuth from "./hooks/useAuth"
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
import Qna from "./services/qnaAi"

function App() {
  const [answer, setAnswer] = useState("")
  const [question, setQuestion] = useState("")
  const QnaAi = new Qna()

  const ask = async (question) => {
    let answer = await QnaAi.getData(question, (c) => { console.log(c) }, () => { console.log("APPJS") })
    if (answer) {
      setAnswer(answer.text)
      setQuestion("")
    }
  }

  useEffect(() => {

  }, [])


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

          <TextField
            style={{ margin: 20 }}
            onChange={({ target: { value } }) => setQuestion(value)}
            fullWidth label="Type your question..."
            id="question" />
          <Button variant="contained"
            onClick={() => ask(question)}>Ask Me
          </Button>
          <TextField disabled style={{ margin: 20 }}
            multiline
            fullWidth id="fullWidth"
            value={answer} />
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
              <button onClick={() => ask(question)}>Ask me</button>
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
