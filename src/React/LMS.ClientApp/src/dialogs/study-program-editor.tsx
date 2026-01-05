import { useContext, useEffect, useState } from 'react';
import type { StudyProgram } from '../models/study-program';
import { ApiContext } from '../services/contexts';

type Props = {
    studyProgram: StudyProgram | null;
    onClose: () => void;
};

export default function StudyProgramEditor({ studyProgram, onClose } : Props) {
    const api = useContext(ApiContext);

    const emptyStudyProgram : StudyProgram = {
        id: 0,
        name: '',
        code: '',
        description: ''
    };

    const [model, setModel] = useState<StudyProgram>(emptyStudyProgram);

    useEffect(() => {
        if (studyProgram != null) setModel(studyProgram);
        else setModel(emptyStudyProgram);
    }, [studyProgram]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!model.id) {
            await api.createStudyProgram(model);
        } else {
            await api.updateStudyProgram(model);
        }

        onClose();
    };

    return (
<>
    <div id="study-program-editor" className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={submit}>
                <div className="modal-header">
                <h5 className="modal-title">
                    {studyProgram ? 'Edit Study Program' : 'Create Study Program'}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose} />
                </div>

                <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        value={model.name}
                        onChange={e => setModel(x => ({ ...x, name: e.target.value }))} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Code</label>
                    <input
                        className="form-control"
                        value={model.code}
                        onChange={e => setModel(x => ({ ...x, code: e.target.value }))} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={model.description ?? ''}
                        onChange={e => setModel(x => ({ ...x, description: e.target.value }))} />
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
