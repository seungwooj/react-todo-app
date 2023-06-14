import { useForm } from "react-hook-form";

interface IForm {
    [key: string]: string;
}

function ToDoList() {
    // register : state과 동일, but useForm 선언은 한번만 해도 됨
    // handleSubmit : onSubmit - validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(errors);
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
                            value: 10,
                            message: "Your first name is too short",
                        },
                    })}
                    placeholder="Write your First Name"
                ></input>
                <span>{errors?.firstName?.message as string}</span>
                <input
                    {...register("lastName", {
                        required: "last name is required",
                        minLength: {
                            value: 10,
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
            </form>
        </div>
    );
}

export default ToDoList;
