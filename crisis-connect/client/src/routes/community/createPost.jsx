import { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
// import {Navigate} from "react-router-dom";
// import Editor from './Editor';

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    return (
      <form className='CreatePost' >
        <input type="title"
               placeholder={'Title'}/>
        <input type="summary"
               placeholder={'Summary'}/>
        <input type="file"/>
       <ReactQuill value={content}  />
        <button style={{marginTop:'5px'}}>Create post</button>
      </form>
    );
}

export default CreatePost;