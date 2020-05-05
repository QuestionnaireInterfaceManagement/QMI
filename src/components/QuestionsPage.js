import React, {useContext, useEffect} from "react";
import {CssBaseline, Grid, makeStyles} from "@material-ui/core";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import {DragDropContext} from "react-beautiful-dnd";
import "./index.css";
import {QUESTION_TYPES} from "./QuestionTypes";
import {SettingsContext} from "../contexts/SettingsContext";
import {Sidebar} from "../Sidebar";
import {BottomSection} from "../BottomSection";
import {TopSection} from "../TopSection";
import { useSelector, useDispatch } from "react-redux";
import { REORDER, CLONE, SET_QUESTIONS } from "../features/questions/questionsSlice";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
}));

const QuestionsPage = () => {
  const { settings, settingsDispatch } = useContext(SettingsContext);
  // const { questions, dispatch } = useContext(QuestionnaireContext);
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const onDragEnd = React.useCallback(result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    settingsDispatch({
      type: "SET_DESTINATION_INDEX",
      destinationIndex: destination.index
    });
    console.log(settings.destinationIndex, destination.index);
    switch (source.droppableId) {
      case "BAG":
        // dispatch({ type: "REORDER", source: source, destination: destination });
        dispatch(REORDER({ source: source, destination: destination }));
        break;
      case "SHOP":
        // dispatch({ type: "CLONE", source: source, destination: destination });
        dispatch(CLONE({ source: source, destination: destination }));
        console.log(destination);
        console.log(questions[destination.index]);
        break;
      default:
        break;
    }
  }, []);
  const classes = useStyles();
  useEffect(() => {
    const x = localStorage.getItem("qmi-data");
    if (x !== null) {
      // dispatch({ type: "SET_QUESTIONS", questions: JSON.parse(x)})
      dispatch(SET_QUESTIONS({ questions: JSON.parse(x)} ))
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("qmi-data", JSON.stringify(questions))
  }, [questions]);

  return (
    <div className={classes.root} >
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar items={QUESTION_TYPES} />
        <main className={classes.content}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{
              margin: "0",
              background: settings.showGridAreas ? "lightgrey" : "transparent"
            }}
          >
            {/* <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
                style={{
                  background: settings.showGridAreas
                    ? "lightblue"
                    : "transparent"
                }}
              >
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  background: settings.showGridAreas
                  ? "lightgreen"
                  : "transparent"
                }}
              >
              </Grid>
            </Grid> */}
            <TopSection />
            <BottomSection items={questions} />
          </Grid>
        </main>
      </DragDropContext>
    </div>
  );
};

export default QuestionsPage;


