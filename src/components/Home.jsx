import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  Typography,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    marginTop: "10%",
  },
  shortenedUrl: {
    marginTop: "2rem",
  },
  button: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  arrowContainer: {
    margin: "2rem 2rem",
  },
}));

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const classes = useStyles();

  const [urlToShorten, setUrlToShorten] = useState("");
  const [shortening, setShortening] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);

  let shortenUrl = (e) => {
    e.preventDefault();
    setShortening(true);
    setShortenedUrl("");
    setCopyButtonClicked(false);
    let url = `${apiUrl}/url/shorten`;
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlToShorten }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setShortenedUrl(res.data.shortenedUrl);
        }
        setShortening(false);
      });
  };

  function copyShortenedUrl() {
    navigator.clipboard.writeText(siteUrl + "/" + shortenedUrl);
    setCopyButtonClicked(true);
  }

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h4" component="h4" gutterBottom>
          URL Shortener
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={shortenUrl}
        >
          <FormControl fullWidth className={classes.margin}>
            <TextField
              type="url"
              id="standard-basic"
              label="Paste your URL here"
              value={urlToShorten}
              pattern="https://.*"
              onChange={(e) => setUrlToShorten(e.target.value)}
            />
          </FormControl>

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="100" />
          </div>
          {shortening ? (
            <Loader
              type="Puff"
              color="#e3e2e1"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          ) : (
            <Button variant="outlined" className={classes.button} type="submit">
              Shorten
            </Button>
          )}
        </form>
        {shortenedUrl ? (
          <StyleRoot>
            <div className={classes.shortenedUrl} style={styles.bounce}>
              <div className={classes.arrowContainer}>
                <ArrowDownwardIcon fontSize="100" />
              </div>

              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-password">
                  Shortened URL
                </InputLabel>
                <Input
                  type="url"
                  id="standard-adornment-password"
                  label="Shortened URL"
                  value={siteUrl + "/" + shortenedUrl}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={copyShortenedUrl}
                      >
                        {copyButtonClicked ? "Copied" : <FileCopy />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </StyleRoot>
        ) : null}
      </Container>
    </div>
  );
}
