import { createSlice } from "@reduxjs/toolkit"

interface RootState {
    author: string;
    format: string;
    isbn: string;
    num_pages: string;
    title: string;
    year_of_release: string;
  }

  const initialState: RootState = {
    author: "Author",
    format: "Format",
    isbn: "ISBN",
    num_pages: "Num_pages",
    title: "Title",
    year_of_release: "Year_of_release",
  };

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseAuthor: (state, action) => { state.author = action.payload },
        chooseFormat: (state, action) => { state.format = action.payload },
        chooseISBN: (state, action) => { state.isbn = action.payload },
        chooseNum_pages: (state, action) => { state.num_pages = action.payload },
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseYear_of_release: (state, action) => { state.year_of_release = action.payload },
    },
});

export const reducer = rootSlice.reducer;
export const { chooseAuthor, chooseFormat, chooseISBN, chooseNum_pages, chooseTitle, chooseYear_of_release } = rootSlice.actions