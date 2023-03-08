import { useState } from 'react'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "format", headerName: "Format", flex: 1 },
  { field: "isbn", headerName: "ISBN", flex: 1 },
  { field: 'num_pages', headerName: "Num_pages", flex: 2 },
  { field: 'title', headerName: "Title", flex: 2 },
  { field: 'year_of_release', headerName: "Year_of_release", flex: 2 }
]


function DataTable() {
  const [ open, setOpen ] = useState(false);
  const { bookData, getData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0]).then(getData);
  }  

  return (
    <>
        <Modal
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />
        <div className='flex flex-row'>
            <div>
                <button 
                    className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'
                    onClick={handleOpen}
                >
                    Add Book
                </button>
            </div>
            <div>
                <button 
                    className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'
                    onClick={handleOpen}
                >
                    Update
                </button>
            </div>
            <div>
                <button 
                    className='p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white'
                    onClick={deleteData}
                >
                    Delete
                </button>
            </div>
        </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
          >
            <h2 className="p-3 bg-slate-300 my-2 rounded">My books</h2>
            <DataGrid rows={bookData} columns={columns} rowsPerPageOptions={[5]}
            checkboxSelection={true} 
            onSelectionModelChange={ (item: any) => {
              setSelectionModel(item)
            }}
            />
        </div>
    </>    
  )
}

export default DataTable
