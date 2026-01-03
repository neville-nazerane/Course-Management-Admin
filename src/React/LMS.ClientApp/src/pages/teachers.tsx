import { useContext, useEffect, useRef, useState } from 'react';
import type { Teacher } from '../models/teacher';
import { ApiContext } from '../services/contexts';
import TeacherEditor from '../services/dialogs/teacher-editor';
import { Modal } from 'bootstrap';


export default function Teachers() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [current, setCurrent] = useState<Teacher |  null>(null);

    const api = useContext(ApiContext);

    useEffect(() => {
       api.getTeachers().then(setTeachers);
    }, []);

    const closed = () => {
        console.log('closed!');
    }

    const editItem = (t: Teacher) => {
        setCurrent(t);
        new Modal(".modal").show();
    };

  return (
<>
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
              <button className="btn btn-sm btn-primary me-2" onClick={() => editItem(t)}>Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <TeacherEditor onClose={closed} teacher={current}  />
</>
  );
}
