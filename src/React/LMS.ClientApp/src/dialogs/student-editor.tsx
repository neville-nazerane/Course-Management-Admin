import { useContext, useEffect, useState } from 'react';
import type { Student } from '../models/student';
import type { StudyProgram } from '../models/study-program';
import { ApiContext } from '../services/contexts';
import { DataUtils } from '../assets/utils/data-utils';

type Props = {
    student: Student | null;
    studyPrograms: StudyProgram[];
    onClose: () => void;
};

export default function StudentEditor({ student, studyPrograms, onClose } : Props) {
    const api = useContext(ApiContext);

    const emptyStudent : Student = {
        id: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        enrolledOn: '',
        studyProgramId: null
    };

    const [model, setModel] = useState<Student>(emptyStudent);

    useEffect(() => {
        if (student != null) setModel(student);
        else setModel(emptyStudent);
    }, [student]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!model.id) {
            await api.createStudent(model);
        } else {
            await api.updateStudent(model);
        }

        onClose();
    };

    return (
<>
    <div id="student-editor" className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={submit}>
                <div className="modal-header">
                <h5 className="modal-title">
                    {student ? 'Edit Student' : 'Create Student'}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose} />
                </div>

                <div className="modal-body">
                <div className="row">
                    <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        className="form-control"
                        value={model.firstName}
                        onChange={e => setModel(x => ({ ...x, firstName: e.target.value }))} />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        className="form-control"
                        value={model.lastName}
                        onChange={e => setModel(x => ({ ...x, lastName: e.target.value }))} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        value={DataUtils.cleanDate(model.dateOfBirth)}
                        onChange={e => setModel(x => ({ ...x, dateOfBirth: new Date(e.target.value) }))} />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label className="form-label">Enrolled On</label>
                    <input
                        type="date"
                        className="form-control"
                        value={DataUtils.cleanDate(model.enrolledOn)}
                        onChange={e => setModel(x => ({ ...x, enrolledOn: new Date(e.target.value) }))} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Study Program</label>
                    <select
                        className="form-select"
                        value={model.studyProgramId ?? ''}
                        onChange={e =>
                            setModel(x => ({
                                ...x,
                                studyProgramId: e.target.value ? Number(e.target.value) : null
                            }))
                        }>
                        <option value="">— Select —</option>
                        {studyPrograms.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                </div>

                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                </div>
            </form>
            </div>
        </div>
    </div>
</>
    );
}
