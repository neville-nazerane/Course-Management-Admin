import { useContext, useEffect, useRef, useState } from 'react';
import type { Teacher } from '../models/teacher';
import { ApiContext } from '../services/contexts';
import TeacherEditor from '../services/dialogs/teacher-editor';
import { Modal } from 'bootstrap';


export default function Teachers() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [current, setCurrent] = useState<Teacher |  null>(null);
    
    // const [editor, setEditor] = useState<Modal | null>(null);
    const editor = useRef<Modal | null>(null);

    const api = useContext(ApiContext);

    useEffect(() => {
       api.getTeachers().then(setTeachers);
    }, []);

    const closed = async () => {
        if (editor.current){
            if (current){
                const updated = await api.getTeacher(current.id);
                setTeachers(l => l.map(t => (t.id === updated.id ? updated : t)));
                setCurrent(null);
            }
            else {
                setTeachers(await api.getTeachers());
            }
            editor.current.hide();
        }

        
    }

    const openEditor = (t: Teacher | null) => {
        setCurrent(t);
        if (!editor.current) {
            editor.current = new Modal(".modal");
        }
        editor.current.show();
    };

    const deleteItem = async (t: Teacher) => {
        await api.deleteTeacher(t.id);
        setTeachers(await api.getTeachers());
    }

  return (
<>

    <div className="page-header">
        <h3>Teachers</h3>
        <button className="btn btn-primary" onClick={() => openEditor(null)}>Add</button>
    </div>


    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th style={{ width: 150 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t, i) => (
          <tr key={i}>
            <td>{t.firstName}</td>
            <td>{t.lastName}</td>
            <td>{t.title ?? ''}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2" onClick={() => openEditor(t)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteItem(t)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <TeacherEditor onClose={closed} teacher={current}  />
</>
  );
}
