import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
    asyncupdateuser,
    asyncdeleteuser,
    asynclogoutuser,
} from "../../store/Actions/UserActions";

const Settings = () => {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const fileRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.imageURL || "");
    const [imageInputMode, setImageInputMode] = useState("none"); // "upload" | "url" | "none"
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: user?.password || "",
            gender: user?.gender || "",
            dob: user?.dob || "",
            mobile: user?.mobile || "",
            address: user?.address || "",
            imageURL: user?.imageURL || "",
        },
    });

    const imageURL = watch("imageURL");

    const updateHandler = (data) => {
        dispatch(asyncupdateuser(user.id, data));
        setEditMode(false);
        setPreviewImage(data.imageURL);
        setImageInputMode("none");
    };

    const deleteHandler = () => {
        dispatch(asyncdeleteuser(user.id));
        nevigate("/signin");
    };

    const logOutHandler = () => {
        dispatch(asynclogoutuser(user.id));
        nevigate("/signin");
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("imageURL", reader.result);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-[93vh] px-4 py-10 flex flex-col items-center bg-white">
            <button
                className="flex items-center absolute top-[8%] left-[1%] font-bold cursor-pointer"
                onClick={() => nevigate(-1)}
            >
                <IoMdArrowRoundBack />
                <span>Back</span>
            </button>

            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Profile Display */}
            <div className="w-full md:w-[60%] border rounded-xl shadow p-6 flex flex-col items-center">
                <div
                    className="relative group w-40 h-40 rounded-full border-4 border-yellow-500 overflow-hidden cursor-pointer"
                    onClick={() => fileRef.current?.click()}
                >
                    {/* Profile Photo */}
                    <img
                        src={previewImage || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>

                <div className="text-left w-full mt-6 space-y-2 text-gray-700">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Mobile:</strong> {user?.mobile || "—"}</p>
                    <p><strong>Gender:</strong> {user?.gender || "—"}</p>
                    <p><strong>Date of Birth:</strong> {user?.dob || "—"}</p>
                    <p><strong>Address:</strong> {user?.address || "—"}</p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold cursor-pointer"
                    >
                        {editMode ? "Cancel" : "Edit Profile"}
                    </button>

                    <button
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md text-white  cursor-pointer"
                        onClick={logOutHandler}
                    >
                        Logout
                    </button>

                    <button
                        className="bg-red-600 hover:bg-red-700  px-6 py-2 rounded-md text-white cursor-pointer"
                        onClick={deleteHandler}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Edit Form below profile display */}
            {editMode && (
                <form
                    onSubmit={handleSubmit(updateHandler)}
                    className="w-full md:w-[60%] mt-6 bg-gray-100 p-6 rounded-xl shadow-md space-y-4"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Profile</h2>

                    {/* Toggle Buttons for Upload/Paste */}
                    <div className="flex gap-4 mb-2">
                        <button
                            type="button"
                            onClick={() => {
                                setImageInputMode("upload");
                            }}
                            className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 cursor-pointer ${imageInputMode === "upload" ? "bg-gray-300" : "bg-gray-200"}`}
                        >
                            📤 Upload
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setImageInputMode("url");
                            }}
                            className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 cursor-pointer ${imageInputMode === "url" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"}`}
                        >
                            🔗 Paste URL
                        </button>
                    </div>

                    {/* Conditionally Render Inputs */}
                    {imageInputMode === "url" && (
                        <>
                            <label className="block font-medium">Image URL</label>
                            <input
                                {...register("imageURL")}
                                type="text"
                                className="w-full px-3 py-2 rounded-md border"
                                placeholder="Paste image URL"
                                onChange={(e) => setPreviewImage(e.target.value)}
                            />
                        </>
                    )}

                    {imageInputMode === "upload" && (
                        <>
                            <label className="block font-medium">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 rounded-md border bg-white cursor-pointer"
                            />
                        </>
                    )}

                    {/* Continue Your Profile Fields Below */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium">Full Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                            <p className="text-red-500">{errors?.name?.message}</p>
                        </div>
                        <div>
                            <label className="font-medium">Gender</label>
                            <input
                                {...register("gender")}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Date of Birth</label>
                            <input
                                {...register("dob")}
                                type="date"
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Mobile</label>
                            <input
                                {...register("mobile")}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">Address</label>
                        <textarea
                            {...register("address")}
                            className="w-full border px-3 py-2 rounded-md"
                            rows={3}
                        />
                    </div>

                    <div className="relative">
                        <label className="font-medium">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Minimum 4 character password required",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            className="w-full border px-3 py-2 rounded-md pr-10"
                        />

                        {/* Toggle Icon */}
                        <span
                            className="absolute right-3 top-[38px] text-gray-600 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>

                        <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
                    </div>


                    <div className="flex gap-4 justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setEditMode(false);
                                setPreviewImage(user?.imageURL);
                                setImageInputMode("none");
                            }}
                            className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
};

export default Settings;
