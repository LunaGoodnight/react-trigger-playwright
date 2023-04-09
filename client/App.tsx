import React from "react";
import { useState } from "react";
import styled from "styled-components";
// import { beforeEach } from "../tests/lap.spec";
import {
  UrlInput,
  RadioBox,
  MainWrapper,
  BrowserTypeWrapper,
  Button,
  Label,
} from "./styles/appStyle";
import { runPlaywrightTest } from "../tests/playwright.spec";

const clientPort = 4000;
const serverUrl = `http://localhost:${clientPort}`;

const browserTypeList = [
  { title: "Chrome", value: "chromium" },
  { title: "Firefox", value: "firefox" },
  { title: "Edge", value: "webkit" },
];

function App() {
  const [url, setUrl] = useState("");
  const [browserType, setBrowserType] = useState("");
  const [message, setMessage] = useState("");
  const handleRunTest = async (url, browserType) => {
    const response = await fetch("/api/runtests");
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <MainWrapper>
      <label>
        <UrlInput
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      {message && <p>{message}</p>}
      <BrowserTypeWrapper>
        {browserTypeList.map(({ title, value }) => {
          return (
            <Label key={value}>
              <RadioBox
                type="radio"
                value={value}
                checked={browserType === value}
                onChange={() => setBrowserType(value)}
              />
              {title}
            </Label>
          );
        })}
      </BrowserTypeWrapper>

      <Button type="button" onClick={() => handleRunTest(url, browserType)}>
        Run Test
      </Button>
    </MainWrapper>
  );
}

export default App;
