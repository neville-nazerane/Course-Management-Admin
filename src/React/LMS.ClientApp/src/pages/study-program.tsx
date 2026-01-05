import { useContext, useEffect, useRef, useState } from 'react';
import type { StudyProgram } from '../models/study-program';
import { ApiContext } from '../services/contexts';
import { Modal } from 'bootstrap';
import StudyProgramEditor from '../dialogs/study-program-editor';
import ConfirmDialog from '../dialogs/confirm-dialog';

export default function StudyPrograms() {
    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
    const [current, setCurrent] = useState<StudyProgram | null>(null);
    const [deleteMsg, setDeleteMsg] = useState('');

    const deletingItem = useRef<StudyProgram | null>(null);
    const editor = useRef<Modal | null>(null);

    const api = useContext(ApiContext);

    useEffect(() => {
        api.getStudyPrograms().then(setStudyPrograms);
    }, []);

    const closed = async () => {
        if (editor.current){
            if (current){
                const updated = await api.getStudyProgram(current.id);
                setStudyPrograms(l => l.map(s => (s.id === updated.id ? updated : s)));
                setCurrent(null);
            }
            else {
                setStudyPrograms(await api.getStudyPrograms());
            }
            editor.current.hide();
        }
    };

    const deleteConfirmed = async (confirm: boolean) => {
        if (confirm && deletingItem.current){
            const deletingId = deletingItem.current.id;
            await api.deleteStudyProgram(deletingId);
            setStudyPrograms(l => l.filter(s => s.id != deletingId));
        }
    };

    const openEditor = (s: StudyProgram | null) => {
        setCurrent(s);
        if (!editor.current) {
            editor.current = new Modal("#study-program-editor");
        }
        editor.current.show();
    };

    const deleteItem = (s: StudyProgram) => {
        deletingItem.current = s;
        setDeleteMsg(`Are you sure you want to delete ${s.name}`);
        Modal.getOrCreateInstance('#delete-confirm').show();
    };

    return (
<>
    <div className="page-header">
        <h3>Study Programs</h3>
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
        {studyPrograms.map((s, i) => (
            <tr key={i}>
                <td>{s.name}</td>
                <td>{s.code}</td>
                <td>{s.description ?? ''}</td>
                <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openEditor(s)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteItem(s)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>

    <StudyProgramEditor onClose={closed} studyProgram={current} />

    <ConfirmDialog id='delete-confirm' closed={deleteConfirmed} message={deleteMsg} />
</>
    );
}
