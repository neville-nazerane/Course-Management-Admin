import { useContext, useEffect, useRef, useState } from 'react';
import type { Course } from '../models/course';
import { ApiContext } from '../services/contexts';
import { Modal } from 'bootstrap';
import CourseEditor from '../dialogs/course-editor';
import ConfirmDialog from '../dialogs/confirm-dialog';
import TeacherCourseEditor from '../dialogs/teacher-course-editor';

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [current, setCurrent] = useState<Course | null>(null);
    const [deleteMsg, setDeleteMsg] = useState('');
    const [ teacherCourseId, setTeacherCourseId ] = useState(0);

    const deletingItem = useRef<Course | null>(null);
    const editor = useRef<Modal | null>(null);

    const api = useContext(ApiContext);

    useEffect(() => {
        api.getCourses().then(setCourses);
    }, []);

    const closed = async () => {
        if (editor.current){
            if (current){
                const updated = await api.getCourse(current.id);
                setCourses(l => l.map(c => (c.id === updated.id ? updated : c)));
                setCurrent(null);
            }
            else {
                setCourses(await api.getCourses());
            }
            editor.current.hide();
        }
    };

    const deleteConfirmed = async (confirm: boolean) => {
        if (confirm && deletingItem.current){
            const deletingId = deletingItem.current.id;
            await api.deleteCourse(deletingId);
            setCourses(l => l.filter(c => c.id != deletingId));
        }
    };

    const openTeachers = (c: Course) => {
        setTeacherCourseId(c.id);
        Modal.getOrCreateInstance("#teacher-course-editor").show();
    };

    const openEditor = (c: Course | null) => {
        setCurrent(c);
        if (!editor.current) {
            editor.current = new Modal("#course-editor");
        }
        editor.current.show();
    };

    const deleteItem = (c: Course) => {
        deletingItem.current = c;
        setDeleteMsg(`Are you sure you want to delete ${c.name}`);
        Modal.getOrCreateInstance('#delete-confirm').show();
    };

    return (
<>
    <div className="page-header">
        <h3>Courses</h3>
        <button className="btn btn-primary" onClick={() => openEditor(null)}>Add</button>
    </div>

    <table className="table table-striped">
        <thead>
        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th style={{ width: 150 }}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {courses.map((c, i) => (
            <tr key={i}>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>{c.description ?? ''}</td>
                <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openTeachers(c)}>Teachers</button>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openEditor(c)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteItem(c)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>

    <TeacherCourseEditor courseId={teacherCourseId} />

    <CourseEditor onClose={closed} course={current} />

    <ConfirmDialog id='delete-confirm' closed={deleteConfirmed} message={deleteMsg} />
</>
    );
}
