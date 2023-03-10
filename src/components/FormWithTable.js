import { useDispatch, useSelector } from "react-redux";
import { addDataSagaAction, updateDataSagaAction, deleteDataSagaAction, initialDataSagaAction } from "../redux/CRUDActions";
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function FormWithTable() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dataReducer.data);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const formik = useFormik({
        initialValues: {
            username: formData.username,
            password: formData.password,
            email: formData.email,
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required').max(10, 'Must be 10 characters or less').min(2, 'Must be 2 characters or more'),
            password: Yup.string()
                .max(10, 'Must be 10 characters or less').required('Required').min(2, 'Must be 2 characters or more'),
            email: Yup.string().required('Required').email('Invalid email address'),
        }),
        onSubmit: (values) => {
            if (!isEditing) {
                const highestId = Math.max(...data.map((row) => row.id));
                const id = highestId + 1;
                dispatch(addDataSagaAction({ ...formData, id }));
            } else {
                dispatch(updateDataSagaAction({ ...formData, id: selectedId }));
                setIsEditing(false);
            }
            setFormData({ username: "", password: "", email: "" });
            // alert(JSON.stringify(values, null, 2));
            formik.resetForm();
        },
    });
    useEffect(() => dispatch(initialDataSagaAction()), [])
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this row?')) {
            dispatch(deleteDataSagaAction({ id }));
        }
    };

    const handleEdit = (id) => {
        if (window.confirm('Are you sure you want to edit this row?')) {
            const selectedData = data.find((item) => item.id === id);
            setFormData(selectedData);
            setSelectedId(id);
            setIsEditing(true);
        }
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label><br />
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    name="username"
                    value={formik.values.username || formData.username}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                    }}
                    onBlur={formik.handleBlur}
                /><br />{formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}<br />
                <label htmlFor="password">Password</label><br />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    value={formik.values.password || formData.password}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                    }}
                    onBlur={formik.handleBlur}
                /><br />{formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}<br />
                <label htmlFor="email">Email</label><br />
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    name="email"
                    value={formik.values.email || formData.email}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                    }}
                    onBlur={formik.handleBlur}
                /><br />{formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}<br />
                <button type="submit">
                    {isEditing ? "Update" : "Submit"}
                </button><br /><br />
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.password}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}

