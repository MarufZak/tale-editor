import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { TaleEditorPage } from "./pages/TaleEditorPage";
import { SuccessPage } from "./pages/SuccessPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaleEditorPage />} />
        <Route path="/submitted" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
