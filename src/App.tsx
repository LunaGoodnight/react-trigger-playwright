import React from "react";
import { useState } from "react";
import styled from "styled-components";
// import { beforeEach } from "../tests/lap.spec";
import {
  UrlInput,
  RadioBox,
  MainWrapper,
  BrowserTypeWrapper,
} from "./styles/appStyle";

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
  const handleRunTest = async (url, browserType) => {
    fetch("/run-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, browserType }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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

      <BrowserTypeWrapper>
        {browserTypeList.map(({ title, value }) => {
          return (
            <label key={value}>
              <RadioBox
                type="radio"
                value={value}
                checked={browserType === value}
                onChange={() => setBrowserType(value)}
              />
              {title}
            </label>
          );
        })}
      </BrowserTypeWrapper>

      <button type="button" onClick={() => handleRunTest(url, browserType)}>
        Run Test
      </button>
    </MainWrapper>
  );
}

export default App;
