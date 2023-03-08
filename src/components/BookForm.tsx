import Input from "./Input"
import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux'
import { chooseAuthor, chooseFormat, chooseISBN, chooseNum_pages, chooseTitle, chooseYear_of_release} from "../redux/slices/RootSlice";

interface BookFormProps {
    id?: string[];
    onClose: () => void;
}

const BookForm = (props: BookFormProps) => {
    const { register, handleSubmit } = useForm({ mode: 'onBlur'})
    const dispatch = useDispatch();
    const store = useStore();

    const onSubmit = async (data: any) => {
        if (props.id && props.id.length > 0) {
            await server_calls.update(props.id[0], data);
        } else {
            dispatch(chooseAuthor(data.author));
            dispatch(chooseFormat(data.format));
            dispatch(chooseISBN(data.isbn));
            dispatch(chooseNum_pages(data.num_pages));
            dispatch(chooseTitle(data.title));
            dispatch(chooseYear_of_release(data.year_of_release));
            await server_calls.create(store.getState());
        }
        props.onClose();
        window.location.reload()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="author">Author</label>
                    <Input {...register('author')} name="author" placeholder="Author" />
                </div>
                <div>
                    <label htmlFor="format">Format</label>
                    <Input {...register('format')} name="format" placeholder="Format" />
                </div>
                <div>
                    <label htmlFor="isbn">ISBN</label>
                    <Input {...register('isbn')} name="isbn" placeholder="ISBN" />
                </div>
                <div>
                    <label htmlFor="num_pages">Number of pages</label>
                    <Input {...register('num_pages')} name="num_pages" placeholder="Number of pages (integers only)" />
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <Input {...register('title')} name="title" placeholder="Title" />
                </div>
                <div>
                    <label htmlFor="year_of_release">Year of release</label>
                    <Input {...register('year_of_release')} name="year_of_release" placeholder="Year of release" />
                </div>
                <div className="flex p-1">
                    <button className="flex justify-start m-3 bg-slate-300 rounded hover:bg-slate-800 text-white">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookForm