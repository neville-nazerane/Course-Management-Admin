import { forwardRef, useContext, useEffect, useState } from 'react';
import { ApiContext } from '../contexts';
import type { Teacher } from '../../models/teacher';

type Props = {
  teacher: Teacher | null;
  onClose: () => void;
};

export default function TeacherEditor({ teacher, onClose } : Props) {
    const api = useContext(ApiContext);

    const emptyTeacher : Teacher = {
        id: 0,
        firstName: '',
        lastName: '',
        title: '',
        dateOfBirth: new Date(''),
        hiredOn: new Date('')
    };

    const [model, setModel] = useState<Teacher>(emptyTeacher);

    useEffect(() => {
        if (teacher != null) setModel(teacher);
        else setModel(emptyTeacher);
    }, [teacher]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!model.id) {
            await api.createTeacher(model);
        } else {
            await api.updateTeacher(model);
        }

        onClose();
    };

  return (
    <div className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={submit}>
                <div className="modal-header">
                <h5 className="modal-title">
                    {teacher ? 'Edit Teacher' : 'Create Teacher'}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose}
                />
                </div>

                <div className="modal-body">
                <div className="row">
                    <div className="col-md-3 mb-3">
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        value={model.title ?? ''}
                        onChange={e => setModel(x => ({ ...x, title: e.target.value }))}
                    />
                    </div>

                    <div className="col-md-4 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        className="form-control"
                        value={model.firstName}
                        onChange={e => setModel(x => ({ ...x, firstName: e.target.value }))}
                    />
                    </div>

                    <div className="col-md-5 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        className="form-control"
                        value={model.lastName}
                        onChange={e =>
                        setModel(x => ({ ...x, lastName: e.target.value }))
                        }
                    />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        value={cleanDate(model.dateOfBirth)}
                        onChange={e =>
                        setModel(x => ({
                            ...x,
                            dateOfBirth: new Date(e.target.value)
                        }))
                        }
                    />
                    </div>

                    <div className="col-md-6 mb-3">
                    <label className="form-label">Hired On</label>
                    <input
                        type="date"
                        className="form-control"
                        value={cleanDate(model.hiredOn)}
                        onChange={e =>
                        setModel(x => ({
                            ...x,
                            hiredOn: new Date(e.target.value)
                        }))
                        }
                    />
                    </div>
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

  );
};


function cleanDate(d: Date) : string {
    if (!isNaN(Date.parse(d.toString())))
        return new Date(d).toISOString().slice(0, 10);
    return new Date().toISOString().slice(0, 10);
}