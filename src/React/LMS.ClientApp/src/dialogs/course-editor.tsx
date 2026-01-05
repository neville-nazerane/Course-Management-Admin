import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../services/contexts';
import type { Course } from '../models/course';

type Props = {
  course: Course | null;
  onClose: () => void;
};

export default function CourseEditor({ course, onClose }: Props) {
  const api = useContext(ApiContext);

  const emptyCourse: Course = {
    id: 0,
    name: '',
    code: '',
    description: ''
  };

  const [model, setModel] = useState<Course>(emptyCourse);

  useEffect(() => {
    if (course != null) setModel(course);
    else setModel(emptyCourse);
  }, [course]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!model.id) {
      await api.createCourse(model);
    } else {
      await api.updateCourse(model);
    }

    onClose();
  };

  return (
    <div id="course-editor" className="modal fade" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {course ? 'Edit Course' : 'Create Course'}
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
                  onChange={e =>
                    setModel(x => ({ ...x, name: e.target.value }))
                  } />
              </div>

              <div className="mb-3">
                <label className="form-label">Code</label>
                <input
                  className="form-control"
                  value={model.code}
                  onChange={e =>
                    setModel(x => ({ ...x, code: e.target.value }))
                  } />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={model.description ?? ''}
                  onChange={e =>
                    setModel(x => ({ ...x, description: e.target.value }))
                  } />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
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
}
