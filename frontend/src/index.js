import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="496795311742-rfdjfti62dvq10c4jedi02e2n3609ped.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
