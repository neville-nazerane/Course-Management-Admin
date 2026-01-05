import { useContext, useEffect, useRef, useState } from 'react';
import type { Student } from '../models/student';
import type { StudyProgram } from '../models/study-program';
import { ApiContext } from '../services/contexts';
import { Modal } from 'bootstrap';
import StudentEditor from '../dialogs/student-editor';
import ConfirmDialog from '../dialogs/confirm-dialog';

export default function Students() {
    const [students, setStudents] = useState<Student[]>([]);
    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
    const [current, setCurrent] = useState<Student | null>(null);
    const [deleteMsg, setDeleteMsg] = useState('');

    const deletingItem = useRef<Student | null>(null);
    const editor = useRef<Modal | null>(null);

    const api = useContext(ApiContext);

    useEffect(() => {
        api.getStudents().then(setStudents);
        api.getStudyPrograms().then(setStudyPrograms);
    }, []);

    const programName = (id: number | null) =>
        studyPrograms.find(p => p.id === id)?.name ?? '';

    const closed = async () => {
        if (editor.current){
            if (current){
                const updated = await api.getStudent(current.id);
                setStudents(l => l.map(s => (s.id === updated.id ? updated : s)));
                setCurrent(null);
            }
            else {
                setStudents(await api.getStudents());
            }
            editor.current.hide();
        }
    };

    const deleteConfirmed = async (confirm: boolean) => {
        if (confirm && deletingItem.current){
            const deletingId = deletingItem.current.id;
            await api.deleteStudent(deletingId);
            setStudents(l => l.filter(s => s.id != deletingId));
        }
    };

    const openEditor = (s: Student | null) => {
        setCurrent(s);
        if (!editor.current) {
            editor.current = new Modal("#student-editor");
        }
        editor.current.show();
    };

    const deleteItem = (s: Student) => {
        deletingItem.current = s;
        setDeleteMsg(`Are you sure you want to delete ${s.firstName}`);
        Modal.getOrCreateInstance('#delete-confirm').show();
    };

    return (
<>
    <div className="page-header">
        <h3>Students</h3>
        <button className="btn btn-primary" onClick={() => openEditor(null)}>Add</button>
    </div>

    <table className="table table-striped">
        <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Program</th>
            <th style={{ width: 150 }}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {students.map((s, i) => (
            <tr key={i}>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{programName(s.studyProgramId)}</td>
                <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openEditor(s)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteItem(s)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>

    <StudentEditor onClose={closed} student={current} studyPrograms={studyPrograms} />

    <ConfirmDialog id='delete-confirm' closed={deleteConfirmed} message={deleteMsg} />
    
</>
    );
}
