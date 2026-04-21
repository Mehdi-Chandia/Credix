import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import {toast} from "react-toastify";

const CreateRequest = () => {
    const [documents, setDocuments] = useState([{ file: null }]);
    const [loading, setLoading] = useState(false);
    const {user,isloading}=useAuth();

const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (!user && !isloading) {
            navigate("/login");
        }
    },[user,isloading])

    const addDocument = () => {
        setDocuments((prev) => [...prev, { file: null }]);
    };

    const documentsChange = (e, index) => {
        const file = e.target.files[0];

        setDocuments((prev) => {
            const updated = [...prev];
            updated[index] = { file };
            return updated;
        });
    };

    const onSubmit =async (data) => {
        console.log("FORM DATA:", data);
        console.log("FILES:", documents);
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName",data.fullName);
            formData.append("licenseNumber", data.licenseNumber);
            formData.append("specialization", data.specialization);
           formData.append("experience", data.experience);

           documents.forEach((doc) => {
               formData.append("documents",doc.file)
           })

            const response=await fetch("http://localhost:3000/api/request/create",{
                method: "POST",
                credentials:"include",
                body: formData,
            })

            const result = await response.json();
           if (!response.ok){
               throw new Error(result.message)
           }
           console.log(result);
           toast.success("your request has been submitted to admin successfully");
           navigate("/userDashboard")
        }catch(err) {
            console.log("ERROR:", err.message);
            alert(err.message);
        }finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen text-white bg-black px-4 md:px-10 py-10">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-[#ff3c6e]"></div>
                    <p className="text-[#ffffff60] text-sm">Credential verification</p>
                    <div className="w-8 h-[2px] bg-[#ff3c6e]"></div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">
                    Submit your <span className="text-[#ff3c6e]">credentials</span> for verification.
                </h1>

                <p className="text-[#ffffff60] text-sm max-w-xl">
                    Fill in your professional details and upload documents. Our team verifies within 4 hours.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-[#0f0f14] p-6 md:p-10 rounded-xl">

                <p className="w-full text-center py-2 mb-6 bg-[#ff3c6e] rounded-full text-lg font-medium">
                    New verification request
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            <span className="text-red-400">*</span> Full Name
                        </label>

                        <input
                            {...register("fullName", {
                                required: "Full name is required",
                                minLength: { value: 4, message: "Minimum 4 characters" }
                            })}
                            className="w-full rounded-full py-2 px-4 bg-[#ffffff10] border focus:border-gray-300 outline-none"
                            placeholder="Enter your full name"
                        />

                        {errors.fullName && (
                            <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Specialization */}
                    <div>
                        <label className="block text-sm mb-2">
                            <span className="text-red-400">*</span> Specialization
                        </label>

                        <input
                            {...register("specialization", { required: "Required" })}
                            className="w-full rounded-full py-2 px-4 bg-[#ffffff10] border focus:border-gray-300 outline-none"
                            placeholder="Radiography"
                        />
                    </div>

                    {/* License */}
                    <div>
                        <label className="block text-sm mb-2">
                            <span className="text-red-400">*</span> License Number
                        </label>

                        <input
                            {...register("licenseNumber", { required: "Required" })}
                            className="w-full rounded-full py-2 px-4 bg-[#ffffff10] border focus:border-gray-300 outline-none"
                            placeholder="12345ABC"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm mb-2">
                            <span className="text-red-400">*</span> Experience
                        </label>

                        <input
                            {...register("experience", { required: "Required" })}
                            type="number"
                            className="w-full rounded-full py-2 px-4 bg-[#ffffff10] border focus:border-gray-300 outline-none"
                            placeholder="Years of experience"
                        />
                    </div>

                </div>

                {/* Documents */}
                <div className="mt-6">
                    <label className="block text-sm mb-2">
                        <span className="text-red-400">*</span> Upload Documents
                    </label>

                    {documents.map((doc, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={(e) => documentsChange(e, index)}
                            className="w-full mb-3 py-2 px-3 rounded bg-[#ffffff10] border"
                        />
                    ))}

                    <button
                        type="button"
                        onClick={addDocument}
                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                    >
                        Add another +
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className={`mt-6 w-full py-2 rounded-full bg-[#ff3c6e] hover:scale-105 transition ${loading ? 'cursor-not-allowed opacity-40':''}`}
                >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>

            </form>
        </div>
    );
};

export default CreateRequest;