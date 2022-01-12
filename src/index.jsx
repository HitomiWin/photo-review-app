import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import AuthContextProvider from "./contexts/AuthContext";
import AlbumContextProvider from "./contexts/AlbumContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/App.scss";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 60 * 1, // 1 hours
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <AlbumContextProvider>
            <SimpleReactLightbox>
              <App />
            </SimpleReactLightbox>
          </AlbumContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
