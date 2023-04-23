export type login_data = {
    email: string;
    password: string;
};

export type regis_data = {
    username: string | null;
    email: string;
    password: string | null;
    cpassword: string | null;
  };

export type user_data = {
    username: string;
    userID: string;
    email: string
}

export type todos_data = {
    isEdit: boolean;
    isFinish: boolean;
    task: string;
    taskID: string;
    userID: string;
}