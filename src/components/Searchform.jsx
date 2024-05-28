import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Searchform({ filteredData, usertodos }) { //filterdata for changing main content to filtered content , usertodos data from api

    const formik = useFormik({
        initialValues: {
            userId: '',
            title: '',
            completed: '',
        },
        validationSchema: Yup.object({
            userId: Yup.number()
                .min(1, 'Must have atleast 1 Number')
                .required('user Id Required'),
            title: Yup.string()
                .min(4, 'Must have atleast 4 characters')
                .required('Title Required'),
            completed: Yup.boolean(),
        }),
        onSubmit: (values, action) => {
            const newData = usertodos.filter((item) => {
                return values.userId == item.userId && values.completed == item.completed && values.title == item.title.slice(0, values.title.length)
            })
            filteredData(newData)
            action.resetForm();
        },
    });

    return (
        <div className="w-1/3 border-xl border-2 border-blue-500">
            <h1 className='bg-slate-200 text-center text-2xl'>Search</h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col bg-slate-200 items-center'>
                <h2 className='text-red-600'>All the Fields shoud match the data</h2>
                <label className='my-3' htmlFor="userId">User Id</label>
                <input
                    className='w-2/3 rounded-xl'
                    id="userId"
                    name="userId"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.userId}
                    placeholder='Enter user Id'
                />
                {formik.touched.userId && formik.errors.userId ? (
                    <div className='text-red-600'>{formik.errors.userId}</div>
                ) : null}

                <label className='my-3' htmlFor="title">Title</label>
                <input
                    className='w-2/3 rounded-xl'
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder='Enter Titile'
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className='text-red-600'>{formik.errors.title}</div>
                ) : null}

                <label className='my-3' htmlFor="completed">Completed</label>
                <input
                    id="completed"
                    name="completed"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.completed}
                />
                {formik.touched.completed && formik.errors.completed ? (
                    <div className='text-red-600'>{formik.errors.completed}</div>
                ) : null}

                <button className='bg-green-400 rounded-xl my-3 w-1/3' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Searchform