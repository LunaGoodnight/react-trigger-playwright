import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { beforeEach } from "../tests/lap.spec";

const browserTypeList = [
  { title: "Chrome", value: "chromium" },
  { title: "Firefox", value: "firefox" },
  { title: "Edge", value: "webkit" },
];

const UrlInput = styled.input`
  width: 80%;
  font-size: 2rem;
  padding: 1rem;
`;

const BrowserTypeWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioBox = styled.input`
  width: 2rem;
  height: 2rem;
`;

const MainWrapper = styled.div`
  padding: 5rem;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
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
