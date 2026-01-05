import { useContext, useEffect, useState } from "react";
import type { Teacher } from "../models/teacher";
import type { Course } from "../models/course";
import { ApiContext } from "../services/contexts";
import type { CourseSection } from "../models/course-section";
import type { CourseSectionDisplay } from "../models/course-section-display";

type Props = {
    teacherId?: number,
    courseId?: number
}

export default function TeacherCourseEditor({ teacherId, courseId } : Props){

    const [ teachers, setTeachers ] = useState<Teacher[]>([]);
    const [ courses, setCourses ] = useState<Course[]>([]);

    const [ teacherName, setTeacherName ] = useState('');
    const [ courseName, setCourseName ] = useState('');
    const [ sections, setSections ] = useState<CourseSectionDisplay[]>([]);

    const [ addModel, setAddModel ] = useState<CourseSection>({ sectionCode: '' });

    const api = useContext(ApiContext);

    useEffect(() => {
        const init = async () => {
            const ts = await api.getTeachers();
            const cs = await api.getCourses();

            setTeachers(ts);
            setCourses(cs);

            if (teacherId){
                setAddModel({ teacherId, sectionCode: '' });
                setTeacherName(ts.find(t => t.id === teacherId)?.firstName ?? '');
            }
            else if (courseId){
                setAddModel({ courseId, sectionCode: '' });
                setCourseName(cs.find(c => c.id === courseId)?.name ?? '');
            }

            await refreshSections();
        };

        init();
    }, [teacherId, courseId]);

    const submitAdd = async () => {
        await api.addCourseSection(addModel);
        setAddModel(m => ({ ...m, sectionCode: '' }));

        await refreshSections();
    };

    const refreshSections = async () => {
        if (teacherId)
            api.getCourseSectionsByTeacherId(teacherId).then(setSections);
        else if (courseId)
            api.getCourseSectionsByCourseId(courseId).then(setSections);
    };

    const submitDelete = async (id: number) => {
        await api.deleteCourseSection(id);
        setSections(l => l.filter(s => s.id !== id));
    };

    return (
<>
<div id="teacher-course-editor" className="modal fade" tabIndex={-1}>
    <div className="modal-dialog modal-lg">
        <div className="modal-content">

            <div className="modal-header">
                <h5 className="modal-title">Course Sections</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body">

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Teacher</label>
                        {teacherName
                            ? <div><strong>{teacherName}</strong></div>
                            : <select
                                className="form-select"
                                value={addModel.teacherId ?? ''}
                                onChange={e =>
                                    setAddModel(m => ({
                                        ...m,
                                        teacherId: e.target.value ? Number(e.target.value) : undefined
                                    }))
                                }>
                                <option value="">— Select —</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>{t.firstName}</option>
                                ))}
                              </select>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Course</label>
                        {courseName
                            ? <div><strong>{courseName}</strong></div>
                            : <select
                                className="form-select"
                                value={addModel.courseId ?? ''}
                                onChange={e =>
                                    setAddModel(m => ({
                                        ...m,
                                        courseId: e.target.value ? Number(e.target.value) : undefined
                                    }))
                                }>
                                <option value="">— Select —</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                              </select>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Section Code</label>
                        <input
                            className="form-control"
                            value={addModel.sectionCode ?? ''}
                            onChange={e =>
                                setAddModel(m => ({ ...m, sectionCode: e.target.value }))
                            } />
                    </div>

                    <div className="col-md-6 d-flex align-items-end">
                        <button className="btn btn-primary" onClick={submitAdd}>Add</button>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Teacher</th>
                            <th>Course</th>
                            <th style={{ width: 100 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map(s => (
                            <tr key={s.id}>
                                <td>{s.sectionCode}</td>
                                <td>{s.teacherName}</td>
                                <td>{s.courseName}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => submitDelete(s.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>

        </div>
    </div>
</div>
</>
    );
}
