import { forwardRef, useContext, useEffect, useState } from 'react';
import { ApiContext } from '../contexts';
import type { Teacher } from '../../models/teacher';

type Props = {
  teacher: Teacher | null;
  onClose: () => void;
};

export default forwardRef<HTMLDivElement, Props>(function TeacherEditor(
  { teacher, onClose: onClose },
  ref
) {
  const api = useContext(ApiContext);

  const [model, setModel] = useState<Teacher>({
    id: 0,
    firstName: '',
    lastName: '',
    title: '',
    dateOfBirth: new Date(''),
    hiredOn: new Date('')
  });

  useEffect(() => {
    if (teacher) setModel(teacher);
  }, [teacher]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!model.id || model.id === 0) {
      await api.createTeacher(model);
    } else {
      await api.updateTeacher(model);
    }

    onClose();
  };

  return (
    <div className="modal fade" tabIndex={-1} ref={ref}>
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
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  value={model.firstName}
                  onChange={e =>
                    setModel(x => ({ ...x, firstName: e.target.value }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  value={model.lastName}
                  onChange={e =>
                    setModel(x => ({ ...x, lastName: e.target.value }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={model.title ?? ''}
                  onChange={e =>
                    setModel(x => ({ ...x, title: e.target.value }))
                  }
                />
              </div>

              {/* <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    model.dateOfBirth
                      ? new Date(model.dateOfBirth).toISOString().slice(0, 10)
                      : ''
                  }
                  onChange={e =>
                    setModel(x => ({
                      ...x,
                      dateOfBirth: new Date(e.target.value)
                    }))
                  }
                />
              </div> */}

              {/* <div className="mb-3">
                <label className="form-label">Hired On</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    model.hiredOn
                      ? new Date(model.hiredOn).toISOString().slice(0, 10)
                      : ''
                  }
                  onChange={e =>
                    setModel(x => ({
                      ...x,
                      hiredOn: new Date(e.target.value)
                    }))
                  }
                />
              </div> */}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
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
});
