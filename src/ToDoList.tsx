import { useForm } from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    // useForm : register, handleSubmit 사용가능
    // register : state과 동일, form의 input에 등록, validation내용 설정
    // handleSubmit : form의 onSubmit에 등록, onValid fn을 필수 arg로 받는다.
    // formState : form의 errors객체를 쓸 수 있음. (에러 내용 확인 가능.)
    // setError: error내용 설정 가능
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>();

    // onValid fn : called if the data is valid
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            return setError("password1", {
                message: "Password are not the same",
            });
        }
        // return setError("extraError", { message: "Server offline" });
    };

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
                            message: "Invalid email",
                        },
                    })}
                    placeholder="Write your Email"
                ></input>
                <span>{errors?.email?.message}</span>
                <input
                    {...register("firstName", {
                        required: "first name is required",
                        minLength: {
                            value: 5,
                            message: "Your first name is too short",
                        },
                        validate: {
                            noSpace: (value) =>
                                value.includes(" ") ? "no space allowed" : true,
                        },
                    })}
                    placeholder="Write your First Name"
                ></input>
                <span>{errors?.firstName?.message as string}</span>
                <input
                    {...register("lastName", {
                        required: "last name is required",
                        minLength: {
                            value: 2,
                            message: "Your last name is too short",
                        },
                    })}
                    placeholder="Write your Last Name"
                ></input>
                <span>{errors?.lastName?.message as string}</span>
                <input
                    {...register("password", {
                        required: "password is required",
                        minLength: {
                            value: 10,
                            message: "Your password is too short",
                        },
                    })}
                    placeholder="Write your Password"
                ></input>
                <span>{errors?.password?.message as string}</span>

                <input
                    {...register("password1", {
                        required: "password1 is required",
                        minLength: {
                            value: 10,
                            message: "Your password1 is too short",
                        },
                    })}
                    placeholder="Write your Password again"
                ></input>
                <span>{errors?.password1?.message as string}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default ToDoList;
