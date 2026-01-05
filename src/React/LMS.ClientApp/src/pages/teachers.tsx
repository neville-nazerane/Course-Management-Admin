import { useContext, useEffect, useRef, useState } from 'react';
import type { Teacher } from '../models/teacher';
import { ApiContext } from '../services/contexts';
import { Modal } from 'bootstrap';
import TeacherEditor from '../dialogs/teacher-editor';
import ConfirmDialog from '../dialogs/confirm-dialog';
import TeacherCourseEditor from '../dialogs/teacher-course-editor';


export default function Teachers() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [current, setCurrent] = useState<Teacher |  null>(null);
    const [deleteMsg, setDeleteMsg] = useState('');
    const [ courseTeacherId, setCourseTeacherId ] = useState(0);
    
    const deletingItem = useRef<Teacher | null>(null);

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

    const deleteConfirmed = async (confirm: boolean) => {
        if (confirm && deletingItem.current){
            
            const deletingId = deletingItem.current.id;
            await api.deleteTeacher(deletingId);
            setTeachers(l => l.filter(t => t.id != deletingId));
        }
    }

    const openEditor = (t: Teacher | null) => {
        setCurrent(t);
        if (!editor.current) {
            editor.current = new Modal("#teacher-editor");
        }
        editor.current.show();
    };

    const openCourses = (t: Teacher) => {
      setCourseTeacherId(t.id);
      Modal.getOrCreateInstance('#teacher-course-editor').show();
    }

    const deleteItem = async (t: Teacher) => {
        console.log(t);
        deletingItem.current = t;
        setDeleteMsg(`Are you sure you want to delete ${t.firstName}`);
        Modal.getOrCreateInstance('#delete-confirm').show();
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
          <th style={{ width: 250 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t, i) => (
          <tr key={i}>
            <td>{t.firstName}</td>
            <td>{t.lastName}</td>
            <td>{t.title ?? ''}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2" onClick={() => openCourses(t)}>Courses</button>
              <button className="btn btn-sm btn-primary me-2" onClick={() => openEditor(t)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteItem(t)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <TeacherEditor onClose={closed} teacher={current}  />

    <TeacherCourseEditor teacherId={courseTeacherId} />

    <ConfirmDialog id='delete-confirm' closed={deleteConfirmed} message={deleteMsg} />
</>
  );
}
